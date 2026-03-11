-- ============================================================
--  WHITE VALENTINE — Supabase Schema
--  Chạy toàn bộ file này trong Supabase SQL Editor
--  URL: https://supabase.com/dashboard/project/pazlfxmulmeusucvalxm/sql
-- ============================================================

-- ============================================================
--  1. PASSWORDS TABLE
--  Mật khẩu mở trang, chọn ngẫu nhiên mỗi session
-- ============================================================
create table if not exists passwords (
  id         serial primary key,
  password   text not null,
  hint       text not null,
  created_at timestamptz default now()
);

alter table passwords enable row level security;

drop policy if exists "Public read passwords"   on passwords;
drop policy if exists "Public insert passwords" on passwords;
drop policy if exists "Public update passwords" on passwords;
drop policy if exists "Public delete passwords" on passwords;

create policy "Public read passwords"   on passwords for select using (true);
create policy "Public insert passwords" on passwords for insert with check (true);
create policy "Public update passwords" on passwords for update using (true) with check (true);
create policy "Public delete passwords" on passwords for delete using (true);

-- Seed passwords mặc định (bỏ qua nếu đã có)
insert into passwords (password, hint) values
  ('14032026',       'Ngày Valentine Trắng năm nay 🤍'),
  ('05102025',       'Ngày mình quen nhau 🥺'),
  ('18022004',       'Ngày sinh nhật của anh 💛'),
  ('06022009',       'Ngày sinh nhật của em 🌸'),
  ('lethianhhong',   'Họ và tên của em... viết liền, không dấu 🌺'),
  ('nguyenxuancuong','Họ và tên của anh... viết liền, không dấu 🌺'),
  ('valentintrang',  'Hôm nay là ngày gì? Viết liền, không dấu 🤍'),
  ('baobinh',        'Cung hoàng đạo của chúng ta... viết liền, không dấu 🌺')
on conflict do nothing;

-- ============================================================
--  2. PHOTOS TABLE
--  Ảnh dùng cho Gallery, Music cover, Gift page, Photobooth
--  type:     'solo' | 'couple'
--  category: 'gallery' | 'photobooth'
-- ============================================================
create table if not exists photos (
  id         serial primary key,
  src        text not null,
  caption    text not null default '',
  type       text not null default 'solo'   check (type in ('solo', 'couple')),
  category   text not null default 'gallery' check (category in ('gallery', 'photobooth')),
  created_at timestamptz default now()
);

alter table photos enable row level security;

drop policy if exists "Public read photos"   on photos;
drop policy if exists "Public insert photos" on photos;
drop policy if exists "Public update photos" on photos;
drop policy if exists "Public delete photos" on photos;

create policy "Public read photos"   on photos for select using (true);
create policy "Public insert photos" on photos for insert with check (true);
create policy "Public update photos" on photos for update using (true) with check (true);
create policy "Public delete photos" on photos for delete using (true);

-- ============================================================
--  3. SONGS TABLE
--  Danh sách bài hát cho Music player
-- ============================================================
create table if not exists songs (
  id            serial primary key,
  title         text    not null,
  artist        text    not null default '',
  src           text    not null,
  display_order int     not null default 0,
  created_at    timestamptz default now()
);

alter table songs enable row level security;

drop policy if exists "Public read songs"   on songs;
drop policy if exists "Public insert songs" on songs;
drop policy if exists "Public update songs" on songs;
drop policy if exists "Public delete songs" on songs;

create policy "Public read songs"   on songs for select using (true);
create policy "Public insert songs" on songs for insert with check (true);
create policy "Public update songs" on songs for update using (true) with check (true);
create policy "Public delete songs" on songs for delete using (true);

-- ============================================================
--  4. CUSTOM_LETTERS TABLE
--  Thư tình (sticky notes board)
-- ============================================================
create table if not exists custom_letters (
  id         bigint primary key,
  author     text not null default 'Anh' check (author in ('Anh', 'Em')),
  icon       text not null default '💌',
  tag        text not null default '',
  title      text not null,
  color      text not null default '#fffaf0',
  text_color text not null default '#8b6914',
  rotation   numeric not null default 0,
  size       text not null default 'medium' check (size in ('small', 'medium', 'large')),
  pill       text,
  content    text not null,
  created_at timestamptz default now()
);

alter table custom_letters enable row level security;

drop policy if exists "Public read letters"   on custom_letters;
drop policy if exists "Public insert letters" on custom_letters;
drop policy if exists "Public update letters" on custom_letters;
drop policy if exists "Public delete letters" on custom_letters;

