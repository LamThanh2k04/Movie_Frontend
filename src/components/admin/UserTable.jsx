import React from "react";
import { User } from "lucide-react";
import { SquarePen } from "lucide-react";
import { Lock } from "lucide-react";
import { LockOpen } from "lucide-react";
const UserTable = ({
    users,
    loading,
    page,
    pagination,
}) => {
    if (loading) {
        return (
            <div className="text-center text-gray-400 py-10">
                Đang tải dữ liệu...
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div className="text-center text-gray-400 py-10">
                Không có dữ liệu người dùng
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
                            Tên
                        </th>

                        <th className="px-6 py-4 text-left">
                            Email
                        </th>

                        <th className="px-6 py-4 text-left">
                            Vai trò
                        </th>

                        <th className="px-6 py-4 text-left">
                            Ngày tham gia
                        </th>

                        <th className="px-6 py-4 text-center">
                            Hành động
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user, index) => (
                        <tr
                            key={user.id}
                            className="border-b border-zinc-800 hover:bg-zinc-900 transition"
                        >
                            <td className="px-6 py-4 text-gray-300">
                                {(page - 1) *
                                    (pagination?.limit || 5) +
                                    index +
                                    1}
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full object-cover border-2 border-red-500"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-red-500 flex items-center justify-center">
                                            <User className="w-5 h-5 text-gray-300" />
                                        </div>
                                    )}

                                    <span className="font-medium text-white">
                                        {user.name}
                                    </span>
                                </div>
                            </td>

                            <td className="px-6 py-4 text-gray-300">
                                {user.email}
                            </td>

                            <td className="px-6 py-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === "ADMIN"
                                        ? "bg-red-600/20 text-red-500"
                                        : "bg-zinc-800 text-gray-300"
                                        }`}
                                >
                                    {user.role === "ADMIN"
                                        ? "Quản trị viên"
                                        : "Người dùng"}
                                </span>
                            </td>

                            <td className="px-6 py-4 text-gray-400">
                                {new Date(
                                    user.createdAt
                                ).toLocaleDateString("vi-VN")}
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex justify-center gap-3">
                                    <button className="p-2 rounded-lg bg-zinc-800 hover:bg-red-600 text-gray-300 hover:text-white transition">
                                        <SquarePen size={18} />
                                    </button>

                                    <button
                                        className="p-2 rounded-lg bg-zinc-800 hover:bg-red-600 transition"
                                    >
                                        {user.isActive ? (
                                            <Lock size={18} className="text-red-400" />
                                        ) : (
                                            <LockOpen size={18} className="text-green-400" />
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

export default UserTable;