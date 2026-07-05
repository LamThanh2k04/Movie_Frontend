import React from 'react'

const UserSearch = ({ search, setSearch }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-sm px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
        </div>
    )
}

export default UserSearch