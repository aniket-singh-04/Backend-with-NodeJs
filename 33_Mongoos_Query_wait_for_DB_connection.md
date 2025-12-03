# Mongoose Query -- Waiting for DB Connection

## Overview

When using Mongoose, you must ensure that your **MongoDB connection is
established** before executing any queries.\
If you run queries before the database is connected, your code may fail
or behave unpredictably.

------------------------------------------------------------------------

## Correct Way to Wait for DB Connection

### 1. Using `mongoose.connect()` with `await`

``` js
const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect("mongodb://localhost:27017/mydb");
  console.log("Database Connected!");
}

async function startApp() {
  await connectDB();  // waits for DB connection

  const users = await User.find();  // query runs safely
  console.log(users);
}

startApp();
```

------------------------------------------------------------------------

### 2. Using Connection Events

``` js
mongoose.connection.once("open", () => {
  console.log("DB Ready");

  User.find().then((data) => {
    console.log(data);
  });
});
```

------------------------------------------------------------------------

## Best Practice

Always wrap your application startup inside an **async function** so all
DB queries wait for connection.

------------------------------------------------------------------------

## Quick Summary (Table)

  Step   Description
  ------ -----------------------------------------------
  1      Connect to MongoDB using `mongoose.connect()`
  2      Wait using `await` or connection events
  3      Run queries only after successful connection
  4      Handle errors with `try/catch`

------------------------------------------------------------------------

## Example with Error Handling

``` js
async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydb");
    console.log("Connected!");
  } catch (error) {
    console.error("Connection Failed:", error);
  }
}
```

------------------------------------------------------------------------

## Final Flow

1.  App starts\
2.  DB connection begins\
3.  Code **waits**\
4.  Connection successful\
5.  Queries execute safely
