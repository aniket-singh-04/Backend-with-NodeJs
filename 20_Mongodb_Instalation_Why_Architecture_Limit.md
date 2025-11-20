# Introduction to MongoDB

## What is MongoDB?

MongoDB is a **NoSQL, document-oriented database** that stores data in flexible **BSON** (Binary JSON) format.

### Key Features

* Schema-less (flexible structure)
* High performance and scalability
* Ideal for Big Data, real-time applications
* Easy to use with JavaScript / Node.js

### Real-life Uses

* Social media apps
* E-commerce product catalogs
* Real-time analytics dashboards

Example Document:

```json
{
  "_id": 1,
  "name": "Alex",
  "skills": ["Node.js", "MongoDB"],
  "age": 22
}
```
---
## DBMS
A Database Management System (DBMS) consists of a database server, which stores and manages data, and database clients, which interact with the server to perform operations. In most applications, developers use database drivers or libraries within their code as the client to retrieve or manipulate data.

---

---
## Why Use Databases?

1. **Organized Data Storage**: 
   Efficiently store and structure data for easy access and management.

2. **Efficient Data Retrieval**: 
   Retrieve and process data quickly, even from large datasets, using powerful query capabilities.

3. **Data Consistency and Integrity**: 
   Maintain accuracy and reliability of data with rules like constraints and keys.

4. **Security**: 
   Protect sensitive data with authentication, encryption, and access controls.

5. **Scalability**: 
   Handle growing data and user demands by scaling vertically or horizontally.

6. **Separation of Concerns**: 
   Databases decouple data storage from application logic, ensuring clean architecture and modularity. 
   For example, a backend server focuses on business logic while the database manages data storage and retrieval.

---


---
ISAM (Indexed Sequential Access Method) is a file organization method used for managing and accessing data in a sequential and indexed manner. It was developed by IBM in the 1960s as a way to efficiently store and retrieve data in large datasets.

---

## MongoDB Components

| Component  | Role                              |
| ---------- | --------------------------------- |
| Database   | Container for collections         |
| Collection | Group of documents (like a table) |
| Document   | JSON-like object (like a row)     |
| Field      | Key-value pair inside a document  |

---

# Understanding Mongo Shell

The **Mongo Shell** is a command-line interface used to interact with MongoDB.
You write JavaScript-like commands to create, read, update, and delete data.

### Basic Commands

| Command                          | Description            |
| -------------------------------- | ---------------------- |
| `show dbs`                       | Show all databases     |
| `use mydb`                       | Switch/create database |
| `show collections`               | Show all collections   |
| `db.collection.find()`           | Read data              |
| `db.collection.insertOne({...})` | Insert a document      |

Example:

```js
use students

db.info.insertOne({name: "Riya", age: 20})

db.info.find()
```

---

# Installing MongoDB Server

## Installation Steps (Windows)

1. Download MongoDB Community Server from official website
2. Install with default settings
3. Install MongoDB Compass (GUI tool for visual access)
4. Add MongoDB to **system PATH** if not done automatically
5. Start database using **MongoDB Service**

### Verification Commands

Open terminal and run:

```bash
mongod --version
mongo --version
```

If version shows ➝ installation successful 🎯

---

## MongoDB Directory Structure

| Folder     | Purpose                                  |
| ---------- | ---------------------------------------- |
| `/data/db` | Default location for database files      |
| `/bin`     | Mongo commands like `mongo` and `mongod` |

> Tip: Create `C:/data/db` manually if missing.

---

## Using MongoDB Compass

Visual tool where you can:

* Create databases & collections with UI
* Run queries
* Explore data graphically

Example Filters:

```json
{ "age": { "$gt": 18 } }
```

---
## **5 Reasons to Use MongoDB with Node.js**

1. **Native JSON Support**: MongoDB stores data in BSON (JSON-like), making it easy to exchange data between Node.js and the database without transformation.

2. **Asynchronous Compatibility**: Both are non-blocking, allowing smooth integration with Node.js’s event-driven architecture for faster data operations.

3. **Flexible Schema**: MongoDB's schema-less design aligns well with Node.js, enabling dynamic data structures and quick adaptation to changing requirements.

4. **High Scalability**: MongoDB's sharding and horizontal scaling capabilities pair well with Node.js for handling large-scale applications.

5. **Integration with Tools**: Libraries like Mongoose make data modeling, validation, and querying in Node.js seamless when using MongoDB.



# MongoDB Limits and Thresholds

## 1. Document Size Limits
- **Maximum Document Size**: 16MB (BSON format)
  - Affects: Single document storage, embedded arrays/objects
  - Exception: GridFS for larger files

