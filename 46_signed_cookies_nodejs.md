# How to Sign Cookies in Node.js  
## Using Native Methods & `cookie-parser` (Deep, Clear, Interview-Ready)

> ⚠️ Blunt truth  
> If you don’t understand **signed cookies**, you will:
> - trust tampered data
> - introduce auth bugs
> - fail backend security interviews  
>
> This guide explains **how signing works**, **why it works**, and **how Node.js actually does it**.

---

## WHAT IS A SIGNED COOKIE? (ONE LINE)

A signed cookie is:
> **A cookie whose value is cryptographically signed by the server so the client cannot modify it.**

Important:
- Data is **NOT encrypted**
- Data is **ONLY protected from tampering**

---

## WHY SIGN COOKIES?

Normal cookies:
```
userId=123
```

User can change it to:
```
userId=999
```

Signed cookies prevent this.

---

## CORE IDEA (VERY IMPORTANT)

```
cookie value + secret → signature
```

Server checks:
- If signature matches → cookie is valid
- If signature mismatch → cookie is rejected

---

## HOW COOKIE SIGNING WORKS (CONCEPT)

### Step 1: Server creates value
```
userId=123
```

### Step 2: Server signs it
```
signature = HMAC(userId=123, secret)
```

### Step 3: Cookie stored as
```
userId=123.signature
```

---

## WHAT CLIENT SEES

Client sees full value:
```
userId=123.s0m3H4sh
```

Client:
- can read it
- can copy it
- ❌ cannot modify it safely

---

## WHAT SERVER DOES ON REQUEST

1. Reads cookie
2. Separates value & signature
3. Recalculates signature
4. Compares signatures

If mismatch → cookie invalid.

---

## METHOD 1: SIGNING COOKIES USING `cookie-parser`

This is the **most common** method in Express apps.

---

### STEP 1: Install

```bash
npm install cookie-parser
```

---

### STEP 2: Configure Middleware

```js
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser("super_secret_key"));
```

`"super_secret_key"` is used to sign cookies.

---

### STEP 3: Set Signed Cookie

```js
app.get("/login", (req, res) => {
  res.cookie("userId", "123", {
    signed: true,
    httpOnly: true
  });

  res.send("Signed cookie set");
});
```

---

### STEP 4: Read Signed Cookie

```js
app.get("/profile", (req, res) => {
  console.log(req.signedCookies.userId);
  res.send("Profile");
});
```

If cookie is tampered:
```
req.signedCookies.userId === undefined
```

---

## IMPORTANT: WHAT `cookie-parser` DOES INTERNALLY

- Appends signature to cookie value
- Verifies signature on every request
- Removes invalid signed cookies automatically

You do NOT need to manually verify.

---

## METHOD 2: MANUAL COOKIE SIGNING (LOW LEVEL)

Useful for **deep understanding** and interviews.

---

### STEP 1: Create Signature Function

```js
const crypto = require("crypto");

function sign(value, secret) {
  return crypto
    .createHmac("sha256", secret)
    .update(value)
    .digest("base64");
}
```

---

### STEP 2: Set Cookie Manually

```js
const value = "userId=123";
const signature = sign(value, process.env.SECRET);

res.setHeader(
  "Set-Cookie",
  `session=${value}.${signature}; HttpOnly`
);
```

---

### STEP 3: Verify Cookie

```js
function verify(signedValue, secret) {
  const [value, signature] = signedValue.split(".");
  return sign(value, secret) === signature ? value : null;
}
```

---

## cookie-parser VS MANUAL SIGNING

| Feature | cookie-parser | Manual |
|------|--------------|--------|
| Ease | Easy | Complex |
| Security | Safe | Safe if correct |
| Control | Medium | Full |
| Interview value | Medium | High |

---

## SIGNED COOKIES VS JWT COOKIES

| Feature | Signed Cookie | JWT |
|------|--------------|-----|
| Data size | Small | Larger |
| Server state | Often needed | Stateless |
| Tamper proof | Yes | Yes |
| Contains claims | ❌ | ✅ |
| Expiry inside | ❌ | ✅ |

---

## WHEN TO USE SIGNED COOKIES

Use signed cookies when:
- Storing small identifiers
- Preventing tampering
- Using server-side sessions

Do NOT use them for:
- Sensitive data
- Authorization logic
- User roles

---

## COMMON MISTAKES (VERY IMPORTANT)

❌ Thinking signed = encrypted  
❌ Storing secrets in cookie  
❌ Trusting unsigned cookies  
❌ Using signed cookies for authorization  

---

## INTERVIEW-SAFE ONE-LINER

> “Signed cookies protect data integrity by attaching a server-generated HMAC signature, allowing the server to detect client-side tampering without encrypting the cookie.”

Memorize this.

---

## FINAL VERDICT

Signed cookies:
- Protect integrity
- Do NOT hide data
- Are easy with `cookie-parser`
- Are foundational to session auth

Master this → backend auth becomes clear.

---

END.
