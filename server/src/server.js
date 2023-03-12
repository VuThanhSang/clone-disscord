require("dotenv").config();
const express = require("express");
const passport = require("passport");
const ApiV1 = require("./routes/v1");
const db = require("./config/mongodb");
const env = require("./config/environment");
const path = require("path");
const cors = require("cors");
const cookieSession = require("cookie-session");
db.connectDB()
  .then(() => console.log("Connected Successfully"))
  .then(() => bootServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();
  app.use(express.json());
  app.use(require("serve-static")(__dirname + "/../../public"));
  app.use(require("cookie-parser")());
  app.use(
    cookieSession({
      name: "session",
      keys: ["compile"],
      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
  );
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(
    cors({
      origin: "http://localhost:3001",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );

  app.use("/v1", ApiV1);
  const server = app.listen(env.APP_PORT, () =>
    console.log(
      `Example app listening on port http://${env.APP_HOST}:${env.APP_PORT}`
    )
  );
  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3001",
    },
  });
  io.on("connection", (socket) => {
    console.log("connected to socket.io");

    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
    socket.on("joinChat", (room) => {
      socket.join(room);
      console.log("User join room :" + room);
    });
    socket.on("newMessage", (newMessageReceived) => {
      var inChat = newMessageReceived.inChat;
      if (!inChat) return console.log("chat.user not define");
      inChat.forEach((user) => {
        if (user == newMessageReceived.senderId) return;
        socket.in(user).emit("message Received", newMessageReceived);
      });
      console.log("newMessageReceived", newMessageReceived);
    });
  });
};
