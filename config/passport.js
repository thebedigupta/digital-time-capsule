// config/passport.js

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Save full user profile
passport.serializeUser((user, done) => {
  done(null, user); // Store full Google profile in session
});

passport.deserializeUser((user, done) => {
  done(null, user); // Restore full user from session
});

// Use Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // from .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // from .env
      callbackURL: "/auth/google/callback", // must match Google Cloud Console
    },
    (accessToken, refreshToken, profile, done) => {
      // You can save user in DB here if needed
      // For now, we just pass the profile forward
      return done(null, profile);
    }
  )
);
