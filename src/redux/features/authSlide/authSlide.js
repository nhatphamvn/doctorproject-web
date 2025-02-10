import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {
    access_token: "",
    email: "",
    refresh_token: "",
    username: "",
  },
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLoginSuccess: (state, action) => {
      state.account = {
        ...state.account, // Giữ lại các giá trị cũ
        access_token: action.payload?.DT?.access_token,
        email: action.payload?.DT?.email,
        refresh_token: action.payload?.DT?.refresh_token,
        username: action.payload?.DT?.username,
        
      };
      state.isAuthenticated = true;
    }
  },
});

// Export actions
export const { handleLoginSuccess, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
