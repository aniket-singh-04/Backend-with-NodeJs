
# MongoDB Fundamentals & CRUD — Complete Guide (Mongo Shell, Node.js Native Driver, and Mongoose)

**Scope:** This single-file guide teaches MongoDB fundamentals and *every* CRUD operation (Create, Read, Update, Delete) from beginner → intermediate → advanced.  
It includes step-by-step examples for the **mongo shell (mongosh)**, **Node.js (native MongoDB driver)**, and **Mongoose**. We use a single sample dataset (`users` collection) across all examples.

---

## Table of contents

1. Introduction & Prerequisites  
2. Sample Data Model (`users`)  
3. MongoDB Shell (mongosh) — Basics & CRUD  
   - Connecting
   - Create: `insertOne`, `insertMany`
   - Read: `find`, `findOne`, projection, query operators
   - Update: `updateOne`, `updateMany`, `replaceOne`, `findOneAndUpdate`, `upsert`
   - Delete: `deleteOne`, `deleteMany`, `findOneAndDelete`
   - Bulk operations & Bulk API
   - Aggregation basics
   - Indexing & explain()
   - Transactions (replica set)
4. Node.js — Native MongoDB Driver (async/await)
   - Install & connect
   - CRUD examples with error handling
   - BulkOps & aggregation
   - Transactions
   - Best practices
5. Mongoose — Schema, Validation & CRUD
   - Install & connect
   - Schema design, validators, timestamps
   - Create / Read / Update / Delete with Mongoose
   - Population, Virtuals, Middleware
   - Transactions with sessions
   - Advanced patterns (lean, projection, concurrency)
6. Performance tips & production considerations
7. Cheatsheet (quick commands)
8. Appendix — Troubleshooting

---

## 1. Introduction & Prerequisites

**You need:**
- MongoDB server (for transactions use a replica set; `mongod --replSet rs0` for local testing).
- `mongosh` shell (modern shell) or MongoDB Compass for GUI.
- Node.js v14+ (recommended v16+).
- NPM packages: `mongodb` (native driver) and `mongoose` for ODM.

Install:
```bash
# Native driver and mongoose
npm install mongodb mongoose
```
## 2. Sample Data Model (users)

We'll use a users collection. Each document:
```js
{
  "_id": ObjectId("..."),
  "name": "Alice",
  "email": "alice@example.com",
  "age": 29,
  "roles": ["user","admin"],
  "address": { "street": "MG Road", "city": "Mumbai", "zip": "400001" },
  "createdAt": ISODate("2025-01-01T00:00:00Z"),
  "updatedAt": ISODate("2025-01-02T00:00:00Z")
}
```

This covers scalar fields, arrays, and nested documents; perfect for showing CRUD, queries, projection, indexing, and population.

## 3. MongoDB Shell (mongosh) — Basics & CRUD
3.1 Connecting

Start mongod and then:
```bash
mongosh "mongodb://localhost:27017"
# switch to db:
use myappdb
```
## 3.2 Create

Insert one document
```js
db.users.insertOne({
  name: "Alice",
  email: "alice@example.com",
  age: 29,
  roles: ["user", "admin"],
  address: { street: "MG Road", city: "Mumbai", zip: "400001" },
  createdAt: new Date(),
  updatedAt: new Date()
});

```
Insert many
```js
db.users.insertMany([
  { name: "Bob", email: "bob@example.com", age: 34, roles: ["user"], createdAt: new Date(), updatedAt: new Date() },
  { name: "Carol", email: "carol@example.com", age: 22, roles: ["user"], createdAt: new Date(), updatedAt: new Date() }
]);
```
## 3.3 Read

Find all
```js
db.users.find().pretty();
```

Find with criteria
```js
db.users.find({ age: { $gte: 25 } }).pretty();
```

Find one
```js
db.users.findOne({ email: "alice@example.com" });
```

Projection (select fields)
```js
db.users.find({ age: { $gte: 18 } }, { name: 1, email: 1, _id: 0 }).pretty();
// returns only name and email
```

Query operators

Comparison: $eq, $ne, $gt, $gte, $lt, $lte

