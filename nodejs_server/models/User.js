import Sequelize from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("user", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM("admin", "user"),
    defaultValue: "user",
  },
  isAvailable: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

export default User;
