import db from "../models";
const { Op, fn, col, where } = require("sequelize");
import _, { includes } from "lodash";

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
          model: db.Doctor_Infor,
          attributes: {
            exclude: ["doctorId"],
          },
          include: [
            {
              model: db.Allcode,
              as: "priceData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "paymentData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "provinceData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
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

const saveDoctors = async (doctorId, data) => {
  try {
    // Tìm bác sĩ trong bảng MarkDown
    const existingMarkDown = await db.MarkDown.findOne({
      where: { doctorId },
    });

    // Kết hợp dữ liệu đầu vào với dữ liệu hiện có
    const dataToUpsert = {
      doctorId,
      ...data,
      ...existingMarkDown, // Nếu tồn tại, sẽ thay thế các giá trị cũ
    };

    // Thực hiện upsert dữ liệu
    return await db.MarkDown.upsert(dataToUpsert);
  } catch (error) {
    console.error("Error in saveDoctors:", error);
    throw new Error("Error saving doctor markdown");
  }
};

const upsertDoctorInfor = async (doctorId, data) => {
  try {
    // Tìm thông tin bác sĩ trong bảng Doctor_Infor
    const existingDoctorInfor = await db.Doctor_Infor.findOne({
      where: { doctorId },
    });

    // Kết hợp dữ liệu đầu vào với dữ liệu hiện có
    const dataToUpsert = {
      doctorId,
      ...data,
      ...existingDoctorInfor, // Nếu tồn tại, sẽ thay thế các giá trị cũ
    };

    // Thực hiện upsert dữ liệu
    return await db.Doctor_Infor.upsert(dataToUpsert);
  } catch (error) {
    console.error("Error in upsertDoctorInfor:", error);
    throw new Error("Error upserting doctor information");
  }
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
const getPriceRepositories = async (doctorId) => {
  try {
    const data = await db.Doctor_Infor.findOne({
      where: { doctorId },
      attributes: {
        exclude: ["id", "priceId", "paymentId", "provinceId"],
      },
      include: [
        {
          model: db.Allcode,
          as: "priceData",
          attributes: ["valueEn", "valueVi"],
        },
        {
          model: db.Allcode,
          as: "paymentData",
          attributes: ["valueEn", "valueVi"],
        },
        {
          model: db.Allcode,
          as: "provinceData",
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
  getDoctorsRepositories,
  saveDoctors,
  getDoctorRepositoriesById,
  bulkCreateSchedules,
  existedSchedules,
  getAllSchedules,
  upsertDoctorInfor,
  getPriceRepositories,
};
