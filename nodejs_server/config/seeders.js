import User from "../models/User.js";
import bcrypt from "bcrypt";

const salt = await bcrypt.genSalt(Number(process.env.SALT));
const plainTextPassword = "password";
const hashedPassword = await bcrypt.hash(plainTextPassword, salt);

const createUser = async () => {
  const user = await User.create({
    email: "test@example.com",
    password: hashedPassword,
    name: "Test User",
    username: "testuser",
    role: "user",
  });
  console.log(user.toJSON());
};
createUser();
