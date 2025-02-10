import express from 'express';

import apiControllerTest from '../controller/apiControllerTest';
import userController from '../controller/userController';

const router = express.Router()


 
const initApiRoutes = (app) => {


    router.post('/register',apiControllerTest.apiHandleRegister)
    router.post('/login',apiControllerTest.apiHanleLogin)

    //CRUD
    router.get('/user/read/:id',userController.userReadById);
    router.get('/user/read-all-users',userController.userReadAllUsers);
    router.post('/user/post',userController.userCreateNewDB);
    router.put('/user/update/:id',userController.userUpdate);
    router.delete('/user/delete/:id',userController.userDelete);

    return app.use("/api/v1", router); // định nghĩa đường dẫn đầu tiên
}
export default initApiRoutes