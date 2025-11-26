# DBMS --- Schema Validation (MongoDB-focused)

## 1) Quick overview --- what validation is and why it matters

-   **Purpose:** Ensure stored documents follow a predictable structure
    and data types so queries, indexes, and application logic are
    reliable.
-   **When to use:** New collections, schema evolution, data ingestion
    pipelines, microservices that write to DB, or when migrating legacy
    data.
-   **Analogy (relational DB):** Comparable to constraints in SQL.

## 2) Basic JSON Schema concepts

-   `bsonType`
-   `required`
-   `properties`
-   `additionalProperties`
-   `pattern`
-   Length and numeric bounds
-   `items` for arrays

## 3) Example: Create collection with validation

``` js
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username","email"],
      additionalProperties: false,
      properties: {
        username: { bsonType: "string", minLength: 3, maxLength: 30 },
        email: { bsonType: "string", pattern: "^[^@\s]+@[^@\s]+\.[^@\s]+$" },
        age: { bsonType: "int", minimum: 16 },
        roles: {
          bsonType: "array",
          items: { bsonType: "string", enum: ["user","admin","guest"] }
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});
```

## 4) Validation Action vs Level

  ------------------------------------------------------------------------
  Aspect           validationAction         Options         Effect
  -------------- ------------------ ----------------------- --------------
  Behaviour                   error       error/warn        reject or log

  Write scope       validationLevel   strict/moderate/off   full or
                                                            partial
                                                            validation
  ------------------------------------------------------------------------

## 5) JSON Schema patterns

Nested examples, unions, conditional rules.

## 6) Finding invalid documents

Using `$nor` + `$jsonSchema`:

``` js
db.users.find({ $nor: [ { $jsonSchema: { /* schema */ } } ] })
```

## 7) Handling validation errors

-   App-side catching
-   Rollout moderate→strict
-   Bulk-fixing
-   Logging/monitoring

## 8) Versioned schemas

Use `schemaVersion` field, backfill, upgrade.

## 9) Pitfalls

Over-strict early, conditional complexity, index-schema mismatch,
performance overhead.

## 10) Modify existing schema

``` js
db.runCommand({
  collMod: "users",
  validator: { $jsonSchema: { /* new schema */ } },
  validationLevel: "moderate",
  validationAction: "warn"
});
```

## 11) Interview checklist

-   Differences between JSON Schema and SQL constraints
-   Practical tasks
-   System design scenario

## 12) Actionable next steps

1.  Provide collection schema or docs.
2.  Practice validation queries.
3.  Ask for mock interview.
