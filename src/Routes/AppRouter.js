import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../containers/Homepage/HomePage.js";
import User from "../features/UserManagement/pages/UserManagement.js";
import Admin from "../features/AdminManagement/pages/AdminManagement.js";
import Login from "../features/Auth/pages/LoginPage.js";
import Register from "../features/Auth/pages/RegisterPage.js";
import App from "../App.js";
import PrivateRoutes from "../routes/PrivateRoutes.js";
import SystemLayout from "../containers/SystemNavbar/components/SystemLayout.js";
import UserRedux from "../features/UserManagement/components/UserRedux.js";
import UserManageRedux from "../features/UserManagement/pages/UserManageRedux.js";
import MarkDown from "../features/MarkDown/MarkDown.js";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route element={<SystemLayout />}>
          <Route path="/system/user-redux" element={<UserRedux />} />
          <Route
            path="/system/list-users-redux"
            element={<UserManageRedux />}
          />
          <Route path="/system/markdown" element={<MarkDown />} />
          <Route path="/system/user-all" element={<User />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRouter;
