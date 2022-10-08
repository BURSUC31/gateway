const express = require("express");
const app = express();
const socketLogic = require("./src/socket/socketLogic");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  rejectUnauthorized: false,
});
const router = require("./src/routes");
const config = require("./src/config");
const mongoose = require("mongoose");

mongoose.connect(config.get("DB.host"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("error in mongo connection");
});
db.once("open", () => {
  console.log("Database connected");
});
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.urlencoded({ extended: true }));
app.set("socketio", io);
app.use("/api", router);
server.listen(config.get("APP.port"), () => {
  console.log("Server up and running on port:", config.get("APP.port"));
});

io.on("connection", socketLogic());
