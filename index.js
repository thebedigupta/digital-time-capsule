// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");

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
// NOTE: `secret` must be kept safe (from .env file)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // don’t save session if unmodified
    saveUninitialized: true, // save new sessions
  })
);

// Initialize Passport for authentication handling
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// =================== ROUTES ===================

// Mount all authentication-related routes at /auth (e.g., /auth/google, /auth/logout)
app.use("/auth", authRoutes);

// Root route — renders homepage
app.get("/", (req, res) => {
  res.render("index", { user: req.user }); // pass user to template if logged in
});

// Dashboard route — user must be authenticated to access
app.get("/dashboard", (req, res) => {
  if (!req.user) return res.redirect("/auth/google");

  // Simulate fetching groups for logged-in user
  let groups = getGroupsForUser(req.user); // This should be replaced with DB call

  // Fallback to default group "None" if user has no assigned groups
  if (!groups || groups.length === 0) {
    groups = [{ id: "none", name: "None" }];
  }

  // Render dashboard with user and their groups
  res.render("dashboard", { user: req.user, groups });
});

// API route — fetch all groups created by admin (for dropdowns, etc.)
app.get("/admin/groups", async (req, res) => {
  try {
    const groups = await Group.find(); // Replace with filter if needed (e.g., Group.find({ createdBy: req.user._id }))
    res.json(groups); // Return as JSON for frontend use
  } catch (err) {
    res.status(500).json({ error: "Failed to load groups" });
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
