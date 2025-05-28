import patientService from "../service/patientService";

const createBookingPatient = async (req, res) => {
  try {
    const data = await patientService.CreateBookingPatientService(req.body);

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
const createVerifyBookAppointment = async (req, res) => {
  try {
    const data = await patientService.verifyBookAppointmentService(req.body);

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
const getListPatientDoctor = async (req, res) => {
  try {
    const data = await patientService.getListPatientService(req.query);

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
const createSendRemedy = async (req, res) => {
  try {
    const data = await patientService.createSendRemedyService(req.body);

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

module.exports = {
  createBookingPatient,
  createVerifyBookAppointment,
  getListPatientDoctor,
  createSendRemedy,
};
