import doctorRepositories from "../repositories/doctorRepositories";

const getAllDoctorService = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await doctorRepositories.getAllDoctorRepositories(limitInput);

      const imageBuffer = data.map((user) => {
        if (user.image && Buffer.isBuffer(user.image)) {
          // Chuyển đổi Buffer thành base64
          user.image = user.image.toString("base64");
        }
        return user;
      });

      if (!data) {
        resolve({
          EM: "Không có doctor!",
          EC: 1,
          DT: null,
        });
      } else {
        resolve({
          EM: "Tìm kiếm doctor thành công!",
          EC: 0,
          DT: imageBuffer,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getDoctorsService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await doctorRepositories.getDoctorsRepositories();

      if (!data) {
        resolve({
          EM: "Không có doctor!",
          EC: 1,
          DT: null,
        });
      } else {
        resolve({
          EM: "Tìm kiếm doctor thành công!",
          EC: 0,
          DT: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getDoctorServiceById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          EM: "id có vấn đề!",
          EC: 1,
          DT: null,
        });
      }

      let data = await doctorRepositories.getDoctorRepositoriesById(inputId);

      if (data && data.image && Buffer.isBuffer(data.image)) {
        data.image = data.image.toString("base64");
      }

      if (!data) {
        resolve({
          EM: "Không có doctor!",
          EC: 1,
          DT: null,
        });
      } else {
        resolve({
          EM: "Tìm kiếm doctor thành công!",
          EC: 0,
          DT: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const saveDoctorsService = async (
  contentHTML,
  contentMarkDown,
  description,
  doctorId
) => {
  if (!contentHTML || !contentMarkDown) {
    return {
      EM: "Không lưu được bác sĩ!",
      EC: 1,
      DT: null,
    };
  }

  const data = await doctorRepositories.saveDoctors({
    contentHTML,
    contentMarkDown,
    description,
    doctorId,
  });

  console.log("check dataa", contentHTML);

  return {
    EM: "Lưu bác sĩ thành công!",
    EC: 0,
    DT: data,
  };
};
const bulkCreateDoctorsService = (doctorId, date, timeTypeArray) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !doctorId ||
        !date ||
        !Array.isArray(timeTypeArray) ||
        timeTypeArray.length === 0
      ) {
        return resolve({
          EM: "Missing required parameters",
          EC: 1,
          DT: null,
        });
      }

      // Tìm xem doctorId + date đã có những timeType nào
      const existingSchedules = await doctorRepositories.existedSchedules(
        doctorId,
        date
      );
      const existingTimeTypes = existingSchedules.map((item) => item.timeType);

      // Lọc ra những timeType chưa có
      const schedulesToCreate = timeTypeArray
        .filter((type) => !existingTimeTypes.includes(type))
        .map((type) => ({
          doctorId,
          date,
          timeType: type,
          maxNumber: 10,
          currentNumber: 0,
        }));

      // Nếu không có timeType nào cần tạo (đã tồn tại hết) thì báo luôn
      if (schedulesToCreate.length === 0) {
        return resolve({
          EM: "Schedules already exist",
          EC: 2,
          DT: null,
        });
      }

      // Chỉ còn những cái chưa tồn tại mới tạo
      const createdSchedules = await doctorRepositories.bulkCreateSchedules(
        schedulesToCreate
      );

      return resolve({
        EM: "Create schedules successfully",
        EC: 0,
        DT: createdSchedules,
      });
    } catch (error) {
      return resolve({
        EM: "Internal server error",
        EC: 500,
        DT: null,
      });
    }
  });
};

const getAllSchedulesService = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await doctorRepositories.getAllSchedules(doctorId, date);

      if (!data) {
        resolve({
          EM: "Không có schedules!",
          EC: 1,
          DT: null,
        });
      } else {
        resolve({
          EM: "Tìm kiếm lịch thành công!",
          EC: 0,
          DT: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllDoctorService,
  getDoctorsService,
  saveDoctorsService,
  getDoctorServiceById,
  bulkCreateDoctorsService,
  getAllSchedulesService,
};
