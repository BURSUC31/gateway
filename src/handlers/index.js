const config = require("../config");
const User = require("../models/schema");

module.exports = async (req, res, next) => {
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
};
