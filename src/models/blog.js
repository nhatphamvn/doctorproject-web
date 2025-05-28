"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Blog.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userData",
      });
    }
  }
  Blog.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      date: DataTypes.STRING,
      postHTML: DataTypes.TEXT,
      image: DataTypes.BLOB,
      author: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Blog",
      tableName: "blogs", // ✅ Đúng tên bảng MySQL
      timestamps: false,
    }
  );
  return Blog;
};
