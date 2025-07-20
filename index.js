// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/db");
connectDB(); // nodeConnect to MongoDB first
const Capsule = require("./models/capsule");

const capsuleRoutes = require("./routes/capsule");

require("./config/passport"); // Passport config file (Google OAuth, etc.)

const authRoutes = require("./routes/auth"); // Authentication routes

const app = express();

// =================== MIDDLEWARE SETUP ===================

// Set view engine to EJS (for rendering HTML pages with dynamic data)
app.set("view engine", "ejs");

// Serve static assets (CSS, JS, images) from /public folder
app.use(express.static("public"));

// Parse URL-encoded form data and JSON bodies from incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup session middleware (required for login sessions)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // ✅ only save sessions if needed
  })
);

// Initialize Passport for authentication handling
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use("/capsule", capsuleRoutes);

// =================== ROUTES ===================

// Mount all authentication-related routes at /auth (e.g., /auth/google, /auth/logout)
app.use("/auth", authRoutes);

// Root route — renders homepage
app.get("/", (req, res) => {
  res.render("index", { user: req.user }); // pass user to template if logged in
});

// Dashboard route — user must be authenticated to access

app.get("/dashboard", async (req, res) => {
  if (!req.user) return res.redirect("/auth/google");

  try {
    // Fetch all capsules created by the logged-in user
    const capsules = await Capsule.find({ createdBy: req.user.id }).lean();

    res.render("dashboard", {
      user: req.user,
      groups: [], // No groups now
      capsules,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Profile route — display raw user info
app.get("/profile", (req, res) => {
  if (!req.user) return res.redirect("/auth/google");
  res.send(req.user); // Dev-only route to inspect user data
});

// =================== SERVER START ===================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
