/**
 * ============================================================
 *  PASSWORD CONFIG — chỉnh sửa tại đây
 * ============================================================
 *
 *  Mỗi lần mở website mới (tab/session mới), hệ thống tự
 *  chọn ngẫu nhiên 1 cặp { password, hint } từ danh sách bên dưới.
 *
 *  password không phân biệt HOA/thường khi so sánh.
 *  Phải có ít nhất 1 phần tử trong mảng.
 * ============================================================
 */

export const PASSWORDS = [
  {
    password: '14032026',
    hint: 'Ngày Valentine Trắng năm nay 🤍',
  },
  {
    password: '05102025',
    hint: 'Ngày mình quen nhau 🥺',
  },
  {
    password: '18022004',
    hint: 'Ngày sinh nhật của Đạt 💛',
  },
  {
    password: '06022009',
    hint: 'Ngày sinh nhật của em 🌸',
  },
  {
    password: 'lethianhhong',
    hint: 'Họ và tên của em... viết liền, không dấu 🌺',
  },
  {
    password: 'nguyenxuancuong',
    hint: 'Họ và tên của Đạt... viết liền, không dấu 🌺',
  },
  {
    password: 'valentintrang',
    hint: 'Hôm nay là ngày gì? Viết liền, không dấu 🤍',
  },
  {
    password: 'baobinh',
    hint: 'Cung hoàng đạo của chúng ta... viết liền, không dấu 🌺',
  },
];

/** Master password for /admin page */
export const ADMIN_PASSWORD = 'admin2026';
