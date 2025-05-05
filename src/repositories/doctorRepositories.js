import db from "../models";
const { Op, fn, col, where } = require("sequelize");

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

const getDoctorsRepositories = async () => {
  try {
    const data = await db.User.findAll({
      where: { roleId: "R2" },
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password", "image"],
      },
    });

    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    return null;
  }
};
const getDoctorRepositoriesById = async (inputId) => {
  try {
    const data = await db.User.findOne({
      where: { id: inputId },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: db.MarkDown,
          attributes: {
            exclude: ["specialtyId", "clinicId", "doctorId"],
          },
        },
        {
          model: db.Allcode,
          as: "positionData",
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

const saveDoctors = async (data) => {
  // const newMarkdown = db.MarkDown.build(data);
  // await newMarkdown.save();
  return await db.MarkDown.create(data);
};

const bulkCreateSchedules = async (inputData) => {
  return await db.Schedule.bulkCreate(inputData);
};

const existedSchedules = async (doctorId, date, timeType) => {
  try {
    const data = await db.Schedule.findAll({
      where: {
        doctorId: doctorId,
        date: {
          [Op.and]: [
            where(fn("DATE", col("date")), "=", date), // so sánh chỉ phần ngày
          ], // Sequelize sẽ chuyển về đúng kiểu
        },
      },
    });
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách lịch:", error);
    return null;
  }
};

const getAllSchedules = async (doctorId, date) => {
  try {
    const Schedule = await db.Schedule.findAll({
      where: {
        doctorId: doctorId,
        [Op.and]: [where(fn("DATE", col("date")), "=", date)],
      },
      include: [
        {
          model: db.Allcode,
          as: "timeTypeData",
          attributes: ["valueEn", "valueVi"],
        },
      ],
      raw: true,
      nest: true,
    });

    return Schedule;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin:", error);
    return null;
  }
};

module.exports = {
  getAllDoctorRepositories,
  getDoctorsRepositories,
  saveDoctors,
  getDoctorRepositoriesById,
  bulkCreateSchedules,
  existedSchedules,
  getAllSchedules,
};
