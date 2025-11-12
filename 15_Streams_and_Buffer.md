# 🌊 Streams and Buffers in Node.js

## 🎯 Goal

Understand how **streams** work for large file handling and how to use
**buffers** for working with binary data efficiently in Node.js.

------------------------------------------------------------------------

## 🧠 Introduction

When dealing with large files or continuous data (like video streaming,
logs, or network packets), **reading or writing the whole file at once**
is inefficient and memory-heavy.\
That's where **streams** and **buffers** come into play.

-   **Streams** allow processing data **piece by piece**.
-   **Buffers** handle **binary data** that flows through streams.

------------------------------------------------------------------------

## 🔄 What Are Streams?

Streams are **objects** that let you read or write data
**sequentially**.\
They don't load entire data into memory, making them perfect for
handling large files.

### 🔸 Real-Life Analogy

Imagine watching a YouTube video --- the entire video doesn't download
before playback.\
Instead, it **streams** small chunks so playback starts immediately.

------------------------------------------------------------------------

## 📥 Types of Streams in Node.js

  ------------------------------------------------------------------------------
  Stream Type                Description              Example
  -------------------------- ------------------------ --------------------------
  **Readable**               Stream from which data   `fs.createReadStream()`
                             can be read.             

  **Writable**               Stream to which data can `fs.createWriteStream()`
                             be written.              

  **Duplex**                 Both readable and        TCP sockets
                             writable.                

  **Transform**              Duplex stream that       Compression, encryption
                             modifies data.           
  ------------------------------------------------------------------------------

------------------------------------------------------------------------

## 📘 1️⃣ Readable Streams --- `fs.createReadStream()`

Used to read data **chunk by chunk** from large files.

### Example: Reading a File Using Stream

``` js
const fs = require('fs');

const readStream = fs.createReadStream('largeFile.txt', 'utf8');

readStream.on('data', (chunk) => {
  console.log('--- New Chunk Received ---');
  console.log(chunk);
});

readStream.on('end', () => {
  console.log('File reading completed!');
});

readStream.on('error', (err) => {
  console.error('Error:', err);
});
```

### ⚙️ Explanation

-   **data** → triggered when a new chunk is read
-   **end** → triggered when file reading completes
-   **error** → triggered on any read issue

------------------------------------------------------------------------

## 📤 2️⃣ Writable Streams --- `fs.createWriteStream()`

Used to **write data gradually** to a file.

### Example: Writing to a File Using Stream

``` js
const fs = require('fs');

const writeStream = fs.createWriteStream('output.txt');

writeStream.write('Hello, ');
writeStream.write('this is being written using streams!');
writeStream.end();

writeStream.on('finish', () => {
  console.log('Writing completed successfully!');
});
```

------------------------------------------------------------------------

## 🔗 3️⃣ Piping Streams --- Directly Connecting Read and Write

The **`pipe()`** method automatically reads from a readable stream and
writes to a writable stream.

### Example: Copying a File Using Pipe

``` js
const fs = require('fs');

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('copied.txt');

readStream.pipe(writeStream);

console.log('File copied successfully using streams!');
```

💡 **Advantage:** No manual handling of `data` events --- automatic flow
control between read and write.

------------------------------------------------------------------------

## ⚡ 4️⃣ Stream Events

  Event        Description
  ------------ ------------------------------------------
  **data**     Triggered when a chunk is read
  **end**      Triggered when reading completes
  **error**    Triggered if an error occurs
  **finish**   Triggered when all data has been written

Example with multiple events:

``` js
const fs = require('fs');
const stream = fs.createReadStream('sample.txt', 'utf8');

stream.on('open', () => console.log('Stream opened'));
stream.on('data', (chunk) => console.log('Chunk received:', chunk));
stream.on('end', () => console.log('Reading finished'));
stream.on('error', (err) => console.log('Error:', err.message));
```

------------------------------------------------------------------------

## 💾 What is a Buffer in Node.js?

A **Buffer** is a **temporary storage** for binary data (like images,
videos, or raw bytes) that come from a stream or file.

Buffers are used because JavaScript (by default) only handles strings,
not raw binary data.

### Example:

When you read a file without specifying encoding, Node.js returns
**Buffer objects**.

