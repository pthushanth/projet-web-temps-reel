import express from "express";
import cors from "cors";
import refreshTokenRoutes from "./routes/refreshToken.js";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import discussionRoutes from "./routes/discussions.js";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./config/database.js";
const app = express();
config();

app.use(cors());
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/discussion", discussionRoutes);

app.use("/api/refreshToken", refreshTokenRoutes);

//socket.io

const app = require("./http/app.js");
const http = require("http");
const { Server } = require("socket.io");


var port = normalizePort(process.env.PORT_BACKEND || "4000");
app.set("port", port);



var server = http.createServer(app);


var portFront = normalizePort(process.env.PORT_FRONTEND || "3000");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:" + portFront,
  },
});


server.listen(port);
console.log("port is", port);
server.on("error", onError);
server.on("listening", onListening);

const registChatbotHandlers = require("./controllers/chatbot");



const onConnectionClient = (socket) => {
  console.log(`user connected ${socket.id}`);

  registChatbotHandlers(io, socket);
  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`);
  });
};

io.on("connection", onConnectionClient);


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}


function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}