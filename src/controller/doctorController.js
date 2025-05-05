import doctorService from "../service/doctorService";

const getAllDoctor = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let data = await doctorService.getAllDoctorService(limit);

    if (data.EC !== 0) {
      return res.status(201).json({
        EM: "Không có doctor!",
        EC: 201,
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
const getDoctorsController = async (req, res) => {
  try {
    let data = await doctorService.getDoctorsService();

    if (data.EC !== 0) {
      return res.status(201).json({
        EM: "Không có doctor!",
        EC: 201,
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
const getDoctorControllerById = async (req, res) => {
  try {
    let data = await doctorService.getDoctorServiceById(req.params.id);

    if (data.EC !== 0) {
      return res.status(201).json({
        EM: "Không có doctor!",
        EC: 201,
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

const saveNewDoctors = async (req, res) => {
  try {
    const { contentHTML, contentMarkDown, description, doctorId } = req.body;

    const newUser = await doctorService.saveDoctorsService(
      contentHTML,
      contentMarkDown,
      description,
      doctorId
    );

    if (!newUser.DT) {
      return res.status(201).json({ EM: newUser.EM, EC: newUser.EC, DT: null });
    }

    return res.status(201).json(newUser);
  } catch (e) {
    return res
      .status(500)
      .json({ EM: "Internal server error", EC: 500, DT: null });
  }
};

const bulkCreateDoctors = async (req, res) => {
  try {
    const { doctorId, date, timeType } = req.body;

    const data = await doctorService.bulkCreateDoctorsService(
      doctorId,
      date,
      timeType
    );

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
const getAllSchedules = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    const data = await doctorService.getAllSchedulesService(doctorId, date);
    if (data.EC !== 0) {
      return res.status(201).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
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
  getAllDoctor,
  getDoctorsController,
  saveNewDoctors,
  getDoctorControllerById,
  bulkCreateDoctors,
  getAllSchedules,
  bulkCreateDoctors,
};
