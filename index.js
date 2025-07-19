require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");

require("./config/passport");

const authRoutes = require("./routes/auth");

const app = express();

// Set EJS as view engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static("public"));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Session middleware must come BEFORE passport.session()
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// ✅ Passport middleware (AFTER session)
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

app.get("/dashboard", (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/google");
  }
  res.render("dashboard", { user: req.user });
});

app.get("/dashboard", (req, res) => {
  if (!req.user) return res.redirect("/auth/google");

  // Simulated group fetch from DB — fallback to 'None' if empty
  let groups = getGroupsForUser(req.user); // Your logic here
  if (!groups || groups.length === 0) {
    groups = [{ id: "none", name: "None" }];
  }

  res.render("dashboard", { user: req.user, groups });
});


app.get("/profile", (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/google");
  }
  res.send(req.user);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
