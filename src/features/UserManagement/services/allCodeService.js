import axios from "../../../utils/axiosConfig";

const getAllCodeService = (inputType) => {
  return axios.get(`api/v1/allcode?type=${inputType}`);
};

export { getAllCodeService };