Logical: $and, $or, $not, $nor

Array: $in, $nin, $all, $size, $elemMatch

Element: $exists, $type

Examples:
```js
db.users.find({ roles: "admin" }); // roles array that contains "admin"
db.users.find({ roles: { $in: ["admin","superadmin"] } });
db.users.find({ "address.city": "Mumbai" });
db.users.find({ email: { $exists: true } });
```

Count
```js
db.users.countDocuments({ age: { $gte: 18 } });


Sort, limit, skip

db.users.find().sort({ age: -1 }).limit(5).skip(10);
```
## 3.4 Update

updateOne
```js
db.users.updateOne(
  { email: "alice@example.com" },
  { $set: { age: 30, "address.city": "Pune" }, $currentDate: { updatedAt: true } }
);
```

updateMany
```js
db.users.updateMany(
  { roles: "user" },
  { $set: { "flagged": true }, $currentDate: { updatedAt: true } }
);
```

replaceOne
```js
db.users.replaceOne(
  { email: "bob@example.com" },
  {
    name: "Robert",
    email: "bob@example.com",
    age: 35,
    roles: ["user"],
    address: { street: "New St", city: "Delhi" },
    createdAt: new Date()
  }
);
```

findOneAndUpdate (returns the old or new document)
```js
db.users.findOneAndUpdate(
  { email: "alice@example.com" },
  { $inc: { age: 1 } },
  { returnNewDocument: true } // in mongosh: { returnDocument: "after" } older shells: { returnNewDocument: true }
);
```

>Note: Options vary by shell/driver version: returnDocument: "after" (returns modified doc) or returnNewDocument: true.

Upsert (insert if not exists)
```js
db.users.updateOne(
  { email: "dave@example.com" },
  { $set: { name: "Dave", age: 40 }, $currentDate: { createdAt: true, updatedAt: true } },
  { upsert: true }
);
```
## 3.5 Delete

deleteOne
```js
db.users.deleteOne({ email: "carol@example.com" });

```
deleteMany
```js
db.users.deleteMany({ flagged: true });

```
findOneAndDelete
```js
db.users.findOneAndDelete({ email: "bob@example.com" });
```
## 3.6 Bulk Operations

For many operations, use bulkWrite to batch commands:
```js
db.users.bulkWrite([
  { insertOne: { document: { name: "Eve", email: "eve@example.com", age: 28, createdAt: new Date(), updatedAt: new Date() } } },
  { updateOne: { filter: { email: "alice@example.com" }, update: { $set: { age: 31 } } } },
  { deleteOne: { filter: { email: "old@example.com" } } }
]);
```

Bulk operations are efficient and atomic per document per operation.

## 3.7 Aggregation Basics

Aggregation pipelines allow data processing in stages.

Simple pipeline: count users by city
```js
db.users.aggregate([
  { $group: { _id: "$address.city", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);
```

Unwind array and group
```js
db.users.aggregate([
  { $unwind: "$roles" },
  { $group: { _id: "$roles", count: { $sum: 1 } } }
]);
```

Project fields
```js
db.users.aggregate([
  { $project: { name: 1, email: 1, isAdult: { $gte: ["$age", 18] } } }
]);
```

Lookup (join) example
Assume orders collection with userId referencing _id:
```js
db.users.aggregate([
  { $match: { email: "alice@example.com" } },
  { $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "userId",
      as: "orders"
  } }
]);
```
## 3.8 Indexing & explain()

Create index
```js
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ "address.city": 1 });
db.users.createIndex({ age: 1, "address.city": 1 });
```

View indexes
```js
db.users.getIndexes();

```
Explain plan
```js
db.users.find({ email: "alice@example.com" }).explain("executionStats");
```

Look for executionStats.totalKeysExamined and executionStats.totalDocsExamined. Index usage reduces docs examined.

## 3.9 Transactions (Replica Set required)

Start replica set locally (for dev):

# start mongod with replSet option, then in mongosh:
```js
rs.initiate();
```

