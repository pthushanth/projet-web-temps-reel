import express from "express";
import cors from "cors";
import refreshTokenRoutes from "./routes/refreshToken.js";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./config/database.js";
const app = express();
config();

app.use(cors());
app.use(express.json());
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use("/api/auth", authRoutes);
// app.use("/api/user", usersRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
