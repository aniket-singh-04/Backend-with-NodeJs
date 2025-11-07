# 🚀 Express.js Routing — Dynamic, Nested, and Regex Routes

## 🌱 1️⃣ Basic Level — Simple Meaning

In **Express.js**, routing means defining which function runs when a particular URL is hit.

### Example
```javascript
app.get('/users', (req, res) => {
  res.send('All users');
});
```

---

### ➤ Dynamic Routing
Means — the URL path has a variable part.

```javascript
app.get('/users/:id', (req, res) => {
  res.send(`User ID is ${req.params.id}`);
});
```

👉 If you visit `/users/5`, you get:
```
User ID is 5
```

Here, `:id` is a **dynamic route parameter**.

---

### ➤ Nested Dynamic Routing
Means — you have multiple dynamic levels inside one route.

```javascript
app.get('/users/:userId/orders/:orderId', (req, res) => {
  res.send(`User: ${req.params.userId}, Order: ${req.params.orderId}`);
});
```

👉 URL `/users/101/orders/5001`  
Response → `User: 101, Order: 5001`

💡 “Nested” just means one dynamic parameter inside another route hierarchy (like `/users/:userId/orders/:orderId`).

---

### 📦 Express Router Example (Nested route structure)
We often organize these using **Routers**.

```javascript
// userRoutes.js
import express from 'express';
const router = express.Router();

router.get('/:userId', (req, res) => {
  res.send(`User ID: ${req.params.userId}`);
});

router.get('/:userId/orders/:orderId', (req, res) => {
  res.send(`User: ${req.params.userId}, Order: ${req.params.orderId}`);
});

export default router;

// server.js
import express from 'express';
import userRoutes from './userRoutes';
const app = express();

app.use('/users', userRoutes);

app.listen(3000, () => console.log('Server running'));
```

Now these work:
```
/users/101
/users/101/orders/9001
```

✅ That’s **nested dynamic routing** in practice.

---

## ⚙️ 2️⃣ Regex Routing (Regular Expression Routing)

Sometimes you need more control over route matching.

### ➤ Example 1 — Allow only numeric user IDs
```javascript
app.get('/users/:id([0-9]+)', (req, res) => {
  res.send(`User ID (number only): ${req.params.id}`);
});
```

✅ `/users/123` → Works  
❌ `/users/abc` → 404

---

### ➤ Example 2 — Allow usernames with letters only
```javascript
app.get('/profile/:username([a-zA-Z]+)', (req, res) => {
  res.send(`Profile: ${req.params.username}`);
});
```

✅ `/profile/Ashish` → Works  
❌ `/profile/123` → 404

---

### ➤ Example 3 — Regex route without parameter name
```javascript
app.get(/^\/product\/(\d+)$/, (req, res) => {
  const productId = req.params[0];
  res.send(`Product ID: ${productId}`);
});
```

💡 When to use Regex Routing:
- Restrict what values can appear.
- Pattern-based matching (like `/api/v1/` vs `/api/v2/`).
- Validate IDs or slugs directly in the route.

---

## 🧩 3️⃣ Combined Example — Nested + Regex Routing
```javascript
app.get('/users/:userId([0-9]+)/orders/:orderId([A-Z0-9]+)', (req, res) => {
  const { userId, orderId } = req.params;
  res.send(`User: ${userId}, Order: ${orderId}`);
});
```

✅ `/users/100/orders/AB12` → Works  
❌ `/users/abc/orders/AB12` → 404  
❌ `/users/100/orders/@@@` → 404

---

## 🧠 4️⃣ Industry-Level Tips (for real projects)
✅ Use nested routers to organize cleanly:
```javascript
app.use('/users', userRouter);
app.use('/users/:userId/orders', orderRouter);
```

✅ Use regex only where necessary.  
✅ Use `router.param()` for pre-processing:
```javascript
app.param('userId', (req, res, next, id) => {
  console.log('User ID param:', id);
  next();
});
```

✅ Example directory structure:
```
routes/
 ├── userRoutes.js
 └── orderRoutes.js
```

✅ Security Tip: Always validate and sanitize route parameters!

---

## 🧩 5️⃣ Quick Recap Table
| Concept | Example | Purpose |
|----------|----------|----------|
| Dynamic Route | `/users/:id` | Variable part in URL |
| Nested Dynamic Route | `/users/:userId/orders/:orderId` | Multiple dynamic levels |
| Regex Route | `/users/:id([0-9]+)` | Pattern-based matching |
| Router-based nesting | `app.use('/users/:userId/orders', orderRouter)` | Modular route structure |
| router.param() | `app.param('userId', fn)` | Preprocess params |
