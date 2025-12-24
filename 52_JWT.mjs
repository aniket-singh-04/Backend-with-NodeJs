// JWT library used to create, sign, decode, and verify tokens
import jwt from "jsonwebtoken";

// JWT internally uses Node.js’s crypto module to create and verify signatures.
// We are importing it manually to show what happens behind the scenes
import { createHmac } from "node:crypto";

/*
-----------------------------------------
1️⃣ TOKEN CREATION (SIGNING)
-----------------------------------------
jwt.sign() creates a JWT token.

Payload  : { name: "Bilal" }
Secret   : "secret"
Algorithm: HS256 (HMAC + SHA-256)
Expiry   : 10 seconds
*/

const token2 = jwt.sign(
  { name: "Bilal" },
  "secret",
  {
    algorithm: "HS256",
    expiresIn: 10, // token valid for 10 seconds
  }
);

console.log(token2);

/*
-----------------------------------------
2️⃣ jwt.decode()
-----------------------------------------
⚠️ IMPORTANT:
jwt.decode() DOES NOT VERIFY THE SIGNATURE.

It just:
- splits the token
- base64-decodes header & payload
- returns payload

This is why decode() is NOT secure.
Never use decode() for authentication.
*/
console.log(
  jwt.decode(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmlsYWwiLCJpYXQiOjE3NDM2NDc4NDksImV4cCI6MTc0MzY0Nzg1OX0.sdf"
  )
);

/*
-----------------------------------------
3️⃣ BASE64URL DECODING (JWT IS NOT ENCRYPTED)
-----------------------------------------
JWT uses base64url encoding, NOT encryption.

Anyone can decode header & payload.
*/
console.log(
  Buffer.from(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmlsYWwiLCJpYXQiOjE3NDM2NDYxMjV9",
    "base64url"
  ).toString()
);

/*
-----------------------------------------
4️⃣ ORIGINAL TOKEN (HEADER.PAYLOAD.SIGNATURE)
-----------------------------------------
Signature = HMAC_SHA256(
  base64url(header) + "." + base64url(payload),
  secret
)
*/
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmlsYWwiLCJpYXQiOjE3NDM2NDYyMDR9.yC98vaKasra-utjWHrXTZDRKxLkDn_0HQJDHDICmUIU";

/*
-----------------------------------------
5️⃣ MANUAL SIGNATURE GENERATION (JWT INTERNALS)
-----------------------------------------
This is EXACTLY what jwt.sign() does internally
for HS256 algorithm.
*/
console.log(
  createHmac("sha256", "secret")
    .update(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmlsYWwiLCJpYXQiOjE3NDM2NDYyMDR9"
    )
    .digest("base64url")
);
