# DBMS --- Transactions, ACID, Implementation, and Data Modeling

*(Simple explanation from basics → advanced)*

------------------------------------------------------------------------

# 1. What Are Transactions?

## 🔹 Basic Idea

A **transaction** is a group of operations that must behave like a
single unit.\
Either **all operations succeed**, or **none of them happen**.

### Example (Bank)

-   Deduct ₹500 from A\
-   Add ₹500 to B

If one fails, the other should NOT happen.\
A transaction ensures consistency.

------------------------------------------------------------------------

# 2. ACID Properties (Very Simple Explanation)

ACID explains how transactions stay reliable.

## ✔ A --- Atomicity

"All or nothing."\
If one part fails, the entire transaction rolls back.

## ✔ C --- Consistency

Data must move from one valid state to another.\
Example: balance can't go negative if rules forbid it.

## ✔ I --- Isolation

Transactions must not interfere with each other.

Isolation Levels: - Read Uncommitted\
- Read Committed\
- Repeatable Read\
- Serializable

## ✔ D --- Durability

Once committed, data remains saved even if system crashes.

------------------------------------------------------------------------

# 3. Implementing Transactions in Code

## 🔹 Pseudo-code

    start transaction
    try:
        step1()
        step2()
        commit
    except:
        rollback

## 🔹 SQL Example

``` sql
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;
```

## 🔹 MongoDB Example

``` js
const session = client.startSession();
session.startTransaction();
try {
  await accounts.updateOne({id:1}, {$inc:{balance:-500}}, {session});
  await accounts.updateOne({id:2}, {$inc:{balance:500}}, {session});
  await session.commitTransaction();
} catch {
  await session.abortTransaction();
}
session.endSession();
```

------------------------------------------------------------------------

# 4. Embedded vs Referenced Documents

## 🔹 Embedded Documents (Stored inside parent)

Example:

    {
      name: "Ram",
      address: { city:"Delhi", pin:110001 }
    }

**Use when:** - Data read together\
- 1-1 or small 1-M\
- Few updates

## 🔹 Referenced Documents (Stored separately)

Example:

    user { _id:1, order_ids:[11,12] }
    order { _id:11, amount:450 }

**Use when:** - Large data\
- Frequent updates\
- M-M relationships

------------------------------------------------------------------------

# 5. Relationships: 1-1, 1-M, M-M

## 🔹 1-1 Example

Person ↔ Passport\
- Embed when small\
- Reference when large

## 🔹 1-M Example

User ↔ Orders\
- Embed for small lists\
- Reference for large, growing lists

## 🔹 M-M Example

Students ↔ Courses\
Use linking table/collection:

    enrollment { student_id:20, course_id:3 }

------------------------------------------------------------------------

# Summary Table

  Concept       Meaning               Use Case
  ------------- --------------------- -------------------
  Transaction   Group of operations   Banking, payments
  ACID          Safety rules          Reliable systems
  Embedded      Data inside parent    Small 1-1, 1-M
  Referenced    Stored separately     Large data, M-M
  1-1           One to one            User-Profile
  1-M           One to many           User-Orders
  M-M           Many to many          Students-Courses

------------------------------------------------------------------------
