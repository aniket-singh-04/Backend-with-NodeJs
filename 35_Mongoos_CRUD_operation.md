# **Mongoose Documents**

## **1. What Are Document Objects in Mongoose?**

In Mongoose, a **document object** is an **instance of a model**, representing a **single document** in a MongoDB collection.

### **📌 Characteristics of a Mongoose Document Object**

- It is **not just a plain JavaScript object**; it has **Mongoose-specific methods and behaviors**.
- It is an **instance of the model** (`new Model()`).
- It **inherits from the `Document` class**.
- It supports **schema-based validation, middleware, and instance methods**.
- It has the ability to **talk to MongoDB** and **update itself** when calling methods like `.save()` or `.updateOne()`.

---

### **🚀 Example: Creating and Working with a Mongoose Document**

```js
// Create a document instance
const user = new User({ name: "Alice", email: "alice@example.com", age: 25 });

console.log(user instanceof mongoose.Document); // ✅ true
console.log(user instanceof User); // ✅ true
console.log(user.toObject()); // ✅ Converts it to a plain JS object
```

📌 **Output**

```js
true
true
{ _id: ..., name: 'Alice', email: 'alice@example.com', age: 25 }
```

✅ **This confirms that `user` is a Mongoose document and has additional methods beyond a plain object.**

---

## **2. Can a Mongoose Document Talk to MongoDB?**

### **✅ Yes, a Mongoose Document Can "Talk" to MongoDB and Update It**

A **Mongoose document can interact with MongoDB** and **update itself**, but **only when explicitly instructed**.

### **🔹 Why a Mongoose Document Can "Talk" to MongoDB?**

1. **It is an instance of the model**, meaning it is **aware of the database collection** it belongs to.
2. **It has built-in methods** (like `.save()`, `.deleteOne()`, `.updateOne()`) that allow it to **perform database operations**.
3. **It tracks changes** using `.isModified()` and only updates changed fields.
4. **It supports middleware hooks** (like `pre("save")`) that allow additional operations before updating MongoDB.

### **🚀 Example: Updating a Document from a Mongoose Instance**

#### **1️⃣ Updating a Document (Using `.save()`)**

```js
const user = await User.findOne({ email: "johndoe@example.com" });

user.age = 30; // Modify a field
await user.save(); // ✅ Updates MongoDB
```

✅ **What happens?**

- The document **modifies itself in memory**.
- Calling `.save()` **sends an update to MongoDB**.

---

#### **2️⃣ Checking If a Field Is Modified Before Updating**

```js
const user = await User.findOne({ email: "johndoe@example.com" });

console.log(user.isModified("age")); // ❌ false

user.age = 30;
console.log(user.isModified("age")); // ✅ true

await user.save(); // ✅ Updates MongoDB
```

✅ **Why Is This Useful?**

- **Prevents unnecessary writes** (only updates changed fields).
- **Ensures efficient database interaction**.

---

#### **3️⃣ Directly Updating MongoDB from a Document (`updateOne()`)**

```js
const user = await User.findOne({ email: "johndoe@example.com" });

await user.updateOne({ $set: { age: 35 } }); // ✅ Updates MongoDB
```

✅ **Why Use `.updateOne()` Instead of `.save()`?**

- **Faster than `.save()`** (does not reload the entire document).
- **More efficient for small updates**.

---

## **3. Most Commonly Used Methods on Mongoose Documents**

| **Method**          | **Purpose**                                             | **Example Usage**                        |
| ------------------- | ------------------------------------------------------- | ---------------------------------------- |
| **`.save()`**       | Saves the document to the database                      | `await user.save();`                     |
| **`.toObject()`**   | Converts the document to a plain JS object              | `const obj = user.toObject();`           |
| **`.toJSON()`**     | Converts the document to JSON format                    | `const json = user.toJSON();`            |
| **`.updateOne()`**  | Updates the document in the database                    | `await user.updateOne({ age: 30 });`     |
| **`.remove()`**     | Removes the document from the database (deprecated)     | `await user.remove();` (deprecated)      |
| **`.deleteOne()`**  | Removes the document from the database                  | `await user.deleteOne();`                |
| **`.isNew`**        | Checks if the document is newly created (not yet saved) | `console.log(user.isNew);`               |
| **`.isModified()`** | Checks if a field has been modified                     | `console.log(user.isModified("email"));` |
| **`.populate()`**   | Populates referenced fields                             | `await user.populate("posts");`          |
| **`.validate()`**   | Manually triggers schema validation                     | `await user.validate();`                 |


## **4. Mongoose Document vs MongoDB Document**

## MongoDB Document

- A plain JavaScript object stored in the MongoDB database.
- Contains only data (fields and values), no methods.

## Mongoose Document

- An instance of a Mongoose model.
- Wraps a MongoDB document and adds extra features, such as:
  - Built-in methods (e.g., `.save()`, `.remove()`, `.validate()`)
  - Getters/setters and virtuals
  - Schema-based validation
  - Middleware (hooks)
  - Type casting







# Mongoose Query and Query Chaining

## What is a Mongoose Query?

A **Mongoose query** is an object that represents an operation on a MongoDB collection. It is **thenable but not a Promise**; however, it behaves like a Promise.

### Example:

```javascript
const users = User.find({ age: { $gte: 18 } });
console.log(users instanceof Promise); // false

await users; // Works because it's thenable
```

## Chaining Queries in Mongoose

Mongoose allows **query chaining**, enabling you to refine the query step by step before execution. Since queries return query objects, you can keep adding methods before execution.

### Example of Chaining Queries:

```javascript
const users = await User.find({ age: { $gte: 18 } })
  .sort({ name: 1 })
  .limit(10)
  .select("name age");
```

### Explanation:

1. `.find({ age: { $gte: 18 } })` - Finds all users aged 18 or above.
2. `.sort({ name: 1 })` - Sorts results by name in ascending order.
3. `.limit(10)` - Limits the results to 10 users.
4. `.select("name age")` - Fetches only the `name` and `age` fields.
5. `await` - Waits for the result because the query is thenable.

## Using `.exec()` for Full Promise Behavior

To convert a Mongoose query into a **real Promise**, use `.exec()`:

```javascript
const users = await User.find({ age: { $gte: 18 } }).exec();
console.log(users instanceof Promise); // true
```

This ensures the query behaves exactly like a native JavaScript Promise.

## Using `.getQuery()` to Inspect the Query

Mongoose provides the `.getQuery()` method to inspect the query conditions before execution.

### Example:

```javascript
const query = User.find({ age: { $gte: 18 } });
console.log(query.getQuery()); // { age: { $gte: 18 } }
```

This is useful for debugging queries before execution.

## Using `.where()` for SQL-Style Querying

The `.where()` method allows constructing queries in a more expressive way.

### Example:

```javascript
const users = await User.where("age")
  .gte(18)
  .lte(30)
  .where("name")
  .equals("John")
  .select("name age");
```

### Explanation:

- `.where("age").gte(18).lte(30)` - Finds users whose age is between 18 and 30.
- `.where("name").equals("John")` - Filters users whose name is "John".
- `.select("name age")` - Retrieves only the `name` and `age` fields.

## Negative Selections (Excluding Fields)

Mongoose allows negative selections to exclude fields from the result by prefixing the field with `-`.

### Example:

```javascript
const users = await User.find().select("-password -email");
```

### Explanation:

- `-password` excludes the `password` field.
- `-email` excludes the `email` field.

Another example:

```javascript
const users = await User.find({}, { password: 0, email: 0 });
```

This achieves the same result using an object notation.
