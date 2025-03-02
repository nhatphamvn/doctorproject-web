require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

const askGemini = async (question) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: question }] }],
      }
    );

    if (!response.data || !response.data.candidates || response.data.candidates.length === 0) {
      return { EM: "Không nhận được câu trả lời từ AI!", EC: 1002, DT: null };
    }

    return {
      EM: "Gọi thành công!",
      EC: 0,
      DT: response.data.candidates[0]?.content?.parts[0]?.text || "Không có dữ liệu",
    };
  } catch (error) {
    console.error("Lỗi gọi API Gemini:", error.response?.data || error.message);
    return { EM: "Lỗi khi gọi AI!", EC: 500, DT: null };
  }
};

export default askGemini
