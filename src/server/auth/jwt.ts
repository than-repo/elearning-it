// src/server/auth/jwt.ts
// CyberSoft dùng RS256 + public key → không thể verify bằng secret
// → Chỉ cần decode base64 là đủ lấy thông tin user

export function decodeToken(token: string) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));

    return {
      taiKhoan:
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ] ||
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ] ||
        "",
      hoTen: decoded.hoTen || "",
      email: decoded.email || "",
      soDT: decoded.soDT || "",
      maLoaiNguoiDung:
        decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] ||
        decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] ||
        "",
      exp: decoded.exp,
    };
  } catch (error) {
    return null;
  }
}
