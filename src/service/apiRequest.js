import axios from "../utils/axiosConfig";

const ApiRegisterNewUser = (email, password, username, phone) => {
  const data = {
    email: email,
    password: password,
    username: username,
    phone: phone,
  };

  // Gửi dữ liệu dưới dạng JSON
  return axios.post('api/v1/register', data);
};

export {
  ApiRegisterNewUser
};
