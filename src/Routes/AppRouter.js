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
import DoctorDetail from "../containers/Section/doctor/pages/DoctorDetail.js";
import Appointment from "../features/DoctorManagement/pages/Appointment.js";
import Unauthorized from "../containers/Homepage/Unauthorized.js";
import ConfirmVerify from "../containers/Homepage/ConfirmVerify.js";
import Specialties from "../features/Specialties/Specialties.js";
import DetailSpecialty from "../containers/Section/Specialty/pages/DetailSpecialty.js";
import Clinics from "../features/Clinics/Clinics.js";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/system/doctor-detail/:id" element={<DoctorDetail />} />
        <Route
          path="/system/specialty-detail/:id"
          element={<DetailSpecialty />}
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/verify-booking" element={<ConfirmVerify />} />
      </Route>

      <Route element={<PrivateRoutes allowedRoles={["R1"]} />}>
        <Route element={<SystemLayout />}>
          <Route path="/system/user-redux" element={<UserRedux />} />
          <Route
            path="/system/list-users-redux"
            element={<UserManageRedux />}
          />
          <Route path="/system/markdown" element={<MarkDown />} />
          <Route path="/system/specialties" element={<Specialties />} />
          <Route path="/system/clinics" element={<Clinics />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/system/user-all" element={<User />} />
        </Route>
      </Route>

      <Route element={<PrivateRoutes allowedRoles={["R2"]} />}>
        <Route element={<SystemLayout />}>
          <Route path="/doctor/medical-appointment" element={<Appointment />} />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRouter;
