import { Search } from 'lucide-react'
import React from 'react'

const MovieSearch = ({search, setSearch}) => {
    return (
        <div className='relative w-full max-w-sm'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' />
            <input
                type="text"
                placeholder="Tìm kiếm phim..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
        </div>
    )
}

export default MovieSearch