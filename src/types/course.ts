// src/types/course.ts
export type RawCourse = {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string; // "18/08/2025" → sẽ parse thành Date nếu cần
  soLuongHocVien: number;
  nguoiTao: {
    taiKhoan: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    tenLoaiNguoiDung: string;
  };
  danhMucKhoaHoc: {
    maDanhMucKhoahoc: string;
    tenDanhMucKhoaHoc: string;
  };
};

export type Course = {
  id: string; // maKhoaHoc
  slug: string; // biDanh (dynamic route)
  title: string; // tenKhoaHoc
  description: string; // moTa
  thumbnail: string; // hinhAnh
  views: number; // luotXem
  studentsCount: number; // soLuongHocVien
  groupCode: string; // maNhom (GP01, GP02...)
  createdAt: string; // giữ string hoặc Date nếu bạn parse
  creator: {
    account: string;
    fullName: string;
    roleCode: string; // GV, HV...
    roleName: string;
  };
  category: {
    id: string; // BackEnd, FrontEnd, DiDong...
    name: string; // Lập trình Backend...
  };
};
