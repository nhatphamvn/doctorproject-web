import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGenders,
  fetchPositions,
  fetchRoles,
} from "../actions/allcodeActions";

const allCodeSlice = createSlice({
  name: "allcode",
  initialState: {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGenders: false, // Tách riêng cho từng action
    isLoadingPositions: false,
    isLoadingRoles: false,
    error: null,
  },
  reducers: {
    // Có thể thêm reducers thủ công nếu cần, ví dụ:
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchGenders
      .addCase(fetchGenders.pending, (state) => {
        state.isLoadingGenders = true;
      })
      .addCase(fetchGenders.fulfilled, (state, action) => {
        state.isLoadingGenders = false;
        state.genders = action.payload;
      })
      .addCase(fetchGenders.rejected, (state, action) => {
        state.isLoadingGenders = false;
        state.error = action.payload;
      })

      // fetchPositions
      .addCase(fetchPositions.pending, (state) => {
        state.isLoadingPositions = true;
      })
      .addCase(fetchPositions.fulfilled, (state, action) => {
        state.isLoadingPositions = false;
        state.positions = action.payload;
      })
      .addCase(fetchPositions.rejected, (state, action) => {
        state.isLoadingPositions = false;
        state.error = action.payload;
      })

      // fetchRoles
      .addCase(fetchRoles.pending, (state) => {
        state.isLoadingRoles = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.isLoadingRoles = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.isLoadingRoles = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = allCodeSlice.actions; // Export actions nếu có reducers
export default allCodeSlice.reducer;
