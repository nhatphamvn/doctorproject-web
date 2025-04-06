import express from "express";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configviewEngine from "./config/viewEngine";
require("dotenv").config();
import bodyParser from "body-parser";
import connection from "./config/ConnectDB";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.REACT_URL, // Cho phép frontend cụ thể
    methods: "GET,POST,PUT,DELETE", // Các phương thức được phép
    credentials: true, // Cho phép cookie
  })
);

// Cấu hình body-parser trước khi khởi tạo các route
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: "50mb" })); // Mặc định là 1MB, tăng lên 50MB
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

app.use("/uploads", express.static("uploads"));
// Thiết lập view engine
configviewEngine(app);
connection();

// Khởi tạo các route
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
  console.log(" JWT backend nodejs " + PORT);
});
