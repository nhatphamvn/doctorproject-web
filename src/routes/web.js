import express from 'express';
import homeController from '../controller/homeController'
const router = express.Router()


 
const initWebRoutes = (app) => {
    router.get('/', homeController.handleHelloWorld);
    router.get('/users', homeController.handleHomePage);
    router.post('/users/create-users',homeController.handleCreateUsers)
    router.post('/delete-user/:id',homeController.handleDeleteUsers)
    router.get('/edit-users/:id',homeController.handleUpdateUsers)
    router.post('/users/update-users',homeController.handleCreateUpdateUsers)

    return app.use("/", router); // định nghĩa đường dẫn đầu tiên
}
export default initWebRoutes