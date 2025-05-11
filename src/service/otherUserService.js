import axios from "../utils/axiosConfig";

const GetAllDoctors = () => {
  return axios.get("api/v1/doctor/top-doctor");
};
const ApiGetAllDoctors = () => {
  return axios.get("api/v1/doctor/get-all-doctors");
};
const ApiGetDoctorById = (id) => {
  console.log("🔁 Gửi request lấy doctor với id:", id);
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
  count
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
export {
  GetAllDoctors,
  ApiGetAllDoctors,
  ApiSaveDoctors,
  ApiGetDoctorById,
  createScheduleDoctors,
  getAllScheduleDoctors,
  ApiGetPriceDoctors,
};