Transaction example (shell):
```js
const session = db.getMongo().startSession();
session.startTransaction();
try {
  const usersColl = session.getDatabase("myappdb").users;
  usersColl.insertOne({ name: "TxnUser", email: "txn@example.com", createdAt: new Date() }, { session });
  usersColl.updateOne({ email: "alice@example.com" }, { $inc: { age: 1 } }, { session });
  session.commitTransaction();
} catch (e) {
  session.abortTransaction();
  throw e;
} finally {
  session.endSession();
}
```

Transactions provide ACID semantics across multiple documents and collections (within a replica set or sharded cluster).

## 4. Node.js — Native MongoDB Driver (async/await)
### 4.1 Install & Connect
```js
npm install mongodb


connect.js (example)
```
// ES module style
```js
import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("myappdb");
    // use db
  } catch (err) {
    console.error("Connection error", err);
  }
}
main();
```
## 4.2 Create (insertOne/insertMany)
```js
async function createUser(db, user) {
  try {
    const result = await db.collection("users").insertOne({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return result.insertedId;
  } catch (err) {
    // handle duplicate key error (11000) etc.
    throw err;
  }
}
```

Example usage:
```js
const db = client.db("myappdb");
const id = await createUser(db, { name: "Alice", email: "alice@example.com", age: 29 });
```

insertMany
```js
await db.collection("users").insertMany([...]);
```
## 4.3 Read (find / findOne)
```js
async function findUsers(db, filter = {}, options = {}) {
  const cursor = db.collection("users").find(filter, options);
  const results = await cursor.toArray();
  return results;
}
```
// findOne
```js
const user = await db.collection("users").findOne({ email: "alice@example.com" });
```

Projection & options
```js
const results = await db.collection("users").find({ age: { $gte: 18 } }, { projection: { name: 1, email: 1 } }).toArray();
```

Pagination
```js
const page = 2, limit = 10;
const docs = await db.collection("users").find().skip((page-1)*limit).limit(limit).toArray();
```
### 4.4 Update
```js
async function updateUserEmail(db, userId, newEmail) {
  const result = await db.collection("users").updateOne(
    { _id: new ObjectId(userId) },
    { $set: { email: newEmail, updatedAt: new Date() } }
  );
  return result.matchedCount;
}
```

findOneAndUpdate
```js
const updated = await db.collection("users").findOneAndUpdate(
  { email: "alice@example.com" },
  { $inc: { age: 1 }, $currentDate: { updatedAt: true } },
  { returnDocument: "after" } // return the updated doc
);
```

upsert
```js
await db.collection("users").updateOne(
  { email: "new@example.com" },
  { $set: { name: "New" } },
  { upsert: true }
);
```
### 4.5 Delete
```js
await db.collection("users").deleteOne({ _id: new ObjectId(userId) });
await db.collection("users").deleteMany({ role: "guest" });
```
### 4.6 Bulk Operations
```js
const operations = [
  { insertOne: { document: { name: "X", email: "x@ex.com" } } },
  { updateOne: { filter: { email: "alice@example.com" }, update: { $set: { age: 50 } } } },
  { deleteOne: { filter: { email: "old@ex.com" } } }
];
const res = await db.collection("users").bulkWrite(operations);
```
### 4.7 Aggregation with Node driver
```js
const pipeline = [
  { $match: { age: { $gte: 18 } } },
  { $group: { _id: "$address.city", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
];
const aggCursor = db.collection("users").aggregate(pipeline);
const agg = await aggCursor.toArray();
```
### 4.8 Transactions (native driver)
```js
const session = client.startSession();
try {
  session.startTransaction();
  const usersColl = client.db("myappdb").collection("users");
  await usersColl.insertOne({ name: "TxnNode", email: "txnnode@example.com" }, { session });
  await usersColl.updateOne({ email: "alice@example.com" }, { $inc: { age: 1 } }, { session });
  await session.commitTransaction();
} catch (e) {
  await session.abortTransaction();
  throw e;
} finally {
  await session.endSession();
}
```
### 4.9 Error handling & best practices

Catch duplicate key error: error code 11000

Validate data before inserting (use JOI or custom validators)

Use indexes for fields often used in queries

Close client on app shutdown: await client.close()

Use connection pooling (default options) and reuse a single MongoClient instance across app

