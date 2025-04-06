import axios from "../../../utils/axiosConfig";

const ApiGetUserById = (id) => {
  return axios.get(`api/v1/user/read/${id}`); // Truyền id trực tiếp vào URL
};

const ApiGetAllUser = () => {
  return axios.get("api/v1/user/read-all-users");
};

const ApiGetAllDocters = () => {
  return axios.get("api/v1/doctor/top-doctor");
};

const ApiCreateNewUsers = (
  username,
  email,
  address,
  phone,
  password,
  image,
  gender,
  roleId,
  positionId
) => {
  const data = {
    username: username,
    email: email,
    address: address,
    phone: phone,
    password: password,
    image: image,
    gender: gender,
    roleId,
    positionId,
  };
  console.log("🚀 Data gửi đi:", JSON.stringify(data));
  return axios.post("api/v1/user/post", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const ApiUpdateUsers = async (
  id,
  username,
  phone,
  address,
  image,
  gender,
  roleId,
  positionId
) => {
  try {
    const data = {
      username,
      phone,
      address,
      image,
      gender,
      roleId,
      positionId,
    };

    return axios.put(`/api/v1/user/update/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    throw error;
  }
};

const ApiDeleteUsers = (userId) => {
  return axios.delete(`api/v1/user/delete/${userId}`); // Truyền id vào URL
};

export {
  ApiGetAllUser,
  ApiCreateNewUsers,
  ApiUpdateUsers,
  ApiDeleteUsers,
  ApiGetUserById,
  ApiGetAllDocters,
};
