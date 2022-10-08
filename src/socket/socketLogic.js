const Users = require("../models/schema");

module.exports = function () {
  return async function (socket) {
    const users = await Users.find({});
    socket.emit("buildList", users);
  };
};
