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
};
