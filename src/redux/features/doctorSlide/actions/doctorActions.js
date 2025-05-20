import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetAllDoctors,
  ApiGetAllDoctors,
  ApiSaveDoctors,
  ApiGetDoctorById,
  createScheduleDoctors,
  ApiGetPriceDoctors,
  getAllScheduleDoctors,
  ApiGetDoctorSchedule,
  ApiCreateSpecialties,
  ApiGetAllLimitSpecialties,
  ApiCreateClinics,
} from "../../../../service/otherUserService";

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
export const fetchAllDoctors = createAsyncThunk(
  "doctor/GetAllDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiGetAllDoctors();
      console.log("fectch data doctors", response);

      if (response.EC === 0) {
        return response.DT;
      }
      return rejectWithValue(response.EM);
    } catch (error) {
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);
export const fetchDoctorById = createAsyncThunk(
  "doctor/GetDoctorById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await ApiGetDoctorById(id);
      console.log("📥 Kết quả fetchDoctorById:", response);

      if (response?.EC === 0) {
        console.log("✅ Dữ liệu hợp lệ:", response.DT);
        return response.DT;
      }
      return rejectWithValue(response.EM);
    } catch (error) {
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);

export const saveDoctors = createAsyncThunk(
  "doctors/saveDoctors",
  async (data, { rejectWithValue }) => {
    console.log("🔥 Dữ liệu data trước khi gửi:", data);
    try {
      const response = await ApiSaveDoctors(
        data.contentHTML,
        data.contentMarkDown,
        data.description,
        data.doctorId,
        data.priceId,
        data.paymentId,
        data.provinceId,
        data.addressClinic,
        data.nameClinic,
        data.note,
        data.count,
        data.specialtyId,
        data.clinicId
      );
      console.log("check new data doctor infor", response);

      if (response?.EC === 0) {
        return response.DT;
      }
      return rejectWithValue(response.EM);
    } catch (error) {
      return rejectWithValue(error.EM);
    }
  }
);
export const createSchedules = createAsyncThunk(
  "doctors/createSchedules",
  async (data, { rejectWithValue }) => {
    console.log("🔥 Dữ liệu data trước khi gửi:", data);
    try {
      const response = await createScheduleDoctors(
        data.doctorId,
        data.date,
        data.timeType
      );
      if (response?.EC === 0) {
        return response.DT;
      }
      return rejectWithValue(response.EM);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchPricesDoctors = createAsyncThunk(
  "doctors/fetchPricesDoctors",
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await ApiGetPriceDoctors(doctorId);
      console.log("fectch data doctors", response);

      if (response.EC === 0) {
        return response.DT;
      }
      return rejectWithValue(response.EM);
    } catch (error) {
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);
export const fetchSchedules = createAsyncThunk(
  "doctors/fetchSchedules",
  async ({ doctorId, date }, { rejectWithValue }) => {
    try {
      const response = await getAllScheduleDoctors(doctorId, date);
      console.log("fectch data doctors", response);

      if (response.EC === 0) {
        return response.DT;
      }
      return rejectWithValue(response.EM);
    } catch (error) {
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);
export const fetchDoctorSchedule = createAsyncThunk(
  "doctor/fetchDoctorSchedule",
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await ApiGetDoctorSchedule(doctorId);
      console.log("📥 Kết quả fetchDoctorById:", response);

      if (response?.EC === 0) {
        console.log("✅ Dữ liệu hợp lệ:", response.DT);
        return response.DT;
      }
      return rejectWithValue(response.EM);
    } catch (error) {
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);

export const createSpecialties = createAsyncThunk(
  "specialties/createSpecialties",
  async (data, { rejectWithValue }) => {
    console.log("🔥 Dữ liệu data trước khi gửi:", data);
    try {
      const response = await ApiCreateSpecialties(data);
      if (response?.EC === 0) {
        return response.DT;
      }
      return rejectWithValue(response.EM);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchSpecialties = createAsyncThunk(
  "specialties/fetchSpecialties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiGetAllLimitSpecialties();

      if (response.EC === 0) {
        return response.DT;
      }
      return rejectWithValue(response.EM);
    } catch (error) {
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);
export const createClinics = createAsyncThunk(
  "clinics/createClinics",
  async (data, { rejectWithValue }) => {
    console.log("🔥 Dữ liệu data trước khi gửi:", data);
    try {
      const response = await ApiCreateClinics(data);
      if (response?.EC === 0) {
        return response.DT;
      }
      return rejectWithValue(response.EM);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
