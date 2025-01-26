import db from "../models/index";
import bcrypt from 'bcryptjs';

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
    // Kiểm tra dữ liệu đầu vào
    if (!userData || !userData.email || !userData.phone || !userData.password || !userData.username) {
      return {
        EM: 'Thiếu dữ liệu cần thiết!',
        EC: '1'
      };
    }

    // Kiểm tra email tồn tại
    const isEmailExist = await checkExistence('email', userData.email);
    if (isEmailExist) {
      return {
        EM: 'Email đã tồn tại!',
        EC: '1'
      };
    }

    // Kiểm tra phone tồn tại
    const isPhoneExist = await checkExistence('phone', userData.phone);
    if (isPhoneExist) {
      return {
        EM: 'Phone đã tồn tại!',
        EC: '1'
      };
    }

    // Băm mật khẩu
    const hashedPassword = hashPassword(userData.password);

    // Tạo người dùng mới
    await db.User.create({
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      password: hashedPassword
    });

    return {
      EM: 'Bạn đã đăng kí thành công!',
      EC: '0'
    };
  } catch (error) {
    console.error('Error in registerNewUser:', error); // Log lỗi
    return {
      EM: 'Lỗi gì đó ở Máy Chủ!',
      EC: '-1'
    };
  }
};

module.exports = {
  registerNewUser
};
