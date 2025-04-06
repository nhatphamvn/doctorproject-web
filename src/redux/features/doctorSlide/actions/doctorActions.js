import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllDoctors } from "../../../../service/otherUserService";

export const fetchDoctors = createAsyncThunk(
  "doctor/DoctorUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetAllDoctors();
      console.log("fectch data", response);

      if (response.EC === 0) {
        return response.DT;
      }
      return rejectWithValue(response.EM);
    } catch (error) {
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);
