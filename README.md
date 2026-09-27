# GitHub Public Repositories Dashboard

[English](#english) | [Tiếng Việt](#tiếng-việt)

---

## English

### Overview
A clean, responsive Web Dashboard built with Next.js (App Router) and Tailwind CSS. It dynamically fetches and displays public GitHub repositories for a specified user using the GitHub REST API.

### Key Features
- Automatically fetches public repositories sorted by updated date.
- Displays repository details including name, description, primary language, star counts, and fork counts.
- Dark theme inspired by GitHub's official UI (`#0d1117`).
- Built-in caching with incremental static regeneration to prevent API rate limiting.
- Secure environment configuration for server-side API requests.

### Tech Stack
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Data Source: GitHub REST API

### Environment Variables
Create a `.env.local` file in the root directory and define the following variables:

```env
GITHUB_USERNAME=your_github_username
GITHUB_TOKEN=your_optional_personal_access_token
```

*Note: `GITHUB_TOKEN` is optional for fetching public repositories, but recommended to avoid GitHub API rate limits.*

### Local Development

1. Install dependencies:
   ```bash
   npm install --ignore-scripts
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser.

### Deployment
This project is optimized for deployment on Vercel:
1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Configure `GITHUB_USERNAME` and `GITHUB_TOKEN` in Vercel Environment Variables.
4. Deploy.

---

## Tiếng Việt

### Tổng quan
Trang Web Dashboard giao diện tối giản, tương thích mọi thiết bị được xây dựng bằng Next.js (App Router) và Tailwind CSS. Dữ liệu repository công khai được tự động tải trực tiếp từ GitHub REST API.

### Tính năng chính
- Tự động lấy danh sách repository public sắp xếp theo thời gian cập nhật mới nhất.
- Hiển thị đầy đủ thông tin: Tên repo, mô tả, ngôn ngữ chính, số lượt star và số lượt fork.
- Giao diện tối (Dark Mode) chuẩn tông màu GitHub (`#0d1117`).
- Tích hợp cơ chế lưu bản tĩnh (cache) giúp tối ưu tốc độ và tránh chạm giới hạn API.
- Bảo mật thông tin cấu hình qua biến môi trường ở tầng server.

### Công nghệ sử dụng
- Framework: Next.js (App Router)
- Ngôn ngữ: TypeScript
- Cấu trúc giao diện: Tailwind CSS
- Nguồn dữ liệu: GitHub REST API

### Biến môi trường
Tạo file `.env.local` tại thư mục gốc của dự án và thêm các giá trị sau:

```env
GITHUB_USERNAME=ten_username_github_cua_ban
GITHUB_TOKEN=chuoi_personal_access_token_tuy_chon
```

*Lưu ý: `GITHUB_TOKEN` là không bắt buộc đối với repo public, nhưng nên có để tăng giới hạn số lần gọi API của GitHub.*

### Chạy ứng dụng ở môi trường Local

1. Cài đặt các thư viện:
   ```bash
   npm install --ignore-scripts
   ```

2. Khởi chạy máy chủ phát triển:
   ```bash
   npm run dev
   ```

3. Truy cập đường dẫn `http://localhost:3000` trên trình duyệt.

### Triển khai (Deployment)
Dự án được tối ưu để đưa lên Vercel:
1. Đẩy mã nguồn lên một repository trên GitHub.
2. Kết nối và Import dự án vào Vercel.
3. Cài đặt các biến môi trường `GITHUB_USERNAME` và `GITHUB_TOKEN` trong cài đặt dự án Vercel.
4. Bấm Deploy.