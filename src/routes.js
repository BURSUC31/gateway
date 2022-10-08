const express = require("express");
const User = require("./models/schema");
const config = require("./config");
const asyncCatch = require("./utils/asyncCatch");

const router = express.Router();
router.get("/users", (req, res) => {
  res.render("users");
});
router.use(
  asyncCatch(async (req, res, next) => {
    const io = req.app.get("socketio");

    const { userID } = req.query;

    const user = await User.findOne({ userID });
    if (user === null) {
      const newUser = new User({ ...req.query, counter: 1 });

      io.emit("buildListElement", newUser);
      await newUser.save();
      next();
      return;
    }

    let userUpdated = Date.parse(user.updatedAt);

    userUpdated += config.get("banTime");

    if (userUpdated < Date.now()) {
      await User.updateOne({ userID }, { counter: 0 });
    }

    if (user.counter >= config.get("MAX_NUMBER_OF_TRIES")) {
      res.send("number of request per user exceeded");
      return;
    }
    user.counter++;
    io.emit("updateListElement", user);
    await User.updateOne({ userID }, { counter: user.counter });
    next();
  })
);

router.post(
  "/user",
  asyncCatch(async (req, res) => {
    res.redirect(config.get("REDIRECT_URL"));
  })
);

module.exports = router;
