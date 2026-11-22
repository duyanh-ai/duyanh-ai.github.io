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
  nhac: { bat: true, tepNhac: "" },

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
    chuTK: "Duy Anh",
    qr: "",   // Điền tên file ảnh QR mới (đã ghi sẵn 52.000 VNĐ) khi có, ví dụ "qr-thanh-toan.png"
    luuY: "Chỉ chuyển khoản sau khi DUY ANH AI xác nhận đơn với bạn. Số tiền: 52.000 VNĐ (khoảng 2 USD). Vui lòng ghi đúng số tiền khi chuyển khoản."
  },

  hoTroSauMua: {
    kenhHoTro: "Zalo / điện thoại 0988616707",
    gioLamViec: "",
    thoiGianPhanHoi: "",
    dieuKienXuLyLoi: "Bảo hành một đổi một trong 24h kể từ lúc mua tài khoản.",
    chinhSachDoiHoan: "Bảo hành một đổi một trong 24h kể từ lúc mua tài khoản."
  },

  faq: [
    { h: "Gói này cung cấp theo hình thức nào?", d: "Nâng cấp tài khoản Gmail chính chủ của khách." },
    { h: "Tôi có sử dụng tài khoản cá nhân của mình không?", d: "Có. Gói được nâng cấp trên tài khoản Gmail chính chủ của bạn." },
    { h: "Tôi có phải cung cấp mật khẩu không?", d: "Không. DUY ANH AI không thu thập mật khẩu Google, mã OTP hay mã khôi phục qua biểu mẫu này. Hãy cảnh giác nếu có ai yêu cầu các thông tin đó." },
    { h: "Sau khi xác nhận thanh toán bao lâu thì nhận được?", d: "Nhanh nhất khoảng 5 phút, chậm nhất 3 giờ." },
    { h: "Gói có những giới hạn nào?", d: "" },
    { h: "Khi hết hạn cần làm gì?", d: "" },
    { h: "Liên hệ ai khi cần hỗ trợ?", d: "Liên hệ DUY ANH AI qua Zalo hoặc điện thoại 0988616707. Gói được bảo hành một đổi một trong 24h kể từ lúc mua." }
  ],

  // Nội dung 3 trang chính sách (người bán điền). Trống → "Đang cập nhật".
  chinhSach: { dieuKhoan: "", baoMat: "", doiHoan: "" }
};
