import crypto from "node:crypto";
import { createWriteStream } from "node:fs";
import { readFile } from "node:fs/promises";

// time consume create hash for all and then match for every time if check if we need 
const filecontents = await readFile("path")
const hashh = crypto.createHash("sha256").update(filecontents).digest("hex")


// New
const fileContent = await readFile("loan-agreement.md");
const mySecretKey = "my-super-secret-key";

const hmac = crypto
  .createHash("sha256")
  .update(fileContent)
  .update(mySecretKey)
  .digest("base64url");

const writeStream = createWriteStream("loan-agreement-signed.md");

writeStream.write(fileContent);
writeStream.end(hmac);


// const hmac = createHash(originalData + secretData)
// SignedFile = originalData + signature
