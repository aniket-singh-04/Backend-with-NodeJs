# Node.js Modules: require vs. import/export

This document outlines the core concepts of module systems in Node.js, specifically contrasting **CommonJS (require/module.exports)** with **ES Modules (import/export), and detailing *named* versus *default* exports.

---

## 1. CommonJS (CJS) - require and module.exports

CommonJS is the *original and default module system* in Node.js. It's *synchronous*, meaning modules are loaded one after the other.

### 📦 Exporting (CJS)

| Type | Syntax | Description & Example |
| :--- | :--- | :--- |
| *Default* | module.exports = value | Exports a *single main value* (function, object, class, etc.). |
| *Named* | exports.name = value | Shorthand for attaching properties to the main module.exports object. |

**Example (utils.js)**
```javascript
// Default Export: The entire module will be this function
module.exports = (a, b) => a + b; 

// Named Export: Attaches PI to the exported function/object
exports.PI = 3.14; 
```


### 📥 Importing (CJS)

| Type | Syntax | Description & Example |
| :--- | :--- | :--- |
| *Combined* | const varName = require('./path') | Imports the entire module.exports object. You access both the default value and named properties through varName. |

**Example (app.js)**

```javascript
const calculator = require('./utils'); // calculator is the add function

const sum = calculator(5, 3); // Default function used
const piVal = calculator.PI;   // Named property accessed

console.log(sum, piVal); // 8, 3.14
```

### 2. ES Modules (ESM) - 
*import and export*

ES Modules is the standardized module system for JavaScript. It's asynchronous and uses live bindings. Node.js requires .mjs extension or "type": "module" in package.json.
### 📤 Exporting (ESM)
Default Export (Only one per file)
```Javascript
// utils.mjs
export default class User { // The primary value of the module
  constructor(name) {
    this.name = name;
  }
}
```


Named Exports (Multiple allowed)
```Javascript
// math.mjs
export function multiply(a, b) { // Inline named export
  return a * b;
}

const subtract = (a, b) => a - b;
export { subtract };           // Block named export
```

### 3. 📥 Importing (ESM)
| Type | Syntax | Description |
| :--- | :--- | :--- |
| *Default* | import AliasName from './path' | Imports the export default value. AliasName can be anything. |
| *Named* | import { name1, name2 } from './path' | Imports specific exports using their *exact* exported names. |
| *Aliased* | import { name as alias } from './path' | Imports a named export and renames it locally. |
| *All* | import * as Bundle from './path' | Imports all named exports and bundles them into an object (Bundle). |