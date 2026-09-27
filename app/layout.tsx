import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Repositories by me", // <--- Tiêu đề xuất hiện trên tab trình duyệt
  description: "Repositories by me from github", // <--- Mô tả xuất hiện trên tab trình duyệt
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased bg-[#0d1117] text-[#c9d1d9] min-h-screen">
        {children}
      </body>
    </html>
  );
}