# Creating Signatures in Node.js 


## 1. What is a Signature? 

A signature proves: - Data integrity - Sender authenticity

Integrity means, It is the quality of being honest and having a consistent and uncompromising adherence

Signature = Integrity + Authenticity

------------------------------------------------------------------------

## 2. Signature vs Hash vs Encryption

  Concept      Purpose
  ------------ --------------------------
  Hash         Integrity
  Signature    Integrity + Authenticity
  Encryption   Confidentiality

------------------------------------------------------------------------

## 3. Real-World Use Cases

-   Webhooks
-   Payment gateways
-   JWT signing
-   Secure APIs

------------------------------------------------------------------------

## 4. Types of Signatures

### HMAC (Symmetric)

-   Shared secret
-   Fast

### RSA/ECDSA (Asymmetric)

-   Public/private keys
-   More secure for public systems

------------------------------------------------------------------------

# PART A --- HMAC SIGNATURE

## 5. Create HMAC Signature

``` js
const crypto = require("crypto");

const SECRET = "super_secret_key";
const payload = JSON.stringify({ orderId: 1, amount: 500 });

const signature = crypto
  .createHmac("sha256", SECRET)
  .update(payload)
  .digest("hex");
```

------------------------------------------------------------------------

## 6. Verify HMAC Signature

``` js
function verifySignature(payload, receivedSignature) {
  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(receivedSignature)
  );
}
```

------------------------------------------------------------------------

# PART B --- RSA SIGNATURE

## 7. Generate Keys

``` bash
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem
```

------------------------------------------------------------------------

## 8. Sign Data

``` js
const fs = require("fs");
const crypto = require("crypto");

const privateKey = fs.readFileSync("private.pem");
const data = "important message";

const signature = crypto.sign("sha256", Buffer.from(data), privateKey);
```

------------------------------------------------------------------------

## 9. Verify Signature

``` js
const publicKey = fs.readFileSync("public.pem");

const isValid = crypto.verify(
  "sha256",
  Buffer.from(data),
  publicKey,
  signature
);
```
