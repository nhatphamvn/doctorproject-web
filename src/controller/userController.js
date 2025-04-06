import userApiService from "../service/userApiService";

const userReadById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ EM: "Missing user ID", EC: 400, DT: null });
    }

    const data = await userApiService.ApiGetUserById(id);

    if (!data || !data.DT) {
      return res.status(404).json({ EM: data.EM, EC: data.EC, DT: null });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in userReadById:", error);
    return res
      .status(500)
      .json({ EM: "Internal server error", EC: 500, DT: null });
  }
};

const userReadAllUsers = async (req, res) => {
  try {
    const users = await userApiService.ApiGetAllUsers();

    if (!users.DT || users.DT.length === 0) {
      return res.status(404).json({ EM: "No users found", EC: 404, DT: null });
    }

    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ EM: "Internal server error", EC: 500, DT: null });
  }
};

const userCreateNewDB = async (req, res) => {
  try {
    const {
      username,
      email,
      address,
      phone,
      password,
      image,
      gender,
      roleId,
      positionId,
    } = req.body;

    console.log("check", req.body);

    const newUser = await userApiService.ApiCreateUser(
      username,
      email,
      address,
      phone,
      password,
      image,
      gender,
      roleId,
      positionId
    );

    if (!newUser.DT) {
      return res.status(201).json({ EM: newUser.EM, EC: newUser.EC, DT: null });
    }

    return res.status(201).json(newUser);
  } catch (e) {
    return res
      .status(500)
      .json({ EM: "Internal server error", EC: 500, DT: null });
  }
};

const userUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, phone, address, image, gender, roleId, positionId } =
      req.body;
    console.log("📩 Data received from Postman:", {
      id,
      username,
      phone,
      address,
      image,
      gender,
      roleId,
      positionId,
    });

    if (!id) {
      return res.status(400).json({ EM: "ID không hợp lệ", EC: 400, DT: null });
    }
    const updatedUser = await userApiService.ApiUpdateUser(
      id,
      username,
      phone,
      address,
      image || null, // Nếu không có ảnh, truyền null để không ghi đè
      gender,
      roleId,
      positionId
    );
    console.log("🔄 Data after update:", updatedUser);
    // Nếu có lỗi từ service
    if (updatedUser.EC !== 0) {
      return res.status(400).json({
        EM: updatedUser.EM,
        EC: updatedUser.EC,
        DT: updatedUser.DT, // Giữ lại DT để debug dễ hơn
      });
    }

    // Trả về kết quả thành công
    return res.status(200).json({
      EC: 0,
      EM: "Cập nhật thành công!",
      DT: updatedUser,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ EM: "Lỗi server nội bộ", EC: 500, DT: null });
  }
};

const userDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await userApiService.ApiDelete(id);
    if (!id) {
      return res
        .status(400)
        .json({ EM: deletedUser.EM, EC: deletedUser.EC, DT: null });
    }
    if (!deletedUser || !deletedUser.DT) {
      return res
        .status(404)
        .json({ EM: deletedUser.EM, EC: deletedUser.EC, DT: null });
    }

    return res.status(200).json(deletedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ EM: "Internal server error", EC: 500, DT: null });
  }
};

module.exports = {
  userReadById,
  userReadAllUsers,
  userCreateNewDB,
  userUpdate,
  userDelete,
};
