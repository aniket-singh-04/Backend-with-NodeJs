# 🚀 Express.js — Defining Multiple Routes Efficiently Using Arrays

## 🌱 1️⃣ Basic Level — Simple Meaning

When we build APIs, we often have many routes like this:
```javascript
app.get('/home', handler1);
app.get('/about', handler2);
app.get('/contact', handler3);
```

That’s okay for small projects,  
but what if you have **50+ endpoints**? 😅

👉 Writing each route separately makes the code messy.

So — we can define **multiple routes efficiently using arrays**,  
meaning we group similar paths and map over them.

---

## 🎓 2️⃣ College Level — Efficient Use of Arrays in Routing

In **Express.js**, the `app` and `router` objects can take arrays of paths as arguments.

### ✅ Example 1 — Multiple routes for same handler
```javascript
app.get(['/home', '/index', '/main'], (req, res) => {
  res.send('Welcome to Home Page');
});
```

👉 Works for all these URLs:
```
/home
/index
/main
```
All go to the same function.

💡 **Use Case:** When you want aliases or multiple entry URLs for the same response.

---

### ✅ Example 2 — Efficiently loop through multiple routes
```javascript
const routes = [
  { path: '/home', handler: (req, res) => res.send('Home Page') },
  { path: '/about', handler: (req, res) => res.send('About Page') },
  { path: '/contact', handler: (req, res) => res.send('Contact Page') }
];

routes.forEach((route) => app.get(route.path, route.handler));
```

💡 **Benefit:**
- Keeps route definitions **DRY (Don’t Repeat Yourself)**
- Easy to add, remove, or modify routes

---

### ✅ Example 3 — Using with Express Router
```javascript
import express from 'express';
const router = express.Router();

const pages = [
  { paths: ['/home', '/'], message: 'Home Page' },
  { paths: ['/about', '/company'], message: 'About Page' },
  { paths: ['/contact', '/support'], message: 'Contact Page' }
];

pages.forEach(({ paths, message }) => {
  router.get(paths, (req, res) => res.send(message));
});

export default router;
```
Main file:
```javascript
import express from 'express';
import router from './routes/pages.js';

const app = express();
app.use('/', router);
app.listen(3000, () => console.log('Server running'));
```

✅ Works for:
```
/
/home
/about
/company
/contact
/support
```

---

## 🧩 3️⃣ Advanced / Industry Level — Array-based Modular Route Management

In large projects, teams often store route configs in a single array or JSON,  
and register them dynamically.

### Example — Config-based Routing
```javascript
import express from 'express';
const app = express();

const routeConfig = [
  { method: 'get', path: '/users', controller: (req, res) => res.send('All users') },
  { method: 'post', path: '/users', controller: (req, res) => res.send('User created') },
  { method: 'get', path: '/users/:id', controller: (req, res) => res.send(`User ${req.params.id}`) }
];

// Automatically register all routes
routeConfig.forEach(({ method, path, controller }) => {
  app[method](path, controller);
});

app.listen(3000, () => console.log('Dynamic route registration running'));
```

✅ **Benefits:**
- Easier scaling  
- Centralized route management  
- Great for **microservices** or **auto-generated APIs**

---

## ⚙️ 4️⃣ Express v5 Version — With Async + ES6 Modules
```javascript
import express from 'express';
const app = express();

const routes = [
  { method: 'get', path: ['/home', '/index'], handler: async (req, res) => res.send('Welcome!') },
  { method: 'get', path: ['/about', '/company'], handler: async (req, res) => res.send('About us') },
  { method: 'post', path: '/api/data', handler: async (req, res) => res.send('Data received!') }
];

routes.forEach(({ method, path, handler }) => {
  app[method](path, handler);
});

app.listen(3000, () => console.log('Express v5 array routes running'));
```

✅ Works same way,  
but now route handlers can be **async**, and Express automatically handles rejected promises.

---

## 🧠 5️⃣ When to Use Array-based Routing

| When | Why |
|------|-----|
| Many routes share same handler | Cleaner code |
| You need aliases (e.g. `/home`, `/index`) | Use array paths |
| Central route config (like constants) | Easier updates |
| Microservices or large teams | Unified route management |
| Auto route generation from JSON/OpenAPI | Easier dynamic registration |

---

## ✅ Final Quick Recap

| Technique | Example | Use Case |
|------------|----------|----------|
| Array of paths | `app.get(['/home','/index'], fn)` | One handler, multiple URLs |
| Array of routes | `routes.forEach(app.get)` | Register multiple unique routes |
| Config-driven | `routeConfig.forEach(app[method])` | Dynamic or scalable APIs |
| Async + ES6 (v5) | `async (req,res)=>{}` | Clean async support |
