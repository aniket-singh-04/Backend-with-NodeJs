# Introduction to Mongoose and Models

## What is Mongoose?

Mongoose is an Object Data Modeling (ODM) library for MongoDB and
Node.js.\
It provides a structured way to interact with MongoDB by defining
schemas and models.

### Key Advantages

-   Defines structure for documents.
-   Provides built‑in validation.
-   Offers query helpers and middleware.
-   Improves consistency across the project.

------------------------------------------------------------------------

## What is a Schema?

A schema defines the shape of documents within a MongoDB collection.

### Example

``` js
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});
```

------------------------------------------------------------------------

## What is a Model?

A model is a compiled version of the schema.\
It allows you to **create**, **read**, **update**, and **delete**
documents.

### Example

``` js
const User = mongoose.model("User", userSchema);

const newUser = new User({
  name: "Hello Sir",
  age: 21,
  email: "hello@example.com"
});

newUser.save();
```

------------------------------------------------------------------------

## Flow Summary

Schema ➝ Model ➝ Document

-   **Schema**: Blueprint\
-   **Model**: Tool to interact with DB\
-   **Document**: Actual record
