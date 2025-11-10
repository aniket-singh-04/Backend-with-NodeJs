# 📘 Basics of File Handling & Introduction to the `fs` Module

## 🎯 Goal

Understand basic file operations, the `fs` module, and the difference
between synchronous and asynchronous methods.

------------------------------------------------------------------------

## 🧠 Introduction to File Handling in Node.js

### What is File Handling in Node.js?

File handling refers to reading, writing, updating, or deleting files
within your application.\
In Node.js, file handling is managed through the **built-in `fs` (File
System) module**.

It allows developers to: - Create new files\
- Read content from files\
- Write or modify data in files\
- Delete files or directories

### Why Node.js for File I/O?

Node.js uses an **event-driven** and **non-blocking I/O model**, which
makes it highly efficient for file operations.

-   **Event-driven:** Node.js executes file operations as events ---
    meaning, tasks are handled asynchronously without waiting for others
    to finish.
-   **Non-blocking I/O:** File I/O doesn't block the main thread.
    Node.js continues executing other code while file operations
    complete in the background.

This makes Node.js ideal for **real-time applications** or
**high-performance servers**.

------------------------------------------------------------------------

## ⚙️ Core Module --- `fs` (File System)

### Importing and Using the `fs` Module

``` js
// CommonJS syntax
const fs = require('fs');

// OR (in ES Module)
import fs from 'fs';
```

### Synchronous vs Asynchronous Methods

  -------------------------------------------------------------------------------------
  Type               Description             Example               Blocking?
  ------------------ ----------------------- --------------------- --------------------
  **Synchronous**    Executes line by line,  `fs.readFileSync()`   ✅ Yes
                     blocking the next line                        
                     until finished.                               

  **Asynchronous**   Executes in background; `fs.readFile()`       ❌ No
                     does not block other                          
                     operations.                                   
  -------------------------------------------------------------------------------------

Example difference:

``` js
// Synchronous (Blocking)
const data = fs.readFileSync('example.txt', 'utf8');
console.log(data);
console.log('Done Reading!');

// Asynchronous (Non-Blocking)
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
console.log('Done Reading!');
```

Output order for Asynchronous example:

    Done Reading!
    <file content>

------------------------------------------------------------------------

## ✍️ Basic File Operations

### 1️⃣ Reading Files

#### Asynchronous (Non-blocking)

``` js
const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('File content:', data);
});
```

#### Synchronous (Blocking)

``` js
const data = fs.readFileSync('input.txt', 'utf8');
console.log('File content:', data);
```

------------------------------------------------------------------------

### 2️⃣ Writing Files

#### Asynchronous

``` js
fs.writeFile('output.txt', 'Hello Node.js!', (err) => {
  if (err) throw err;
  console.log('File written successfully!');
});
```

#### Synchronous

``` js
fs.writeFileSync('output.txt', 'Hello Node.js!');
console.log('File written successfully!');
```

------------------------------------------------------------------------

### 3️⃣ Overwriting vs Appending Files

#### Overwriting (default behavior of `fs.writeFile`)

``` js
fs.writeFile('data.txt', 'This text replaces old content.', (err) => {
  if (err) throw err;
  console.log('File overwritten!');
});
```

#### Appending (`fs.appendFile`)

``` js
fs.appendFile('data.txt', '\nThis line will be added.', (err) => {
  if (err) throw err;
  console.log('New content appended!');
});
```

------------------------------------------------------------------------

## 🧩 Handling File Encoding and Buffer Data

When no encoding is specified, Node.js returns **raw buffer data**.

``` js
fs.readFile('input.txt', (err, data) => {
  if (err) throw err;
  console.log('Buffer Data:', data);
  console.log('Text Data:', data.toString());
});
```

-   **Buffer:** Temporary storage for binary data.
-   **Encoding:** Converts buffer to human-readable string (e.g.,
    `'utf8'`).

------------------------------------------------------------------------

## 💻 Hands-on Practice

### 🧪 Program 1 --- Read File (Async + Sync)

``` js
// readFileDemo.js
const fs = require('fs');

// Asynchronous Read
fs.readFile('test.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('Async Read:', data);
});

// Synchronous Read
const syncData = fs.readFileSync('test.txt', 'utf8');
console.log('Sync Read:', syncData);
```

### 🧪 Program 2 --- Write and Overwrite File

``` js
// writeFileDemo.js
const fs = require('fs');

fs.writeFile('example.txt', 'This is new data!', (err) => {
  if (err) throw err;
  console.log('File written successfully!');
});
```

### 🧪 Program 3 --- Append Data to Existing File

``` js
// appendFileDemo.js
const fs = require('fs');

fs.appendFile('example.txt', '\nAppended content here!', (err) => {
  if (err) throw err;
  console.log('Content appended successfully!');
});
```

### 🧪 Program 4 --- Compare Sync vs Async

``` js
// compareSyncAsync.js
const fs = require('fs');

console.log('Start');

fs.readFile('bigFile.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('Async Read Complete');
});

const syncData = fs.readFileSync('smallFile.txt', 'utf8');
console.log('Sync Read Complete');

console.log('End');
```

### 🔍 Observe the order of logs --- you'll see how asynchronous behavior helps keep the program responsive!

------------------------------------------------------------------------

## 🧭 Summary

  Operation     Asynchronous        Synchronous
  ------------- ------------------- ----------------------
  Read File     `fs.readFile()`     `fs.readFileSync()`
  Write File    `fs.writeFile()`    `fs.writeFileSync()`
  Append File   `fs.appendFile()`   ---
  Delete File   `fs.unlink()`       `fs.unlinkSync()`

------------------------------------------------------------------------

## 🧠 Practice Exercise

1.  Create a file `notes.txt` and write a few lines into it.\
2.  Read the content of `notes.txt` asynchronously.\
3.  Append a new line saying "Learning Node.js File System!".\
4.  Try both sync and async versions, and compare execution speed.

------------------------------------------------------------------------

### ✅ Key Takeaways

-   `fs` module handles all file-related operations.\
-   Asynchronous methods are preferred for performance.\
-   Always handle errors properly in callbacks.\
-   Node.js file handling is fast, simple, and efficient for backend
    apps.
