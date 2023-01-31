import { Sequelize } from "sequelize";

import sequelize from "../config/database.js";
import User from "./User.js";
import Discussion from "./Discussion.js";

const Message = sequelize.define("Message", {
  senderId: {
    type: Sequelize.INTEGER,
    references: {
      model: "User",
      key: "id",
    },
  },
  discussionId: {
    type: Sequelize.INTEGER,
    references: {
      model: "Discussion",
      key: "id",
    },
  },
  message: {
    type: Sequelize.STRING,
  },
});

Message.associate = function (models) {
  Message.belongsTo(User, { foreignKey: "senderId" });
  Discussion.hasMany(Message, { foreignKey: "discussionId" });
};

export default Message;
