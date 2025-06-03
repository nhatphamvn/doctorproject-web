// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "../redux/features/authSlide/authSlide";
import languageReducer from "../redux/features/language/languageSlice";
import allCodeReducer from "../features/UserManagement/redux/allCodeSlides/slides/allCodeSlides";
import usersReducer from "../features/UserManagement/redux/userSlides/slides/userSlide";
import doctorReducer from "../redux/features/doctorSlide/slides/doctorSlides";

// Cấu hình redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // ✅ Chỉ lưu auth state (nếu muốn lưu thêm thì thêm vào)
};

// Gộp reducers
const rootReducer = combineReducers({
  auth: authReducer,
  language: languageReducer,
  allcode: allCodeReducer,
  users: usersReducer,
  doctors: doctorReducer,
});

// Tạo persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // cần thiết để redux-persist hoạt động
    }),
});

// Tạo persistor
export const persistor = persistStore(store);
