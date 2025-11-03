# Middleware in Express

## What is Middleware?

Middleware in Express refers to functions that have access to the request (`req`), response (`res`), and the next middleware function in the application’s request-response cycle. Middleware functions are executed sequentially, and they can modify the request, the response, or even end the request-response cycle.

The main purpose of middleware is to perform tasks such as logging, authentication, request validation, and error handling, among others.

OR

**Simple Definition = Middleware in Express.js is like a helper function that runs between receiving a request and sending a response**

## Types of Middleware

### 1. **Application-Level Middleware**

These are functions that are bound to an instance of the Express app. They can be used for specific routes or globally across all routes.

```js
const express = require('express');
const app = express();

// Example of global middleware
app.use((req, res, next) => {
    console.log('Request received!');
    next(); // Call the next middleware function
});
```

### 2. Route-Level Middleware
Route-specific middleware only runs for specific routes.

```js
const express = require('express');
const app = express();

// Example of route-level middleware
app.get('/user', (req, res, next) => { // ye middleware hai 
    console.log('User route accessed!');
    next();
}, (req, res) => {
    res.send('User Information');
});
```

### 3. Error Handling Middleware
Express provides a special kind of middleware to handle errors. These middleware functions take four arguments: err, req, res, and next.

```js
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something went wrong!');
});
```

### 4. Built-in Middleware
Express comes with a few built-in middleware functions like express.json(), express.urlencoded(), and express.static().

```js
// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to serve static files (e.g. images, CSS, JS)
app.use(express.static('public'));
```

### 5. Third-party Middleware
These are middleware functions provided by third-party packages that can be installed via npm. Examples include 
```js 
Javascript Packages
morgan, cors, and helmet
```

```js
const morgan = require('morgan');

// Logging middleware using morgan
app.use(morgan('dev'));
```

### Create of Custom MiddleWare

```js
const customMiddleware = (req, res, next) => {
    console.log('This is a custom middleware');
    next();  // Move to the next middleware or req or res
};
```

### Middleware Flow
1. Request received by Express.

2. Middleware is executed in the order it's defined (from top to bottom).

3. Response is sent to client once the final middleware finishes or the response is manually sent (e.g., res.send()).

4. If no response is sent and no error occurs, Express will continue to the next middleware or route handler.