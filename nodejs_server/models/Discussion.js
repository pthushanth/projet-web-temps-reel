import { Sequelize } from "sequelize";

import sequelize from "../config/database.js";
import User from "./User.js";
const Discussion = sequelize.define("discussion", {
  type: {
    type: Sequelize.ENUM("private", "room"),
    defaultValue: "private",
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  capacity: {
    type: Sequelize.INTEGER,
    defaultValue: 10,
    validate: {
      min: 2,
    },
  },
  currentParticipants: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },

  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

User.belongsToMany(Discussion, { through: "Participation" });
Discussion.belongsToMany(User, { through: "Participation" });

export default Discussion;
