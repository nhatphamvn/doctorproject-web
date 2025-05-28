import specialtiesService from "../service/specialtiesService";
const createSpecialies = async (req, res) => {
  try {
    const data = await specialtiesService.createSpecialiesService(req.body);

    if (data && data.EC !== 0) {
      return res.status(201).json({ EM: data.EM, EC: data.EC, DT: null });
    }

    return res.status(201).json({ EM: data.EM, EC: data.EC, DT: data.DT });
  } catch (error) {
    return res.status(500).json({
      EM: "Internal server error",
      EC: 500,
      DT: null,
    });
  }
};
const getAllSpecialties = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let data = await specialtiesService.getAllDoctorLimitService(limit);

    if (data.EC !== 0) {
      return res.status(201).json({
        EM: "Không có specialties!",
        EC: 204,
        DT: null,
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      EM: "Lỗi từ server",
      DT: null,
    });
  }
};
const getSpecialtyById = async (req, res) => {
  try {
    let data = await specialtiesService.getSpecialtyByIdService(req.query);

    if (data.EC !== 0) {
      return res.status(201).json({
        EM: "Không có specialties!",
        EC: 204,
        DT: null,
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      EM: "Lỗi từ server",
      DT: null,
    });
  }
};
const createClinicsController = async (req, res) => {
  try {
    const data = await specialtiesService.createClinicsService(req.body);

    if (data && data.EC !== 0) {
      return res.status(201).json({ EM: data.EM, EC: data.EC, DT: null });
    }

    return res.status(201).json({ EM: data.EM, EC: data.EC, DT: data.DT });
  } catch (error) {
    return res.status(500).json({
      EM: "Internal server error",
      EC: 500,
      DT: null,
    });
  }
};
const getAllClinics = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let data = await specialtiesService.getAllClinicsLimitService(limit);

    if (data.EC !== 0) {
      return res.status(201).json({
        EM: "Không có clinic!",
        EC: 204,
        DT: null,
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      EM: "Lỗi từ server",
      DT: null,
    });
  }
};
const getClinicById = async (req, res) => {
  try {
    let data = await specialtiesService.getClinicByIdService(req.query);

    if (data.EC !== 0) {
      return res.status(201).json({
        EM: "Không có clinic!",
        EC: 204,
        DT: null,
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      EM: "Lỗi từ server",
      DT: null,
    });
  }
};
module.exports = {
  createSpecialies,
  getAllSpecialties,
  getSpecialtyById,
  createClinicsController,
  getAllClinics,
  getClinicById,
};
