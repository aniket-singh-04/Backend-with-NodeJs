# MongoDB Complete Guide  
## Running Commands • Operators • Schema Concepts

---

# 📘 1. Running Commands in MongoDB

MongoDB allows you to run administrative and operational commands directly using:

- **Mongo Shell (mongosh)**
- **Driver (Node.js, Python, etc.)**
- **Atlas UI**
- **Compass**

---

## ✔️ 1.1 Running Commands in `mongosh`

### Example: Show Databases
```js
show dbs
```

### Switch to a Database
```js
use mydb
```

### Show Collections
```js
show collections
```

### Run a Command Manually
```js
db.runCommand({ ping: 1 })
```

### Create Collection
```js
db.createCollection("users")
```

### Get Server Status
```js
db.serverStatus()
```

---

## ✔️ 1.2 Running Commands in Node.js

```js
import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

async function run() {
  await client.connect();
  const db = client.db("testdb");

  const result = await db.command({ ping: 1 });

  console.log(result);
}

run();
```

---

# 📘 2. MongoDB Operators (Detailed)

Operators help filter, update, aggregate, or query data.

MongoDB operators fall into categories:

| Category | Purpose | Examples |
|---------|---------|----------|
| Comparison | Compare values | `$eq`, `$ne`, `$gt`, `$lt`, `$in` |
| Logical | Combine conditions | `$and`, `$or`, `$not`, `$nor` |
| Element | Check field existence | `$exists`, `$type` |
| Evaluation | Pattern matching | `$regex`, `$expr`, `$text` |
| Array | Query array fields | `$all`, `$size`, `$elemMatch` |
| Update | Modify documents | `$set`, `$unset`, `$inc`, `$push` |
| Aggregation | Data processing | `$match`, `$group`, `$project` |

---

# ✔️ 2.1 Comparison Operators

### `$eq` – equal
```js
db.users.find({ age: { $eq: 25 } })
```

### `$gt` – greater than
```js
db.users.find({ age: { $gt: 18 } })
```

### `$in` – matches any of the values
```js
db.products.find({ category: { $in: ["mobile", "laptop"] } })
```

---

# ✔️ 2.2 Logical Operators

### `$and`
```js
db.users.find({
  $and: [{ age: { $gt: 18 } }, { active: true }]
})
```

### `$or`
```js
db.users.find({
  $or: [{ age: { $lt: 18 } }, { blocked: true }]
})
```

---

# ✔️ 2.3 Array Operators

### `$push`
```js
db.users.updateOne(
  { _id: 1 },
  { $push: { hobbies: "cricket" } }
)
```

### `$elemMatch`
```js
db.students.find({
  marks: { $elemMatch: { subject: "math", score: { $gt: 70 } } }
})
```

---

# ✔️ 2.4 Update Operators

### `$set`
```js
db.users.updateOne(
  { _id: 10 },
  { $set: { active: true } }
)
```

### `$inc`
```js
db.stats.updateOne(
  { type: "views" },
  { $inc: { count: 1 } }
)
```

---

# 📘 3. MongoDB Schema Concepts (BEGINNER → ADVANCED)

MongoDB is **schema-flexible**, but well-designed structure is important.

---

# ⭐ 3.1 Collections & Documents

- **Collection** → similar to SQL table  
- **Document** → JSON-like object  
- **Field** → key-value pair  

Example Document:
```js
{
  name: "John",
  age: 22,
  hobbies: ["reading", "music"]
}
```

---

# ⭐ 3.2 Embedded Documents (Subdocuments)

Used when data is tightly related.

```js
{
  title: "Post 1",
  comments: [
    { user: "A", text: "Nice!" },
    { user: "B", text: "Great!" }
  ]
}
```

✔ Faster reads  
✔ No joins  

---

# ⭐ 3.3 Referenced Data (Normalization)

Used when data is large or reused.

```js
{
  _id: 1,
  name: "John",
  addressId: 44
}
```

```js
{
  _id: 44,
  city: "Delhi",
  zipcode: 110001
}
```

Useful for:

- Many-to-many relations  
- Large repeating data  

---

# ⭐ 3.4 Schema Design Rules

| Rule | Meaning |
|------|---------|
| 1. Embed when data is accessed together | Faster reads |
| 2. Reference when data grows large | Reduces duplication |
| 3. Use correct indexes | Improves query performance |
| 4. Avoid unbounded arrays | Prevent document bloat |
| 5. Keep documents under 16MB | MongoDB limit |

---

# ⭐ 3.5 Indexing Concepts

### Create Index
```js
db.users.createIndex({ email: 1 })
```

### Compound Index
```js
db.orders.createIndex({ userId: 1, date: -1 })
```

### Text Index
```js
db.blog.createIndex({ content: "text" })
```

Indexes improve speed but increase storage cost.

---

# 📘 FINAL SUMMARY

| Topic | Description |
|-------|-------------|
| Running Commands | DB-level administrative queries |
| Operators | Filtering, updating, aggregations |
| Schema Concepts | How to structure MongoDB data |

---

If you want, I can also create:  
- MongoDB Aggregation Pipeline Guide  
- MongoDB Performance Optimization Guide  
- MongoDB + Node.js CRUD API Template  
