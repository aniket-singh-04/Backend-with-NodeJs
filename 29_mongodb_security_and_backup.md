
# MongoDB Backup, Restore & Security (Simple to Advanced)

## 1. Backup & Restore (mongodump & mongorestore)

### 📘 What is Backup?
Saving a copy of your database so you can recover it if something goes wrong.

### 💻 `mongodump`
Creates a **backup** of a MongoDB database.

**Example:**
```
mongodump --db mydb --out backup_folder/
```

### 💻 `mongorestore`
Restores data from a backup.

**Example:**
```
mongorestore --db mydb backup_folder/mydb/
```

---

## 2. mongoimport & mongoexport

### 📘 What are they?
Tools used to move data **in and out** of MongoDB in JSON/CSV formats.

### 💻 Export Data
```
mongoexport --db mydb --collection users --out users.json
```

### 💻 Import Data
```
mongoimport --db mydb --collection users --file users.json
```

---

## 3. Authentication & Authorization

### 📘 Authentication  
Verifying **who you are** (login).

### 📘 Authorization  
Verifying **what you can do** (permissions).

### 💻 Create Admin User
```
use admin
db.createUser({
  user: "admin",
  pwd: "pass123",
  roles: ["root"]
})
```

---

## 4. Replica Set Authentication

### 📘 Why Needed?
Replica sets must trust each other for secure communication.

### 🗝️ Keyfile Authentication
A shared secret file used by all members.

**Steps:**
1. Create keyfile  
2. Set permissions  
3. Add to each replica set member  
4. Restart nodes  

**Example keyfile setting:**
```
security:
  keyFile: /data/keyfile
  authorization: enabled
```

---

If you want detailed diagrams, interview questions, or examples — tell me anytime!
