import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/redux/features/authSlide/authSlide";
import languageReducer from '../../src/redux/features/language/languageSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
  },
});
