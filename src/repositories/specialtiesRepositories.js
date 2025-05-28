import db from "../models";

const createSpecialiesRep = async (input) => {
  return await db.Specialty.create(input);
};
const fetchAllSpecialties = async (limitInput) => {
  try {
    const data = await db.Specialty.findAll({
      limit: limitInput,
    });
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người chuyên khoa:", error);
    return null;
  }
};
const getSpecialtyByIdRep = async (input) => {
  try {
    const specialty = await db.Specialty.findOne({
      where: { id: input.id },
      attributes: ["textHTML", "textMarkDown", "description"],
    });

    if (!specialty) return {};

    const data = specialty.get({ plain: true });

    let doctorSpecialty = [];

    // XỬ LÝ THEO LOCATION
    if (input.location === "ALL") {
      doctorSpecialty = await db.Doctor_Infor.findAll({
        where: { specialtyId: input.id },
        attributes: ["doctorId", "provinceId"],
        raw: true,
      });
    } else {
      doctorSpecialty = await db.Doctor_Infor.findAll({
        where: {
          specialtyId: input.id,
          provinceId: input.location,
        },
        attributes: ["doctorId", "provinceId"],
        raw: true,
      });
    }

    // GÁN THÊM
    data.doctorSpecialty = doctorSpecialty;

    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người chuyên khoa:", error);
    return null;
  }
};
const createClinicsRep = async (input) => {
  return await db.Clinic.create(input);
};
const fetchAllClinics = async (limitInput) => {
  try {
    const data = await db.Clinic.findAll({
      limit: limitInput,
    });
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người chuyên khoa:", error);
    return null;
  }
};
const getClinicByIdRep = async (input) => {
  try {
    const clinic = await db.Clinic.findOne({
      where: { id: input.id },
      attributes: [
        "name",
        "address",
        "descriptionMarkDown",
        "descriptionHTML",
        "image",
      ],
    });

    if (!clinic) return {};

    const data = clinic.get({ plain: true });

    const doctorClinics = await db.Doctor_Infor.findAll({
      where: { clinicId: input.id },
      attributes: ["doctorId"],
      raw: true,
    });

    data.doctorClinics = doctorClinics;

    return data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin phòng khám:", error);
    return null;
  }
};

module.exports = {
  createSpecialiesRep,
  fetchAllSpecialties,
  getSpecialtyByIdRep,
  createClinicsRep,
  fetchAllClinics,
  getClinicByIdRep,
};