# 5. Mongoose — Schema, Validation & CRUD
5.1 Install & connect
```bash
npm install mongoose
```
```js
import mongoose from "mongoose";

await mongoose.connect("mongodb://localhost:27017/myappdb", { dbName: "myappdb" });
console.log("Mongoose connected");
```
### 5.2 Define Schema & Model
```js
const { Schema, model, Types } = mongoose;

const addressSchema = new Schema({
  street: String,
  city: String,
  zip: String
}, { _id: false });

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  age: { type: Number, min: 0 },
  roles: { type: [String], default: ["user"] },
  address: addressSchema
}, { timestamps: true, versionKey: "version" }); // timestamps: createdAt, updatedAt
```

Model
```js
const User = model("User", userSchema);
```
### 5.3 Create
// create single
```js
const alice = await User.create({ name: "Alice", email: "alice@example.com", age: 29 });

// create many
const docs = await User.insertMany([
  { name: "Bob", email: "bob@example.com" },
  { name: "Carol", email: "carol@example.com" }
]);

```
Mongoose validates according to schema. On validation error, Mongoose throws ValidationError.

### 5.4 Read
// find all
```js
const users = await User.find().lean(); // lean() returns plain JS objects (faster)

// find with projection
const minimal = await User.find({ age: { $gte: 18 } }, "name email").exec();

// findOne / findById
const u = await User.findOne({ email: "alice@example.com" }).exec();
const byId = await User.findById("6123...").exec();

```
Pagination
```js
const page = 1, limit = 10;
const docs = await User.find().skip((page-1)*limit).limit(limit).sort({ createdAt: -1 }).lean();
```
### 5.5 Update

updateOne / updateMany
```js
await User.updateOne({ email: "alice@example.com" }, { $set: { age: 30 } });


findOneAndUpdate (preferred to get the updated doc)

const updated = await User.findOneAndUpdate(
  { email: "alice@example.com" },
  { $inc: { age: 1 } },
  { new: true, runValidators: true } // new:true returns updated doc
);


save() after modify

const u = await User.findById(id);
u.age = 35;
await u.save(); // runs validation and middleware

```
Optimistic concurrency (versioning)
Mongoose supports optimistic concurrency using versionKey (default __v). We set versionKey: 'version' earlier or use optimisticConcurrency: true in schema options.

### 5.6 Delete
```js
await User.deleteOne({ email: "carol@example.com" });
await User.deleteMany({ age: { $lt: 18 } });
const removed = await User.findOneAndDelete({ email: "bob@example.com" });
```
### 5.7 Population (referenced documents)

Example: orders reference userId
```js
const orderSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User" },
  total: Number
}, { timestamps: true });

const Order = model("Order", orderSchema);

// create
await Order.create({ userId: alice._id, total: 100 });

// query with population
const orders = await Order.find().populate("userId", "name email").exec();
```
### 5.8 Virtuals, Methods, and Statics

Virtual
```js
userSchema.virtual("isAdult").get(function() { return this.age >= 18; });

```
Instance method
```js
userSchema.methods.getPublicProfile = function() {
  return { id: this._id, name: this.name, email: this.email };
};
```

Static
```js
userSchema.statics.findByEmail = function(email) { return this.findOne({ email }); };
```
### 5.9 Middleware (hooks)
```js
userSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

userSchema.post("save", function(doc) {
  console.log("User saved", doc._id);
});
```
### 5.10 Transactions with Mongoose
```js
const session = await mongoose.startSession();
session.startTransaction();
try {
  const opts = { session };
  const u = await User.create([{ name: "TxnM", email: "txnm@example.com" }], opts);
  await User.updateOne({ email: "alice@example.com" }, { $inc: { age: 1 } }, opts);
  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
  throw err;
} finally {
  session.endSession();
}
```
### 5.11 Advanced queries & aggregation
```js
const agg = await User.aggregate([
  { $match: { age: { $gte: 18 } } },
  { $group: { _id: "$address.city", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]).exec();
```

Using lean(): For read-heavy endpoints, use .lean() to avoid Mongoose document overhead.

