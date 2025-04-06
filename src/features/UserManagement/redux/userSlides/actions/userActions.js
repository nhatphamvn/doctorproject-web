import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ApiCreateNewUsers,
  ApiDeleteUsers,
  ApiGetAllUser,
  ApiUpdateUsers,
} from "../../../services/userService";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiGetAllUser();
      if (response.EC === 0) {
        return response.DT;
      }
      return rejectWithValue(response.EM);
    } catch (error) {
      return rejectWithValue(error.EM);
    }
  }
);

export const createUsers = createAsyncThunk(
  "users/createUsers",
  async (userData, { rejectWithValue }) => {
    console.log("🔥 Dữ liệu userData trước khi gửi:", userData);
    try {
      const response = await ApiCreateNewUsers(
        userData.username,
        userData.email,
        userData.address,
        userData.phone,
        userData.password,
        userData.image,
        userData.gender,
        userData.role,
        userData.position
      );
      if (response?.EC === 0) {
        return response.DT;
      }
      return rejectWithValue(response.EM);
    } catch (error) {
      return rejectWithValue(error.EM);
    }
  }
);
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (
    { id, username, phone, address, image, gender, roleId, positionId },
    { rejectWithValue }
  ) => {
    try {
      const response = await ApiUpdateUsers(
        id,
        username,
        phone,
        address,
        image,
        gender,
        roleId,
        positionId
      );
      if (response && response.EC === 0) {
        return response.DT; // Trả về dữ liệu để cập nhật store nếu cần
      } else {
        return rejectWithValue(response.EM || "Cập nhật thất bại");
      }
    } catch (error) {
      return rejectWithValue(error.EM || "Có lỗi xảy ra");
    }
  }
);

export const deleteUsers = createAsyncThunk(
  "users/deleteUsers",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await ApiDeleteUsers(userId);
      if (response.EC === 0) {
        return userId; // Trả về ID user vừa xóa
      }
      return rejectWithValue(response.EM);
    } catch (error) {
      return rejectWithValue(error.EM);
    }
  }
);
