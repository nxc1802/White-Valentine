# 🤍 White Valentine — Hộp Quà Valentine Trắng 14/3

> Một trang web quà tặng lãng mạn được tạo cho ngày Valentine Trắng (14 tháng 3, 2026).

## ✨ Tính năng

| Trang | Mô tả |
|-------|-------|
| 🔑 **Password Gate** | Màn hình khóa với gợi ý mật khẩu ngẫu nhiên |
| 🏠 **Trang chủ** | Menu bento grid đẹp mắt với 6 mục |
| 🎵 **Giai Điệu Tình Yêu** | Music player với hiệu ứng vinyl đang quay |
| 💌 **Thư Tình** | Bảng thư tình sticky-note có thể thêm/sửa/xóa |
| 🖼️ **Kỷ Niệm** | Gallery ảnh với 3 dải marquee vô tận |
| 📷 **Photo Booth** | Ảnh trưng bày theo kiểu photo strip |
| ✨ **Điều Ước** | Danh sách quà và kỷ niệm muốn thực hiện |
| 🎁 **Quà Valentine** | Ảnh rơi + thông điệp tình yêu rơi xuống |
| ⚙️ **Admin Panel** | Quản lý passwords, ảnh, nhạc, tin nhắn |

## 🎨 Design System

**Phong cách:** Elegant light / Cream & Gold — hoàn toàn khác với Woman Day (dark pink theme)

| Yếu tố | Mô tả |
|--------|-------|
| Nền | Cream trắng ấm (`#fdf7f0 → #fff8f5 → #fdf0f5`) |
| Màu chính | Gold/champagne (`#b8922a`, `#d4a853`) |
| Màu phụ | Blush rose nhẹ (`#e8b4be`, `#c97080`) |
| Card | Trắng trong suốt với viền vàng |
| Font chữ | Cormorant Garamond + Great Vibes + Nunito |
| Animation | Petal rơi, vinyl quay, card floating |

## 🚀 Cài đặt & Chạy

```bash
# 1. Cài dependencies
npm install

# 2. Tạo file .env.local
cp .env.local.example .env.local
# Điền VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY

# 3. Chạy development server
npm run dev

# 4. Build production
npm run build
```

## 🗄️ Supabase Setup

Dự án dùng chung Supabase với Woman Day (cùng tables: `passwords`, `photos`, `songs`, `custom_letters`, `wishlists`, `gift_messages`).

## 🔐 Passwords

Chỉnh sửa `src/config/passwords.js` để cập nhật danh sách mật khẩu tĩnh.

**Admin password:** `admin2026` (đổi trong `src/config/passwords.js`)

## 📱 Tương thích

- Responsive cho mobile, tablet, desktop
- Touch-friendly (long press để xóa)
- PWA-ready

---

Made with 🤍 for White Valentine 2026
