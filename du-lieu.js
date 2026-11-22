/* ===== DỮ LIỆU TẬP TRUNG — chỉ cần sửa file này =====
   Để trống ("") = chưa có dữ liệu → trang tự hiện "Đang cập nhật" / "Liên hệ tư vấn".
   Liên hệ để trống → trang không tạo liên kết giả. */
window.CAU_HINH = {
  thuongHieu: "DUY ANH AI",
  lienHe: {
    zalo: "https://zalo.me/0988616707",        // [LINK_ZALO]
    dienThoai: "0988616707",   // [SO_DIEN_THOAI]
    email: "hocphailam@gmail.com",       // [EMAIL]
    facebook: "https://www.facebook.com/duyanhag"     // [LINK_FACEBOOK]
  },
  // Nơi lưu đơn (tùy chọn): địa chỉ nhận POST JSON (ví dụ Google Apps Script).
  // Điền vào thì đơn được lưu với trạng thái "Chờ tư vấn/xác nhận" và chỉ báo thành công khi lưu được.
  // Để trống: khách sao chép nội dung và mở Zalo; trang KHÔNG báo "đã đặt hàng".
  luuDonUrl: "",

  // Nhạc thiền nền: tự tạo trong trình duyệt (không bản quyền), tự phát khi khách vào trang (nếu trình duyệt chặn thì phát ở lần chạm đầu tiên). bat:false = bỏ nút nhạc.
  // Muốn dùng bài nhạc riêng (chỉ dùng nhạc anh có quyền): bỏ file mp3 vào thư mục trang, rồi ghi tepNhac: "ten-file.mp3".
  nhac: { bat: true, kieu: "gap", tepNhac: "" },   // kieu: "gap" = nhịp nhanh, sôi động, thúc giục; "thien" = thiền êm

  // Ưu đãi có hạn THẬT: đồng hồ đếm ngược đến đúng thời điểm này (giờ Việt Nam), giống nhau với mọi khách.
  // Hết hạn: đồng hồ tự ẩn, giá hiện "Liên hệ tư vấn" cho đến khi bạn cập nhật. Muốn tắt hẳn: để ketThuc là "".
  uuDai: { ketThuc: "2026-11-23T23:59:59+07:00", nhan: "Ưu đãi giá 2$ (52.000 VNĐ) kết thúc sau" },

  // Bốn thẻ nhu cầu. "mota" là nội dung tính năng, điền theo quyền lợi thực tế.
  nhuCau: [
    { icon: "🎓", tieuDe: "Công việc giáo viên", mota: "Gợi ý ý tưởng bài giảng, soạn câu hỏi ôn tập, viết nhận xét học sinh và chuẩn bị tài liệu. Thầy cô luôn xem lại nội dung trước khi dùng." },
    { icon: "✍️", tieuDe: "Viết và biên tập nội dung", mota: "Lên dàn ý, viết bản nháp, chỉnh câu chữ, rút gọn hoặc đổi giọng văn cho bài viết, email, thông báo." },
    { icon: "📚", tieuDe: "Học tập và tìm hiểu kiến thức", mota: "Giải thích kiến thức theo cách dễ hiểu, tóm tắt tài liệu và gợi ý cách ôn tập theo từng chủ đề." },
    { icon: "🎨", tieuDe: "Sáng tạo nội dung", mota: "Gợi ý ý tưởng, kịch bản ngắn, tiêu đề và mô tả cho bài đăng, video hoặc tài liệu của bạn." }
  ],

  // Mỗi gói: sửa / thêm / xóa tự do. Trường để trống = "Đang cập nhật".
  // quyenLoi là danh sách, ví dụ: ["Quyền lợi 1", "Quyền lợi 2"]
  goi: [
    { id: "goi-1", ten: "Gemini Pro + GG 5TB", gia: "2$ (52.000 VNĐ)", thoiHan: "6 tháng", hinhThuc: "Nâng cấp tài khoản Gmail chính chủ của khách", quyenLoi: ["Gemini Pro", "GG 5TB"], gioiHan: "", thoiGianBanGiao: "Nhanh nhất khoảng 5 phút, chậm nhất 3 giờ", hoTro: "Bảo hành 24h kể từ lúc mua; đổi một đổi một trong 24h" }
  ],

  // Thông tin nhận tiền (hiện ở bước 3 của quy trình mua). Xóa hết các trường để ẩn.
  thanhToan: {
    nganHang: "LPBank",
    stk: "3377556666",
    chuTK: "NGUYEN DUY ANH",
    qr: "qr-thanh-toan.webp",   // QR LPBank do chủ tạo, đã ghi sẵn 52.000 VNĐ (nội dung "Moi Ly Cafe"). Đổi giá thì phải thay QR mới.
    luuY: "Chỉ chuyển khoản sau khi DUY ANH AI xác nhận đơn với bạn. Mã QR đã ghi sẵn số tiền 52.000 VNĐ (khoảng 2 USD)."
  },

  hoTroSauMua: {
    kenhHoTro: "Zalo / điện thoại 0988616707",
    gioLamViec: "",
    thoiGianPhanHoi: "Xử lý đơn nhanh nhất khoảng 5 phút, chậm nhất 3 giờ sau khi xác nhận thanh toán.",
    dieuKienXuLyLoi: "Bảo hành một đổi một trong 24h kể từ lúc mua tài khoản.",
    chinhSachDoiHoan: "Bảo hành một đổi một trong 24h kể từ lúc mua tài khoản."
  },

  faq: [
    { h: "Gói này cung cấp theo hình thức nào?", d: "Nâng cấp tài khoản Gmail chính chủ của khách." },
    { h: "Tôi có sử dụng tài khoản cá nhân của mình không?", d: "Có. Gói được nâng cấp trên tài khoản Gmail chính chủ của bạn." },
    { h: "Tôi có phải cung cấp mật khẩu không?", d: "Không. DUY ANH AI không thu thập mật khẩu Google, mã OTP hay mã khôi phục qua biểu mẫu này. Hãy cảnh giác nếu có ai yêu cầu các thông tin đó." },
    { h: "Sau khi xác nhận thanh toán bao lâu thì nhận được?", d: "Nhanh nhất khoảng 5 phút, chậm nhất 3 giờ." },
    { h: "Gói có những giới hạn nào?", d: "Gói Gemini Pro + GG 5TB có thời hạn 6 tháng và được nâng cấp trên tài khoản Gmail chính chủ của bạn. Bảo hành một đổi một trong 24h kể từ lúc mua. Hạn mức sử dụng cụ thể phụ thuộc chính sách của Google và có thể thay đổi theo thời gian; cần biết thêm, vui lòng liên hệ tư vấn." },
    { h: "Khi hết hạn cần làm gì?", d: "Gói có thời hạn 6 tháng. Khi gần hết hạn, bạn liên hệ DUY ANH AI qua Zalo 0988616707 để được tư vấn bước tiếp theo." },
    { h: "Liên hệ ai khi cần hỗ trợ?", d: "Liên hệ DUY ANH AI qua Zalo hoặc điện thoại 0988616707. Gói được bảo hành một đổi một trong 24h kể từ lúc mua." }
  ],

  // Nội dung 3 trang chính sách (người bán điền). Trống → "Đang cập nhật".
  chinhSach: {
    dieuKhoan: "1. Đơn vị bán: DUY ANH AI là website của người bán độc lập, không phải website chính thức của Google và không phải đối tác được Google ủy quyền. Gemini và các tên sản phẩm liên quan thuộc chủ sở hữu tương ứng.\n\n2. Dịch vụ: nâng cấp tài khoản Gmail chính chủ của khách lên gói Gemini Pro + GG 5TB, thời hạn 6 tháng. Quyền lợi, giá và điều kiện được hiển thị tại mục \"Các gói Gemini\" và được xác nhận lại với khách trước khi thanh toán.\n\n3. Đặt mua: khách gửi yêu cầu qua biểu mẫu hoặc Zalo. Đơn chỉ được tính khi DUY ANH AI xác nhận thông tin và khách đã thanh toán theo hướng dẫn đã được xác nhận.\n\n4. Thanh toán: khách chỉ chuyển khoản sau khi DUY ANH AI xác nhận đơn, đúng số tiền và đúng tài khoản nhận được ghi trên trang.\n\n5. Bàn giao: sau khi xác nhận thanh toán, dịch vụ được xử lý nhanh nhất khoảng 5 phút, chậm nhất 3 giờ.\n\n6. Trách nhiệm của khách: cung cấp đúng thông tin liên hệ và tài khoản Gmail chính chủ của mình; không chia sẻ mật khẩu, mã OTP hay mã khôi phục cho bất kỳ ai, kể cả khi được yêu cầu qua tin nhắn.\n\n7. Giới hạn: hạn mức sử dụng cụ thể phụ thuộc chính sách của Google và có thể thay đổi theo thời gian. DUY ANH AI không kiểm soát các thay đổi này.\n\n8. Bảo hành, đổi, hoàn tiền: theo \"Chính sách đổi/hoàn tiền\".\n\n9. Thay đổi: DUY ANH AI có thể cập nhật giá, điều kiện và nội dung trên trang. Đơn đã được xác nhận giữ nguyên giá và điều kiện đã xác nhận.\n\n10. Liên hệ: Zalo/điện thoại 0988616707, email hocphailam@gmail.com.",
    baoMat: "1. Thông tin thu thập qua biểu mẫu: họ tên, số điện thoại hoặc Zalo, email liên hệ, ghi chú và gói đã chọn.\n\n2. Không thu thập: mật khẩu Google, mã OTP, mã khôi phục, thông tin thẻ ngân hàng. Trang không yêu cầu những thông tin này. Nếu có ai yêu cầu, vui lòng không cung cấp và báo cho DUY ANH AI.\n\n3. Mục đích sử dụng: chỉ để tư vấn, xác nhận đơn, bàn giao dịch vụ và hỗ trợ sau mua.\n\n4. Chia sẻ: DUY ANH AI không bán thông tin của khách. Khi khách gửi yêu cầu qua Zalo, thông tin nằm trong cuộc trò chuyện Zalo giữa khách và DUY ANH AI.\n\n5. Lưu trữ: thông tin đơn được giữ trong thời gian cần thiết để hỗ trợ và bảo hành.\n\n6. Quyền của khách: khách có thể yêu cầu xem, sửa hoặc xóa thông tin của mình bằng cách liên hệ Zalo/điện thoại 0988616707 hoặc email hocphailam@gmail.com.\n\n7. Công cụ bên thứ ba: trang không dùng cookie quảng cáo hay công cụ theo dõi. Phông chữ được tải từ Google Fonts, nên trình duyệt của khách có thể gửi địa chỉ IP đến Google khi tải trang.",
    doiHoan: "1. Bảo hành: bảo hành một đổi một trong 24 giờ kể từ lúc mua tài khoản.\n\n2. Cách yêu cầu: khách liên hệ Zalo/điện thoại 0988616707 trong thời gian bảo hành, nêu rõ lỗi gặp phải để DUY ANH AI kiểm tra và xử lý.\n\n3. Điều kiện: các trường hợp ngoài phạm vi bảo hành sẽ được DUY ANH AI thông báo rõ khi xác nhận đơn.\n\n4. Hoàn tiền: trường hợp không thể đổi được, DUY ANH AI sẽ xem xét hoàn tiền theo từng trường hợp.\n\n5. Sau 24 giờ: thời hạn bảo hành một đổi một kết thúc."
  }
};
