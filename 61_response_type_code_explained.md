# OAuth 2.0 / OpenID Connect  
## What Happens When `response_type=code`

> ⚠️ **Important**
> `response_type=code` means **Authorization Code Flow**.  
> This is the **ONLY production-safe flow** for Google Login, OpenID Connect, and OAuth 2.0.

If you don’t understand this flow, you don’t understand real authentication.

---

## WHAT `response_type=code` MEANS (ONE LINE)

Google does **NOT** send tokens to the browser.  
Google sends a **temporary authorization code**, which must be exchanged on a **backend server**.

---

## HIGH-LEVEL FLOW (BIRD’S EYE VIEW)

```
Browser → Google Login
Google → Browser (code)
Browser → Backend (code)
Backend → Google (code + secret)
Google → Backend (tokens)
Backend → Browser (your own JWT / session)
```

---

## STEP-BY-STEP FLOW (DETAILED)

### STEP 1: User Clicks Login

Browser redirects to Google:

```
https://accounts.google.com/o/oauth2/v2/auth
?response_type=code
&client_id=YOUR_CLIENT_ID
&scope=openid email profile
&redirect_uri=http://localhost:5500/callback
```

---

### STEP 2: User Logs In on Google

- User enters credentials
- Google authenticates user
- Google asks for consent

Browser never sees any token here.

---

### STEP 3: Google Redirects Back with Code

```
http://localhost:5500/callback?code=4/0AUtGGWxyz...
```

Facts about this `code`:
- Valid for ~30 seconds
- One-time use only
- Cannot be decoded
- Useless without backend

---

### STEP 4: Frontend Sends Code to Backend

Frontend JavaScript:

```js
const code = new URLSearchParams(location.search).get("code");

fetch("/auth/google", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ code })
});
```

Frontend **STOPS HERE**.

---

### STEP 5: Backend Exchanges Code for Tokens

Backend sends request to Google:

```
POST https://oauth2.googleapis.com/token
```

With body:
- code
- client_id
- client_secret
- redirect_uri
- grant_type=authorization_code

---

### STEP 6: Google Returns Tokens to Backend

```json
{
  "access_token": "ya29....",
  "id_token": "eyJhbGciOiJSUzI1NiIs...",
  "expires_in": 3600,
  "refresh_token": "1//0g..."
}
```

Tokens **never touch the browser directly**.

---

### STEP 7: Backend Verifies ID Token

Backend verifies:
- signature
- issuer (`iss`)
- audience (`aud`)
- expiry (`exp`)

Only after verification:
- user is trusted
- account is created / fetched

---

### STEP 8: Backend Issues Its Own Token

Backend sends to browser:
- HTTP-only cookie OR
- custom JWT OR
- session id

Browser now considers user logged in.

---

## WHY THIS FLOW IS SECURE

### Security Guarantees
- Client secret stays on server
- Tokens never leak to JS
- Authorization code is useless if stolen
- Supports refresh tokens
- Works with PKCE

---

## WHY GOOGLE REQUIRES THIS FLOW

Browsers are:
- hackable
- inspectable
- untrusted

Google trusts:
- backend servers
- protected environments

So tokens go to backend only.

---

## COMMON BEGINNER MISTAKES (AVOID THESE)

❌ Trying to decode the `code`  
❌ Exchanging code in browser  
❌ Exposing `client_secret`  
❌ Treating code as token  
❌ Calling token endpoint from frontend  

Any of these = instant rejection in interviews.

---

## COMPARISON WITH OTHER RESPONSE TYPES

| response_type | Returned to Browser | Secure | Use Case |
|--------------|-------------------|--------|---------|
| `id_token` | ID Token | ❌ No | Learning only |
| `token` | Access Token | ❌ No | Deprecated |
| `code` | Authorization Code | ✅ Yes | Production |

---

## INTERVIEW-SAFE ONE-LINER

> “When `response_type=code`, Google returns a short-lived authorization code which is exchanged securely on the backend for tokens, preventing token leakage and protecting the client secret.”

Memorize this.

---

## FINAL VERDICT

✔️ Industry standard  
✔️ Secure  
✔️ Scalable  
✔️ Interview-approved  

If you use anything else for login → you’re doing it wrong.

