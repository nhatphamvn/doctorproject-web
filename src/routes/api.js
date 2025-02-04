import express from 'express';

import apiControllerTest from '../controller/apiControllerTest';

const router = express.Router()


 
const initApiRoutes = (app) => {


    router.get('/test',apiControllerTest.apiTest)
    router.post('/register',apiControllerTest.apiHandleRegister)
    router.post('/login',apiControllerTest.apiHanleLogin)

    return app.use("/api/v1", router); // định nghĩa đường dẫn đầu tiên
}
export default initApiRoutes