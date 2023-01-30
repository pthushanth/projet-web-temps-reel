import { Sequelize } from "sequelize";

const Notification = sequelize.define("notification", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.belongsToMany(Notification, { through: "UserNotification" });
Notification.belongsToMany(User, { through: "UserNotification" });
