# MongoDB in Node.js -- CRUD, Cursors, Batch Size & Limits (Beginner → Advanced)

------------------------------------------------------------------------

## 1. Introduction

This guide explains how to use **MongoDB with Node.js**, including: -
Connecting to MongoDB\
- CRUD operations\
- Cursors and advanced cursor methods\
- Batch size\
- MongoDB limitations

------------------------------------------------------------------------

## 2. Installation & Setup

### Install Dependencies

``` bash
npm install mongodb
```

### Basic Connection

``` js
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
  await client.connect();
  const db = client.db("company");
  console.log("Connected to MongoDB");
}

main();
```

------------------------------------------------------------------------

## 3. CRUD Operations in Node.js

### ⭐ Create (Insert)

#### Insert One

``` js
await db.collection("users").insertOne({
  name: "Aniket",
  role: "Backend",
  salary: 2500000
});
```

#### Insert Many

``` js
await db.collection("users").insertMany([
  { name: "Riya", role: "Frontend" },
  { name: "Aman", role: "DevOps" }
]);
```

------------------------------------------------------------------------

## ⭐ Read (Find)

### Find One

``` js
const user = await db.collection("users").findOne({ name: "Aniket" });
```

### Find Many (Cursor)

``` js
const cursor = db.collection("users").find({ role: "Backend" });
const results = await cursor.toArray();
```

------------------------------------------------------------------------

## ⭐ Update

### Update One

``` js
await db.collection("users").updateOne(
  { name: "Aniket" },
  { $set: { salary: 3000000 } }
);
```

### Update Many

``` js
await db.collection("users").updateMany(
  { role: "Backend" },
  { $inc: { salary: 100000 } }
);
```

------------------------------------------------------------------------

## ⭐ Delete

### Delete One

``` js
await db.collection("users").deleteOne({ name: "Aman" });
```

### Delete Many

``` js
await db.collection("users").deleteMany({ role: "Frontend" });
```

------------------------------------------------------------------------

## 4. Understanding Cursors

A **cursor** is a pointer to the result set returned by queries.

### Fetching All Results

``` js
const cursor = db.collection("users").find({});
const users = await cursor.toArray();
```

### Iterating Through Cursor

``` js
const cursor = db.collection("users").find({});
for await (const doc of cursor) {
  console.log(doc);
}
```

------------------------------------------------------------------------

## 5. Cursor Methods (Advanced)

  Method           Use
  ---------------- ---------------------------------
  `toArray()`      Load all results into memory
  `limit(n)`       Limit number of documents
  `skip(n)`        Skip initial results
  `sort()`         Sort results
  `project()`      Select specific fields
  `count()`        Count matching docs
  `batchSize(n)`   Control data returned per batch

### Example:

``` js
const cursor = db.collection("users")
  .find({})
  .project({ name: 1, salary: 1 })
  .sort({ salary: -1 })
  .skip(2)
  .limit(5);
```

------------------------------------------------------------------------

## 6. Batch Size (Important)

Batch size controls **how many documents MongoDB sends per round trip**.

### Using `batchSize()`

``` js
const cursor = db.collection("users")
  .find({})
  .batchSize(20);
```

### Why batch size matters:

-   Large batch → fewer network calls but more memory usage\
-   Small batch → low memory but more round trips

Default batch size: **101 documents**

------------------------------------------------------------------------

## 7. MongoDB Limits (Beginner → Advanced)

### Document Size Limit

-   Max document size: **16 MB**

### Maximum BSON Object Size

-   16 MB

### Maximum Database Size

-   Unlimited (depends on disk)

### Maximum Collection Size

-   Unlimited

### Index Limits

  Limit            Value
  ---------------- --------------------
  Max index keys   32 fields
  Max index size   1024 bytes per key

### Query Limits

-   Sort must fit inside **32 MB RAM**\
-   Aggregation pipeline memory limit: **100 MB** (unless using
    allowDiskUse)

### Connection Limits

-   Depends on OS and hardware\
-   MongoDB supports thousands of concurrent connections

### Batch Limits

-   InsertMany supports **100,000 documents** per batch (recommended)

------------------------------------------------------------------------

