import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/redux/features/authSlide/authSlide";
import languageReducer from "../../src/redux/features/language/languageSlice";
import allCodeReducer from "../features/UserManagement/redux/allCodeSlides/slides/allCodeSlides";
import usersReducer from "../features/UserManagement/redux/userSlides/slides/userSlide";
import doctorReducer from "../redux/features/doctorSlide/slides/doctorSlides";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    allcode: allCodeReducer,
    users: usersReducer,
    doctors: doctorReducer,
  },
});
