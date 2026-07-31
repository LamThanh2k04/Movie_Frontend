import React from "react";
import {
    Mail,
    MessageCircle,
    Globe,
    Phone,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-black px-6 py-12 text-gray-400 md:px-10 lg:px-16">

            {/* ================================= */}
            {/* LOGO */}
            {/* ================================= */}

            <div className="mb-10">
                <h2 className="text-2xl font-bold tracking-wide text-red-600">
                    CINESTREAM
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                    Thưởng thức những bộ phim hấp dẫn và khám phá thế giới điện ảnh
                    ngay trên CINESTREAM.
                </p>
            </div>
            <div
                className=" grid grid-cols-2 gap-8 border-b border-white/10 pb-10 md:grid-cols-4 "
            >
                <div>
                    <h3 className="mb-4 font-semibold text-white">
                        CINESTREAM
                    </h3>

                    <ul className="space-y-3 text-sm">

                        <li>
                            <a
                                href="#"
                                className="transition hover:text-white"
                            >
                                Trang chủ
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="transition hover:text-white"
                            >
                                Phim
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="transition hover:text-white"
                            >
                                Series
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="transition hover:text-white"
                            >
                                Phim mới
                            </a>
                        </li>

                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 font-semibold text-white">
                        Hỗ trợ
                    </h3>

                    <ul className="space-y-3 text-sm">

                        <li>
                            <a
                                href="#"
                                className="transition hover:text-white"
                            >
                                Trung tâm trợ giúp
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="transition hover:text-white"
                            >
                                Điều khoản sử dụng
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="transition hover:text-white"
                            >
                                Chính sách bảo mật
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="transition hover:text-white"
                            >
                                Liên hệ
                            </a>
                        </li>

                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 font-semibold text-white">
                        Khám phá
                    </h3>

                    <ul className="space-y-3 text-sm">

                        <li>
                            <a
                                href="#"
                                className="transition hover:text-white"
                            >
                                Phim hành động
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="transition hover:text-white"
                            >
                                Phim tình cảm
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="transition hover:text-white"
                            >
                                Phim kinh dị
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="transition hover:text-white"
                            >
                                Phim hài
                            </a>
                        </li>

                    </ul>
                </div>


                <div>
                    <h3 className="mb-4 font-semibold text-white">
                        Theo dõi chúng tôi
                    </h3>

                    <div className="flex items-center gap-3">

                        <a
                            href="#"
                            className=" flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 hover:text-white "
                        >
                            <Mail size={18} />
                        </a>

                        <a
                            href="#"
                            className=" flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 hover:text-white "
                        >
                            <MessageCircle size={18} />
                        </a>

                        <a
                            href="#"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 hover:text-white "
                        >
                            <Globe size={18} />
                        </a>

                        <a
                            href="#"
                            className="  flex  h-10  w-10  items-center  justify-center rounded-full bg-white/10 transition hover:bg-white/20 hover:text-white "
                        >
                            <Phone size={18} />
                        </a>

                    </div>
                </div>

            </div>


            <div
                className=" flex flex-col gap-3 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between "
            >

                <p>
                    © 2026 CINESTREAM. All rights reserved.
                </p>

                <p>
                    Made with ❤️ for movie lovers.
                </p>

            </div>

        </footer>
    );
};

export default Footer;