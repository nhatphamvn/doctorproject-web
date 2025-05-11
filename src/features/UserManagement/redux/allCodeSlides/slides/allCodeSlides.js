import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGenders,
  fetchPositions,
  fetchRoles,
  fetchTimes,
  fetchPrice,
  fetchPayment,
  fetchProvince,
} from "../actions/allcodeActions";

const allCodeSlice = createSlice({
  name: "allcode",
  initialState: {
    genders: [],
    roles: [],
    positions: [],
    times: [],
    price: [],
    payment: [],
    province: [],
    isLoadingGenders: false, // Tách riêng cho từng action
    isLoadingPositions: false,
    isLoadingRoles: false,
    isLoadingTimes: false,
    isLoadingPrice: false,
    isLoadingPayment: false,
    isLoadingProvince: false,
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
      })
      //TIME
      .addCase(fetchTimes.pending, (state) => {
        state.isLoadingTimes = true;
      })
      .addCase(fetchTimes.fulfilled, (state, action) => {
        state.isLoadingTimes = false;
        state.times = action.payload;
      })
      .addCase(fetchTimes.rejected, (state, action) => {
        state.isLoadingTimes = false;
        state.error = action.payload;
      })
      //PRICE
      .addCase(fetchPrice.pending, (state) => {
        state.isLoadingPrice = true;
      })
      .addCase(fetchPrice.fulfilled, (state, action) => {
        state.isLoadingPrice = false;
        state.price = action.payload;
      })
      .addCase(fetchPrice.rejected, (state, action) => {
        state.isLoadingPrice = false;
        state.error = action.payload;
      })
      //PAYMENT
      .addCase(fetchPayment.pending, (state) => {
        state.isLoadingPayment = true;
      })
      .addCase(fetchPayment.fulfilled, (state, action) => {
        state.isLoadingPayment = false;
        state.payment = action.payload;
      })
      .addCase(fetchPayment.rejected, (state, action) => {
        state.isLoadingPayment = false;
        state.error = action.payload;
      })
      //PROVINCE
      .addCase(fetchProvince.pending, (state) => {
        state.isLoadingProvince = true;
      })
      .addCase(fetchProvince.fulfilled, (state, action) => {
        state.isLoadingProvince = false;
        state.province = action.payload;
      })
      .addCase(fetchProvince.rejected, (state, action) => {
        state.isLoadingProvince = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = allCodeSlice.actions; // Export actions nếu có reducers
export default allCodeSlice.reducer;
