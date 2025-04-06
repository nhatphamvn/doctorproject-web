import axios from "../utils/axiosConfig";

const GetAllDoctors = () => {
  return axios.get("api/v1/doctor/top-doctor");
};

export { GetAllDoctors };
