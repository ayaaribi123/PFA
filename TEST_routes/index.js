const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth")


//Home page
router.get("/", (req, res) => {
  res.render("index");
});

// Dashboard page
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    name: req.user.name
  });
});
module.exports = router;
