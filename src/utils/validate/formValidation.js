import {
  USERNAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
  ADDRESS_REGEX,
  DATEOFBIRTH_REGEX,
} from "./regexPatterns";
import { ERROR_MESSAGES } from "./messages";

export const validateForm = (values) => {
  let errors = {};

  if (!values.username) {
    errors.username = "Username không được để trống!";
  } else if (!USERNAME_REGEX.test(values.username)) {
    errors.username = ERROR_MESSAGES.username;
  }

  if (!values.email) {
    errors.email = "Email không được để trống!";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = ERROR_MESSAGES.email;
  }

  if (!values.password) {
    errors.password = "Mật khẩu không được để trống!";
  } else if (!PASSWORD_REGEX.test(values.password)) {
    errors.password = ERROR_MESSAGES.password;
  }

  if (!values.phone) {
    errors.phone = "Số điện thoại không được để trống!";
  } else if (!PHONE_REGEX.test(values.phone)) {
    errors.phone = ERROR_MESSAGES.phone;
  }
  if (!values.address) {
    errors.address = "Địa chỉ không được để trống!";
  } else if (!ADDRESS_REGEX.test(values.address)) {
    errors.address = ERROR_MESSAGES.address;
  }
  if (!values.dateOfBirth) {
    errors.address = "Ngày Sinh không được để trống!";
  } else if (!DATEOFBIRTH_REGEX.test(values.dateOfBirth)) {
    errors.address = ERROR_MESSAGES.dateOfBirth;
  }

  return errors;
};
