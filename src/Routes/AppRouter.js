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
import AllDoctors from "../containers/Section/doctor/pages/AllDoctors.js";
import Appointment from "../features/DoctorManagement/pages/Appointment.js";
import Unauthorized from "../containers/Homepage/Unauthorized.js";
import ConfirmVerify from "../containers/Homepage/ConfirmVerify.js";
import Specialties from "../features/Specialties/Specialties.js";
import DetailSpecialty from "../containers/Section/Specialty/pages/DetailSpecialty.js";
import AllSpecialties from "../containers/Section/Specialty/pages/AllSpecialties.js";
import Clinics from "../features/Clinics/Clinics.js";
import DetailClinic from "../containers/Section/facility/pages/DetailClinic.js";
import AllClinics from "../containers/Section/facility/pages/AllClinics.js";
import SystemPrivate from "../containers/SystemNavbar/pages/SystemPrivate.js.js";
import CheckPatient from "../features/DoctorManagement/pages/CheckPatient.js";
import Blog from "../features/Blog/Blog.js";
import DetailBlog from "../containers/Section/blogs/pages/DetailBlog.js";
import AllBlogs from "../containers/Section/blogs/pages/AllBlogs.js";

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
        <Route path="/system/all-specialties" element={<AllSpecialties />} />
        <Route path="/system/all-clinics" element={<AllClinics />} />
        <Route path="/system/all-doctors" element={<AllDoctors />} />
        <Route path="/system/all-blogs" element={<AllBlogs />} />
        <Route path="/system/blog-detail/:id" element={<DetailBlog />} />
        <Route path="/system/clinic-detail/:id" element={<DetailClinic />} />
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
          <Route path="/doctor/check-list-patient" element={<CheckPatient />} />
          <Route path="/doctor/create-blog" element={<Blog />} />
        </Route>
      </Route>

      <Route element={<SystemLayout />}>
        <Route path="/system/system-private" element={<SystemPrivate />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRouter;
