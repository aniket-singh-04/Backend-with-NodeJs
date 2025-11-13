# ⚙️ Advanced File Handling in Node.js

## 🎯 Goal
Learn advanced file operations like **compression**, **JSON handling**, and **asynchronous file handling** using **Promises** and **Async/Await**.

---

## 🧠 Introduction

Node.js provides powerful capabilities for file manipulation beyond basic reading and writing. In this section, you’ll explore:
- Compressing and decompressing files using `zlib`.
- Handling structured data using **JSON**.
- Managing asynchronous file operations efficiently with **Promises** and **Async/Await**.

These concepts are essential for **real-world applications** like log compression, configuration management, and API-driven data storage.

---

## 🗜️ File Compression and Decompression with `zlib`

### 🔍 What is zlib?
`zlib` is a built-in Node.js module for **data compression and decompression** using standard algorithms like **gzip** and **deflate**.

It helps to reduce file sizes and optimize disk or network performance.

### 🧩 Importing the zlib Module
```js
const zlib = require('zlib');
const fs = require('fs');
```

## 📦 Compressing Files
Example: Compress a File Using Gzip
```javascript
const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('input.txt.gz');

readStream.pipe(gzip).pipe(writeStream);

writeStream.on('finish', () => {
  console.log('File successfully compressed!');
});
```

## ⚙️ Explanation
`zlib.createGzip()` → creates a gzip compression stream.

`pipe()` → connects read → compression → write streams.

`.gz` files are typically used for compressed text or log data.

## Compression Formats

 Method                    Description
  ------------------------- ---------------------------------------------
  `zlib.createGzip()`       Creates a Gzip stream for compression.

  `zlib.createGunzip()`     Creates a stream for decompressing Gzip
                            files.

  `zlib.createDeflate()`    Creates a Deflate compression stream.

  `zlib.createInflate()`    Creates a stream for decompressing Deflate
                            files.




## 📂 Decompressing Files
Example: Decompress a Gzip File
```js
const fs = require('fs');
const zlib = require('zlib');

const gunzip = zlib.createGunzip();
const readStream = fs.createReadStream('input.txt.gz');
const writeStream = fs.createWriteStream('decompressed.txt');

readStream.pipe(gunzip).pipe(writeStream);

writeStream.on('finish', () => {
  console.log('File successfully decompressed!');
});
```
## 🧠 Note:
Always use correct extensions (.gz) for compressed files.

Decompression must match the compression type (Gzip ↔ Gunzip, Deflate ↔ Inflate).

### 🔧 Alternative Compression: Deflate/Inflate
```js
const zlib = require('zlib');
const input = 'Learning Node.js compression';

zlib.deflate(input, (err, buffer) => {
  if (err) throw err;
  console.log('Compressed:', buffer.toString('base64'));

  zlib.inflate(buffer, (err, result) => {
    if (err) throw err;
    console.log('Decompressed:', result.toString());
  });
});
```
## 🧾 Working with JSON Files
JSON (JavaScript Object Notation) is a lightweight data format widely used for configuration, APIs, and databases.

### Example: Writing JSON Data to a File
```js
const fs = require('fs');

const student = {
  name: 'Ashish',
  course: 'Computer Science',
  year: 3,
  skills: ['Node.js', 'AI', 'ML']
};

fs.writeFile('student.json', JSON.stringify(student, null, 2), (err) => {
  if (err) throw err;
  console.log('JSON file created successfully!');
});
```
### Example: Reading JSON Data from a File
```js
fs.readFile('student.json', 'utf8', (err, data) => {
  if (err) throw err;

  const studentObj = JSON.parse(data);
  console.log('Student Name:', studentObj.name);
});
```
### ⚠️ Error Handling in JSON Operations
```js
try {
  const data = fs.readFileSync('student.json', 'utf8');
  const obj = JSON.parse(data);
  console.log(obj);
} catch (err) {
  console.error('Invalid JSON format or file not found:', err.message);
}
```
## 🚀 Using Promises for Asynchronous File Handling
Traditionally, Node.js used callbacks for async operations, but Promises make it more readable and maintainable.

Import the Promises API
```js
const fs = require('fs').promises;
```
Example: Reading and Writing Using Promises
```js
async function handleFile() {
  try {
    const data = await fs.readFile('input.txt', 'utf8');
    console.log('File Content:', data);

    await fs.writeFile('output.txt', data.toUpperCase());
    console.log('New file created successfully!');
  } catch (err) {
    console.error('Error handling file:', err);
  }
}

handleFile();
```
### 🧠 Explanation
fs.promises provides promise-based versions of file functions.

Use await to pause execution until the promise resolves.

Errors are caught using try...catch blocks.

## 🔄 Converting Callbacks to Promises Using util.promisify
If an API uses callbacks, you can convert it into a promise-based function.

Example: Converting fs.readFile to Promise
```js
const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);

readFilePromise('input.txt', 'utf8')
  .then((data) => console.log('File content:', data))
  .catch((err) => console.error('Error:', err));
This approach is useful for older Node.js modules that don’t support Promises natively.
```
## 🔁 Combining Promises and Async/Await
Example: Async File Copy Operation
```js
const fs = require('fs').promises;

async function copyFile(source, destination) {
  try {
    const data = await fs.readFile(source);
    await fs.writeFile(destination, data);
    console.log(`File copied from ${source} to ${destination}`);
  } catch (err) {
    console.error('Copy failed:', err.message);
  }
}

copyFile('input.txt', 'copy.txt');
```
🧩 Hands-on Practice
🧪 Program 1 — Compress & Decompress File
```js
const fs = require('fs');
const zlib = require('zlib');

function compressFile() {
  const readStream = fs.createReadStream('data.txt');
  const writeStream = fs.createWriteStream('data.txt.gz');
  readStream.pipe(zlib.createGzip()).pipe(writeStream);
}

function decompressFile() {
  const readStream = fs.createReadStream('data.txt.gz');
  const writeStream = fs.createWriteStream('data_decompressed.txt');
  readStream.pipe(zlib.createGunzip()).pipe(writeStream);
}

compressFile();
// decompressFile(); // Run this after compression completes
```
### 🧪 Program 2 — JSON Read/Write with Async/Await
```js
const fs = require('fs').promises;

async function manageJSON() {
  const data = {
    name: 'Hello Ashish',
    year: 3,
    goal: 'Top company placement'
  };

  try {
    await fs.writeFile('data.json', JSON.stringify(data, null, 2));
    console.log('JSON file written successfully.');

    const fileContent = await fs.readFile('data.json', 'utf8');
    console.log('Read JSON:', JSON.parse(fileContent));
  } catch (err) {
    console.error('Error handling JSON file:', err.message);
  }
}

manageJSON();
```
### 🧪 Program 3 — Convert Callback to Promise using util.promisify
```js
const fs = require('fs');
const util = require('util');

const writeFilePromise = util.promisify(fs.writeFile);

writeFilePromise('notes.txt', 'Learning Promisify Utility!')
  .then(() => console.log('File written successfully!'))
  .catch((err) => console.error('Error:', err));
```
### 🧠 Summary Table
Concept	Purpose	Key Methods
zlib Compression	Reduce file size	createGzip(), createGunzip()
JSON Handling	Store structured data	JSON.stringify(), JSON.parse()
Promises API	Asynchronous file I/O	fs.promises.readFile, fs.promises.writeFile
Promisify Utility	Convert callbacks to promises	util.promisify()
Async/Await	Simplify async code flow	async function, await



