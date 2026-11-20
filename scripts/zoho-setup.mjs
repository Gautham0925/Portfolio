const regions = {
  in: ["https://accounts.zoho.in", "https://mail.zoho.in"],
  com: ["https://accounts.zoho.com", "https://mail.zoho.com"],
  eu: ["https://accounts.zoho.eu", "https://mail.zoho.eu"],
  "com.au": ["https://accounts.zoho.com.au", "https://mail.zoho.com.au"],
  jp: ["https://accounts.zoho.jp", "https://mail.zoho.jp"],
};

const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_CODE, ZOHO_REGION = "in" } = process.env;
const region = regions[ZOHO_REGION];

if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_CODE || !region) {
  console.error("Set ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_CODE and optionally ZOHO_REGION (in, com, eu, com.au, jp).");
  process.exit(1);
}

const tokenResponse = await fetch(`${region[0]}/oauth/v2/token`, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "authorization_code",
    client_id: ZOHO_CLIENT_ID,
    client_secret: ZOHO_CLIENT_SECRET,
    code: ZOHO_CODE,
  }),
});
const tokens = await tokenResponse.json();
if (!tokens.refresh_token) {
  console.error("Token exchange failed:", tokens.error ?? JSON.stringify(tokens));
  process.exit(1);
}

const accountsResponse = await fetch(`${region[1]}/api/accounts`, {
  headers: { Authorization: `Zoho-oauthtoken ${tokens.access_token}`, Accept: "application/json" },
});
const accounts = await accountsResponse.json();
const list = accounts?.data ?? [];

console.log("\nAdd these in Render, then redeploy:\n");
console.log(`ZOHO_REGION=${ZOHO_REGION}`);
console.log(`ZOHO_CLIENT_ID=${ZOHO_CLIENT_ID}`);
console.log(`ZOHO_CLIENT_SECRET=${ZOHO_CLIENT_SECRET}`);
console.log(`ZOHO_REFRESH_TOKEN=${tokens.refresh_token}`);
list.forEach((account) => {
  console.log(`ZOHO_ACCOUNT_ID=${account.accountId}   (${account.primaryEmailAddress ?? account.emailAddress ?? "account"})`);
});
if (list.length === 0) console.log("No accounts returned:", JSON.stringify(accounts));
