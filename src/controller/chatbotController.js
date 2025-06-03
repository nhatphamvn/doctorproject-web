import chatbotService from "../service/chatbotService";

// const CreateChatBotController = async (req, res) => {
//   try {
//     const body = req.body;

//     if (body.object === "page") {
//       body.entry.forEach(async (entry) => {
//         const webhook_event = entry.messaging[0];
//         const sender_psid = webhook_event.sender.id;

//         if (webhook_event.message) {
//           await chatbotService.HandleMessage(
//             sender_psid,
//             webhook_event.message
//           );
//         } else if (webhook_event.postback) {
//           await chatbotService.HandlePostback(
//             sender_psid,
//             webhook_event.postback
//           );
//         }
//       });

//       res.status(200).send("EVENT_RECEIVED");
//     } else {
//       res.sendStatus(404);
//     }
//   } catch (error) {
//     return res.status(500).json({
//       EM: "Internal server error",
//       EC: 500,
//       DT: null,
//     });
//   }
// };
// const GetChatBotController = (req, res) => {
//   const VERIFY_TOKEN = process.env.VERIFY_TOKEN; // bạn có thể đưa vào .env nếu muốn bảo mật hơn

//   const mode = req.query["hub.mode"];
//   const token = req.query["hub.verify_token"];
//   const challenge = req.query["hub.challenge"];

//   if (mode && token) {
//     if (mode === "subscribe" && token === VERIFY_TOKEN) {
//       console.log("Webhook verified successfully.");
//       return res.status(200).send(challenge); // Trả về hub.challenge cho Facebook
//     } else {
//       console.log("Webhook verification failed.");
//       return res.sendStatus(403); // Token sai
//     }
//   }

//   return res.sendStatus(400); // Thiếu tham số
// };
const handleMessageChatBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        EM: "Thiếu dữ liệu đầu vào",
        EC: 1,
        DT: null,
      });
    }
    const data = await chatbotService.handleMessageService(message);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Lỗi server" });
  }
};

module.exports = {
  handleMessageChatBot,
};
