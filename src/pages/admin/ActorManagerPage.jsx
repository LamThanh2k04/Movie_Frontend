import React, { useEffect, useState } from 'react'
import usePagination from '../../hooks/usePagination'
import useSearch from '../../hooks/useSearch'
import { getAllActors } from '../../services/admin/actorApi'
import ActorSearch from '../../components/admin/ActorSearch'
import ActorTable from '../../components/admin/ActorTable'
import ActorPagination from '../../components/admin/ActorPagination'
import { CirclePlus } from 'lucide-react'

const ActorManagerPage = () => {
  const { page, setPage } = usePagination()
  const { search, setSearch } = useSearch()
  const [pagination, setPagination] = useState(null)
  const [actors, setActors] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchActor = async () => {
    setLoading(true)
    try {
      const params = {}
      if(search) {
        params.search = search
      }
      if(page > 1) {
         params.page = page;
      }
      const response = await getAllActors(params)
      const data = response.data.data
      console.table(data.actors)
      setActors(data.actors)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Lấy danh sách diễn viên thất bại', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActor()
  },[search,page])

  return (
    <div className='text-white'>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Quản lý diễn viên
        </h1>

        <p className="text-zinc-400 mt-2">
          Quản lý diễn viên có trong hệ thống
        </p>
      </div>
      <div className = 'flex justify-end gap-4 mb-6'>
        <ActorSearch
        search = {search}
        setSearch = {setSearch}
        />
          <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          <CirclePlus size={18} />
          <span>Thêm diễn viên</span>
        </button>
      </div>
      <ActorTable
      actors = {actors}
      loading = {loading}
      page = {page}
      pagination = {pagination}
      />
      <ActorPagination
        page = {page}
        setPage = {setPage}
        pagination = {pagination}
      />
    </div>
  )
}

export default ActorManagerPage