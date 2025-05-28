import nodemailer from "nodemailer";
require("dotenv").config();

const buildTokenBooking = (doctorId, token) => {
  let result = `${process.env.REACT_URL}/verify-booking?token=${token}&doctorId=${doctorId}`;

  return result;
};

const parseBase64Image = (base64String) => {
  const matches = base64String.match(/^data:image\/(\w+);base64,(.+)$/);

  if (!matches || matches.length !== 3) {
    throw new Error("Ảnh base64 không hợp lệ");
  }

  const ext = matches[1]; // png, jpeg, webp,...
  const data = matches[2]; // phần dữ liệu base64

  const buffer = Buffer.from(data, "base64");

  return {
    extension: ext,
    buffer,
  };
};

// Hàm gửi email với đối số toEmail
const sendEmailPatient = async (input, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_WEB, // Email của bạn
        pass: process.env.PASSWORD_WEB, // App password 16 ký tự
      },
    });
    console.log("language vvvv", input.language);

    const mailOptions = {
      from: process.env.EMAIL_WEB, // Địa chỉ input gửi
      to: input.email, // Địa chỉ email nhận
      subject: "Xác nhận đặt lịch khám", // Tiêu đề email
      html: getChangeLanguage(input, token),
    };

    const data = await transporter.sendMail(mailOptions);

    // Trả về kết quả thành công
    return {
      EM: "Gửi Email Thành Công",
      EC: 0,
      DT: data, // Thông tin phản hồi từ việc gửi email
    };
  } catch (error) {
    console.error("❌ Gửi email thất bại:", error);

    // Kiểm tra lỗi cụ thể và trả về thông báo lỗi phù hợp
    let errorMessage = "Gửi email thất bại. Vui lòng thử lại.";
    if (error.code === "ECONNREFUSED") {
      errorMessage =
        "Không thể kết nối tới máy chủ email. Vui lòng kiểm tra kết nối.";
    } else if (error.responseCode === 535) {
      errorMessage =
        "Thông tin xác thực không hợp lệ. Kiểm tra lại mật khẩu ứng dụng.";
    } else if (error.responseCode === 550) {
      errorMessage =
        "Email không thể gửi đi do người nhận bị từ chối. Kiểm tra lại địa chỉ email nhận.";
    }

    // Trả về thông tin lỗi chi tiết hơn
    return {
      EM: errorMessage, // Thông báo lỗi chi tiết
      EC: 1, // Mã lỗi
      DT: null, // Không có dữ liệu trả về
      error: error.message, // Thêm thông tin chi tiết lỗi
    };
  }
};
const getChangeLanguage = (input, token) => {
  if (input.language === "vi") {
    return `
    <p>Xin chào,</p>
  
    <p>Cảm ơn bạn đã đặt lịch khám tại phòng khám XYZ. Dưới đây là thông tin xác nhận về lịch khám của bạn:</p>
  
    <ul>
      <li><strong>Ngày Giờ Khám: ${input.timeDate}</strong></li>
      <li><strong>Bác sĩ: ${input.doctorName}</strong></li>
    </ul>
  
    <p>Vui lòng <a href="${buildTokenBooking(
      input.doctorId,
      token
    )}">Click Here</a> để xác nhận </p>
  
    <p>Nếu bạn cần thay đổi hoặc hủy lịch hẹn, vui lòng liên hệ với chúng tôi qua email này hoặc gọi vào số điện thoại ${
      input.phone
    }.</p>
  
    <p>Chúng tôi rất mong được đón tiếp bạn tại phòng khám.</p>
  
    <p>Trân trọng,<br>Phòng khám XYZ</p>
  `;
  }

  if (input.language === "en") {
    return `
    <p>Hello,</p>
  
    <p>Thank you for scheduling an appointment at XYZ Clinic. Below are the details of your appointment:</p>
  
    <ul>
      <li><strong>Date and Time: ${input.timeDate}</strong></li>
      <li><strong>Doctor: ${input.doctorName}</strong></li>
    </ul>
  
    <p>Please <a href="${buildTokenBooking(
      input.doctorId,
      token
    )}">Click Here to confirm your appointment</a>.</p>
  
    <p>If you need to change or cancel the appointment, please contact us via this email or call  <strong> ${
      input.phone
    } </strong> .</p>
  
    <p>We look forward to welcoming you to our clinic.</p>
  
    <p>Sincerely,<br>XYZ Clinic</p>
  `;
  }
};

