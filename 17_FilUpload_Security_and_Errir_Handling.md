# ⚙️ Advanced File Handling in Node.js: File Uploads, Security, and Error Management

## 🎯 Goal

Learn how to handle **file uploads**, implement **secure file
operations**, and manage **errors** effectively in Node.js applications.

------------------------------------------------------------------------

## 🧠 Introduction

In real-world applications, users often upload files (like images, PDFs,
or videos).\
However, handling uploads carelessly can lead to **security risks** and
**server crashes**.\
This guide covers everything from **file upload basics** to **secure and
reliable file handling**.

------------------------------------------------------------------------

## 📤 1️⃣ File Uploads in Node.js

### 🧩 Understanding Multipart Form Data

When users upload files using an HTML form, the browser sends data as
**multipart/form-data**.\
Unlike JSON or URL-encoded data, this format splits files and text
fields into separate parts.

Example form (frontend):

``` html
<form action="/upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="myFile" />
  <button type="submit">Upload</button>
</form>
```

The `enctype="multipart/form-data"` ensures the file is properly encoded
before sending to the server.

------------------------------------------------------------------------

## 📦 2️⃣ Using Multer for File Uploads

### 🧰 What is Multer?

Multer is a Node.js middleware for handling multipart/form-data.\
It makes file uploads in Express applications simple and efficient.

### 🛠️ Installing Multer

``` bash
npm install multer
```

### ⚙️ Basic Setup Example

``` js
const express = require('express');
const multer = require('multer');
const app = express();

// Set storage location and filename format
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // directory to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // rename file
  }
});

const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('myFile'), (req, res) => {
  res.send('File uploaded successfully!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

🔍 **Explanation** - `upload.single('myFile')` handles single-file
uploads (field name must match input name). - Files are stored in the
`uploads/` directory. - Filenames are timestamped for uniqueness.

------------------------------------------------------------------------

## 💾 3️⃣ Handling Files in Memory

Sometimes, you may want to process the file in memory without saving it
to disk (e.g., for image processing or uploading to cloud storage).

``` js
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('myFile'), (req, res) => {
  console.log(req.file.buffer); // Buffer data of uploaded file
  res.send('File processed in memory!');
});
```

Here, `req.file.buffer` contains the binary data of the file.

------------------------------------------------------------------------

## 🔐 4️⃣ Security Considerations for File Handling

Improper file handling can open your application to serious
vulnerabilities.\
Let's explore how to mitigate these issues.

### 🧱 A. Preventing Directory Traversal Attacks

Attackers can try to access files outside your upload folder using
patterns like `../../etc/passwd`.

✅ **Solution:**\
Use only controlled directories and sanitize file paths using Node's
built-in `path` module.

``` js
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // safe path
  },
  filename: (req, file, cb) => {
    const safeName = path.basename(file.originalname);
    cb(null, Date.now() + '-' + safeName);
  }
});
```

### 🧼 B. Sanitizing File Names and Extensions

Avoid saving executable or suspicious files directly.

✅ **Example:**

``` js
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only images and PDFs are allowed!'));
    }
    cb(null, true);
  }
});
```

### ⚠️ C. Set File Size Limits

Prevent denial-of-service attacks due to large uploads.

``` js
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit
});
```

------------------------------------------------------------------------

## 🧰 5️⃣ File Permission Handling

When saving files, ensure permissions are secure and restricted.

**Example:**

``` js
const fs = require('fs');

fs.chmod('uploads/myFile.txt', 0o600, (err) => {
  if (err) console.error('Permission change failed:', err);
  else console.log('Permissions set to read/write for owner only.');
});
```

`0o600` means only the file owner can read and write (no public access).

------------------------------------------------------------------------

## 🚨 6️⃣ Error Handling in File Operations

File-related errors are common --- missing files, permission issues,
wrong paths, etc.\
Node.js provides robust ways to handle them safely.

### 🧱 A. Handling File Errors with try-catch (Async/Await)

``` js
const fs = require('fs').promises;

async function readFileSafely() {
  try {
    const data = await fs.readFile('nonexistent.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error reading file:', err.message);
  }
}

readFileSafely();
```

### 🧱 B. Handling Stream Errors

When working with streams, you must attach error listeners to avoid
silent failures.

``` js
const fs = require('fs');

const readStream = fs.createReadStream('file.txt');
readStream.on('error', (err) => {
  console.error('Stream Error:', err.message);
});
```

### 🧱 C. Handling Multer Errors Gracefully

You can handle upload-related errors like invalid file type or size
limit using middleware.

``` js
app.post('/upload', (req, res) => {
  upload.single('myFile')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send('Multer Error: ' + err.message);
    } else if (err) {
      return res.status(500).send('Unknown Error: ' + err.message);
    }
    res.send('File uploaded successfully!');
  });
});
```

------------------------------------------------------------------------

## 🧪 Hands-on Practice

### 🧩 Program 1 --- Simple File Upload System

``` js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg'];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'));
  }
});

app.post('/upload', upload.single('myFile'), (req, res) => {
  res.send('File uploaded: ' + req.file.filename);
});

app.listen(4000, () => console.log('Server running on port 4000'));
```

### 🧩 Program 2 --- Error Handling for Missing Files

``` js
const fs = require('fs');

fs.readFile('nonexistent.txt', 'utf8', (err, data) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('File not found!');
    } else if (err.code === 'EACCES') {
      console.error('Permission denied!');
    } else {
      console.error('Unknown error:', err);
    }
  } else {
    console.log(data);
  }
});
```

### 🧩 Program 3 --- Secure Upload with Sanitization and Error Catching

``` js
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    cb(null, Date.now() + '-' + safeName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg'];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type!'));
  }
});

app.post('/upload', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ message: 'Upload successful', file: req.file.filename });
    }
  });
});

app.listen(5000, () => console.log('Secure upload server on port 5000'));
```

------------------------------------------------------------------------

## 🧠 Summary

  ------------------------------------------------------------------------------
  Concept              Description                   Example
  -------------------- ----------------------------- ---------------------------
  Multer               Handles multipart form data   `multer.diskStorage()`

  Memory Uploads       Store files in memory         `multer.memoryStorage()`

  Security             Validate file type, name,     File filter, path
                       size                          sanitization

  Error Handling       Catch file and stream errors  `try-catch`,
                                                     `stream.on('error')`

  Permissions          Restrict file access          `fs.chmod('file', 0o600)`