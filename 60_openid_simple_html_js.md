# OpenID Connect Testing using Simple HTML & JavaScript (Learning Only)

> ⚠️ **Strict Warning**
> This setup is **ONLY for learning and understanding OpenID Connect**.
> It is **NOT secure**, **NOT production-ready**, and **MUST NOT** be used in real applications.
>  
> In real systems, OpenID/OAuth **ALWAYS uses backend verification**.

---

## WHAT YOU ARE TESTING

You are testing:
- OpenID Connect
- ID Token
- User identity claims (email, name, sub, issuer)


## OVERALL FLOW (HIGH LEVEL)

1. User clicks **Login with Google**
2. Browser redirects to Google
3. User logs in
4. Google redirects back with **ID Token**
5. Browser decodes ID Token
6. User info is displayed

This uses **Implicit Flow** (`response_type=id_token`).

---

## STEP 1: GOOGLE CLOUD SETUP

1. Go to **Google Cloud Console**
2. Create a project
3. Enable **OAuth 2.0**
4. Create **OAuth Client ID**
   - Application Type: **Web**
5. Add Authorized Redirect URI:
   ```
   http://localhost:5500/index.html
   ```
6. Copy your **Client ID**

⚠️ Do NOT generate or use Client Secret here.

---

## STEP 2: PROJECT STRUCTURE

```
openid-test/
├── index.html
└── script.js
```

---

## STEP 3: CREATE index.html

```html
<!DOCTYPE html>
<html>
<head>
  <title>OpenID Connect Test</title>
</head>
<body style="background:#111;color:white">

  <h2>OpenID Connect – Learning Test</h2>

  <a id="login">Login with Google</a>

  <pre id="output"></pre>

  <script src="script.js"></script>
</body>
</html>
```

---

## STEP 4: CREATE script.js

```js
const clientId = "YOUR_CLIENT_ID";
const redirectUri = "http://localhost:5500/index.html"; // it should be same as the Authorized Redirect URI

// Google OpenID authorization URL
const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  "response_type=id_token" +
  "&client_id=" + clientId +
  "&scope=openid email profile" +
  "&redirect_uri=" + redirectUri +
  "&nonce=123456";

document.getElementById("login").href = authUrl;

// Handle redirect response
const hash = new URLSearchParams(location.hash.substring(1));
const idToken = hash.get("id_token");

if (idToken) {
  const payload = JSON.parse(atob(idToken.split(".")[1]));
  document.getElementById("output").textContent =
    JSON.stringify(payload, null, 2);
}
```

---

## STEP 5: TEST THE FLOW

1. Click **Login with Google**
2. Google login page opens
3. Login with your Google account
4. Redirect back to `index.html`
5. ID Token is decoded
6. User identity details appear on screen

---

## SAMPLE OUTPUT

```json
{
  "iss": "https://accounts.google.com",
  "aud": "YOUR_CLIENT_ID",
  "sub": "10987654321",
  "email": "user@gmail.com",
  "email_verified": true,
  "name": "User Name",
  "picture": "https://...",
  "exp": 1710000000
}
```

---

## IMPORTANT NOTES (READ CAREFULLY)

### Why this works
- OpenID returns ID Token directly
- ID Token is a JWT
- JWT payload is Base64 encoded

### Why this is unsafe
- No signature verification
- Token can be tampered
- No audience / issuer validation
- Anyone can fake a token

---
s exactly. Nothing extra.

---