- **Maximum Array Elements**: ~4,000,000 (practical limit)
- **Maximum Nesting Depth**: 100 levels

## 2. BSON Data Types
- **String**: 16MB maximum
- **Binary Data**: 16MB (use GridFS for larger)
- **Number Precision**: 
  - 64-bit for integers (Long)
  - 64-bit IEEE 754 for doubles

## 3. Indexing Limits
| Limit Type                     | Value               |
|--------------------------------|---------------------|
| Indexes per Collection         | 64                  |
| Index Key Length               | 1024 bytes          |
| Compound Index Fields          | 32 fields           |
| Text Index Fields per Document | 1                   |
| Sharded Cluster Index Key Size | 512 bytes           |

## 4. Sharding Limits
- **Shard Key**: 
  - Immutable after creation
  - Maximum size: 512 bytes
- **Maximum Shards**: 1024
- **Chunk Size**: 1MB-1024MB (default 64MB)

## 5. Replication Limits
- **Replica Set Members**: 
  - Maximum 50 members
  - Maximum 7 voting members
- **Oplog Size**: 
  - Minimum 990MB (default for 64-bit systems: 5% disk space)

## 6. Query Limitations
| Operation                  | Limit                |
|----------------------------|----------------------|
| Result Set Size            | 32MB per query       |
| Sort Memory                | 32MB (without index) |
| Aggregation Pipeline Stages| 100 stages           |
| Aggregation Memory         | 100MB per stage      |

## 7. Connection Limits
| Deployment Type       | Default Connection Limit |
|-----------------------|---------------------------|
| MongoDB Atlas         | 500 connections/server    |
| Self-Managed Community| 16,000 connections        |
| Self-Managed Enterprise| 125,000 connections       |

## 8. Write Operations
- **Atomicity**: Single document level
- **Write Throughput**: ~100,000 ops/sec per shard
- **Bulk Write Batch Size**: 100,000 operations

## 9. Database/Collection Limits
| Entity           | Limit                         |
|------------------|-------------------------------|
| Databases        | 40 (Atlas limit per project)  |
| Collections      | 1000 per database (namespace) |
| Namespace Length | 123 bytes (db.collection)     |

## 10. Security Limits
- **Authentication**:
  - 16MB user name limit (LDAP)
  - 250 roles per user
- **X.509 Certificates**:
  - 25 attributes per certificate

## 11. MongoDB Atlas Specific
- **Document Storage**: 512MB per document
- **Free Tier**: 
  - 512MB storage
  - Shared RAM
- **Backups**: 2 days retention (free tier)

## Important Notes
1. Most limits are configurable (except fundamental BSON/document limits)
2. Workarounds exist for many limits (e.g., GridFS for large files)
3. Monitor with `db.serverStatus()` and `currentOp`

