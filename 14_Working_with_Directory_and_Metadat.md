# 📁 Working with Directories & File Metadata in Node.js

## 🎯 Goal

Learn how to work with directories, file metadata, and perform common
file system operations using Node.js.

------------------------------------------------------------------------

## 🧠 Introduction

In Node.js, the **`fs` (File System)** module allows you to interact
with the file system --- not only files but also directories and their
metadata.

This includes: - Creating, reading, and removing directories - Checking
file and directory details - Monitoring changes in real time

These features are critical for tasks like: - Building file managers -
Logging systems - Server maintenance tools - Monitoring file uploads or
configuration changes

------------------------------------------------------------------------

## 📂 Working with Directories

### 1️⃣ Creating Directories --- `fs.mkdir`

#### 🔹 Asynchronous Method

``` js
const fs = require('fs');

fs.mkdir('newFolder', (err) => {
  if (err) throw err;
  console.log('Directory created successfully!');
});
```

#### 🔹 Recursive Directory Creation

If the parent directory doesn't exist, use `{ recursive: true }` to
create nested folders.

``` js
fs.mkdir('parent/child/grandchild', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('Nested directories created!');
});
```

#### 🔹 Synchronous Version

``` js
const fs = require('fs');

fs.mkdirSync('syncFolder');
console.log('Synchronous directory created!');
```

------------------------------------------------------------------------

### 2️⃣ Reading Directories --- `fs.readdir`

Reads the contents (files and subdirectories) of a given folder.

#### Asynchronous

``` js
fs.readdir('./', (err, files) => {
  if (err) throw err;
  console.log('Directory contents:', files);
});
```

Output:

    Directory contents: [ 'index.js', 'data.txt', 'images', 'package.json' ]

#### With File Types (from Node v10.10.0+)

``` js
fs.readdir('./', { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    console.log(file.name, file.isDirectory() ? '(Directory)' : '(File)');
  });
});
```

------------------------------------------------------------------------

### 3️⃣ Removing Directories --- `fs.rmdir` or `fs.rm`

#### Older Way (`fs.rmdir`)

``` js
fs.rmdir('oldFolder', (err) => {
  if (err) throw err;
  console.log('Directory removed!');
});
```

#### Modern Way (`fs.rm` with recursive option)

``` js
fs.rm('parentFolder', { recursive: true, force: true }, (err) => {
  if (err) throw err;
  console.log('Directory and its contents deleted!');
});
```

> ⚠️ `fs.rm` is preferred over `fs.rmdir` (which is deprecated in modern
> Node.js).

------------------------------------------------------------------------

## 🧾 File Stats and Metadata

### 1️⃣ Getting File Metadata --- `fs.stat`

The `fs.stat()` and `fs.statSync()` methods return a **`Stats` object**
containing information about a file or directory.

``` js
const fs = require('fs');

fs.stat('example.txt', (err, stats) => {
  if (err) throw err;
  console.log(stats);
});
```

Example Output:

    Stats {
      size: 150,
      mode: 33206,
      atime: 2025-11-08T15:00:00.000Z,
      mtime: 2025-11-08T15:01:00.000Z,
      ctime: 2025-11-08T15:02:00.000Z,
      birthtime: 2025-11-08T14:50:00.000Z
    }

------------------------------------------------------------------------

### 2️⃣ Understanding the `fs.Stats` Object

  Property        Description
  --------------- ----------------------------------
  **size**        File size in bytes
  **atime**       Last access time
  **mtime**       Last modified time
  **ctime**       Last change time (metadata)
  **birthtime**   File creation time
  **mode**        File permissions in octal format

Example:

``` js
fs.stat('example.txt', (err, stats) => {
  if (err) throw err;
  console.log('File Size:', stats.size, 'bytes');
  console.log('Created On:', stats.birthtime);
  console.log('Modified On:', stats.mtime);
});
```

------------------------------------------------------------------------

### 3️⃣ Check if Path is File or Directory

``` js
fs.stat('test', (err, stats) => {
  if (err) throw err;
  if (stats.isFile()) {
    console.log('This is a file.');
  } else if (stats.isDirectory()) {
    console.log('This is a directory.');
  }
});
```

------------------------------------------------------------------------

## 👀 File Watching --- Detecting Changes in Real Time

Node.js provides **`fs.watch()`** and **`fs.watchFile()`** for
monitoring changes to files or directories.

### 1️⃣ Watching Files --- `fs.watchFile()`

