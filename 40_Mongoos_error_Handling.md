# Mongoose Error Handling Guide

## Introduction

Error handling in Mongoose ensures your application does not crash when
something unexpected happens such as: - Database connection failure\
- Schema validation errors\
- Query failures\
- Duplicate key issues\
- Cast errors (invalid ObjectId)

This guide explains practical patterns for handling errors safely.

------------------------------------------------------------------------

# 🔹 1. Handling Connection Errors

Use **try/catch** around `mongoose.connect()`.

``` js
async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydb");
    console.log("Connected!");
  } catch (error) {
    console.error("DB Connection Error:", error.message);
  }
}
```

------------------------------------------------------------------------

# 🔹 2. Handling Validation Errors

When a required field is missing or invalid:

``` js
const user = new User({ email: "test@gmail.com" });

try {
  await user.save();
} catch (err) {
  console.log("Validation Error:", err.errors);
}
```

------------------------------------------------------------------------

# 🔹 3. Handling Duplicate Key Errors (11000)

Occurs when unique fields clash.

``` js
try {
  await User.create({ email: "duplicate@gmail.com" });
} catch (err) {
  if (err.code === 11000) {
    console.log("Duplicate Key Error:", err.keyValue);
  }
}
```

------------------------------------------------------------------------

# 🔹 4. Handling Cast Errors (Invalid ObjectId)

Occurs when ObjectId format is wrong.

``` js
try {
  await User.findById("123");
} catch (err) {
  if (err.name === "CastError") {
    console.log("Invalid ID:", err.value);
  }
}
```

------------------------------------------------------------------------

# 🔹 5. Handle Errors in Express Middleware

Centralized error handler:

``` js
app.use((err, req, res, next) => {
  console.error(err);

  res.status(400).json({
    status: "fail",
    message: err.message,
  });
});
```

------------------------------------------------------------------------

# 🔹 6. Using `.catch()` with Promises

``` js
User.find()
  .then(data => console.log(data))
  .catch(err => console.log("Query Error:", err));
```

------------------------------------------------------------------------

# 🔹 7. Global Mongoose Error Events

``` js
mongoose.connection.on("error", (err) => {
  console.error("Mongoose Connection Error:", err);
});
```

------------------------------------------------------------------------

# 🔹 Summary Table

  Error Type         Cause                    Example Handling
  ------------------ ------------------------ ----------------------------------
  Connection Error   Cannot reach DB          try/catch around connect
  Validation Error   Missing/invalid fields   `err.errors`
  Duplicate Key      Unique field conflict    check `err.code === 11000`
  Cast Error         Invalid ObjectId         check `err.name === "CastError"`

------------------------------------------------------------------------

# Final Recommendation

Always wrap queries inside **async/await try/catch** blocks and use
centralized error handling for production apps.
