```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
SESSION_SECRET=supersecret
```

```js
require("dotenv").config();
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(passport.initialize()); // ✅ ONLY initialize (no session)

// Demo user store (replace with DB)
const users = [];

/* ---------------- GOOGLE STRATEGY ---------------- */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.emails || !profile.emails[0].value) {
          return done(null, false);
        }

        const email = profile.emails[0].value;

        let user = users.find((u) => u.googleId === profile.id);

        if (!user) {
          const emailExists = users.find((u) => u.email === email);
          if (emailExists) {
            return done(null, false);
          }

          user = {
            id: users.length + 1,
            googleId: profile.id,
            name: profile.displayName,
            email,
          };

          users.push(user);
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

/* ---------------- JWT AUTH MIDDLEWARE ---------------- */
function auth(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.redirect("/");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect("/");
  }
}

/* ---------------- ROUTES ---------------- */

// Home
app.get("/", (req, res) => {
  res.send(`
    <h2>Home</h2>
    <a href="/auth/google">Login with Google</a>
  `);
});

// Start Google login
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false, // ❌ NO SESSION
  })
);

// Google callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false, // ❌ NO SESSION
    failureRedirect: "/login-error",
  }),
  (req, res) => {
    // Create JWT
    const token = jwt.sign(
      {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Store JWT in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
    });

    res.redirect("/dashboard");
  }
);

// Protected dashboard
app.get("/dashboard", auth, (req, res) => {
  res.send(`
    <h2>Dashboard</h2>
    <p>Welcome ${req.user.name}</p>
    <a href="/logout">Logout</a>
  `);
});

// Login error
app.get("/login-error", (req, res) => {
  res.send("<h3>Google login failed</h3><a href='/'>Go Back</a>");
});

// Logout
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

/* ---------------- SERVER ---------------- */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```