[Official MongoDB Limits Documentation](https://www.mongodb.com/docs/manual/reference/limits/)



# Understanding 1-Tier, 2-Tier, and 3-Tier Architecture

When building software applications, understanding the architecture is crucial. The architecture determines how the components of an application (UI, logic, and data) are distributed and interact. Below, we explore **One-Tier**, **Two-Tier**, and **Three-Tier Architecture**.

---

## **1. One-Tier Architecture**

In **one-tier architecture**, all components of the application (UI, business logic, and data) exist on the **same system or environment**. It is the simplest form of application architecture.

### **Key Features**

- All processes run on the same machine.
- Typically used in standalone applications.
- Suitable for simple use cases where scalability is not required.

### **Examples**

- A calculator application.
- A text editor like Notepad.
- Offline mobile apps storing data locally.
- A basic HTML/CSS/JS site using `localStorage` for data persistence.

---

## **2. Two-Tier Architecture**

In **two-tier architecture**, the application is divided into two layers:

1. **Client (Presentation Layer):** Handles the user interface.
2. **Server (Data Layer):** Handles database or data storage and processing.

The client communicates directly with the server. This architecture is often called **client-server architecture**.

### **Key Features**

- The logic and data are processed on the server, while the UI is handled on the client.
- The client and server communicate over a network (e.g., via HTTP or database queries).
- Better scalability than one-tier but limited flexibility.

### **Examples**

- Our StorageApp before integrating the database.
- Legacy Desktop App with Direct Database Connection

---

## **3. Three-Tier Architecture**

In **three-tier architecture**, the application is divided into three distinct layers:

1. **Presentation Layer (Client):** Handles the UI and user interaction.
2. **Application Layer (Logic):** Contains the business logic and processing.
3. **Data Layer (Database):** Manages and stores the data.

This architecture introduces an **application layer** between the client and the database. The client never interacts directly with the database.

### **Key Features**

- Separation of concerns: Each layer is independent and easier to maintain.
- Highly scalable and suitable for large, distributed systems.
- Common in modern web applications and enterprise software.

### **Examples**

- A web application with:
  - Frontend (React, Angular) → **Presentation Layer**
  - Backend (Node.js, Django, SpringBoot) → **Application Layer**
  - Database (MongoDB, MySQL) → **Data Layer**
- Our StorageApp after integrating the database.



# Understanding N-Tier Architecture

N-Tier Architecture (also called **Multi-Tier Architecture**) is a software architecture model where the application is divided into **multiple logical layers (or tiers)**. Each layer is responsible for a specific aspect of the application, such as presentation, business logic, or data management.

---

## **What is N-Tier Architecture?**

In N-Tier Architecture:
- The application is divided into **n layers** (typically 3 or more).
- Each layer is **independent** and performs a specific function.
- Layers communicate with each other in a structured way, ensuring modularity and scalability.

**N-Tier** simply means there are **more than 3 layers**, with the **exact number of layers depending on the complexity of the application**.

---

## **Key Components of N-Tier Architecture**

Here are the most common tiers in an N-Tier Architecture:

### **1. Presentation Layer (UI)**
- **What it does:** 
  - Handles the user interface and user experience.
  - Displays data to users and collects input.
- **Technologies:** 
  - Web: React, Angular, Vue.js.
  - Mobile: Swift, Kotlin, Flutter.

### **2. Application Layer (Logic Layer)**
- **What it does:**
  - Contains the business logic (rules, workflows, etc.).
  - Processes user inputs, interacts with the data layer, and sends responses back to the presentation layer.
- **Technologies:**
  - Backend frameworks like Node.js, Django, Spring, Laravel.

### **3. Data Layer**
- **What it does:**
  - Manages the storage, retrieval, and organization of data.
  - Usually involves a database or file storage system.
- **Technologies:**
  - Databases: MySQL, MongoDB, PostgreSQL.
  - File Storage: AWS S3, Azure Blob Storage.

### **4. Integration Layer (Optional)**
- **What it does:**
  - Acts as an intermediary for integrating external services or APIs.
  - Handles third-party API calls, messaging queues, etc.
- **Technologies:**
  - Kafka, RabbitMQ, RESTful APIs, GraphQL.

### **5. Security Layer (Optional)**
- **What it does:**
  - Implements security measures such as authentication, authorization, and encryption.
- **Technologies:**
  - OAuth, JWT, Firewalls.

---

## **How is N-Tier Different from 3-Tier?**

- **3-Tier Architecture** is a specific case of N-Tier with **exactly 3 layers** (Presentation, Application, and Data).
- **N-Tier Architecture** has **more than 3 layers**, with additional layers like integration, caching, and security depending on the complexity of the application.

---

## **Benefits of N-Tier Architecture**

1. **Modularity:**
   - Each layer performs a specific role, making the system more organized.
2. **Scalability:**
   - Each layer can be scaled independently based on its workload.
3. **Maintainability:**
   - Easier to debug and update specific layers without affecting others.
4. **Flexibility:**
   - Supports integration with third-party services, microservices, or legacy systems.
5. **Security:**
   - Sensitive data and operations can be isolated in specific layers.

---

## **Challenges of N-Tier Architecture**

1. **Increased Complexity:**
   - More layers mean more communication overhead and higher setup time.
2. **Performance Overhead:**
   - Communication between layers can introduce latency.
3. **Cost:**
   - Maintaining multiple layers can increase development and infrastructure costs.

---

## **Examples of N-Tier Applications**

1. **E-Commerce Platforms**
   - Example: Amazon, eBay
   - **Tiers:**
     - Presentation: Web or mobile app.
     - Application: Backend for business logic (e.g., managing orders).
     - Data: Database for product inventory and user details.
     - Integration: Payment gateways (e.g., Stripe, PayPal).

2. **Banking Applications**
   - Example: Net banking, mobile banking apps
   - **Tiers:**
     - Presentation: User interface for accessing accounts.
     - Application: Transaction processing logic.
     - Data: Database storing user accounts and transactions.
     - Security: Authentication and encryption.

3. **Streaming Platforms**
   - Example: Netflix, YouTube
   - **Tiers:**
     - Presentation: App or website for viewing content.
     - Application: Backend logic for recommending and streaming content.
     - Data: Database for user preferences and video metadata.
     - Caching Layer: To cache popular content for faster delivery.

## **When to Use N-Tier Architecture**

1. **Complex Applications:**
   - Applications requiring additional layers like security, caching, or integration.
2. **Enterprise Systems:**
   - Large-scale systems with many users and complex workflows.
3. **Distributed Applications:**
   - Systems spread across multiple servers or geographic locations.

