const express = require("express");
const config = require("./config");
const asyncCatch = require("./utils/asyncCatch");
const usersHandler = require("./handlers");

const router = express.Router();
router.get("/users", (req, res) => {
  res.render("users");
});
router.use(asyncCatch(usersHandler));

router.post(
  "/user",
  asyncCatch(async (req, res) => {
    res.redirect(config.get("REDIRECT_URL"));
  })
);

module.exports = router;
