import authServices from "../service/authService";

const apiHandleRegister = async (req, res) => {
  try {
    const data = await authServices.registerNewUser(req.body);

    if (data) {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC, // Thành công
        DT: "", // Dữ liệu phản hồi
      });
    } else {
      return res.status(400).json({
        EM: data.EM,
        EC: 1004,
        DT: "",
      });
    }
  } catch (error) {
    console.error("Error during user registration:", error);

    return res.status(500).json({
      EM: "Máy chủ bị lỗi, vui lòng thử lại sau.",
      EC: 1004,
      DT: "",
    });
  }
};

const apiHanleLogin = async (req, res) => {
  try {
    const data = await authServices.logInAccounts(req.body);

    if (data && data.EC === 0) {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: {
          id: data?.DT?.id,
          email: data?.DT?.email,
          username: data?.DT?.username,
          access_token: data?.DT?.access_token,
          refresh_token: data?.DT?.refresh_token,
          roleId: data?.DT?.roleId,
          // **Trả token về client**
        },
      });
    } else {
      return res.status(400).json({
        EM: data.EM,
        EC: data.EC,
        DT: null,
      });
    }
  } catch (e) {
    return res.status(500).json({
      EM: "Máy chủ bị lỗi, vui lòng thử lại sau.",
      EC: 1004,
      DT: null,
    });
  }
};

module.exports = {
  apiHandleRegister,
  apiHanleLogin,
};
