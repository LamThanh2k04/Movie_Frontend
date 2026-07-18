import { Lock, LockOpen, SquarePen, User } from 'lucide-react'
import React from 'react'

const ActorTable = ({ actors, loading, page, pagination, handleEdit, handleToggleStatus }) => {

    if (loading) {
        return <div className='text-center text-gray-400 py-10'> Đang tải dữ liệu</div>
    }

    if (actors.length === 0) {
        return <div className='text-center text-gray-400 py-10'>Không có dữ liệu diễn viên</div>
    }
    return (
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
            <table className="w-full">
                <thead className="bg-zinc-900 border-b border-zinc-800">
                    <tr className="text-gray-300">
                        <th className="px-6 py-4 text-left">STT</th>

                        <th className="px-6 py-4 text-left">
                            Ảnh
                        </th>

                        <th className="px-6 py-4 text-left">
                            Tên diễn viên
                        </th>

                        <th className="px-6 py-4 text-left">
                            Tên khác
                        </th>

                        <th className="px-6 py-4 text-left whitespace-nowrap">
                            Ngày sinh
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
                    {actors.map((actor, index) => (
                        <tr
                            key={actor.id}
                            className="border-b border-zinc-800 hover:bg-zinc-900 transition"
                        >

                            <td className="px-6 py-4 text-gray-300">
                                {(page - 1) *
                                    (pagination?.limit || 5) +
                                    index +
                                    1}
                            </td>


                            <td className="px-6 py-4">
                                {actor.avatar ? (
                                    <img
                                        src={actor.avatar}
                                        alt={actor.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-red-500 flex items-center justify-center">
                                        <User className="w-5 h-5 text-gray-300" />
                                    </div>
                                )}
                            </td>


                            <td className="px-6 py-4">
                                <span className="font-medium text-white">
                                    {actor.name}
                                </span>
                            </td>


                            <td className="px-6 py-4 text-gray-300">
                                {actor.anotherName || "---"}
                            </td>

                            <td className="px-6 py-4 text-gray-300 whitespace-nowrap">
                                {actor.dateOfbirth
                                    ? new Date(
                                        actor.dateOfbirth
                                    ).toLocaleDateString("vi-VN")
                                    : "---"}
                            </td>


                            <td className="px-6 py-4 text-gray-300 whitespace-nowrap">
                                {new Date(
                                    actor.createdAt
                                ).toLocaleDateString("vi-VN")}
                            </td>


                            <td className="px-6 py-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${actor.isActive
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-red-500/20 text-red-400"
                                        }`}
                                >
                                    {actor.isActive
                                        ? "Hoạt động"
                                        : "Đã khóa"}
                                </span>
                            </td>


                            <td className="px-6 py-4">
                                <div className="flex justify-center gap-3">
                                    <button onClick={() => handleEdit(actor)}
                                        className="p-2 rounded-lg bg-zinc-800 hover:bg-blue-600 text-gray-300 hover:text-white transition"
                                    >
                                        <SquarePen size={18} />
                                    </button>

                                    <button onClick={() => handleToggleStatus(actor.id)}
                                        className="p-2 rounded-lg bg-zinc-800 hover:bg-red-600 transition"
                                    >
                                        {actor.isActive ? (
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
    )
}

export default ActorTable