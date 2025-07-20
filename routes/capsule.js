const express = require("express");
const router = express.Router();
const Capsule = require("../models/capsule");

// Ensure user is logged in
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Unauthorized" });
}

router.post("/", ensureAuth, async (req, res) => {
  try {
    const newCapsule = new Capsule({
      message: req.body.message,
      eventLink: req.body.eventLink || "",
      visibleAt: req.body.visibleAt,
      group: req.body.group || "None",
      createdBy: req.user.id, // ✅ Now this works
      shareId,
    });

    await newCapsule.save();
    res.redirect("/dashboard");
  } catch (err) {
    console.error("Error saving capsule:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
