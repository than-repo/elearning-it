// src/components/Footer/Footer.tsx
import Link from "next/link";
import {
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Cột 1: Logo + Mô tả */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">
                C
              </div>
              <span className="text-2xl font-bold">
                Cybersoft Academy
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nền tảng học lập trình trực tuyến hàng đầu Việt Nam.
              Cùng bạn chinh phục công nghệ tương lai.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Khám phá</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/courses"
                  className="hover:text-primary transition"
                >
                  Tất cả khóa học
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/instructors"
                  className="hover:text-primary transition"
                >
                  Giảng viên
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary transition"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Hỗ trợ</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition"
                >
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition"
                >
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="hover:text-primary transition"
                >
                  Chính sách hoàn tiền
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ + Google Maps */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">
              Liên hệ với chúng tôi
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span>
                  Lầu 6, Tòa nhà Lữ Gia, 31 Lữ Gia, P.15, Q.11, TP.HCM
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <a
                  href="tel:1900636026"
                  className="hover:text-primary"
                >
                  1900 636 026
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <a
                  href="mailto:contact@cybersoft.edu.vn"
                  className="hover:text-primary"
                >
                  contact@cybersoft.edu.vn
                </a>
              </div>
            </div>

            {/* Google Maps nhúng – đẹp, responsive, không cần API key */}
            <div className="mt-6">
              <div className="aspect-video rounded-lg overflow-hidden border shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.447253749603!2d106.6639376148008!3d10.775416392320504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9032e2d%3A0x5e6d1a5e6b5e6b5e!2sCybersoft%20Academy!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cybersoft Academy Location"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Cybersoft Academy. Đã đăng ký
            bản quyền. Phát triển với
            <span className="text-red-500 mx-1">❤️</span>
            tại Sài Gòn.
          </p>
        </div>
      </div>
    </footer>
  );
}
