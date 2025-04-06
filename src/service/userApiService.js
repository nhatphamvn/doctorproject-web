import userRepository from "../repositories/userRepositories";
import bcrypt from "bcryptjs";

//GET

const hashPassword = (userPassword) => {
  if (!userPassword) {
    throw new Error("Password is required");
  }
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(userPassword, salt);
};

const ApiGetUserById = async (id) => {
  try {
    const userData = await userRepository.getUserById(id);
    if (!userData) {
      return {
        EM: "Không có người dùng!",
        EC: 1,
        DT: null,
      };
    }
    return {
      EM: "Tìm kiếm người dùng thành công!",
      EC: 0,
      DT: userData,
    };
  } catch (error) {
    return {
      EM: "Lỗi truy xuất người dùng!",
      EC: 500,
      DT: null,
    };
  }
};

const ApiGetAllUsers = async () => {
  try {
    const users = await userRepository.getAllUsers();

    if (!users) {
      return {
        EM: "Không có ngưỜi dùng nào trong dữ liệu!",
        EC: 1,
        DT: null,
      };
    }
    const updatedUsers = users.map((user) => {
      if (user.image && Buffer.isBuffer(user.image)) {
        // Chuyển đổi Buffer thành base64
        user.image = user.image.toString("base64");
      }
      return user;
    });

    return {
      EM: "Tìm kiếm thành công!",
      EC: 0,
      DT: updatedUsers,
    };
  } catch (error) {
    return {
      EM: "Lỗi truy xuất dữ liệu!",
      EC: 500,
      DT: null,
    };
  }
};
//POST
const ApiCreateUser = async (
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
  try {
    const hashedPassword = await hashPassword(password);

    const newUser = await userRepository.createUser({
      username,
      email,
      address,
      phone,
      password: hashedPassword,
      image,
      gender,
      roleId,
      positionId,
    });

    return {
      EM: "Bạn đã tạo thành công người dùng!",
      EC: 0,
      DT: {
        id: newUser.id,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      EM: "Lỗi tạo người dùng!",
      EC: 500,
      DT: null,
    };
  }
};

//PUT
const ApiUpdateUser = async (
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
    if (!id) {
      return {
        EM: "ID không hợp lệ",
        EC: 400,
        DT: null,
      };
    }

    // 🚀 Log dữ liệu trước khi cập nhật
    console.log("📝 Data before update:", {
      id,
      username,
      phone,
      address,
      image,
      gender,
      roleId,
      positionId,
    });

    const updateUser = await userRepository.updateUser(id, {
      username,
      phone,
      address,
      image,
      gender,
      roleId,
      positionId,
    });

    // 🚀 Log dữ liệu sau khi cập nhật
    console.log("✅ Data after update in DB:", updateUser);

    if (!updateUser) {
      return {
        EM: "Người dùng không được tìm thấy",
        EC: 1,
        DT: null,
      };
    }

    return {
      EM: "Sửa đổi thành công người dùng",
      EC: 0,
      DT: updateUser,
    };
  } catch (error) {
    console.error("❌ Error updating user:", error);
    return {
      EM: "Lỗi chỉnh sửa người dùng",
      EC: 500,
      DT: null,
    };
  }
};

const ApiDelete = async (id) => {
  try {
    const deleted = await userRepository.deleteUser(id);
    if (!deleted) {
      return {
        EM: "Không tìm thấy người dùng!",
        EC: 1,
        DT: null,
      };
    }
    return {
      EM: "Đã xoá thành công người dùng",
      EC: 0,
      DT: deleted,
    };
  } catch (error) {
    return {
      EM: "Lỗi khi xoá người dùng!",
      EC: 500,
      DT: null,
    };
  }
  //DELETE
};

module.exports = {
  ApiUpdateUser,
  ApiDelete,
  ApiGetAllUsers,
  ApiGetUserById,
  ApiCreateUser,
};