const sendRemedyPatient = async (input) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_WEB, // Email của bạn
        pass: process.env.PASSWORD_WEB, // App password 16 ký tự
      },
    });
    const { extension, buffer } = parseBase64Image(input.image);

    const mailOptions = {
      from: process.env.EMAIL_WEB,
      to: input.email,
      subject: "Xác nhận đặt lịch khám",
      html: getChangeRemedyPatient(input), // ✅ nhớ sửa tên hàm nếu sai
      attachments: [
        {
          filename: `image_patient.${extension}`,
          content: buffer,
          cid: "image1",
        },
      ],
    };

    const data = await transporter.sendMail(mailOptions);

    // Trả về kết quả thành công
    return {
      EM: "Gửi Email Thành Công",
      EC: 0,
      DT: data, // Thông tin phản hồi từ việc gửi email
    };
  } catch (error) {
    console.error("❌ Gửi email thất bại:", error);

    // Kiểm tra lỗi cụ thể và trả về thông báo lỗi phù hợp
    let errorMessage = "Gửi email thất bại. Vui lòng thử lại.";
    if (error.code === "ECONNREFUSED") {
      errorMessage =
        "Không thể kết nối tới máy chủ email. Vui lòng kiểm tra kết nối.";
    } else if (error.responseCode === 535) {
      errorMessage =
        "Thông tin xác thực không hợp lệ. Kiểm tra lại mật khẩu ứng dụng.";
    } else if (error.responseCode === 550) {
      errorMessage =
        "Email không thể gửi đi do người nhận bị từ chối. Kiểm tra lại địa chỉ email nhận.";
    }

    // Trả về thông tin lỗi chi tiết hơn
    return {
      EM: errorMessage, // Thông báo lỗi chi tiết
      EC: 1, // Mã lỗi
      DT: null, // Không có dữ liệu trả về
      error: error.message, // Thêm thông tin chi tiết lỗi
    };
  }
};
const getChangeRemedyPatient = (input) => {
  if (input.language === "vi") {
    return `
      <p>Xin chào,</p>
  
      <p>Cảm ơn bạn đã đặt lịch khám tại Phòng khám XYZ. Thông tin chi tiết về cuộc hẹn của bạn như sau:</p>
  
      <ul>
        <li><strong>Thời gian khám: ${input.date}</strong></li>
        <li><strong>Bác sĩ phụ trách: ${input.username}</strong></li>
      </ul>
  
      <p>Vui lòng xem hình ảnh liên quan đến chi phí khám bên dưới:</p>
      <img src="cid:image1" alt="Chi phí khám" />
  
      <p>Nếu bạn cần thay đổi hoặc hủy lịch hẹn, vui lòng liên hệ với chúng tôi qua email này hoặc gọi đến số điện thoại <strong>${input.phone}</strong>.</p>
  
      <p>Chúng tôi rất mong được đón tiếp bạn tại phòng khám.</p>
  
      <p>Trân trọng,<br>Phòng khám XYZ</p>
    `;
  }

  if (input.language === "en") {
    return `
      <p>Hello,</p>
  
      <p>Thank you for scheduling your appointment at XYZ Clinic. Here are the details of your upcoming visit:</p>
  
      <ul>
        <li><strong>Appointment Time: ${input.date}</strong></li>
        <li><strong>Attending Doctor: ${input.username}</strong></li>
      </ul>
  
      <p>Please find the attached image related to the consultation fee below:</p>
      <img src="cid:image1" alt="Consultation Fee" />
  
      <p>If you need to reschedule or cancel your appointment, feel free to contact us via this email or call us at <strong>${input.phone}</strong>.</p>
  
      <p>We look forward to welcoming you to our clinic.</p>
  
      <p>Best regards,<br>XYZ Clinic</p>
    `;
  }
};

module.exports = { sendEmailPatient, sendRemedyPatient };
