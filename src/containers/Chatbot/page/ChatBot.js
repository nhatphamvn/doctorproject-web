import React, { useState } from "react";
import { ApiChatBot } from "../../../service/otherUserService";
import { useNavigate } from "react-router-dom";
import { TbMessageChatbot } from "react-icons/tb";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false); // trạng thái mở/đóng chat
  const [input, setInput] = useState(""); // nội dung input người dùng
  const [messages, setMessages] = useState([]); // mảng tin nhắn
  const navigate = useNavigate();

  // Mở/đóng hộp chat
  const toggleChat = () => setIsOpen(!isOpen);

  // Chuyển trang đến chi tiết bác sĩ
  const handleDoctorClick = (item) => {
    navigate(`/system/doctor-detail/${item.id}`);
  };

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (!input.trim()) return; // bỏ qua nếu input rỗng

    // Thêm tin nhắn user vào danh sách
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Gọi API chatbot
      const res = await ApiChatBot({ message: input });

      // Tin nhắn phản hồi từ bot
      const botMessage = { sender: "bot", text: res.DT?.reply || "..." };

      // Nếu có bác sĩ trong phản hồi, thêm vào tin nhắn bot
      if (res.DT?.doctors) {
        botMessage.doctors = res.DT.doctors;
      }

      // Thêm tin nhắn bot vào danh sách
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Lỗi khi gọi chatbot:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Lỗi kết nối đến chatbot." },
      ]);
    }

    setInput(""); // reset input sau khi gửi
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Nút mở chat */}
      <button
        className="bg-blue-500 text-white w-14 h-14 rounded-full shadow-lg text-2xl flex items-center justify-center"
        onClick={toggleChat}
      >
        <TbMessageChatbot className="text-3xl" />
      </button>

      {/* Hộp chat */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl mt-2 flex flex-col border">
          {/* Header */}
          <div className="bg-blue-600 text-yellow-300 font-lato p-3 flex justify-between items-center rounded-t-lg">
            <span>Sigma Boy</span>
            <button onClick={toggleChat}>✖️</button>
          </div>

          {/* Nội dung tin nhắn */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? " bg-gray-100 self-end text-right font-lato"
                    : " bg-blue-50 self-start font-lato"
                }`}
              >
                <div>{msg.text}</div>

                {/* Hiển thị danh sách bác sĩ nếu có */}
                {msg.doctors && (
                  <div className="mt-2 space-y-1 text-sm text-gray-700">
                    {msg.doctors.map((doc, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 border-b pb-1 cursor-pointer"
                        onClick={() => handleDoctorClick(doc)}
                      >
                        {doc.image && (
                          <img
                            src={doc.image}
                            alt="doctor"
                            className="w-6 h-6 rounded-full"
                          />
                        )}
                        <span>{doc.username}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input và nút gửi */}
          <div className="p-2 border-t flex gap-2">
            <input
              type="text"
              className="flex-1 border rounded px-2 py-1 text-sm font-mono"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Nhập tin nhắn..."
            />
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-lato"
              onClick={sendMessage}
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
