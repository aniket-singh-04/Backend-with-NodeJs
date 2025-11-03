# Environment Variable 

In Node.js, an environment variable is a variable that stores configuration or settings that your application needs to function, and it can be different depending on the environment in which the application is running (development, production, etc.). These variables allow you to store sensitive information like API keys, database credentials, or any configuration value that may change based on the environment.

**How to use the environment variable**

First Install
```bash
npm install dotenv
```

Create a .env file:

```js
API_KEY=thisIsMyKey
PORT=8080
DB_PASSWORD=supersecretDBpassword
```


Example :
```js
// ES6 with CommonJS (using require)
require('dotenv').config();
// OR

// Using the ES6
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

// ES6 Destructuring with Default Values
const { NODE_ENV = 'development', PORT = 3000, DB_PASSWORD } = process.env;

console.log(NODE_ENV);   // 'development' (or the value from the environment variable)
console.log(PORT);       // 3000 (or the value from the environment variable)
console.log(DB_PASSWORD);  // Value of DB_PASSWORD or undefined if not set
```

