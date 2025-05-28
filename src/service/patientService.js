import patientRepositories from "../repositories/patientRepositories";
import emailService from "../service/emailService";
import { v4 as uuidv4 } from "uuid";

const CreateBookingPatientService = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !input.email ||
        !input.doctorId ||
        !input.dataDate ||
        !input.timeType ||
        !input.doctorName
      ) {
        return resolve({
          EM: "Missing required parameters",
          EC: 1,
          DT: null,
        });
      }
      let token = uuidv4();

      const result = await patientRepositories.findOrCreateNewUsers(
        input,
        token
      );

      const senData = await emailService.sendEmailPatient(input, token);
      if (result === null) {
        return resolve({
          EM: "Failed to create or find user",
          EC: 2,
          DT: null,
        });
      }

      if (result.bookingExisted === true) {
        return resolve({
          EM: "Booking already exists for this time slot",
          EC: 3,
          DT: null,
        });
      }

      return resolve({
        EM: "Create schedules successfully",
        EC: 0,
        DT: result.user,
        senData,
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
const verifyBookAppointmentService = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!input.token || !input.doctorId) {
        return resolve({
          EM: "Missing required parameters",
          EC: 1,
          DT: null,
        });
      }

      const result = await patientRepositories.verifyBookRepositories(input);

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
const getListPatientService = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!input.doctorId || !input.date) {
        return resolve({
          EM: "Missing required parameters",
          EC: 1,
          DT: null,
        });
      }

      // Tìm xem doctorId + date đã có những timeType nào
      const result = await patientRepositories.getListPatientRep(input);

      return resolve({
        EM: "check successfully",
        EC: 0,
        DT: result,
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
const createSendRemedyService = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!input.email || !input.doctorId || !input.patientId) {
        return resolve({
          EM: "Missing required parameters",
          EC: 1,
          DT: null,
        });
      }

      const result = await patientRepositories.sendRemedyRepositories(input);

      const data = await emailService.sendRemedyPatient(input);

      return resolve({
        EM: "Create send remedy successfully",
        EC: 0,
        DT: { result, data },
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
  CreateBookingPatientService,
  verifyBookAppointmentService,
  getListPatientService,
  createSendRemedyService,
};
