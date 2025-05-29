const axios = require("axios");

const PAGE_ACCESS_TOKEN = "your_page_access_token"; // Lấy từ FB App

const HandleMessage = (sender_psid, received_message) => {
  let response;

  if (received_message.text) {
    response = {
      text: `Bạn đã gửi: "${received_message.text}"`,
    };
  }

  callSendAPI(sender_psid, response);
};

const HandlePostback = (sender_psid, received_postback) => {
  // Logic xử lý postback nếu có
};

const callSendAPI = (sender_psid, response) => {
  const request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  request(
    {
      uri: "https://graph.facebook.com/v19.0/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("Message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
};

module.exports = {
  HandleMessage,
  HandlePostback,
};