Projection & select
```js
await User.find({}, "-__v -version").exec(); // exclude fields
```

Indexes
Define indexes on schema:
```js
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ age: 1, "address.city": 1 });
```

Then await User.init() builds indexes.

## 6. Performance Tips & Production Considerations

Indexes: create appropriate indexes, but don't over-index. Monitor slowOp logs and use explain().

Use projection: return only needed fields.

Use lean() for read endpoints where you don't need document methods.

Connection pooling: reuse a single MongoClient / Mongoose connection.

Sharding: for very large datasets, design shard key carefully.

BulkOps: use bulkWrite for batched inserts/updates.

Limit result size: limit(), skip() (but avoid large skip; use range queries or bookmark approach).

Aggregation pipeline: do aggregation on DB side (faster than app-side grouping).

Transactions: only use when needed; they add overhead.

Validation: validate at application level and Mongoose schema level.

Backups: use mongodump/mongorestore or cloud provider snapshots.

Monitoring: use MongoDB Cloud Manager/Atlas or mongotop, mongostat.

## 7. Cheatsheet (Quick Commands)
Shell
```bash
use myappdb
db.users.find().pretty()
db.users.insertOne({...})
db.users.updateOne({email}, {$set:{age:30}})
db.users.deleteOne({email})
db.users.createIndex({email:1},{unique:true})
db.users.aggregate([{ $group: {_id:"$address.city", count:{$sum:1}} }])
```
Node (native)
```js
await client.connect();
const db = client.db('myappdb');
await db.collection('users').insertOne(doc);
await db.collection('users').findOne({ email });
await db.collection('users').updateOne(filter, update);
await db.collection('users').deleteOne(filter);
```
Mongoose
```js
await mongoose.connect(uri);
const u = await User.create({ name, email });
const users = await User.find().lean();
await User.findByIdAndUpdate(id, { $set: {...} }, { new: true, runValidators: true });
await User.deleteOne({ _id: id });
```


# MongoDB Query and Projection Operators

This document covers the most commonly used **Query and Projection Operators** in MongoDB with **Node.js examples**.

---























# 📌 1. Query Operators

Query operators are used to filter documents based on specific conditions.

### 🔹 `$eq` (Equal)

Finds documents where a field is equal to a specified value.

```js
const result = await db
  .collection("users")
  .find({ age: { $eq: 25 } })
  .toArray();
console.log(result);
```

### 🔹 `$ne` (Not Equal)

Finds documents where a field is **not** equal to a specified value.

```js
const result = await db
  .collection("users")
  .find({ status: { $ne: "inactive" } })
  .toArray();
console.log(result);
```

### 🔹 `$gt`, `$gte`, `$lt`, `$lte` (Greater Than, Less Than)

```js
const result = await db
  .collection("users")
  .find({ age: { $gt: 18 } })
  .toArray();
console.log(result);
```

### 🔹 `$in`, `$nin` (Match any of the specified values / Not in)

```js
const result = await db
  .collection("users")
  .find({ country: { $in: ["India", "USA"] } })
  .toArray();
console.log(result);
```

### 🔹 `$exists` (Check if a field exists)

```js
const result = await db
  .collection("users")
  .find({ phone: { $exists: true } })
  .toArray();
console.log(result);
```

### 🔹 `$regex` (Pattern Matching)

```js
const result = await db
  .collection("users")
  .find({ name: { $regex: /^A/i } })
  .toArray();
console.log(result);
```

### 🔹 `$or`, `$and`, `$not`, `$nor` (Logical Operators)

```js
const result = await db
  .collection("users")
  .find({
    $or: [{ age: { $gt: 30 } }, { status: "active" }],
  })
  .toArray();
console.log(result);
```

---

## 📌 2. Projection Operators

Projection operators control which fields are returned in the result.

### 🔹 Inclusion (`1`) and Exclusion (`0`)

```js
const result = await db
  .collection("users")
  .find({}, { projection: { name: 1, age: 1, _id: 0 } })
  .toArray();
console.log(result);
```

### 🔹 `$elemMatch` (Match elements in an array)

