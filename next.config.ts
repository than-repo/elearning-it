// next.config.ts hoặc next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    // Cho phép tất cả ảnh từ domain Cybersoft
    remotePatterns: [
      {
        protocol: "https",
        hostname: "elearningnew.cybersoft.edu.vn",
        port: "",
        pathname: "/hinhanh/**", // ← Bao hết: .jpg, .png, .jpeg, _gp01, v.v.
      },
      // Dự phòng: nếu có ảnh nằm ngoài /hinhanh/
      {
        protocol: "https",
        hostname: "elearningnew.cybersoft.edu.vn",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Tắt strict mode để tránh double render + reload vô hạn trong dev
  reactStrictMode: false,
};

export default nextConfig;
