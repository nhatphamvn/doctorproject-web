import {useState} from 'react'
import { ApiChatWithAi } from '../../service/apiProduct';

const ChatAsk = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAskAI = async () => {
    try {
      if (!question.trim()) return;
      const data = await ApiChatWithAi(question);
      if(data.EC  !== 0 ){
        console.log(data.EM);
        
      }else{
  
        setAnswer(data.DT);
      }
      
    } catch (error) {
      console.log(error);
      
    }
  };

   return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Hỏi AI</h2>
      <textarea
        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
        rows="3"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Nhập câu hỏi..."
      />
      <button
        onClick={handleAskAI}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Gửi câu hỏi
      </button>
      <h3 className="text-lg font-medium mt-4">Trả lời:</h3>
      <p className="bg-gray-100 p-3 rounded-md">{answer}</p>
    </div>
  );
}

export default ChatAsk
