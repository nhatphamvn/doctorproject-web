import axios from "axios";

// Tạo một instance Axios
const instance = axios.create({
  baseURL: "http://localhost:8080/", // URL cơ sở
  timeout: 10000, // Thời gian tối đa cho một request (ms)
  headers: {
    "Content-Type": "application/json", // Định dạng mặc định
    Accept: "application/json",        // Yêu cầu phản hồi dạng JSON
  },
});

// Interceptor cho request
instance.interceptors.request.use(
  function (config) {
    console.log(`[REQUEST] ${config.method?.toUpperCase()} - ${config.url}`, config);    
    console.log("Body:", JSON.stringify(config.data));    
    return config;
  },
  function (error) {
    console.error("[REQUEST ERROR]", error);
    return Promise.reject(error); // Trả lỗi về để xử lý
  }
);

// Interceptor cho response
instance.interceptors.response.use(
  function (response) {
    console.log("[RESPONSE SUCCESS]", response);
    // Trả về `response.data` nếu dữ liệu nằm trong đó
    return response?.data || response;
  },
  function (error) {
    console.error("[RESPONSE ERROR]", {
      status: error.response?.status,
      data: error.response?.data,
    });

    // Nếu server trả về lỗi, cố gắng lấy thông tin chi tiết từ `error.response.data`
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }

    // Trả về toàn bộ lỗi nếu không có dữ liệu chi tiết
    return Promise.reject(error);
  }
);

export default instance;
