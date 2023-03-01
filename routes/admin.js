const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router.get("/", (req, res) => {
  try {
    res.render("admin");
  } catch (err) {
    res.redirect("/auth/login");
  }
});

module.exports = router;
