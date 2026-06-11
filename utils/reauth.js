Cllins
cllins_
Online

Cllins — 6/7/2026 1:42 PM
yo u get your shit wokring
I havent started yet
goatified — 6/7/2026 1:46 PM
The only thing that doesn’t work for me is the refresh token and im waiting on the indicator from za
Cllins — 6/7/2026 1:46 PM
what is the indicator used for
goatified — 6/7/2026 1:49 PM
I’m not completely sure, za just said he was gonna push a new one out bc ppl were having issues, im not actually sure if the bot needs it but im pretty sure TradingView is gonna get linked to the bot for some sort of purpose
waiting on more details tbh
Cllins — 6/7/2026 11:23 PM
Ok
Cllins — 6/9/2026 6:06 PM
Your bot work today ?
goatified — 6/9/2026 6:09 PM
nah im gonna keep going at it
idk what to do, za been busy and dealing with stuff so he aint really been to active
Cllins — 6/9/2026 6:17 PM
I haven’t even finished it yet tbh
Maybe we can help eachother
goatified — 6/9/2026 6:18 PM
yeah fs man, i'll do what i can for ya, and tbloom sounds like he knows a decent amount of stuff
Cllins — 6/9/2026 11:02 PM
yo what trading view sub u giot
goatified — 6/9/2026 11:08 PM
essential
Cllins — 6/9/2026 11:08 PM
thankois
goatified — 6/9/2026 11:09 PM
yeah naytime
anytime*
Cllins — 6/9/2026 11:28 PM
were u able to setup the trading view alerts witht that plan?
goatified — 6/9/2026 11:46 PM
yes
are u having trouble
sorry im gaming with mu buddies for my bday a little lol
Cllins — 6/9/2026 11:47 PM
All good bro
theres a drone on u
goatified — 6/9/2026 11:47 PM
lmaooooo
probably
Cllins — 6/9/2026 11:49 PM
fuck iot
goatified — Yesterday at 11:29 AM
did you get it working
Cllins — Yesterday at 11:29 AM
Nah
goatified — Yesterday at 11:38 AM
imma try to fix mine, this shouldn't be this much of a battle lmaoooo
goatified — 12:21 AM
Forwarded
Alright yall. If you’re having problems and you downloaded all the files and started setting this all up last week. I would just go through the pain of it and replace all of the files I get hub with the most up-to-date one from Whop. EXCEPT THESE 2 files!!! @everyone 
@ZaTradeGod modified the Robinhood.JS file today and he modified the Robinhood.js file yesterday.
var rh = require("./robinhood");
var stateModule = require("./state");

var pendingWorkflow = null;

async function validateWhopLicense() {
 var licenseKey = process.env.WHOP_LICENSE_KEY;
 var apiKey = process.env.WHOP_API_KEY;
 if (!licenseKey) {
stateModule.logEvent("LICENSE_ERROR", "WHOP_LICENSE_KEY not set — trading disabled");
return false;
 }
 // Accept T- format keys
 if (licenseKey.startsWith("T-") && licenseKey.length > 10) {
stateModule.logEvent("LICENSE_OK", "Whop T- key accepted");
return true;
 }
 // Accept MEM- format keys
 if (licenseKey.startsWith("MEM-") && licenseKey.length > 10) {
stateModule.logEvent("LICENSE_OK", "Whop MEM- key accepted");
return true;
 }
 if (!apiKey) {
stateModule.logEvent("LICENSE_ERROR", "WHOP_API_KEY not set — trading disabled");
return false;
 }
 try {
var https = require("https");
var result = await new Promise((resolve, reject) => {
var options = {
hostname: "api.whop.com",
path: "/api/v2/memberships/validate_license",
method: "POST",
headers: {
"Authorization": "Bearer " + apiKey,
"Content-Type": "application/json"
}
};
var body = JSON.stringify({ license_key: licenseKey });
options.headers["Content-Length"] = Buffer.byteLength(body);
var req = https.request(options, (res) => {
var raw = "";
res.on("data", chunk => raw += chunk);
res.on("end", () => {
try { resolve(JSON.parse(raw)); } catch(e) { resolve({ raw }); }
});
});
req.on("error", reject);
req.write(body);
req.end();
});
stateModule.logEvent("LICENSE_DEBUG", "Whop response: " + JSON.stringify(result));
if (result.valid === true) {
stateModule.logEvent("LICENSE_OK", "Whop license valid");
return true;
}
if (result.status === "active" || result.status === "trialing") {
stateModule.logEvent("LICENSE_OK", "Whop membership active");
return true;
}
stateModule.logEvent("LICENSE_INVALID", "Invalid license: " + JSON.stringify(result));
return false;
 } catch(err) {
stateModule.logEvent("LICENSE_ERROR", "License check failed: " + err.message);
return false;
 }
}

