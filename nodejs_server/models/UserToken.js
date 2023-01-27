import Sequelize from "sequelize";
import sequelize from "../config/database.js";

const UserToken = sequelize.define("userToken", {
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    expires: 30 * 86400, // 30 days
  },
});

UserToken.associate = (models) => {
  UserToken.belongsTo(models.User, { foreignKey: "userId" });
};
export default UserToken;
