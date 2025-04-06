import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCodeService } from "../../../services/allCodeService";

export const fetchGenders = createAsyncThunk(
  "allcode/fetchGenders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCodeService("gender");
      if (response?.EC === 0) {
        return response.DT;
      }
      return rejectWithValue(response.EM);
    } catch (error) {
      return rejectWithValue(error.EM);
    }
  }
);

export const fetchPositions = createAsyncThunk(
  "allcode/fetchPositions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCodeService("position");
      if (response?.EC === 0) {
        return response.DT;
      }
      return rejectWithValue(response.EM);
    } catch (error) {
      return rejectWithValue(error.EM);
    }
  }
);

export const fetchRoles = createAsyncThunk(
  "allcode/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCodeService("role");
      if (response?.EC === 0) {
        return response.DT;
      }
      return rejectWithValue(response.EM);
    } catch (error) {
      return rejectWithValue(error.EM);
    }
  }
);
