const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index", { sign: "Sign in" });
});

module.exports = router;
