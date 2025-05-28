import specialtiesRepositories from "../repositories/specialtiesRepositories";

const createSpecialiesService = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !input.name ||
        !input.textHTML ||
        !input.textMarkDown ||
        !input.description ||
        !input.image
      ) {
        return resolve({
          EM: "Missing required parameters",
          EC: 1,
          DT: null,
        });
      }

      const result = await specialtiesRepositories.createSpecialiesRep({
        name: input.name,
        textHTML: input.textHTML,
        textMarkDown: input.textMarkDown,
        description: input.description,
        image: input.image,
      });

      return resolve({
        EM: "Create schedules successfully",
        EC: 0,
        DT: result,
      });
    } catch (error) {
      console.error("Error in service:", error);
      return resolve({
        EM: "Internal server error",
        EC: 500,
        DT: null,
      });
    }
  });
};
const getAllDoctorLimitService = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await specialtiesRepositories.fetchAllSpecialties(limitInput);
      const result = data.map((specialty) => ({
        ...specialty.toJSON(),
        image:
          specialty.image && Buffer.isBuffer(specialty.image)
            ? specialty.image.toString()
            : specialty.image,
      }));

      if (!data || data.length === 0) {
        resolve({
          EM: "Không có specialties!",
          EC: 1,
          DT: null,
        });
      } else {
        resolve({
          EM: "Tìm kiếm specialties thành công!",
          EC: 0,
          DT: result,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getSpecialtyByIdService = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!input.id) {
        return resolve({
          EM: "Missing required parameters",
          EC: 1,
          DT: null,
        });
      }

      const result = await specialtiesRepositories.getSpecialtyByIdRep(input);

      return resolve({
        EM: "tìm thành công",
        EC: 0,
        DT: result,
      });
    } catch (error) {
      console.error("Error in service:", error);
      return resolve({
        EM: "Internal server error",
        EC: 500,
        DT: null,
      });
    }
  });
};
const createClinicsService = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !input.name ||
        !input.address ||
        !input.descriptionHTML ||
        !input.descriptionMarkDown ||
        !input.image
      ) {
        return resolve({
          EM: "Missing required parameters",
          EC: 1,
          DT: null,
        });
      }

      const result = await specialtiesRepositories.createClinicsRep({
        name: input.name,
        address: input.address,
        descriptionHTML: input.descriptionHTML,
        descriptionMarkDown: input.descriptionMarkDown,
        image: input.image,
      });

      return resolve({
        EM: "Create clinic successfully",
        EC: 0,
        DT: result,
      });
    } catch (error) {
      console.error("Error in service:", error);
      return resolve({
        EM: "Internal server error",
        EC: 500,
        DT: null,
      });
    }
  });
};
const getAllClinicsLimitService = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await specialtiesRepositories.fetchAllClinics(limitInput);
      const result = data.map((clinic) => ({
        ...clinic.toJSON(),
        image:
          clinic.image && Buffer.isBuffer(clinic.image)
            ? clinic.image.toString()
            : clinic.image,
      }));

      if (!data || data.length === 0) {
        resolve({
          EM: "Không có clinic!",
          EC: 1,
          DT: null,
        });
      } else {
        resolve({
          EM: "Tìm kiếm clinic thành công!",
          EC: 0,
          DT: result,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getClinicByIdService = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!input.id) {
        return resolve({
          EM: "Missing required parameters",
          EC: 1,
          DT: null,
        });
      }

      const result = await specialtiesRepositories.getClinicByIdRep(input);

      if (result && result.image && Buffer.isBuffer(result.image)) {
        result.image = result.image.toString();
      }

      return resolve({
        EM: "tìm thành công",
        EC: 0,
        DT: result,
      });
    } catch (error) {
      console.error("Error in service:", error);
      return resolve({
        EM: "Internal server error",
        EC: 500,
        DT: null,
      });
    }
  });
};
module.exports = {
  createSpecialiesService,
  getAllDoctorLimitService,
  getSpecialtyByIdService,
  createClinicsService,
  getAllClinicsLimitService,
  getClinicByIdService,
};
