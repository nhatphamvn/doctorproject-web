const { NlpManager } = require("node-nlp");
import doctorRepositories from "../repositories/doctorRepositories";

const bot = {
  manager: new NlpManager({ languages: ["vi"], log: false }),
  isTrained: false,
};

async function trainBot() {
  bot.manager.addDocument("vi", "hello", "greeting.hello");
  bot.manager.addDocument("vi", "chào", "greeting.hello");
  bot.manager.addDocument("vi", "what", "greeting.hello");
  bot.manager.addDocument("vi", "alo", "greeting.hello");
  bot.manager.addDocument("vi", "ai đó không", "greeting.hello");
  bot.manager.addDocument("vi", "bạn là ai", "greeting.hello");
  bot.manager.addDocument("vi", "tôi cần giúp đỡ", "greeting.hello");

  bot.manager.addDocument(
    "vi",
    "tôi muốn đăng ký khám bệnh",
    "appointment.book"
  );
  bot.manager.addDocument("vi", "cho tôi đặt lịch", "appointment.book");
  bot.manager.addDocument(
    "vi",
    "làm ơn đặt lịch hẹn giúp tôi",
    "appointment.book"
  );
  bot.manager.addDocument("vi", "hẹn bác sĩ lúc 10h", "appointment.book");
  bot.manager.addDocument(
    "vi",
    "có thể đặt lịch khám không",
    "appointment.book"
  );

  bot.manager.addDocument("vi", "chill guy pro", "sigma.boy");
  bot.manager.addDocument("vi", "tao là sigma boy", "sigma.boy");
  bot.manager.addDocument("vi", "skibidi", "sigma.boy");
  bot.manager.addDocument("vi", "đẹp trai", "sigma.boy");

  bot.manager.addDocument("vi", "bạn tên", "name.boy");

  bot.manager.addDocument("vi", "tôi muốn", "appointment.book");
  bot.manager.addDocument("vi", "cho tôi đăng ký lịch hẹn", "appointment.book");

  bot.manager.addDocument("vi", "cảm ơn", "thank.you");
  bot.manager.addDocument("vi", "cảm ơn bạn", "thank.you");
  bot.manager.addDocument("vi", "thanks", "thank.you");

  bot.manager.addDocument("vi", "tôi bị", "advise.you");
  bot.manager.addDocument("vi", "trầm cảm", "advise.you");
  bot.manager.addDocument("vi", "đau", "advise.you");

  bot.manager.addAnswer(
    "vi",
    "greeting.hello",
    "Chào! Tôi có thể giúp gì cho quý khách đây?"
  );
  bot.manager.addAnswer(
    "vi",
    "appointment.book",
    "Bạn có thể chọn bác sĩ để đặt lịch khám phía dưới nè."
  );

  bot.manager.addAnswer(
    "vi",
    "thank.you",
    "Không có chi, tôi sẽ luôn ở đây giúp bạn người tôi yêu haha!"
  );
  bot.manager.addAnswer(
    "vi",
    "sigma.boy",
    "anh nhật là người đẹp trai nhất thế giới!"
  );

  bot.manager.addAnswer("vi", "name.boy", "tui là sigma boy!");

  bot.manager.addAnswer(
    "vi",
    "advise.you",
    "Bạn bị bệnh rồi nè, hãy chọn những bác sĩ bên dưới đi!"
  );

  await bot.manager.train();
  bot.manager.save();
  bot.isTrained = true;
}

const handleMessageService = (input) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!bot.isTrained) {
        await trainBot();
      }

      const response = await bot.manager.process("vi", input);
      const answer =
        response.answer || "Xin lỗi, tôi chưa vẫn chưa hiểu lắm!!!";

      let extraData = null;
      if (
        response.intent === "advise.you" ||
        response.intent === "appointment.book"
      ) {
        // Gọi DB để lấy danh sách bác sĩ thật
        const allDoctors = await doctorRepositories.getAllDoctorRepositories();

        const shuffled = allDoctors.sort(() => 0.5 - Math.random());
        const randomFiveDoctors = shuffled.slice(0, 5);

        extraData = randomFiveDoctors.map((user) => {
          if (user.image && Buffer.isBuffer(user.image)) {
            user.image = user.image.toString();
          }
          return user;
        });
      }

      resolve({
        EM: "Xử lý thành công",
        EC: 0,
        DT: {
          reply: answer,
          doctors: Array.isArray(extraData) ? extraData : [], // bảo vệ an toàn
        },
      });
    } catch (error) {
      console.error("Lỗi xử lý chatbot:", error);
      reject({
        EM: "Lỗi xử lý",
        EC: 1,
        DT: null,
      });
    }
  });
};

module.exports = {
  handleMessageService,
};
