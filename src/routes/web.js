import express from 'express';
import homeController from '../controller/homeController'
const router = express.Router()


 
const initWebRoutes = (app) => {
    router.get('/', homeController.handleHelloWorld);
    router.get('/users', homeController.handleHomePage);

    return app.use("/", router); // định nghĩa đường dẫn đầu tiên
}
export default initWebRoutes