``` js
const fs = require('fs');

fs.readFile('image.png', (err, data) => {
  if (err) throw err;
  console.log('Buffer Data:', data);
  console.log('Data Length:', data.length);
});
```

Output Example:

    Buffer Data: <Buffer 89 50 4e 47 0d 0a 1a 0a ... >
    Data Length: 102400

------------------------------------------------------------------------

## 🔍 Working with Buffers

### 1️⃣ Creating Buffers

``` js
// Allocate 10 bytes
const buf = Buffer.alloc(10);
console.log(buf);
```

### 2️⃣ Writing Data into Buffers

``` js
const buf = Buffer.alloc(20);
buf.write('Hello Node.js');
console.log(buf.toString()); // Output: Hello Node.js
```

### 3️⃣ Converting Buffer to String

``` js
const buf = Buffer.from('Learning Buffers!');
console.log(buf.toString('utf8'));
```

### 4️⃣ Slicing Buffers

``` js
const buf = Buffer.from('NodeJSStream');
const sliced = buf.slice(0, 4);
console.log(sliced.toString()); // Output: Node
```

### 5️⃣ Concatenating Buffers

``` js
const buf1 = Buffer.from('Hello ');
const buf2 = Buffer.from('World!');
const result = Buffer.concat([buf1, buf2]);
console.log(result.toString()); // Output: Hello World!
```

------------------------------------------------------------------------

## 📂 Reading and Writing Files Using Buffers

### Example: Copying Binary Files

``` js
const fs = require('fs');

fs.readFile('photo.jpg', (err, data) => {
  if (err) throw err;
  fs.writeFile('photo_copy.jpg', data, (err) => {
    if (err) throw err;
    console.log('Binary file copied successfully!');
  });
});
```

This demonstrates how buffers hold binary data during file operations.

------------------------------------------------------------------------

## 🧩 Hands-on Practice

### 🧪 Program 1 --- File Reading Using Streams

``` js
const fs = require('fs');

const readStream = fs.createReadStream('big.txt', 'utf8');

readStream.on('data', (chunk) => {
  console.log('Received chunk of size:', chunk.length);
});

readStream.on('end', () => console.log('File reading done!'));
```

------------------------------------------------------------------------

### 🧪 Program 2 --- Writing Using Streams

``` js
const fs = require('fs');

const writeStream = fs.createWriteStream('notes.txt');

for (let i = 1; i <= 5; i++) {
  writeStream.write(`This is line ${i}\n`);
}

writeStream.end();
writeStream.on('finish', () => console.log('File written successfully!'));
```

------------------------------------------------------------------------

### 🧪 Program 3 --- Copying Files Using Streams (Pipe)

``` js
const fs = require('fs');

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);
console.log('File copied successfully using pipe!');
```

------------------------------------------------------------------------

### 🧪 Program 4 --- Working with Buffers

``` js
const buf = Buffer.from('Stream and Buffer Example');
console.log('Original Buffer:', buf);
console.log('Buffer as Text:', buf.toString('utf8'));
console.log('Buffer Slice:', buf.slice(0, 6).toString());
```

------------------------------------------------------------------------

## ⚙️ Advanced Example --- Stream + Buffer Together

``` js
const fs = require('fs');

const readStream = fs.createReadStream('video.mp4');
const writeStream = fs.createWriteStream('video_copy.mp4');

readStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes`);
});

readStream.on('end', () => console.log('File read complete'));
readStream.on('error', (err) => console.error(err));

readStream.pipe(writeStream);
```

This approach efficiently copies large binary files without overloading
memory.

------------------------------------------------------------------------

## 🧠 Summary

  -----------------------------------------------------------------------------------
  Concept              Description                   Example
  -------------------- ----------------------------- --------------------------------
  **Readable Stream**  Reads data chunk-by-chunk     `fs.createReadStream()`

  **Writable Stream**  Writes data chunk-by-chunk    `fs.createWriteStream()`

  **Pipe**             Connects read and write       `readStream.pipe(writeStream)`
                       streams                       

  **Buffer**           Handles binary data           `Buffer.from()`,
                                                     `Buffer.alloc()`

  **Stream Events**    Handle streaming lifecycle    `data`, `end`, `error`, `finish`


