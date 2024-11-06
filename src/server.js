import express from 'express'
import initWebRoutes from './routes/web'
import configviewEngine from './configs/viewEngine'
require("dotenv").config();
import bodyParser from 'body-parser'


const app = express();
const PORT = process.env.PORT || 8000;

// Cấu hình body-parser trước khi khởi tạo các route
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Thiết lập view engine
configviewEngine(app);

// Khởi tạo các route
initWebRoutes(app);


app.listen(PORT,()=>{
    console.log(" JWT backend nodejs "+PORT);

})