async function refreshAccessToken() {
 var refreshToken = process.env.RH_REFRESH_TOKEN;
 if (!refreshToken) return false;
 try {
stateModule.logEvent("AUTH", "Refreshing access token...");
var result = await rh.refreshToken(refreshToken);
if (result.ok) {
stateModule.logEvent("AUTH", "Token refreshed successfully");
return true;
}
stateModule.logEvent("AUTH_ERROR", "Token refresh failed: " + result.error);
return false;
 } catch(err) {
stateModule.logEvent("AUTH_ERROR", "Token refresh error: " + err.message);
return false;
 }
}

async function ensureLoggedIn() {
 if (rh.getToken()) {
stateModule.logEvent("AUTH", "Already logged in");
return true;
 }

 // Try refresh token first
 var refreshToken = process.env.RH_REFRESH_TOKEN;
 if (refreshToken) {
var refreshed = await refreshAccessToken();
if (refreshed) return true;
 }

 // Fall back to stored access token
... (106 lines left)

reauth.js
8 KB
// Direct Robinhood API - modern 2026 auth flow
const https = require("https");
const crypto = require("crypto");

const RH_BASE = "api.robinhood.com";
let _token = null;

robinhood.js
12 KB

Trim Trading  •  Yesterday at 4:04 PM
Cllins — 12:21 AM
i should use these in the githuhb?
goatified — 12:21 AM
Did u use these instead of the 2 in the zip
Yeah
Instead of reauth and robinhood that are in the zip
Cllins — 12:22 AM
no let me try
﻿
goatified
goatifiedd
var rh = require("./robinhood");
var stateModule = require("./state");

var pendingWorkflow = null;

async function validateWhopLicense() {
 var licenseKey = process.env.WHOP_LICENSE_KEY;
 var apiKey = process.env.WHOP_API_KEY;
 if (!licenseKey) {
   stateModule.logEvent("LICENSE_ERROR", "WHOP_LICENSE_KEY not set — trading disabled");
   return false;
 }
 // Accept T- format keys
 if (licenseKey.startsWith("T-") && licenseKey.length > 10) {
   stateModule.logEvent("LICENSE_OK", "Whop T- key accepted");
   return true;
 }
 // Accept MEM- format keys
 if (licenseKey.startsWith("MEM-") && licenseKey.length > 10) {
   stateModule.logEvent("LICENSE_OK", "Whop MEM- key accepted");
   return true;
 }
 if (!apiKey) {
   stateModule.logEvent("LICENSE_ERROR", "WHOP_API_KEY not set — trading disabled");
   return false;
 }
 try {
   var https = require("https");
   var result = await new Promise((resolve, reject) => {
     var options = {
       hostname: "api.whop.com",
       path: "/api/v2/memberships/validate_license",
       method: "POST",
       headers: {
         "Authorization": "Bearer " + apiKey,
         "Content-Type": "application/json"
       }
     };
     var body = JSON.stringify({ license_key: licenseKey });
     options.headers["Content-Length"] = Buffer.byteLength(body);
     var req = https.request(options, (res) => {
       var raw = "";
       res.on("data", chunk => raw += chunk);
       res.on("end", () => {
         try { resolve(JSON.parse(raw)); } catch(e) { resolve({ raw }); }
       });
     });
     req.on("error", reject);
     req.write(body);
     req.end();
   });
   stateModule.logEvent("LICENSE_DEBUG", "Whop response: " + JSON.stringify(result));
   if (result.valid === true) {
     stateModule.logEvent("LICENSE_OK", "Whop license valid");
     return true;
   }
   if (result.status === "active" || result.status === "trialing") {
     stateModule.logEvent("LICENSE_OK", "Whop membership active");
     return true;
   }
   stateModule.logEvent("LICENSE_INVALID", "Invalid license: " + JSON.stringify(result));
   return false;
 } catch(err) {
   stateModule.logEvent("LICENSE_ERROR", "License check failed: " + err.message);
   return false;
 }
}

async function refreshAccessToken() {
 var refreshToken = process.env.RH_REFRESH_TOKEN;
 if (!refreshToken) return false;
 try {
   stateModule.logEvent("AUTH", "Refreshing access token...");
   var result = await rh.refreshToken(refreshToken);
   if (result.ok) {
     stateModule.logEvent("AUTH", "Token refreshed successfully");
     return true;
   }
   stateModule.logEvent("AUTH_ERROR", "Token refresh failed: " + result.error);
   return false;
 } catch(err) {
   stateModule.logEvent("AUTH_ERROR", "Token refresh error: " + err.message);
   return false;
 }
}

async function ensureLoggedIn() {
 if (rh.getToken()) {
   stateModule.logEvent("AUTH", "Already logged in");
   return true;
 }

 // Try refresh token first
 var refreshToken = process.env.RH_REFRESH_TOKEN;
 if (refreshToken) {
   var refreshed = await refreshAccessToken();
   if (refreshed) return true;
 }

 // Fall back to stored access token
 var storedToken = process.env.RH_TOKEN;
 if (storedToken) {
   rh.setToken(storedToken);
   stateModule.logEvent("AUTH", "Using stored RH_TOKEN — connected");
   return true;
 }

 // Try full login
 var email = process.env.RH_EMAIL;
 var password = process.env.RH_PASSWORD;
 var mfa = process.env.RH_MFA_CODE;

 stateModule.logEvent("AUTH", "Logging into Robinhood...");
 var result = await rh.login(email, password, mfa);

 if (result.ok) {
   stateModule.logEvent("AUTH", "Login successful");
   pendingWorkflow = null;
   return true;
 }

 if (result.verification_workflow) {
   stateModule.logEvent("AUTH", "Robinhood verification required — checking for challenge...");
   try {
     var challenge = await rh.handleVerificationWorkflow(result.device_token, result.workflow_id);
     pendingWorkflow = {
       challenge_id: challenge.challenge_id,
       challenge_type: challenge.challenge_type,
       machine_id: challenge.machine_id,
       device_token: result.device_token,
       workflow_id: result.workflow_id,
       email: email,
       password: password
     };
     if (challenge.challenge_type === "prompt") {
       stateModule.logEvent("AUTH", "Push notification sent — tap Approve on your phone");
       var approved = await rh.waitForPushApproval(challenge.challenge_id);
       if (approved) {
         await rh.completeWorkflow(challenge.machine_id);
         var retry = await rh.login(email, password, mfa);
         if (retry.ok) {
           stateModule.logEvent("AUTH", "Login successful after push approval");
           pendingWorkflow = null;
           return true;
         }
       }
     } else if (challenge.challenge_type === "sms" || challenge.challenge_type === "email") {
       stateModule.logEvent("AUTH_CHALLENGE", "SMS/email code required — enter it in the dashboard");
     }
   } catch(err) {
     stateModule.logEvent("AUTH_ERROR", "Verification failed: " + err.message);
   }
   return false;
 }

 if (result.mfa_required) {
   stateModule.logEvent("AUTH_ERROR", "MFA required — add RH_MFA_CODE to Railway variables");
   return false;
 }

 stateModule.logEvent("AUTH_ERROR", "Login failed: " + result.error);
 return false;
}

async function submitSmsCode(code) {
 if (!pendingWorkflow) return { ok: false, error: "No pending verification" };
 try {
   await rh.respondToSmsChallenge(pendingWorkflow.challenge_id, code);
   await rh.completeWorkflow(pendingWorkflow.machine_id);
   var retry = await rh.login(pendingWorkflow.email, pendingWorkflow.password);
   if (retry.ok) {
     stateModule.logEvent("AUTH", "Login successful after SMS code");
     pendingWorkflow = null;
     return { ok: true };
   }
   return { ok: false, error: "Login failed after SMS code" };
 } catch(err) {
   return { ok: false, error: err.message };
 }
}

function getPendingWorkflow() { return pendingWorkflow; }

function scheduleDailyReauth() {
 stateModule.logEvent("AUTH", "Daily reauth scheduler started");
 function msUntilNext9amET() {
   var now = new Date();
   var target = new Date();
   target.setUTCHours(13, 0, 0, 0);
   if (target <= now) target.setUTCDate(target.getUTCDate() + 1);
   return target - now;
 }
 function scheduleNext() {
   var delay = msUntilNext9amET();
   stateModule.logEvent("AUTH", "Next reauth in " + Math.round(delay / 60000) + " min");
   setTimeout(async function() {
     rh.setToken(null);
     await ensureLoggedIn();
     scheduleNext();
   }, delay);
 }
 scheduleNext();
}

module.exports = { ensureLoggedIn, submitSmsCode, getPendingWorkflow, scheduleDailyReauth, validateWhopLicense };
