import db from "../models";

const findOrCreateNewUsers = async (input, token) => {
  try {
    const [user, created] = await db.User.findOrCreate({
      where: { email: input.email },
      defaults: {
        email: input.email,
        username: input.username,
        address: input.address,
        gender: input.gender,
        phone: input.phone,
        roleId: "R3",
      },
    });

    // Kiểm tra xem booking đã tồn tại chưa
    const existingBooking = await db.Booking.findOne({
      where: {
        patientId: user.id,
        doctorId: input.doctorId,
        date: input.dataDate,
        timeType: input.timeType,
      },
    });

    if (existingBooking) {
      return {
        user,
        bookingExisted: true,
      };
    }

    // Nếu chưa tồn tại, tạo booking mới
    await db.Booking.create({
      statusId: "S1",
      doctorId: input.doctorId,
      patientId: user.id,
      date: input.dataDate,
      timeType: input.timeType,
      token: token,
    });

    console.log("Created booking for user:", user.id);

    return {
      user,
      bookingExisted: false,
    };
  } catch (error) {
    console.error("Lỗi khi tạo/tìm user hoặc booking:", error);
    return null;
  }
};
const verifyBookRepositories = async (input) => {
  try {
    const appointment = await db.Booking.findOne({
      where: {
        statusId: "S1",
        doctorId: input.doctorId,
        token: input.token,
      },
      raw: false,
    });

    if (appointment) {
      // Cập nhật trạng thái đúng cách
      appointment.statusId = "S2";
      await appointment.save();

      return {
        EM: "Xác Nhận Thành Công",
        EC: 0,
      };
    } else {
      return {
        EM: "Lịch hẹn đã được kích hoạt hoặc không tồn tại!",
        EC: 2,
      };
    }
  } catch (error) {
    console.error("Lỗi khi xác minh lịch hẹn:", error);
    return {
      EM: "Lỗi server",
      EC: 1,
    };
  }
};
const getListPatientRep = async (input) => {
  try {
    const data = await db.Booking.findAll({
      where: {
        statusId: "S2",
        doctorId: input.doctorId,
        date: input.date,
      },
      include: [
        {
          model: db.User,
          as: "patientData",
          attributes: ["username", "email", "gender", "phone"],
          include: [
            {
              model: db.Allcode,
              as: "genderData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
        },
        {
          model: db.Allcode,
          as: "timeData",
          attributes: ["valueEn", "valueVi"],
        },
      ],
    });
    return data;
  } catch (error) {
    console.error("Lỗi khi xác minh lịch hẹn:", error);
    return {
      EM: "Lỗi server",
      EC: 1,
    };
  }
};
const sendRemedyRepositories = async (input) => {
  try {
    const appointment = await db.Booking.findOne({
      where: {
        statusId: "S2",
        doctorId: input.doctorId,
        timeType: input.timeType,
        patientId: input.patientId,
      },
      raw: false,
    });

    if (appointment) {
      appointment.statusId = "S3";
      await appointment.save();

      return {
        EM: "Xác Nhận Thành Công",
        EC: 0,
      };
    } else {
      return {
        EM: "Lịch hẹn đã được kích hoạt hoặc không tồn tại!",
        EC: 2,
      };
    }
  } catch (error) {
    console.error("Lỗi khi xác minh lịch hẹn:", error);
    return {
      EM: "Lỗi server",
      EC: 1,
    };
  }
};
module.exports = {
  findOrCreateNewUsers,
  verifyBookRepositories,
  getListPatientRep,
  sendRemedyRepositories,
};
