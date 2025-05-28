import doctorRepositories from "../repositories/doctorRepositories";

const getAllDoctorService = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await doctorRepositories.getAllDoctorRepositories(limitInput);

      const imageBuffer = data.map((user) => {
        if (user.image && Buffer.isBuffer(user.image)) {
          // Chuyển đổi Buffer thành base64
          user.image = user.image.toString();
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
        data.image = data.image.toString();
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
  doctorId,
  priceId,
  paymentId,
  provinceId,
  addressClinic,
  nameClinic,
  note,
  count,
  specialtyId,
  clinicId
) => {
  try {
    // Kiểm tra các tham số bắt buộc
    if (!contentHTML || !contentMarkDown || !doctorId) {
      return {
        EM: "Thiếu thông tin bắt buộc: contentHTML, contentMarkDown, doctorId.",
        EC: 1,
        DT: null,
      };
    }

    if (
      !priceId ||
      !paymentId ||
      !provinceId ||
      !addressClinic ||
      !nameClinic
    ) {
      return {
        EM: "Thiếu thông tin bắt buộc",
        EC: 1,
        DT: null,
      };
    }

    // Nếu không có lỗi, tiến hành lưu thông tin bác sĩ và thông tin khác
    const markdownResult = await doctorRepositories.saveDoctors(doctorId, {
      contentHTML,
      contentMarkDown,
      description,
    });

    const inforResult = await doctorRepositories.upsertDoctorInfor(doctorId, {
      priceId,
      provinceId,
      paymentId,
      addressClinic,
      nameClinic,
      note,
      count,
      specialtyId,
      clinicId,
    });

    return {
      EM: "Lưu bác sĩ thành công!",
      EC: 0,
      DT: {
        markdown: markdownResult,
        doctorInfor: inforResult,
      },
    };
  } catch (error) {
    throw error; // Ném lỗi ra ngoài để có thể xử lý ở nơi gọi
  }
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
const getPriceDoctorsService = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await doctorRepositories.getPriceRepositories(doctorId);

      if (!data) {
        resolve({
          EM: "Không có prices!",
          EC: 1,
          DT: null,
        });
      } else {
        resolve({
          EM: "Tìm kiếm giá thành công!",
          EC: 0,
          DT: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getDoctorScheduleService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          EM: "id có vấn đề!",
          EC: 1,
          DT: null,
        });
      }

      let data = await doctorRepositories.getDoctorScheduleRep(inputId);

      if (data && data.image && Buffer.isBuffer(data.image)) {
        data.image = data.image.toString();
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
const CreateBlogService = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !input.userId ||
        !input.author ||
        !input.title ||
        !input.date ||
        !input.postHTML ||
        !input.image
      ) {
        resolve({
          EM: "chưa nhập đử dữ liệu!",
          EC: 1,
          DT: null,
        });
      }

      let data = await doctorRepositories.createBlogRepositories({
        userId: input.userId,
        author: input.author,
        title: input.title,
        date: input.date,
        postHTML: input.postHTML,
        image: input.image,
      });

      resolve({
        EM: "Tìm kiếm doctor thành công!",
        EC: 0,
        DT: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getAllBlogService = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await doctorRepositories.getAllBlogRepositories(limitInput);

      const imageBuffer = data.map((blog) => {
        if (blog.image && Buffer.isBuffer(blog.image)) {
          // Chuyển đổi Buffer thành base64
          blog.image = blog.image.toString();
        }
        return blog;
      });

      if (!data) {
        resolve({
          EM: "Không có blog!",
          EC: 1,
          DT: null,
        });
      } else {
        resolve({
          EM: "Tìm kiếm blog thành công!",
          EC: 0,
          DT: imageBuffer,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getBlogServiceById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          EM: "id có vấn đề!",
          EC: 1,
          DT: null,
        });
      }

      let data = await doctorRepositories.getBlogByIdRepository(inputId);

      if (data && data.image && Buffer.isBuffer(data.image)) {
        data.image = data.image.toString();
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

module.exports = {
  getPriceDoctorsService,
  getAllDoctorService,
  getDoctorsService,
  saveDoctorsService,
  getDoctorServiceById,
  bulkCreateDoctorsService,
  getAllSchedulesService,
  getDoctorScheduleService,
  CreateBlogService,
  getBlogServiceById,
  getAllBlogService,
};
