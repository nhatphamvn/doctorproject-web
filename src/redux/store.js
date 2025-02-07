import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/redux/features/authSlide/authSlide";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
