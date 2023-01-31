import { Sequelize } from "sequelize";

import sequelize from "../config/database.js";
import Message from "./Message.js";
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

User.associate = function (models) {
  Discussion.belongsToMany(User, {
    through: "participants",
    foreignKey: "discussionId",
    otherKey: "userId",
  });
};

User.associate = function (models) {};
User.belongsToMany(Discussion, {
  through: "participants",
  foreignKey: "userId",
  otherKey: "discussionId",
});

User.associate = function (models) {
  User.hasMany(models.Discussion, {
    foreignKey: "userId",
    as: "discussions",
  });
};

Discussion.associate = function (models) {
  Discussion.belongsTo(models.User, {
    foreignKey: "userId",
    as: "author",
  });
};

Message.belongsTo(User, { foreignKey: "senderId" });
Message.belongsTo(Discussion, { foreignKey: "discussionId" });
User.hasMany(Message, { foreignKey: "senderId" });
Discussion.hasMany(Message, { foreignKey: "discussionId" });

export default Discussion;
