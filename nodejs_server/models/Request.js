import { Sequelize } from "sequelize";
import User from "./UserModel";

const Request = sequelize.define("request", {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("pending", "accepted", "rejected"),
    defaultValue: "pending",
  },
});

User.hasMany(Request);
Request.belongsTo(User);