``` js
const fs = require('fs');

fs.watchFile('example.txt', (curr, prev) => {
  console.log('File modified!');
  console.log('Previous modification time:', prev.mtime);
  console.log('Current modification time:', curr.mtime);
});
```

### 2️⃣ Watching Directories --- `fs.watch()`

``` js
fs.watch('./myFolder', (eventType, filename) => {
  console.log(`Event: ${eventType}`);
  if (filename) console.log(`File changed: ${filename}`);
});
```

**Common Events:** - `'rename'` → file added, deleted, or renamed -
`'change'` → file content changed

------------------------------------------------------------------------

## 🧩 Hands-on Practice

### 🧪 Program 1 --- Create, Read, and Delete a Directory

``` js
const fs = require('fs');

// Step 1: Create directory
fs.mkdir('practiceDir', (err) => {
  if (err) throw err;
  console.log('Directory created!');

  // Step 2: Read current directory
  fs.readdir('./', (err, files) => {
    if (err) throw err;
    console.log('Files and Folders:', files);

    // Step 3: Remove directory
    fs.rm('practiceDir', { recursive: true, force: true }, (err) => {
      if (err) throw err;
      console.log('Directory deleted successfully!');
    });
  });
});
```

------------------------------------------------------------------------

### 🧪 Program 2 --- Display File Metadata

``` js
const fs = require('fs');

fs.stat('example.txt', (err, stats) => {
  if (err) throw err;
  console.log('File Size:', stats.size);
  console.log('Created:', stats.birthtime);
  console.log('Modified:', stats.mtime);
  console.log('Is File?', stats.isFile());
  console.log('Is Directory?', stats.isDirectory());
});
```

------------------------------------------------------------------------

### 🧪 Program 3 --- Watch for File Changes

``` js
const fs = require('fs');

console.log('Watching example.txt for changes...');

fs.watch('example.txt', (eventType, filename) => {
  if (filename) {
    console.log(`File: ${filename} | Event: ${eventType}`);
  }
});
```

------------------------------------------------------------------------

### 🧪 Program 4 --- Watch a Directory for Add/Delete

``` js
const fs = require('fs');

console.log('Watching "logs" directory...');

fs.watch('logs', (eventType, filename) => {
  console.log(`Change detected: ${eventType} on ${filename}`);
});
```

Try adding, modifying, or deleting files in the **logs/** directory to
see events in action!

------------------------------------------------------------------------

## ⚡ Bonus --- Real-Time File Monitor (Advanced Example)

``` js
const fs = require('fs');
const path = './monitorDir';

// Ensure directory exists
fs.mkdir(path, { recursive: true }, (err) => {
  if (err) throw err;
  console.log(`Monitoring directory: ${path}`);

  // Start watching directory
  fs.watch(path, (eventType, filename) => {
    if (filename) {
      console.log(`[${new Date().toLocaleTimeString()}] ${eventType}: ${filename}`);
    }
  });
});
```

**Output Example:**

    [10:30:20 AM] rename: test1.txt
    [10:31:05 AM] change: data.json

------------------------------------------------------------------------

## 🧠 Summary

  Operation          Function                     Description
  ------------------ ---------------------------- ---------------------------
  Create Directory   `fs.mkdir()`                 Creates new directory
  Read Directory     `fs.readdir()`               Lists files/folders
  Remove Directory   `fs.rm()`                    Deletes directories
  File Info          `fs.stat()`                  Fetches metadata
  Check File/Dir     `isFile() / isDirectory()`   Type checking
  Watch File         `fs.watchFile()`             Detects file changes
  Watch Dir          `fs.watch()`                 Monitors directory events

------------------------------------------------------------------------

## 🧭 Practice Challenges

1.  Create a nested folder structure: `data/logs/archive` using
    recursive mkdir.\
2.  Read and display all `.txt` files from a folder.\
3.  Monitor a directory and log any changes in a file `changes.log`.\
4.  Write a script that deletes all empty directories automatically.

------------------------------------------------------------------------

## ✅ Key Takeaways

-   The **`fs` module** gives full control over directories and
    metadata.\
-   **Asynchronous methods** are preferred for non-blocking
    performance.\
-   The **`Stats` object** provides critical details about files and
    directories.\
-   **File watching** enables real-time tracking of file system events
    --- ideal for logging, monitoring, and server automation.

------------------------------------------------------------------------

### 🚀 Next Step:

Move toward **Streams and Buffers in Node.js** --- understanding how
data flows efficiently in memory and file operations.