create policy "Public read letters"   on custom_letters for select using (true);
create policy "Public insert letters" on custom_letters for insert with check (true);
create policy "Public update letters" on custom_letters for update using (true) with check (true);
create policy "Public delete letters" on custom_letters for delete using (true);

-- ============================================================
--  5. WISHLISTS TABLE
--  Danh sách điều ước (quà + kỷ niệm)
--  type:   'gift' | 'event'
--  status: 'pending' | 'done'
-- ============================================================
create table if not exists wishlists (
  id          bigint primary key,
  type        text not null default 'gift' check (type in ('gift', 'event')),
  author      text not null default 'Anh' check (author in ('Anh', 'Em')),
  icon        text not null default '🎁',
  title       text not null,
  description text,
  status      text not null default 'pending' check (status in ('pending', 'done')),
  created_at  timestamptz default now()
);

alter table wishlists enable row level security;

drop policy if exists "Public read wishlists"   on wishlists;
drop policy if exists "Public insert wishlists" on wishlists;
drop policy if exists "Public update wishlists" on wishlists;
drop policy if exists "Public delete wishlists" on wishlists;

create policy "Public read wishlists"   on wishlists for select using (true);
create policy "Public insert wishlists" on wishlists for insert with check (true);
create policy "Public update wishlists" on wishlists for update using (true) with check (true);
create policy "Public delete wishlists" on wishlists for delete using (true);

-- ============================================================
--  6. GIFT_MESSAGES TABLE
--  Tin nhắn rơi trên trang Gift
-- ============================================================
create table if not exists gift_messages (
  id            serial primary key,
  text          text not null,
  display_order int  not null default 0,
  created_at    timestamptz default now()
);

alter table gift_messages enable row level security;

drop policy if exists "Public read gift_messages"   on gift_messages;
drop policy if exists "Public insert gift_messages" on gift_messages;
drop policy if exists "Public update gift_messages" on gift_messages;
drop policy if exists "Public delete gift_messages" on gift_messages;

create policy "Public read gift_messages"   on gift_messages for select using (true);
create policy "Public insert gift_messages" on gift_messages for insert with check (true);
create policy "Public update gift_messages" on gift_messages for update using (true) with check (true);
create policy "Public delete gift_messages" on gift_messages for delete using (true);

-- Seed tin nhắn mặc định
insert into gift_messages (text, display_order) values
  ('Happy White Valentine 🤍',                1),
  ('Em là ánh sáng của anh mỗi ngày ✨',        2),
  ('Cảm ơn em đã luôn ở bên anh 🌸',           3),
  ('Anh yêu em nhiều lắm 💛',                   4),
  ('Mãi mãi bên nhau nhé 🌷',                  5),
  ('Em là điều tuyệt vời nhất của anh 🌺',     6),
  ('14 tháng 3 — Valentine Trắng của mình 🤍', 7),
  ('Trái tim anh luôn thuộc về em 💫',          8),
  ('Em xinh đẹp nhất trong mắt anh 🌼',        9),
  ('Yêu em từ cái nhìn đầu tiên 💝',           10)
on conflict do nothing;

-- ============================================================
--  7. STORAGE BUCKETS
--  Tạo 2 bucket: photos và music
--  (Chạy thủ công trong Supabase Dashboard > Storage nếu cần)
-- ============================================================

-- Tạo bucket photos (public)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'photos', 'photos', true,
  52428800,  -- 50MB
  array['image/jpeg','image/jpg','image/png','image/webp','image/gif','image/heic']
) on conflict (id) do nothing;

-- Tạo bucket music (public)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'music', 'music', true,
  104857600,  -- 100MB
  array['audio/mpeg','audio/mp3','audio/ogg','audio/wav','audio/aac','audio/flac']
) on conflict (id) do nothing;

-- Storage policies cho photos
drop policy if exists "Public read photos storage"   on storage.objects;
drop policy if exists "Public upload photos storage" on storage.objects;
drop policy if exists "Public delete photos storage" on storage.objects;

create policy "Public read photos storage"
  on storage.objects for select
  using ( bucket_id in ('photos', 'music') );

create policy "Public upload photos storage"
  on storage.objects for insert
  with check ( bucket_id in ('photos', 'music') );

create policy "Public delete photos storage"
  on storage.objects for delete
  using ( bucket_id in ('photos', 'music') );

-- ============================================================
--  DONE! Tất cả tables đã sẵn sàng.
--  Kiểm tra bằng cách chạy:
--    select table_name from information_schema.tables
--    where table_schema = 'public';
-- ============================================================
