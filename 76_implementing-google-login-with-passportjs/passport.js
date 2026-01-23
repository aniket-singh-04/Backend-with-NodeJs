import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const clientId =
  "594555697613-18p3s2o6hl7mvc3gj0o2a2bg7b27tj9m.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUri = "http://localhost:4000/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret,
      callbackURL: redirectUri,
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);




// OR  



// -------------------- IMPORTS --------------------
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// -------------------- APP SETUP --------------------
const app = express();

// Parse form data (username & password)
app.use(express.urlencoded({ extended: false }));

// Session middleware (required by Passport)
app.use(
  session({
    secret: "secretkey", // used to sign session ID
    resave: false,
    saveUninitialized: false
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// -------------------- FAKE USER DATABASE --------------------
// In real apps, this comes from DB
const users = [
  { id: 1, username: "admin", password: "1234" }
];

// -------------------- PASSPORT STRATEGY --------------------
passport.use(
  new LocalStrategy((username, password, done) => {
    // Find user by username
    const user = users.find(u => u.username === username);

    if (!user) {
      // User not found
      return done(null, false);
    }

    if (user.password !== password) {
      // Password incorrect
      return done(null, false);
    }

    // User authenticated successfully
    return done(null, user);
  })
);

// -------------------- SESSION HANDLING --------------------
// Save user ID into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve user from session
passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

// -------------------- AUTH MIDDLEWARE --------------------
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// -------------------- ROUTES --------------------

// Login page
app.get("/login", (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form method="POST" action="/login">
      <input name="username" placeholder="username" />
      <input name="password" type="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  `);
});

// Login handler
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
  })
);

// Protected route
app.get("/dashboard", isAuthenticated, (req, res) => {
  res.send(`Welcome ${req.user.username}`);
});

// Logout
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/login");
  });
});

// -------------------- START SERVER --------------------
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

