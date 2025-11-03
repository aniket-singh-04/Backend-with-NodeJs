# 🌐 Node.js Overview

Node.js is a JavaScript runtime environment that lets you run JavaScript code outside of a web browser—most commonly on servers.

---

## 🧠 Core Definition

- Node.js is built on Chrome’s V8 JavaScript engine, the same engine that powers Google Chrome.
- It’s open-source, cross-platform, and designed for building scalable network applications.
- Unlike traditional server-side languages, Node.js uses non-blocking, event-driven architecture, which makes it super efficient for handling multiple requests at once.

---

## ⚙️ How It Works

- Runs JavaScript in a single-threaded process.
- Uses an event loop to handle asynchronous operations like reading files, querying databases, or making network requests.
- Ideal for real-time applications like chat apps, gaming servers, and collaborative tools.

---

## 🧰 What You Can Build With Node.js

- REST APIs and microservices  
- Real-time chat applications  
- Streaming services  
- Command-line tools  
- Server-side web apps


## 🧱 Core Concepts

### 1. Modules
Node.js uses modules to organize code.

```js
const fs = require('fs'); // Built-in module
```
## 2. NPM (Node Package Manager)
Install packages using:

```bash
npm install <package-name>
```
## 3. Event Loop
Handles asynchronous operations efficiently.

## 4. Creating a Server
```js
const http = require('http');

http.createServer((req, res) => {
  res.write('Hello World');
  res.end();
}).listen(3000);
```
## 📚 Learning Resources

Node.js Full Course for Beginners

Node.js Crash Course

Node.js Tutorial in Hindi