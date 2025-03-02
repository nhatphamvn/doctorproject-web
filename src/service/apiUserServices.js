import axios from "../utils/axiosConfig";



const ApiGetUserById = (id) => {
  return axios.get(`api/v1/user/read/${id}`); // Truyền id trực tiếp vào URL
};

const ApiGetAllUser =()=>{
    return axios.get("api/v1/user/read-all-users")
}

const ApiCreateNewUsers = (username,email, phone, address,gender, password) => {
//     const data = new FormData();
//     data.append("username", username);
//     data.append("email", email);
//     data.append("phone", phone);
//     data.append("address", address);
//     data.append("gender", gender);
//     data.append("image", image);

//   return axios.post("api/v1/user/post", data, {
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// });
  const data = {
  username: username,
  email: email,
  phone: phone,
  address: address,
  gender: gender,
  password:password
  };

    return axios.post("api/v1/user/post", data, {
    headers: {
    "Content-Type": "application/json",
    },
  });

};


const ApiUpdateUsers = (id, username, phone, address,gender, image) => {
  const data = new FormData();
  data.append("username", username);
  data.append("phone", phone);
  data.append("address", address);
  data.append("gender", gender);
  data.append("image", image);

  return axios.put(`api/v1/user/update/${id}`, data);
};

const ApiDeleteUsers = (userId) => {
  return axios.delete(`api/v1/user/delete/${userId}`); // Truyền id vào URL
};


export {
    ApiGetAllUser,ApiCreateNewUsers,ApiUpdateUsers,ApiDeleteUsers,ApiGetUserById
}