import express from 'express';

import apiControllerTest from '../controller/apiControllerTest';
import userController from '../controller/userController';
import productController from '../controller/productController'

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
    //PRODUCT
    router.get('/product/read/:id',productController.productReadById);
    router.get('/product/read-all-product',productController.productReadAll);
    router.post('/product/create-product',productController.productCreateNewDB);
    router.put('/product/update-product/:id',productController.productUpdate);
    router.delete('/product/delete-product/:id',productController.productDelete);

    return app.use("/api/v1", router); // định nghĩa đường dẫn đầu tiên
}
export default initApiRoutes