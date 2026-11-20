const CONFIG = {
  sheetName: "Sheet1",
  ownerName: "Gautham P Kini",
  portfolioUrl: "https://github.com/Gautham0925",
  linkedinUrl: "https://www.linkedin.com/in/gauthampkini/",
  dailyAutoReplyLimit: 40,
  perSenderCooldownSeconds: 21600,
  limits: { firstname: 80, lastname: 80, email: 254, phone: 20, message: 2000 },
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const p = (e && e.parameter) || {};

    if (clean_(p.company, 100)) return json_({ result: "success" });

    const data = {
      firstname: clean_(p.firstname, CONFIG.limits.firstname),
      lastname: clean_(p.lastname, CONFIG.limits.lastname),
      email: clean_(p.email, CONFIG.limits.email).toLowerCase(),
      phone: clean_(p.phone, CONFIG.limits.phone),
      message: clean_(p.Message || p.message, CONFIG.limits.message),
    };

    if (!data.firstname || !data.message || !isEmail_(data.email)) {
      return json_({ result: "error", error: "invalid_input" });
    }

    appendRow_(data);
    notifyOwner_(data);
    sendAutoReply_(data);

    return json_({ result: "success" });
  } catch (err) {
    console.error(err);
    return json_({ result: "error", error: "server_error" });
  } finally {
    lock.releaseLock();
  }
}

function appendRow_(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.sheetName);
  const defaults = ["timestamp", "firstname", "lastname", "email", "phone", "Message"];
  if (sheet.getLastRow() === 0) sheet.appendRow(defaults);
  const headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0];
  const values = {
    timestamp: new Date(),
    date: new Date(),
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    phone: data.phone,
    message: data.message,
  };
  const row = headers.map(function (h) {
    const key = String(h).trim().toLowerCase();
    const v = values[key];
    return v instanceof Date ? v : safeCell_(v || "");
  });
  sheet.appendRow(row);
}

function notifyOwner_(data) {
  if (MailApp.getRemainingDailyQuota() < 2) return;
  const owner = Session.getEffectiveUser().getEmail();
  MailApp.sendEmail({
    to: owner,
    replyTo: data.email,
    subject: "Portfolio contact: " + data.firstname + " " + data.lastname,
    body: [
      "Name: " + data.firstname + " " + data.lastname,
      "Email: " + data.email,
      "Phone: " + (data.phone || "-"),
      "",
      data.message,
    ].join("\n"),
  });
}

function sendAutoReply_(data) {
  const cache = CacheService.getScriptCache();
  const senderKey = "sent:" + Utilities.base64EncodeWebSafe(data.email);
  if (cache.get(senderKey)) return;

  const props = PropertiesService.getScriptProperties();
  const dayKey = "count:" + Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd");
  const sentToday = Number(props.getProperty(dayKey) || 0);
  if (sentToday >= CONFIG.dailyAutoReplyLimit) return;
  if (MailApp.getRemainingDailyQuota() < 1) return;

  const firstName = data.firstname.replace(/[^\p{L}\p{M}' .-]/gu, "").slice(0, 40) || "there";

  MailApp.sendEmail({
    to: data.email,
    name: CONFIG.ownerName,
    subject: "Thank you for contacting me",
    body: plainReply_(firstName),
    htmlBody: htmlReply_(firstName),
  });

  cache.put(senderKey, "1", CONFIG.perSenderCooldownSeconds);
  props.setProperty(dayKey, String(sentToday + 1));
}

function plainReply_(firstName) {
  return [
    "Hi " + firstName + ",",
    "",
    "Thank you for contacting me. I have received your message and will reach out to you as soon as possible.",
    "",
    "Best regards,",
    CONFIG.ownerName,
    "Security Consultant · Web Application Security · VAPT",
    CONFIG.linkedinUrl,
    "",
    "This is an automated confirmation. Please do not reply with sensitive information.",
  ].join("\n");
}

function htmlReply_(firstName) {
  const name = escapeHtml_(firstName);
  return (
    '<div style="font-family:Segoe UI,Arial,sans-serif;max-width:560px;margin:0 auto;color:#0b0d10">' +
    '<div style="background:#0b0d10;padding:20px 24px;border-radius:12px 12px 0 0">' +
    '<span style="display:inline-block;background:#c5f82a;color:#0b0d10;font:600 13px monospace;padding:6px 8px;border-radius:6px">GK</span>' +
    '<span style="color:#f4f6f8;font:600 14px monospace;margin-left:10px">gautham<span style="color:#c5f82a">.sec</span></span>' +
    "</div>" +
    '<div style="border:1px solid #dfe3e8;border-top:0;padding:28px 24px;border-radius:0 0 12px 12px;line-height:1.6">' +
    '<p style="margin:0 0 16px">Hi ' + name + ",</p>" +
    '<p style="margin:0 0 16px">Thank you for contacting me. I have received your message and will reach out to you as soon as possible.</p>' +
    '<p style="margin:24px 0 0">Best regards,<br><strong>' + escapeHtml_(CONFIG.ownerName) + "</strong><br>" +
    '<span style="color:#4a5361">Security Consultant · Web Application Security · VAPT</span></p>' +
    '<p style="margin:16px 0 0"><a href="' + CONFIG.linkedinUrl + '" style="color:#3f6212">LinkedIn</a></p>' +
    '<p style="margin:24px 0 0;font-size:12px;color:#5c6470">This is an automated confirmation. Please do not reply with sensitive information.</p>' +
    "</div></div>"
  );
}

function clean_(value, max) {
  return String(value || "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

function isEmail_(value) {
  return /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[A-Za-z]{2,}$/.test(value);
}

function safeCell_(value) {
  return /^[=+\-@\t\r]/.test(value) ? "'" + value : value;
}

function escapeHtml_(value) {
  return String(value).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function testAutoReply() {
  sendAutoReply_({ firstname: "Test", email: Session.getEffectiveUser().getEmail() });
}
