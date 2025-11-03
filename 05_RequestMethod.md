# HTTP Methods in Express.js


**What Does Non-Idempotent Mean?**

Non-idempotent means that repeating the same action can result in different outcomes or side effects each time.


**What Does Idempotent Mean?**

Idempotent means that no matter how many times you repeat the same action, the result will always be the same. It doesn’t cause any unintended changes.



| **Method** | **Purpose**                             | **Idempotent** | **Typical Use Case**          |
|------------|-----------------------------------------|----------------|------------------------------|
| `GET`      | Retrieve data from the server           | Yes            | Fetching data, read operations|
| `POST`     | Submit data to the server               | No             | Creating new resources        |
| `PUT`      | Update an entire resource               | Yes            | Replacing a resource          |
| `PATCH`    | Partially update a resource             | Yes (typically) | Updating partial fields       |
| `DELETE`   | Remove a resource                       | Yes            | Deleting resources            |
| `OPTIONS`  | Get the allowed HTTP methods for a URL  | N/A            | Checking allowed methods      |
| `HEAD`     | Retrieve headers without body           | Yes            | Checking resource metadata    |
