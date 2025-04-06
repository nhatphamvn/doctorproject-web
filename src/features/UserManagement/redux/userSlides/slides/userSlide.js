import { createSlice } from "@reduxjs/toolkit";
import {
  createUsers,
  fetchUsers,
  deleteUsers,
  updateUser,
} from "../actions/userActions";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [], // Danh sách user (nếu cần)
    isLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {}, // Nếu cần thêm reducers khác
  extraReducers: (builder) => {
    builder
      .addCase(createUsers.pending, (state) => {
        state.isLoading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(createUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload); // Thêm user mới vào danh sách
        state.successMessage = "User created successfully!";
      })
      .addCase(createUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;

        if (!action.payload || !action.payload.DT || !action.payload.DT.id) {
          console.error("Lỗi: Dữ liệu API trả về không hợp lệ", action.payload);
          return;
        }

        const updatedUser = action.payload.DT; // Lấy dữ liệu từ DT

        if (state.users && state.users.length > 0) {
          const index = state.users.findIndex(
            (user) => user.id === updatedUser.id
          );
          if (index !== -1) {
            Object.assign(state.users[index], updatedUser);
          }
        }
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.EM;
      })

      // Xử lý xóa user
      .addCase(deleteUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.successMessage = "User deleted successfully!";
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
