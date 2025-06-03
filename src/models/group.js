"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      // ✅ Đặt alias để đồng nhất với `User.js`
      // Group.hasMany(models.User, {
      //   foreignKey: "groupId",
      //   as: "users"
      // });
      // Group.belongsToMany(models.Role, {
      //   through: "Group_Role"
      // });
    }
  }

  Group.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Group",
      tableName: "group", // ✅ Đúng tên bảng MySQL
      timestamps: false, // 🔹 Nếu không cần createdAt, updatedAt
    }
  );

  return Group;
};
