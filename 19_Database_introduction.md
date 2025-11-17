# Introduction to Databases

## What is a Database?
A **database** is an organized collection of data that allows efficient storage, retrieval, and management of information.

### Key Features
- Stores data in a structured way
- Allows fast searching and updates
- Ensures data consistency and security

### Real-life Examples
- Contacts list in a phone
- Banking systems storing account information
- E-commerce apps storing products and orders

---

## Why Do We Need Databases?
- To avoid **data duplication**
- To maintain **data security and integrity**
- To support **multi-user access**
- To ensure fast performance

Example:
> A small business can store customer data in Excel, but once thousands of customers come, Excel fails. A database solves performance and organization challenges.

---

## Evolution of Databases
| Generation | Type | Example Uses |
|-----------|------|--------------|
| 1st | File Systems | Old applications storing files locally |
| 2nd | Hierarchical DB | Telecom, mainframes |
| 3rd | Network DB | Large industrial systems |
| 4th | Relational DB | Banking, ERP, e-commerce |
| 5th | NoSQL DB | Big Data, IoT, social media |

---

# Types of Databases
Databases can be categorized based on how they store data.

## 1️⃣ Relational Databases (SQL)
Data stored in **rows & columns** (tables).

### Examples
- MySQL
- PostgreSQL
- Oracle
- SQL Server

### Core Concepts
| Term | Meaning |
|------|---------|
| Table | Data storage structure |
| Row | Single record |
| Column | Attribute of data |
| Primary Key | Unique identifier for each row |
| Foreign Key | Links two tables |

### ACID Properties
| Property | Meaning |
|---------|--------|
| Atomicity | All or nothing execution |
| Consistency | Database must remain valid |
| Isolation | Multiple users don’t affect each other |
| Durability | Data stays safe after system failure |

### Example SQL Query
```sql
SELECT name, email FROM users WHERE age > 18;
```

---

## 2️⃣ Non-Relational Databases (NoSQL)
Designed for **flexible, unstructured or semi‑structured** data.

### Uses
- Big Data
- Real-time analytics
- Social media platforms

### Types of NoSQL Databases
| Type | Storage Model | Examples |
|------|---------------|---------|
| Document | JSON-like documents | MongoDB, CouchDB |
| Key‑Value | Key + Value pairs | Redis, DynamoDB |
| Columnar | Column storage | Cassandra, HBase |
| Graph | Nodes & relationships | Neo4j |

### CAP Theorem
A NoSQL database can only guarantee **2 out of 3**:
- **C**onsistency
- **A**vailability
- **P**artition Tolerance

Example:
```json
{
  "_id": 101,
  "name": "John Doe",
  "skills": ["MongoDB", "Node.js"]
}
```
(Document DB sample)

---

## Other Database Types
| Type | Example Use |
|------|-------------|
| Graph DB | Social networks, recommendation engines |
| Time-series DB | IoT sensors, stock markets |
| Distributed DB | Cloud systems (Google Spanner) |
| In-memory DB | Caching for performance (Redis) |

---

# Relational vs Non‑Relational Databases: Key Differences
| Feature | Relational (SQL) | Non‑Relational (NoSQL) |
|--------|------------------|------------------------|
| Data Structure | Tables | Documents / Key‑Value / Graph |
| Schema | Fixed | Flexible |
| Query Language | SQL | No fixed standard |
| Scaling | Vertical (scale‑up) | Horizontal (scale‑out) |
| Best For | Structured data | Unstructured / Big Data |
| Examples | MySQL, PostgreSQL | MongoDB, Redis |

---

## When to Use Which?
### Use SQL when:
- Data is structured
- Transactions are critical (banking)
- Strong consistency needed

### Use NoSQL when:
- Large scale + high speed required
- Unstructured or semi-structured data
- Real‑time data like social media

---


## Final Summary
- **Databases** keep data organized and secure.
- **SQL** is best for structured, transactional data.
- **NoSQL** handles massive and flexible data at scale.
- Knowing both is essential for modern applications.

---

📘 You are now ready to learn CRUD operations and indexing next!

