import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {
    access_token: "",
    email: "",
    refresh_token: "",
    username: "",
    roleId: "",
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
        roleId: action.payload?.DT?.roleId,
      };
      state.isAuthenticated = true;
    },
    handleLogout: (state) => {
      localStorage.removeItem("access_token");
      state.account = {
        access_token: "",
        email: "",
        refresh_token: "",
        username: "",
        roleId: "",
      };
      state.isAuthenticated = false;
    },

    initializeAuth: (state) => {
      const token = localStorage.getItem("access_token");
      const token_res = localStorage.getItem("refresh_token");
      if (token) {
        state.account.access_token = token;
        state.account.refresh_token = token_res;
        state.isAuthenticated = true;
      }
    },
  },
});

// Export actions
export const { handleLoginSuccess, handleLogout, initializeAuth } =
  authSlice.actions;

// Export reducer
export default authSlice.reducer;
