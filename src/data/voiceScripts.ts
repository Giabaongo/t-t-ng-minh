// Nội dung đọc cho từng section - lấy chính xác từ các component
export const voiceScripts = [
  {
    id: 'hero',
    title: 'Giới thiệu',
    content: 'Chương 3, Giáo trình Tư tưởng Hồ Chí Minh. Tư tưởng Hồ Chí Minh về Chủ nghĩa Xã hội. Theo Hồ Chí Minh, chủ nghĩa xã hội không phải là lý luận trừu tượng, mà là con đường hướng tới cuộc sống ấm no, tự do, hạnh phúc cho nhân dân.'
  },
  {
    id: 'concept',
    title: 'Quan niệm về Chủ nghĩa Xã hội',
    content: 'Phần 1. Quan niệm về Chủ nghĩa Xã hội. Chủ nghĩa xã hội gắn liền với đời sống hằng ngày của nhân dân. Không chỉ phát triển kinh tế mà còn chính trị, văn hóa, đạo đức và con người. Mọi mục tiêu đều hướng tới hạnh phúc của nhân dân. Chủ nghĩa xã hội là vì con người và do con người xây dựng. Ba nguyên tắc cơ bản: Lấy dân làm gốc, nhân dân là trung tâm. Hạnh phúc toàn dân là mục tiêu cao nhất. Phát triển toàn diện về kinh tế, văn hóa, đạo đức.'
  },
  {
    id: 'goals',
    title: 'Mục tiêu của Chủ nghĩa Xã hội',
    content: 'Phần 2. Mục tiêu của Chủ nghĩa Xã hội. Mục tiêu tổng quát: Giải phóng con người khỏi nghèo đói, bất công, lạc hậu. Nâng cao đời sống vật chất và tinh thần. Mục tiêu cụ thể gồm bốn lĩnh vực chính: Phát triển kinh tế, thực hiện công bằng xã hội, nâng cao giáo dục, văn hóa, và chăm sóc y tế - sức khỏe. Phát triển không được đánh đổi bằng hạnh phúc con người.'
  },
  {
    id: 'characteristics',
    title: 'Đặc trưng cơ bản của xã hội XHCN',
    content: 'Phần 3. Đặc trưng cơ bản của Xã hội Chủ nghĩa. Có năm đặc trưng cơ bản: Thứ nhất, Nhân dân làm chủ xã hội, quyền lực thuộc về nhân dân. Thứ hai, Kinh tế gắn với công bằng, phát triển bền vững, chia sẻ thành quả. Thứ ba, Văn hóa phong phú, đời sống tinh thần đa dạng, lành mạnh. Thứ tư, Đoàn kết xã hội, gắn bó, tương trợ lẫn nhau. Thứ năm, Con người là trung tâm, phát triển con người toàn diện.'
  },
  {
    id: 'forces',
    title: 'Động lực xây dựng CNXH',
    content: 'Phần 4. Động lực xây dựng Chủ nghĩa Xã hội. Có bốn động lực chính: Động lực thứ nhất là Nhân dân, động lực quan trọng nhất, là chủ thể của mọi sự phát triển. Động lực thứ hai là Đoàn kết toàn dân tộc, sức mạnh tổng hợp từ khối đại đoàn kết dân tộc. Động lực thứ ba là Giáo dục và khoa học, nền tảng tri thức để phát triển đất nước. Động lực thứ tư là Lãnh đạo đúng đắn, vai trò của Đảng và Nhà nước trong định hướng phát triển.'
  },
  {
    id: 'pathway',
    title: 'Con đường đi lên Chủ nghĩa Xã hội',
    content: 'Phần 5. Con đường đi lên Chủ nghĩa Xã hội. Con đường có bốn đặc điểm quan trọng: Thứ nhất, Phù hợp điều kiện Việt Nam, xuất phát từ thực tiễn đất nước. Thứ hai, Không rập khuôn, sáng tạo, không áp dụng máy móc mô hình bên ngoài. Thứ ba, Tiến hành từng bước, là quá trình lâu dài, kiên trì, bền bỉ. Thứ tư, Kết hợp đồng bộ kinh tế, văn hóa, đạo đức, xã hội.'
  },
  {
    id: 'state',
    title: 'Nhà nước, Đảng và Đạo đức',
    content: 'Phần 6. Nhà nước, Đảng và Đạo đức. Ba trụ cột quan trọng: Thứ nhất, Nhà nước của dân, do dân, vì dân. Phục vụ lợi ích nhân dân, minh bạch, công khai, lắng nghe ý kiến dân. Thứ hai, Đảng và cán bộ gương mẫu, liêm chính. Đi đầu trong mọi công việc, chống tham ô, lãng phí, chống quan liêu. Thứ ba, Đạo đức cách mạng Cần, Kiệm, Liêm, Chính. Cần cù, siêng năng, tiết kiệm, không lãng phí, chí công vô tư.'
  },
  {
    id: 'significance',
    title: 'Ý nghĩa hiện nay',
    content: 'Phần 7. Ý nghĩa hiện nay. Tư tưởng Hồ Chí Minh về Chủ nghĩa Xã hội có bốn ý nghĩa quan trọng: Thứ nhất, Giá trị định hướng phát triển đất nước. Thứ hai, Gắn phát triển kinh tế với công bằng xã hội. Thứ ba, Xây dựng Nhà nước trong sạch, vì nhân dân. Thứ tư, Giáo dục trách nhiệm và đạo đức công dân.'
  },
  {
    id: 'conclusion',
    title: 'Kết luận',
    content: 'Kết luận. Học Tư tưởng Hồ Chí Minh không phải để ghi nhớ máy móc, mà để hiểu và vận dụng vào thực tiễn cuộc sống. Tư tưởng Hồ Chí Minh về chủ nghĩa xã hội là di sản quý báu của dân tộc, là ngọn đèn soi đường cho sự nghiệp xây dựng và bảo vệ Tổ quốc Việt Nam xã hội chủ nghĩa.'
  }
];

export default voiceScripts;
