# Hashing in Node.js

## 1. What is Hashing? 

Hashing converts data (like a password) into a fixed-length string. -
One-way function (cannot be reversed) - Same input → same output (with
same salt) - Used for **password storage**, not encryption

**Wrong:** Save password directly\
**Correct:** Save hash of password

------------------------------------------------------------------------

## 2. Hashing vs Encryption (Beginner)

  Hashing              Encryption
  -------------------- ------------------------
  One-way              Two-way
  Cannot decrypt       Can decrypt
  Used for passwords   Used for data transfer

If you encrypt passwords, you failed basic security.

------------------------------------------------------------------------

## 3. Why Plain Hashing is NOT Enough 

Attackers use: - Rainbow tables - Brute force - Dictionary attacks

Solution: - **Salt** - **Slow hashing algorithms**

------------------------------------------------------------------------

## 4. Recommended Hashing Algorithms 

❌ MD5 --- Broken\
❌ SHA1 --- Broken\
❌ SHA256 alone --- Too fast

✅ bcrypt\
✅ argon2 (best)\
✅ scrypt

We'll use **bcrypt** first.

------------------------------------------------------------------------

## 5. Install Dependencies

``` bash
npm init -y
npm install bcrypt
```

------------------------------------------------------------------------

## 6. Hashing Password with bcrypt 

### Step 1: Import bcrypt

``` js
const bcrypt = require("bcrypt");
```

### Step 2: Define Salt Rounds

``` js
const SALT_ROUNDS = 10;
```

More rounds = more security = slower.

------------------------------------------------------------------------

### Step 3: Hash Password

``` js
async function hashPassword(password) {
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  return hashed;
}

// Example
hashPassword("mySecret123").then(console.log);
```

What happens internally: - Salt is generated - Password + salt is
hashed - Result stored in DB

------------------------------------------------------------------------

## 7. Store Hash in Database 

**Never store password.**

``` json
{
  "email": "user@gmail.com",
  "password": "$2b$10$ZkqM..." // this is hash password
}
```

------------------------------------------------------------------------

## 8. Verifying Password (Login Flow)

You do NOT hash again and compare manually.

### Correct Way:

``` js
async function verifyPassword(inputPassword, storedHash) {
  return await bcrypt.compare(inputPassword, storedHash);
}
```

bcrypt extracts salt automatically.

------------------------------------------------------------------------

## 9. Full Register + Login Example

``` js
// Register
const hashed = await bcrypt.hash(req.body.password, 10);
saveUser({ email, password: hashed });

// Login
const isMatch = await bcrypt.compare(
  req.body.password,
  user.password
);

if (!isMatch) throw new Error("Invalid credentials");
```

------------------------------------------------------------------------

## 10. Using Node.js crypto (NOT Recommended for Passwords)

``` js
const crypto = require("crypto");

const hash = crypto
  .createHash("sha256")
  .update("password")
  .digest("hex");

// OR 

const hash2 = crypto.createHash("sha256").update("hello World").digest("hex");
// OR
const hash2 = crypto.createHash('sha256').update("hello ").update("World").digest("hex") // both are equal
console.log(hash2); // db4067cec62c58bf8b2f8982071e77c082da9e00924bf3631f3b024fa54e7d7e // it give 32 byte hash




// Node.js crypto hashing is not recommended for passwords because it is too fast and vulnerable to brute-force and GPU attacks. Passwords require slow, salted, memory-hard algorithms like bcrypt or argon2
// Reason : Slow hashing prevents attacks by making each password guess computationally expensive, drastically reducing the number of guesses an attacker can perform, even with GPUs
```

Too fast. Vulnerable. Don't use for passwords.

------------------------------------------------------------------------

## 11. Pepper (Advanced Security)

Pepper = secret key stored in env variable.

``` js
const passwordWithPepper = password + process.env.PEPPER;
```

Used along with bcrypt.

------------------------------------------------------------------------

## 12. Argon2 (Advanced / Industry Standard)

``` bash
npm install argon2
```

``` js
const argon2 = require("argon2");

const hash = await argon2.hash(password);
const isValid = await argon2.verify(hash, password);
```

Used by security-focused companies.

------------------------------------------------------------------------



