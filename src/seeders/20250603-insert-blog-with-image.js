const fs = require("fs");
const path = require("path");

module.exports = {
  async up(queryInterface, Sequelize) {
    const imagePath = path.resolve(__dirname, "../assets/images/hai.jpg");
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString("base64");

    // Thêm tiền tố MIME type
    const imageDataUrl = `data:image/jpeg;base64,${imageBase64}`;

    await queryInterface.bulkInsert(
      "blogs",
      [
        {
          userId: 1,
          title: "Mất trí nhớ tuổi thơ – Childhood Amnesia",
          date: "2025-06-03",
          postHTML: `
<p>Những trải nghiệm đầu tiên trong thời thơ ấu định hình cách ta tự định nghĩa về bản thân và gắn kết với thế giới. Những ký ức này chính là chìa khóa cho sự phát triển bản dạng khi ta bước vào thời trưởng thành. Khách hàng thường được hỗ trợ để tự chiêm nghiệm quá khứ của họ, vì quá khứ giúp ta hiểu được hiện tại. Nhưng điều gì xảy ra nếu một khách hàng không thể nhớ ra những gì xảy ra thời thơ ấu?</p>
<p><em style="color: rgb(5, 163, 163);">Our early childhood experiences shape our self-concept and engagement with the world. These memories are key to our identity development as we move into adulthood. Clients are often helped to reflect on their past, as the past helps us understand the present. But what happens if a client can’t remember their childhood?</em></p>
<p><img src="https://trangtamly.blog/wp-content/uploads/2025/04/asd-memory-infantile-amnesia-neurosicence.jpg?w=1024" height="682" width="1024">Nguồn:&nbsp;<a href="https://www.google.com/url?sa=i&amp;url=https%3A%2F%2Fneurosciencenews.com%2Finfantile-amnesia-asd-memory-25177%2F&amp;psig=AOvVaw3JkBaEKyTPQ2Fi-JI8kvbE&amp;ust=1744687290837000&amp;source=images&amp;cd=vfe&amp;opi=89978449&amp;ved=2ahUKEwi-jv7iyNaMAxWmi2MGHaM4K5UQjB16BAgAEAg" rel="noopener noreferrer" target="_blank" style="color: rgb(80, 118, 117);">Neuroscience News</a></p>
<p>Có một quan niệm sai lầm khá phổ biến là sang chấn chính là nguyên nhân chính gây mất trí tuổi thơ. Một nhận định logic nhưng hoàn toàn vô căn cứ. Có nhiều lý do tại sao một người không thể nhớ tuổi thơ mình, từ những sự phức tạp trong phát triển não bộ đến thiếu trải nghiệm xã hội.</p>
<p><em style="color: rgb(5, 163, 163);">There’s a common misconception that trauma is the main cause of childhood amnesia. A logical assumption but is completely unfounded. There are many reasons why one might not remember their childhood, from the complexities of brain development to a lack of social experiences.</em></p>
<p>Nếu bạn lo lắng về việc không nhớ ra được tuổi thơ của mình – và cái gì có thể gây ra tình trạng này – hãy cùng đọc tiếp để tìm hiểu về chứng mất trí nhớ tuổi thơ, cách trí nhớ được hình thành qua thời thơ ấu, cái gì gây ra tình trạng khó ghi nhớ này, và cách để ứng phó với ký ức bị quên lãng.</p>
<p><em style="color: rgb(5, 163, 163);">If you’re worried about not remembering your childhood—and what possibly caused it—read on to learn more about childhood amnesia, how memory is developed throughout childhood, what causes these struggles with memory, and how to cope with the lost memories.&nbsp;&nbsp;</em></p>
<p><img src="https://trangtamly.blog/wp-content/uploads/2025/04/getty-images-182190286-2000-83a28f97588542ecba2676c58d059dc3.jpg?w=1024" height="682" width="1024">Nguồn:&nbsp;<a href="https://www.google.com/url?sa=i&amp;url=https%3A%2F%2Fwww.parents.com%2Fkids%2Fdevelopment%2Fchildhood-amnesia-heres-why-your-child-cant-remember-being-a-baby%2F&amp;psig=AOvVaw0MWfF7CAzEEW_4ed88BsY0&amp;ust=1744687295212000&amp;source=images&amp;cd=vfe&amp;opi=89978449&amp;ved=2ahUKEwj6k4nlyNaMAxUS9jgGHXw3J4sQjB16BAgAEAg" rel="noopener noreferrer" target="_blank" style="color: rgb(80, 118, 117);">Parents</a></p>
<p><strong>Tổng quan.&nbsp;</strong><strong style="color: rgb(5, 163, 163);"><em>At a Glance</em></strong></p>
<p>Việc không thể nhớ lại những ký ức tuổi thơ có thể khá đáng sợ, đặc biệt là nếu bạn không biết điều gì gây ra nó. Thường thì, nhiều người cho rằng sang chấn chính là gốc rễ khiến họ quên đi những ký ức, nhưng có nhiều cách giải thích khác nữa. (Não bộ là một cơ quan “khó đỡ”). Hãy tiếp tục đọc để biết được tại sao bạn lại không thể nhớ được những chuyện xảy ra hồi bé và cách ứng phó với tình trạng này.</p>
<p><em style="color: rgb(5, 163, 163);">Inability to recall your childhood memories may be scary, especially if you don’t know what caused it. Oftentimes, people assume trauma is the root of their missing memories, but there are many possible explanations. (The brain is a tricky organ). Keep reading on to know why you might not remember aspects of your childhood and how to cope with this.</em></p>
<p><strong>Mất trí nhớ tuổi thơ.&nbsp;</strong><strong style="color: rgb(5, 163, 163);"><em>Childhood Amnesia</em></strong></p>
<p>Mất trí nhớ tuổi thơ, hay mất ký ức hồi bé, là tình trạng người lớn không thể nhớ lại những ký ức về những năm tháng đầu đời. Việc không nhớ ra trải nghiệm theo từng giai đoạn xuất hiện từ 0 đến 3 tuổi và có ký ức rải rác trước độ 10 tuổi là hoàn toàn bình thường. Không giống như những người trưởng thành “bình thường” mất trí nhớ khi họ quên đi những chi tiết theo thời gian, dạng hồi tưởng này không thể quy cho thời gian trôi qua được.</p>
<p><em style="color: rgb(5, 163, 163);">Childhood amnesia, also known as infantile amnesia, refers to the inability of adults to retrieve early childhood memories. It’s completely normal to not remember episodic experiences that occurred from ages 0 to 3 and have a sparse selection of memories that occurred before age 10. Unlike “normal” adult memory loss where you forget small details over time, this memory recollection cannot be attributed to time passing.</em></p>
<p><img src="https://trangtamly.blog/wp-content/uploads/2025/04/1_xv2_bud-korrteouuzhdlw.png?w=975" height="817" width="975">Nguồn:&nbsp;<a href="https://www.google.com/url?sa=i&amp;url=https%3A%2F%2Fmedium.com%2F%40myduy87%2Fwhy-is-it-so-hard-for-us-to-recall-our-early-years-08f79a3907e6&amp;psig=AOvVaw0WA2CNrqT4Fy8XWFCFDU01&amp;ust=1744687284927000&amp;source=images&amp;cd=vfe&amp;opi=89978449&amp;ved=2ahUKEwjgtpXgyNaMAxWA8DgGHXbkM2YQjB16BAgAEAg" rel="noopener noreferrer" target="_blank" style="color: rgb(80, 118, 117);">Medium</a></p>
<p><strong>Quá trình phát triển trí nhớ bình thường ở thời thơ ấu.&nbsp;</strong><strong style="color: rgb(5, 163, 163);"><em>Normal Memory Development in Childhood</em></strong></p>
<p>Hãy nhớ rằng, việc không nhớ được những chuyện hồi nhỏ là bình thường. Một nghiên cứu phát hiện ra việc trẻ thường ước tính sai độ tuổi mà ký ức của chúng xuất hiện khi chúng lớn lên. Ví dụ, trẻ có thể nhớ một buổi đi chơi cụ thể nhưng sẽ nói rằng thời gian chúng diễn ra trễ hơn 1 năm so với thực tế.</p>
<p><em style="color: rgb(5, 163, 163);">Remember, it is natural not to remember everything from your youth. A study found that it is common for children to misestimate the ages their memories occurred as they grow up. For example, they might remember a particular play date but will state it happened over a year later than it did.</em></p>
<p>Một phần nguyên nhân gây mất trí nhớ là sự phát triển của đồi hải mã. Đồi hải mã là một vùng não đặc biệt quan trọng trong sự hình thành của các ký ức về những sự kiện đã xảy đến với chúng ta. Nó cũng là một trong những vùng độc nhất của não bộ tiếp tục sản sinh neuron mới vào thời trưởng thành.</p>
<p><em style="color: rgb(5, 163, 163);">Part of what can cause normal memory loss is the development of the hippocampus. The hippocampus is a region of the brain which is particularly important in the formations of memories of events that happened to us. It is also one of the unique regions of the brain that continues to produce new neurons into adulthood.</em></p>
<p><img src="https://trangtamly.blog/wp-content/uploads/2025/04/shutterstock_235282123.jpg?w=1024" height="582" width="1024">Đồi hải mã. Nguồn:&nbsp;<a href="https://www.google.com/url?sa=i&amp;url=https%3A%2F%2Falzheimersnewstoday.com%2Fnews%2Fstudy-reveals-the-hippocampus-shape-as-a-good-memory-function-predictor%2F&amp;psig=AOvVaw3wgL9HiXNbRKSY3KZF4zAc&amp;ust=1744687475759000&amp;source=images&amp;cd=vfe&amp;opi=89978449&amp;ved=0CAMQjB1qFwoTCKjMvv_J1owDFQAAAAAdAAAAABAR" rel="noopener noreferrer" target="_blank" style="color: rgb(80, 118, 117);">Alzheimer’s News Today</a></p>
`,

          image: imageDataUrl, // sử dụng chuỗi đã thêm tiền tố
          author: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("blogs", { author: "Admin" }, {});
  },
};
