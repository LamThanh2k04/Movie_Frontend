import React, { useEffect, useState } from 'react'
import usePagination from '../../hooks/usePagination'
import useSearch from '../../hooks/useSearch'
import { getAllGenres } from '../../services/admin/genreApi'
import GenreSearch from '../../components/admin/GenreSearch'
import GenreTable from '../../components/admin/GenreTable'
import GenrePagination from '../../components/admin/GenrePagination'
import { CirclePlus } from 'lucide-react'
import CreateGenreModal from '../../components/admin/CreateGenreModal'

const GenreManagerPage = () => {
  const { page, setPage } = usePagination()
  const { search, setSearch } = useSearch()
  const [pagination, setPagination] = useState(null)
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
  const fetchGenres = async () => {
    setLoading(true)
    try {
      const params = {}
      if (search) {
        params.search = search
      }
      if (page > 1) {
        params.page = page;
      }
      const response = await getAllGenres(params)
      const data = response.data.data
      setGenres(data.genres)
      setPagination(data.pagination)
      console.table(data.genres)
    } catch (error) {
      console.log('Lấy danh sách thể loại thất bại', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGenres()
  }, [search, page])
  return (
    <div className='text-white'>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Quản lý thể loại
        </h1>

        <p className="text-zinc-400 mt-2">
          Quản lý thể loại có trong hệ thống
        </p>
      </div>
      <div className='flex justify-end gap-4 mb-6'>
        <GenreSearch
          search={search}
          setSearch={setSearch}
        />
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          <CirclePlus size={18} />
          <span>Thêm thể loại</span>
        </button>
      </div>
      <GenreTable
        genres={genres}
        loading={loading}
        page={page}
        pagination={pagination}
      />
      <GenrePagination
        page={page}
        pagination={pagination}
        setPage={setPage}
      />

      <CreateGenreModal
      open={open}
      onClose={()=> setOpen(false)}
      fetchGenre={fetchGenres}
      />
    </div>
  )
}

export default GenreManagerPage