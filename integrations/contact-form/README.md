# Contact form backend (Google Apps Script)

The website posts the contact form to a Google Apps Script web app bound to a Google Sheet. `Code.gs` stores each message, emails the owner, and sends the visitor an automatic "Thank you for contacting me" reply.

## Install / update

1. Open the Google Sheet that receives the form → **Extensions → Apps Script**.
2. Replace the contents of `Code.gs` with this file's `Code.gs`. Check `CONFIG.sheetName` matches the tab name (default `Sheet1`).
3. Run `testAutoReply` once from the editor and approve the permissions (Sheets, Gmail send). A test email arrives in your inbox.
4. **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy.**
   Editing the existing deployment keeps the same `/exec` URL, so the website needs no change.

Execute as: **Me**. Who has access: **Anyone**.

## Behaviour

| Step | Detail |
|---|---|
| Store | Appends a row matched to the sheet's header names (`timestamp`, `firstname`, `lastname`, `email`, `phone`, `Message`) |
| Notify owner | Email to the script owner with `Reply-To` set to the visitor |
| Auto-reply | "Thank you for contacting me — I will reach out as soon as possible", HTML + plain text |

## Abuse controls

| Control | Value |
|---|---|
| Honeypot field `company` | Filled → silently accepted, nothing stored or sent |
| Per-address cooldown | One auto-reply per email address per 6 hours |
| Daily auto-reply cap | 40 per day (`CONFIG.dailyAutoReplyLimit`) |
| Gmail quota guard | Skips sending when `MailApp` quota is exhausted (consumer Gmail: ~100 recipients/day) |
| Input limits | Field lengths capped, control characters stripped, email format validated |
| Spreadsheet formula injection | Values starting with `= + - @` are prefixed with `'` |
| HTML injection in email | Visitor name stripped to letters and escaped; the visitor's message is never echoed back |
| Concurrency | `LockService` serialises writes |
