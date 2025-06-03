"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash("12345678", 10);

    return queryInterface.bulkInsert("users", [
      {
        username: "Admin",
        email: "admin@example.com",
        password: passwordHash,
        roleId: "R1",
        address: "",
        gender: "",
        phone: "",
        image: "",
        positionId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", { email: "admin@example.com" });
  },
};
