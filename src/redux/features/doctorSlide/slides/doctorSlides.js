import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDoctors,
  fetchAllDoctors,
  saveDoctors,
  fetchDoctorById,
  createSchedules,
  fetchPricesDoctors,
  fetchSchedules,
  fetchDoctorSchedule,
  createSpecialties,
  fetchSpecialties,
  createClinics,
  fetchClinics,
  createBlog,
  fetchBlog,
  fetchBlogById,
} from "../actions/doctorActions";

const doctorSlice = createSlice({
  name: "doctors",
  initialState: {
    doctors: [],
    doctor: null,
    schedules: [],
    prices: [],
    specialties: [],
    clinics: [],
    blogs: [],
    blog: null,
    doctorInfo: null,
    isLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Create markdown
      .addCase(saveDoctors.pending, (state) => {
        state.isLoading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(saveDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = [...state.doctors, action.payload]; // Thêm user mới vào danh sách
        state.successMessage = "User created successfully!";
      })
      .addCase(saveDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //fetchDoctor R2
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
      })
      //fetchDoctor byId
      .addCase(fetchDoctorById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.doctor = null;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctor = action.payload; // Cập nhật doctors với dữ liệu từ API
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //GET ALL DOCTORS SECOND
      .addCase(fetchAllDoctors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //SCHEDULE
      .addCase(fetchSchedules.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.isLoading = false;
        state.schedules = action.payload;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createSchedules.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSchedules.fulfilled, (state, action) => {
        state.isLoading = false;
        state.schedules = [...state.schedules, action.payload];
      })
      .addCase(createSchedules.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchDoctorSchedule.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.doctorInfo = null;
      })
      .addCase(fetchDoctorSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctorInfo = action.payload; // Cập nhật doctors với dữ liệu từ API
      })
      .addCase(fetchDoctorSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //Price
      .addCase(fetchPricesDoctors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.prices = null;
      })
      .addCase(fetchPricesDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prices = action.payload; // Cập nhật doctors với dữ liệu từ API
      })
      .addCase(fetchPricesDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //create specialties
      .addCase(createSpecialties.pending, (state) => {
        state.isLoading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(createSpecialties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.specialties = [...state.specialties, action.payload];
        state.successMessage = "Specialties created successfully!";
      })
      .addCase(createSpecialties.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchSpecialties.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSpecialties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.specialties = action.payload; // Cập nhật doctors với dữ liệu từ API
      })
      .addCase(fetchSpecialties.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //clinic
      .addCase(createClinics.pending, (state) => {
        state.isLoading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(createClinics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clinics = [...state.clinics, action.payload];
        state.successMessage = "clinics created successfully!";
      })
      .addCase(createClinics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchClinics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClinics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clinics = action.payload; // Cập nhật doctors với dữ liệu từ API
      })
      .addCase(fetchClinics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //blogs
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = [...state.blogs, action.payload];
        state.successMessage = "blogs created successfully!";
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload; // Cập nhật doctors với dữ liệu từ API
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blog = action.payload; // Cập nhật doctors với dữ liệu từ API
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default doctorSlice.reducer;
