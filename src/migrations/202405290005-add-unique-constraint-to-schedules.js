"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("schedules", {
      fields: ["doctorId", "date", "timeType"],
      type: "unique",
      name: "unique_schedule_doctor_date_timeType", // Tên constraint
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "schedules",
      "unique_schedule_doctor_date_timeType"
    );
  },
};
