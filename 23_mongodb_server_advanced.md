# MongoDB Server --- Storage, Configuration, Remote Access & Scripting (Beginner → Advanced)

------------------------------------------------------------------------

## 1. Where MongoDB Stores Data

MongoDB stores all data in a **data directory** managed by the server.

### Default Storage Locations

  OS        Default Path
  --------- --------------------------
  Windows   `C:\data\db`
  Linux     `/var/lib/mongodb`
  macOS     `/usr/local/var/mongodb`

### Files Inside the Data Directory

  File                Purpose
  ------------------- -------------------------
  `collection-*.wt`   Actual collection data
  `index-*.wt`        Index structures
  `journal/*`         Crash recovery
  `WiredTiger`        Storage engine metadata

MongoDB uses the **WiredTiger Storage Engine**, which provides: -
Compression\
- MVCC (faster reads)\
- Document-level locking

------------------------------------------------------------------------

## 2. Configuring MongoDB Server (Beginner → Advanced)

MongoDB server runs using a config file:\
`mongod.cfg` (Windows) or `mongod.conf` (Linux/macOS)

### Example Config File

``` yaml
storage:
  dbPath: /var/lib/mongodb
systemLog:
  destination: file
  path: /var/log/mongodb/mongod.log
net:
  port: 27017
  bindIp: 127.0.0.1
security:
  authorization: enabled
```

------------------------------------------------------------------------

## 3. Changing Data Storage Location

### Linux

``` bash
sudo systemctl stop mongod
sudo mkdir -p /mydata/mongodb
sudo chown -R mongodb:mongodb /mydata/mongodb
```

Edit config file:

``` yaml
storage:
  dbPath: /mydata/mongodb
```

Restart:

``` bash
sudo systemctl start mongod
```

------------------------------------------------------------------------

## 4. Accessing MongoDB Server From Anywhere in the World

### Step 1 --- Allow remote IPs

Edit config file:

``` yaml
net:
  bindIp: 0.0.0.0
  port: 27017
```

### Step 2 --- Open Firewall Port

#### Linux (UFW)

``` bash
sudo ufw allow 27017
```

### Step 3 --- Create Admin User

``` js
use admin
db.createUser({
  user: "globalAdmin",
  pwd: "StrongPassword123",
  roles: ["root"]
})
```

### Step 4 --- Connect Remotely

``` bash
mongosh "mongodb://globalAdmin:StrongPassword123@SERVER_IP:27017/admin"
```

------------------------------------------------------------------------

## 5. Running JavaScript Scripts via Mongo Shell

MongoDB allows running `.js` files.

### Example Script (`insertUser.js`)

``` js
db.users.insertOne({
  name: "Aniket",
  skills: ["MongoDB", "Node.js"],
  createdAt: new Date()
})
```

### Run Script

``` bash
mongosh insertUser.js
```

### Script With Database Selection

``` js
const dbname = "company";
const db = connect(`mongodb://localhost:27017/${dbname}`);
db.products.insertOne({ item: "Laptop", price: 50000 });
```

Run:

``` bash
mongosh script.js
```

------------------------------------------------------------------------

## 6. MongoDB Playground (VS Code)

MongoDB Playground lets you run MongoDB code directly inside VS Code.

or

MongoDB Playground is a built-in scripting environment inside VS Code that allows you to write, run, and test MongoDB queries just like you use mongosh, but with more convenience.

### Install Steps

1.  Install **MongoDB for VS Code extension**\
2.  Open Command Palette → "MongoDB: Open Playground"\
3.  Run JS-like queries.

### Example Playground Code

``` js
use("students");

db.marks.insertMany([
  { name: "Ram", score: 86 },
  { name: "Shyam", score: 92 }
]);

db.marks.find();
```

### Features

-   Auto schema detection\
-   Run queries inside VS Code\
-   Export results\
-   Visual explain plan

------------------------------------------------------------------------

## 7. Advanced Server Configurations

### Enable Authentication

``` yaml
security:
  authorization: enabled
```

### Enable Replication

``` yaml
replication:
  replSetName: "rs0"
```

### Enable Sharding

``` yaml
sharding:
  clusterRole: "shardsvr"
```

### Enable TLS/SSL

``` yaml
net:
  ssl:
    mode: requireSSL
    PEMKeyFile: /etc/ssl/mongo.pem
```

------------------------------------------------------------------------

## 8. Best Practices

  Area          Best Practice
  ------------- --------------------------------------------------
  Security      Never expose MongoDB without user authentication
  Networking    Allow specific IP ranges only
  Backup        Enable `mongodump` + `mongorestore` scheduling
  Performance   Use indexes and WiredTiger compression
  Logging       Rotate logs weekly

------------------------------------------------------------------------
