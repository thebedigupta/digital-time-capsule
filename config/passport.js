const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
  done(null, user);
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
      return done(null, profile);
    }
  )
);
