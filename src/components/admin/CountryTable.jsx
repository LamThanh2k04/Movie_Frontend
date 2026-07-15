import { Lock, LockOpen, SquarePen } from "lucide-react";
import React from "react";

const CountryTable = ({ countries, loading, page, pagination }) => {
    if (loading) {
        return (
            <div className="text-center text-gray-400 py-10">
                Đang tải dữ liệu
            </div>
        );
    }

    if (countries.length === 0) {
        return (
            <div className="text-center text-gray-400 py-10">
                Không có dữ liệu quốc gia
            </div>
        );
    }

    return (
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
            <table className="w-full">
                <thead className="bg-zinc-900 border-b border-zinc-800">
                    <tr className="text-gray-300">
                        <th className="px-6 py-4 text-left">
                            STT
                        </th>

                        <th className="px-6 py-4 text-left">
                            Ảnh
                        </th>

                        <th className="px-6 py-4 text-left">
                            Tên quốc gia
                        </th>

                        <th className="px-6 py-4 text-left whitespace-nowrap">
                            Ngày tạo
                        </th>

                        <th className="px-6 py-4 text-left">
                            Trạng thái
                        </th>

                        <th className="px-6 py-4 text-center whitespace-nowrap">
                            Hành động
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {countries.map((country, index) => (
                        <tr
                            key={country.id}
                            className="border-b border-zinc-800 hover:bg-zinc-900 transition"
                        >
                            {/* STT */}
                            <td className="px-6 py-4 text-gray-300">
                                {(page - 1) *
                                    (pagination?.limit || 5) +
                                    index +
                                    1}
                            </td>

                            {/* Ảnh */}
                            <td className="px-6 py-4">
                                <img
                                    src={country.image}
                                    alt={country.name}
                                    className="w-14 h-10 rounded object-cover"
                                />
                            </td>

                            {/* Tên quốc gia */}
                            <td className="px-6 py-4">
                                <span className="font-medium text-white">
                                    {country.name}
                                </span>
                            </td>

                            {/* Ngày tạo */}
                            <td className="px-6 py-4 text-gray-300 whitespace-nowrap">
                                {new Date(
                                    country.createdAt
                                ).toLocaleDateString("vi-VN")}
                            </td>

                            {/* Trạng thái */}
                            <td className="px-6 py-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                                        country.isActive
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"
                                    }`}
                                >
                                    {country.isActive
                                        ? "Hoạt động"
                                        : "Đã khóa"}
                                </span>
                            </td>

                            {/* Hành động */}
                            <td className="px-6 py-4">
                                <div className="flex justify-center gap-3">
                                    <button
                                        className="p-2 rounded-lg bg-zinc-800 hover:bg-blue-600 text-gray-300 hover:text-white transition"
                                    >
                                        <SquarePen size={18} />
                                    </button>

                                    <button
                                        className="p-2 rounded-lg bg-zinc-800 hover:bg-red-600 transition"
                                    >
                                        {country.isActive ? (
                                            <Lock
                                                size={18}
                                                className="text-red-400"
                                            />
                                        ) : (
                                            <LockOpen
                                                size={18}
                                                className="text-green-400"
                                            />
                                        )}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CountryTable;