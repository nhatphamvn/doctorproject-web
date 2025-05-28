import express from "express";

import apiControllerTest from "../controller/apiControllerTest";
import userController from "../controller/userController";
import productController from "../controller/productController";
import allCodeController from "../controller/allCodeController";
import doctorController from "../controller/doctorController";
import patientController from "../controller/patientController";
import specialtyController from "../controller/specialtyController";

const router = express.Router();

const initApiRoutes = (app) => {
  router.post("/register", apiControllerTest.apiHandleRegister);
  router.post("/login", apiControllerTest.apiHanleLogin);

  //CRUD
  router.get("/user/read/:id", userController.userReadById);
  router.get("/user/read-all-users", userController.userReadAllUsers);
  router.post("/user/post", userController.userCreateNewDB);
  router.put("/user/update/:id", userController.userUpdate);
  router.delete("/user/delete/:id", userController.userDelete);

  // //PRODUCT
  // router.get("/product/read/:id", productController.productReadById);
  // router.get("/product/read-all-product", productController.productReadAll);
  // router.post("/product/create-product", productController.productCreateNewDB);
  // router.put("/product/update-product/:id", productController.productUpdate);
  // router.delete("/product/delete-product/:id", productController.productDelete);

  //AllCode
  router.get("/allcode", allCodeController.getAllCode);

  //Doctor
  router.get("/doctor/top-doctor", doctorController.getAllDoctor);
  router.get("/doctor/get-all-doctors", doctorController.getDoctorsController);
  router.post("/doctor/save-data-doctors", doctorController.saveNewDoctors);
  router.get(
    "/doctor/get-doctor/:id",
    doctorController.getDoctorControllerById
  );

  //Schedule
  router.post(
    "/doctor/bulkcreate-schedule",
    doctorController.bulkCreateDoctors
  );
  router.get("/doctor/get-all-schedule", doctorController.getAllSchedules);
  router.get("/doctor/get-price-doctors", doctorController.getPriceDoctors);
  router.get("/doctor/get-doctor-schedule", doctorController.getDoctorSchedule);

  //patient
  router.post(
    "/patient/create-bookingPatient",
    patientController.createBookingPatient
  );
  router.post(
    "/patient/verify-book-appointment",
    patientController.createVerifyBookAppointment
  );
  router.get(
    "/patient/get-list-patient-doctor",
    patientController.getListPatientDoctor
  );
  router.post("/patient/send-remedy", patientController.createSendRemedy);
  //Specialty
  router.post(
    "/specialties/create-specialties",
    specialtyController.createSpecialies
  );
  router.get(
    "/specialties/get-all-specialties",
    specialtyController.getAllSpecialties
  );
  router.get(
    "/specialties/get-specialty-id",
    specialtyController.getSpecialtyById
  );
  //clinic
  router.post(
    "/clinics/create-clinics",
    specialtyController.createClinicsController
  );
  router.get("/clinics/get-all-clinics", specialtyController.getAllClinics);

  router.get("/clinics/get-clinics-id", specialtyController.getClinicById);
  //blog
  router.post("/blog/create-post-blog", doctorController.CreateBlogController);
  router.get("/blog/get-all-blog", doctorController.GetAllBlogController);
  router.get("/blog/get-blog-id", doctorController.getBlogControllerById);

  return app.use("/api/v1", router); // định nghĩa đường dẫn đầu tiên
};
export default initApiRoutes;
