import db from "../models/index";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
const salt = bcrypt.genSaltSync(10);

// Hàm băm mật khẩu
const hashPassword = (userPassword) => {
  const hashedPassword = bcrypt.hashSync(userPassword, salt);
  return hashedPassword;
};

// Hàm kiểm tra sự tồn tại của trường bất kỳ
const checkExistence = async (field, value) => {
  let condition = {};
  condition[field] = value;

  let user = await db.User.findOne({
    where: condition
  });

  return !!user; // Trả về true nếu tìm thấy
};

// Hàm đăng ký người dùng mới
const registerNewUser = async (userData) => {
  try {
    if (!userData || !userData.email || !userData.phone || !userData.password || !userData.username) {
      return {
        EM: 'Thiếu dữ liệu cần thiết!',
        EC: 1001
      };
    }

    // Kiểm tra email tồn tại
    const isEmailExist = await checkExistence('email', userData.email);
    if (isEmailExist) {
      return {
        EM: 'Email đã tồn tại!',
        EC: 1002
      };
    }

    // Kiểm tra phone tồn tại
  
    const isPhoneExist = await checkExistence('phone', userData.phone);
    if (isPhoneExist) {
      return {
        EM: 'Số điện thoại đã tồn tại!',
        EC: 1003
      };
    }

    // Băm mật khẩu (nếu là async)
    const hashedPassword = await hashPassword(userData.password);

    // Tạo người dùng mới
    const user = await db.User.create({
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      password: hashedPassword
    });

    if (!user) {
      return {
        EM: 'Không thể tạo tài khoản, vui lòng thử lại!',
        EC: 1004
      };
    }


    return {
      EM: 'Bạn đã đăng kí thành công!',
      EC: 0,
      DT :{
        id: user.id

      }
    };
  } catch (error) {
    return {
      EM: 'Lỗi gì đó ở Máy Chủ!',
      EC: -1
    };
  }
};


const logInAccounts = async (userData) => {
  try {
    if (!userData || !userData.email || !userData.password) {
      return { EM: 'Thiếu dữ liệu cần thiết!', EC: 1001 };
    }

    let user = await db.User.findOne({
      where: { email: userData.email },
      attributes: ['id', 'email', 'username', 'password']
    });

    if (!user) {
      return { EM: 'Email không tồn tại!', EC: 1002 };
    }

    const isPasswordValid = await bcrypt.compare(userData.password, user.password);
    if (!isPasswordValid) {
      return { EM: "Mật khẩu không đúng!", EC: 1003 };
    }

    // **Tạo JWT Token**
    const accessToken = jwt.sign(
      { id: user.id, email: user.email }, // Payload
      process.env.JWT_SECRET,  // **Khóa bí mật**, lưu trong `.env`
      { expiresIn: '1h' }  // **Thời gian hết hạn**
    );

    const refreshToken = jwt.sign(
      { id: user.id}, // Payload
      process.env.JWT_REFRESH_SECRET,  // **Khóa bí mật**, lưu trong `.env`
      { expiresIn: '7d' }  // **Thời gian hết hạn**
    );

    return {
      EM: "Đăng nhập thành công!",
      EC: 0,
      DT: {
        id: user.id,
        email: user.email,
        username: user.username,
        access_token: accessToken,
        refresh_token: refreshToken  // **Gửi token về client**
      }
    };

  } catch (error) {
    return { EM: "Lỗi gì đó ở Máy Chủ!", EC: 1004 };
  }
};


module.exports = {
  registerNewUser,logInAccounts
};
