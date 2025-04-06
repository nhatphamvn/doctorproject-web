import db from "../models";

const getAllDoctorRepositories = async (limitInput) => {
  try {
    const data = await db.User.findAll({
      limit: limitInput,
      where: { roleId: "R2" },
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: db.Allcode,
          as: "positionData",
          attributes: ["valueEn", "valueVi"],
        },
        {
          model: db.Allcode,
          as: "genderData",
          attributes: ["valueEn", "valueVi"],
        },
      ],
      raw: true,
      nest: true,
    });

    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    return null;
  }
};

module.exports = {
  getAllDoctorRepositories,
};
