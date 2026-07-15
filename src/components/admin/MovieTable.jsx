import { LockOpen, SquarePen, Lock } from 'lucide-react';
import React from 'react'

const MovieTable = ({ movies, loading, page, pagination }) => {
    console.log(movies)
    if (loading) {
        return (
            <div className="text-center text-gray-400 py-10">
                Đang tải dữ liệu...
            </div>
        );
    }

    if (movies.length === 0) {
        return (
            <div className="text-center text-gray-400 py-10">
                Không có dữ liệu của phim
            </div>
        );
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
                            Tên phim
                        </th>

                        <th className="px-6 py-4 text-left whitespace-nowrap">
                            Quốc gia
                        </th>

                        <th className="px-6 py-4 text-left">
                            Thể loại
                        </th>

                        <th className="px-6 py-4 text-left">
                            Năm
                        </th>

                        <th className="px-6 py-4 text-left">
                            Loại
                        </th>

                        <th className="px-6 py-4 text-left whitespace-nowrap">
                            Đánh giá
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
                    {movies.map((movie, index) => (
                        <tr
                            key={movie.id}
                            className="border-b border-zinc-800 hover:bg-zinc-900 transition"
                        >
                    
                            <td className="px-6 py-4 text-gray-300">
                                {(page - 1) *
                                    (pagination?.limit || 5) +
                                    index +
                                    1}
                            </td>

                            <td className="px-6 py-4">
                                <img
                                    src={movie.thumbnail}
                                    alt={movie.name}
                                    className="w-16 h-20 rounded-lg object-cover"
                                />
                            </td>

                            <td className="px-6 py-4">
                                <span className="font-medium text-white">
                                    {movie.name}
                                </span>
                            </td>

                          
                            <td className="px-6 py-4 text-gray-300">
                                {movie.country?.name}
                            </td>

                 
                            <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-1">
                                    {movie.genres.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="px-2 py-1 text-xs rounded-full bg-zinc-800 text-gray-300"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </td>

                            <td className="px-6 py-4 text-gray-300">
                                {movie.releaseYear}
                            </td>

                       
                            <td className="px-6 py-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${movie.type === "SERIES"
                                        ? "bg-blue-500/20 text-blue-400"
                                        : "bg-purple-500/20 text-purple-400"
                                        }`}
                                >
                                    {movie.type === "SERIES"
                                        ? "Phim bộ"
                                        : "Phim lẻ"}
                                </span>
                            </td>

                        
                            <td className="px-6 py-4 text-yellow-400">
                                ⭐ {movie.star}
                            </td>

                            <td className="px-6 py-4">
                                <span
                                    className={` px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${movie.isActive
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-red-500/20 text-red-400"
                                        }`}
                                >
                                    {movie.isActive
                                        ? "Đang hiển thị"
                                        : "Đã ẩn"}
                                </span>
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={() => handleEdit(movie)}
                                        className="p-2 rounded-lg bg-zinc-800 hover:bg-blue-600 text-gray-300 hover:text-white transition"
                                    >
                                        <SquarePen size={18} />
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleToggleStatus(movie.id)
                                        }
                                        className="p-2 rounded-lg bg-zinc-800 hover:bg-red-600 transition"
                                    >
                                        {movie.isActive ? (
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

export default MovieTable