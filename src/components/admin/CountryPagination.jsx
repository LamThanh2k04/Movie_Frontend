import React from 'react'

const CountryPagination = ({ page, setPage, pagination }) => {
    if (!pagination) return null;

    const totalPages = pagination.totalPages;
    return (

        <div className="flex items-center justify-center gap-2 mt-6">

            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-zinc-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition"
            >
                Trước
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => setPage(index + 1)}
                    className={`w-10 h-10 rounded-lg transition ${page === index + 1
                            ? "bg-red-600 text-white"
                            : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                        }`}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg bg-zinc-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition"
            >
                Sau
            </button>
        </div>
    )
}


export default CountryPagination