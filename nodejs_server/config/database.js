import Sequelize from "sequelize";

// const sequelize = new Sequelize("apps", "root", "password", {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: "postgres",
// });

const sequelize = new Sequelize(
  "postgres://root:password@database_postgres:5432/apps"
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
