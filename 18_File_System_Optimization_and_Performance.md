# ⚡ Optimizing File Handling in Node.js

## 🎯 Goal

Learn about **performance considerations** and how to **optimize file
handling** in Node.js --- focusing on large file processing, concurrency
management, and caching strategies.

------------------------------------------------------------------------

## 🧠 Introduction

As applications scale, file operations can become **performance
bottlenecks** --- especially when handling: - Gigabyte-sized files -
Multiple simultaneous read/write operations - Repeatedly accessed data

Node.js provides several techniques to make file handling **efficient,
safe, and scalable**.

------------------------------------------------------------------------

## 📂 1️⃣ Handling Large Files Efficiently

When dealing with large files (like videos, logs, or datasets),
**reading or writing them fully into memory** can crash your program due
to **memory overflow**.

### 🚫 Inefficient Approach (Full File Loading)

``` js
const fs = require('fs');

fs.readFile('largeFile.txt', (err, data) => {
  if (err) throw err;
  console.log('File loaded into memory!');
});
```

This approach loads the entire file into RAM --- bad for files larger
than available memory.

### ✅ Efficient Approach (Streaming Data)

Use streams to process data chunk-by-chunk.

``` js
const fs = require('fs');

const readStream = fs.createReadStream('largeFile.txt', 'utf8');
const writeStream = fs.createWriteStream('copy_largeFile.txt');

readStream.pipe(writeStream);

readStream.on('end', () => console.log('Large file copied successfully!'));
```

💡 **Why it's efficient:** - Memory usage stays low. - Works well even
for multi-GB files. - Streams automatically handle backpressure (balance
between read/write speed).

### 🧩 Working with Data Chunks

You can process each chunk as it arrives.

``` js
const fs = require('fs');

const stream = fs.createReadStream('data.log', { highWaterMark: 64 * 1024 }); // 64KB chunks

let lineCount = 0;
stream.on('data', (chunk) => {
  lineCount += chunk.toString().split('\n').length;
});

stream.on('end', () => console.log(`Total lines: ${lineCount}`));
```

🔹 The **highWaterMark** option defines chunk size.\
🔹 Processing chunks individually avoids loading the entire file.

------------------------------------------------------------------------

## ⚙️ 2️⃣ Concurrency and Race Conditions

### ⚠️ The Problem

When multiple requests or processes try to read/write the same file,
race conditions can occur --- causing data corruption or loss.

Example of race condition:

``` js
fs.writeFile('data.txt', 'Hello', () => {});
fs.writeFile('data.txt', 'World', () => {});
// The final content may be unpredictable!
```

### ✅ Solution 1 --- Sequential Writes with Async Queue

Use a queue system or async/await to serialize file operations.

``` js
const fs = require('fs').promises;

async function safeWrite(file, content) {
  try {
    await fs.appendFile(file, content + '\n');
    console.log('Write successful!');
  } catch (err) {
    console.error('Error writing:', err);
  }
}

async function run() {
  await safeWrite('logs.txt', 'User A wrote');
  await safeWrite('logs.txt', 'User B wrote');
}

run();
```

Each write waits for the previous one to finish --- avoiding race
conflicts.

### ✅ Solution 2 --- File Locks (via external libraries)

Node.js doesn't have native file locking, but libraries like
`proper-lockfile` can ensure exclusive access.

**Example:**

``` bash
npm install proper-lockfile
```

``` js
const lockfile = require('proper-lockfile');
const fs = require('fs');

async function safeUpdate() {
  const release = await lockfile.lock('data.txt');

  fs.appendFileSync('data.txt', 'Secured write!\n');

  await release();
  console.log('Lock released safely!');
}

safeUpdate();
```

🔐 **Use Case:** Multi-process systems (like APIs or background jobs)
that write to shared files.

### ✅ Solution 3 --- Temporary Files for Parallel Writes

Instead of multiple processes writing to the same file, each process
writes to a temporary file, and results are merged later.

``` js
fs.writeFile(`temp_${process.pid}.log`, 'Process-specific data', (err) => {
  if (err) throw err;
  console.log('Written safely to temp file');
});
```

------------------------------------------------------------------------

## 🧮 3️⃣ File System Caching

Repeatedly accessing the same files (like configuration, templates, or
JSON data) slows down your app.\
To fix this, we use caching --- storing the file's content temporarily
in memory.

### 🧠 Why Use Caching?

-   Avoid redundant disk reads
-   Improve performance for static or infrequently updated files
-   Reduce I/O overhead

### 🧰 Option 1 --- Manual In-Memory Caching

``` js
const fs = require('fs');

const cache = {};

function readCachedFile(filePath) {
  if (cache[filePath]) {
    console.log('Serving from cache');
    return Promise.resolve(cache[filePath]);
  }

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) reject(err);
      cache[filePath] = data;
      resolve(data);
    });
  });
}

(async () => {
  const content1 = await readCachedFile('info.txt');
  console.log(content1);
  const content2 = await readCachedFile('info.txt');
  console.log(content2);
})();
```

💡 The second read is served directly from memory --- no disk access!

### 🧰 Option 2 --- Using node-cache

Install the library:

``` bash
npm install node-cache
```

Implementation:

``` js
const NodeCache = require('node-cache');
const fs = require('fs');

const cache = new NodeCache({ stdTTL: 60 }); // cache for 60 seconds

function readFileWithCache(filePath, callback) {
  const cachedData = cache.get(filePath);
  if (cachedData) {
    console.log('Serving from node-cache');
    return callback(null, cachedData);
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return callback(err);
    cache.set(filePath, data);
    callback(null, data);
  });
}

readFileWithCache('data.json', (err, data) => {
  if (err) throw err;
  console.log('File Content:', data);
});
```

### 🧰 Option 3 --- Redis-Based Caching (Distributed Systems)

For multi-server environments, Redis is ideal for centralized caching.

Install dependencies:

``` bash
npm install redis
```

Example:

``` js
const fs = require('fs');
const redis = require('redis');

const client = redis.createClient();
client.connect();

async function getFileWithRedis(filePath) {
  let cached = await client.get(filePath);
  if (cached) {
    console.log('Serving from Redis Cache');
    return cached;
  }

  const data = await fs.promises.readFile(filePath, 'utf8');
  await client.set(filePath, data, { EX: 60 });
  console.log('Stored in Redis Cache');
  return data;
}

(async () => {
  const content = await getFileWithRedis('data.txt');
  console.log(content);
})();
```

------------------------------------------------------------------------



## 📊 Performance Comparison (Example)

  ------------------------------------------------------------------------
  Operation                 Without Optimization   With Streams/Caching
  ------------------------- ---------------------- -----------------------
  Reading 1GB File          2.8 GB RAM used        100 MB RAM used

  Multiple File Writes      Risk of corruption     Safe and consistent

  Frequent File Reads       High latency           Served instantly from
                                                   cache
