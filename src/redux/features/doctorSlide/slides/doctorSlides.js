import { createSlice } from "@reduxjs/toolkit";
import { fetchDoctors } from "../actions/doctorActions";

const doctorSlice = createSlice({
  name: "doctors",
  initialState: {
    doctors: [], // Đảm bảo doctors được khởi tạo là mảng rỗng
    isLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload; // Cập nhật doctors với dữ liệu từ API
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default doctorSlice.reducer;