```js
const result = await db
  .collection("users")
  .find({
    hobbies: { $elemMatch: { type: "sports" } },
  })
  .toArray();
console.log(result);
```

### 🔹 `$slice` (Limit array fields in results)

```js
const result = await db
  .collection("users")
  .find({}, { projection: { posts: { $slice: 2 } } })
  .toArray();
console.log(result);
```

---

## 📌 3. Array Query Operators

### 🔹 `$all` (Match all values in an array)

```js
const result = await db
  .collection("users")
  .find({ skills: { $all: ["MongoDB", "Node.js"] } })
  .toArray();
console.log(result);
```

### 🔹 `$size` (Find arrays with a specific number of elements)

```js
const result = await db
  .collection("users")
  .find({ skills: { $size: 3 } })
  .toArray();
console.log(result);
```

---

## 📌 4. Evaluation Operators

### 🔹 `$expr` (Compare two fields)

```js
const result = await db
  .collection("users")
  .find({
    $expr: { $gt: ["$credits", "$debits"] },
  })
  .toArray();
console.log(result);
```

### 🔹 `$mod` (Modulo operation)

```js
const result = await db
  .collection("users")
  .find({ age: { $mod: [2, 0] } })
  .toArray();
console.log(result);
```
















# MongoDB Update Operators

This document categorizes and explains the most commonly used **Update Operators** in MongoDB with **Node.js examples**.

---

## 📌 1. Field Update Operators

### 🔹 `$set` (Update or Add a Field)
```js
const result = await db.collection("users").updateOne(
  { name: "John" },
  { $set: { age: 30 } }
);
console.log(result);
```

### 🔹 `$unset` (Remove a Field)
```js
const result = await db.collection("users").updateOne(
  { name: "John" },
  { $unset: { age: "" } }
);
console.log(result);
```

### 🔹 `$rename` (Rename a Field)
```js
const result = await db.collection("users").updateOne(
  { name: "John" },
  { $rename: { "oldField": "newField" } }
);
console.log(result);
```

---

## 📌 2. Arithmetic Operators

### 🔹 `$inc` (Increment a Numeric Field)
```js
const result = await db.collection("users").updateOne(
  { name: "John" },
  { $inc: { score: 5 } }
);
console.log(result);
```

### 🔹 `$mul` (Multiply a Numeric Field)
```js
const result = await db.collection("users").updateOne(
  { name: "John" },
  { $mul: { salary: 1.1 } }
);
console.log(result);
```

---

## 📌 3. Array Update Operators

### 🔹 `$push` (Add an Element to an Array)
```js
const result = await db.collection("users").updateOne(
  { name: "John" },
  { $push: { skills: "MongoDB" } }
);
console.log(result);
```

### 🔹 `$pop` (Remove First or Last Element from an Array)
```js
const result = await db.collection("users").updateOne(
  { name: "John" },
  { $pop: { skills: -1 } } // -1 removes first, 1 removes last
);
console.log(result);
```

### 🔹 `$pull` (Remove Specific Elements from an Array)
```js
const result = await db.collection("users").updateOne(
  { name: "John" },
  { $pull: { skills: "Java" } }
);
console.log(result);
```

### 🔹 `$addToSet` (Add an Element Only If It Does Not Exist)
```js
const result = await db.collection("users").updateOne(
  { name: "John" },
  { $addToSet: { skills: "JavaScript" } }
);
console.log(result);
```

---

## 📌 4. Upsert Operations

### 🔹 `upsert: true` (Insert if Not Found)
```js
const result = await db.collection("users").updateOne(
  { name: "Jane" },
  { $set: { age: 25 } },
  { upsert: true }
);
console.log(result);
```

---

## 📌 5. Date Operators

### 🔹 `$currentDate` (Set Field to Current Date)
```js
const result = await db.collection("users").updateOne(
  { name: "John" },
  { $currentDate: { lastLogin: true } }
);
console.log(result);
```

---

## 📌 6. Bitwise Operators

### 🔹 `$bit` (Bitwise Operations on Integer Fields)
```js
const result = await db.collection("users").updateOne(
  { name: "John" },
  { $bit: { permissions: { or: 5 } } }
);
console.log(result);
```

