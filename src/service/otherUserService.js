import axios from "../utils/axiosConfig";

const GetAllDoctors = () => {
  return axios.get("api/v1/doctor/top-doctor");
};
const ApiGetAllDoctors = () => {
  return axios.get("api/v1/doctor/get-all-doctors");
};
const ApiGetDoctorById = (id) => {
  return axios.get(`api/v1/doctor/get-doctor/${id}`);
};
const ApiSaveDoctors = (
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
  const data = {
    contentHTML: contentHTML,
    contentMarkDown: contentMarkDown,
    description: description,
    doctorId: doctorId,
    priceId,
    paymentId,
    provinceId,
    addressClinic,
    nameClinic,
    note,
    count,
    specialtyId,
    clinicId,
  };
  console.log("🚀 Data gửi đi:", JSON.stringify(data));
  return axios.post("api/v1/doctor/save-data-doctors", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createScheduleDoctors = (doctorId, date, timeType) => {
  const data = {
    doctorId: doctorId,
    date: date,
    timeType: timeType,
  };
  console.log("🚀 Data gửi đi:", JSON.stringify(data));
  return axios.post("api/v1/doctor/bulkcreate-schedule", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const getAllScheduleDoctors = (doctorId, date) => {
  return axios.get(
    `api/v1/doctor/get-all-schedule?doctorId=${doctorId}&date=${date}`
  );
};

const ApiGetPriceDoctors = (doctorId) => {
  return axios.get(`api/v1/doctor/get-price-doctors?doctorId=${doctorId}`);
};
const ApiGetDoctorSchedule = (inputId) => {
  return axios.get(`api/v1/doctor/get-doctor-schedule?id=${inputId}`);
};

const ApiCreateBooking = (data) => {
  console.log("🚀 Data gửi đi:", JSON.stringify(data));
  return axios.post("api/v1/patient/create-bookingPatient", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const ConfirmVerifyBooking = async (data) => {
  return axios.post("api/v1/patient/verify-book-appointment", data);
};

const ApiCreateSpecialties = async (data) => {
  return axios.post("api/v1/specialties/create-specialties", data);
};
const ApiGetAllLimitSpecialties = async () => {
  return axios.get(`api/v1/specialties/get-all-specialties`);
};

const ApiGetSpecialtyById = (inputId, location) => {
  return axios.get(
    `api/v1/specialties/get-specialty-id?id=${inputId}&location=${location}`
  );
};
//clinic
const ApiCreateClinics = async (data) => {
  return axios.post("api/v1/clinics/create-clinics", data);
};
const ApiGetAllClinics = async () => {
  return axios.get(`api/v1/clinics/get-all-clinics`);
};
const ApiGetClinicById = (inputId) => {
  return axios.get(`api/v1/clinics/get-clinics-id?id=${inputId}`);
};
const getListPatientDoctor = (doctorId, date) => {
  return axios.get(
    `api/v1/patient/get-list-patient-doctor?doctorId=${doctorId}&date=${date}`
  );
};

const ApiCreateRemedy = async (data) => {
  return axios.post("api/v1/patient/send-remedy", data);
};
//Blog
const ApiCreateBlog = async (data) => {
  return axios.post("api/v1/blog/create-post-blog", data);
};
const ApiGetAllBlog = async () => {
  return axios.get(`api/v1/blog/get-all-blog`);
};
const ApiGetBlogById = (inputId) => {
  return axios.get(`api/v1/blog/get-blog-id?id=${inputId}`);
};

export {
  ApiCreateBooking,
  GetAllDoctors,
  ApiGetAllDoctors,
  ApiSaveDoctors,
  ApiGetDoctorById,
  createScheduleDoctors,
  getAllScheduleDoctors,
  ApiGetPriceDoctors,
  ApiGetDoctorSchedule,
  ConfirmVerifyBooking,
  ApiCreateSpecialties,
  ApiGetAllLimitSpecialties,
  ApiGetSpecialtyById,
  ApiCreateClinics,
  ApiGetAllClinics,
  ApiGetClinicById,
  getListPatientDoctor,
  ApiCreateRemedy,
  ApiCreateBlog,
  ApiGetAllBlog,
  ApiGetBlogById,
};
