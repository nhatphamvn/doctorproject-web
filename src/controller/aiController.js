import askGemini from "../service/aiService";

const handleCallApiAi = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Câu hỏi không được để trống" });
    }

    // Gọi API Gemini
    const result = await askGemini(question);

    // Kiểm tra lỗi từ AI
    if (result.EC !== 0) {
      return res.status(500).json({ error: result.EM });
    }

    // Trả về response phù hợp với React
    return res.status(200).json({

      EM: result.EM,
      EC: result.EC,
      DT: result.DT // Trả về nội dung trả lời của AI

    });
  

  } catch (error) {
    console.error("Lỗi khi xử lý API:", error);
    res.status(500).json({ success: false, error: "Lỗi máy chủ!" });
  }
};
const handleCallApi=async(req,res)=>{
 
}

module.exports ={
    handleCallApiAi,handleCallApi
}