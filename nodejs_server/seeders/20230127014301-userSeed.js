const bcrypt = require("bcrypt");
const faker = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const plainTextPassword = "password";
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
    for (let i = 1; i < 9; i += 1) {
      const user = {
        email: `user${i}@test.com`,
        password: hashedPassword,
        name: `User ${i}`,
        username: `user${i}`,
        role: "user",
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(user);
    }

    const admin = {
      email: "admin@test.com",
      password: hashedPassword,
      name: `Admin`,
      username: "admin",
      role: "admin",
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await queryInterface.bulkInsert("users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
