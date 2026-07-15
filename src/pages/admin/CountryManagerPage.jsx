import React, { useEffect, useState } from 'react'
import { getAllCountries } from '../../services/admin/countryApi'
import usePagination from '../../hooks/usePagination'
import useSearch from '../../hooks/useSearch'
import CountryTable from '../../components/admin/CountryTable'
import CountryPagination from '../../components/admin/CountryPagination'
import CountrySearch from '../../components/admin/CountrySearch'
import { CirclePlus } from 'lucide-react'

const CountryManagerPage = () => {
  const { page, setPage } = usePagination()
  const { search, setSearch } = useSearch()
  const [pagination, setPagination] = useState(null)
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)

    const fetchCountries = async () => {
      setLoading(true)
      try {
        const params = {}
        if(search) {
          params.search = search
        }
        if(page > 1) {
           params.page = page;
        }
        const response = await getAllCountries(params)
        const data = response.data.data
        console.log(data.countries)
        setCountries(data.countries)
        setPagination(data.pagination)
      } catch (error) {
        console.error('Lấy danh sách diễn viên thất bại', error)
      } finally {
        setLoading(false)
      }
    }
  
    useEffect(() => {
      fetchCountries()
    },[search,page])

  return (
    <div className='text-white'>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Quản lý quốc gia
        </h1>

        <p className="text-zinc-400 mt-2">
          Quản lý quốc gia có trong hệ thống
        </p>
      </div>
      <div className='flex justify-end gap-4 mb-6'>
        <CountrySearch 
        search = {search}
        setSearch = {setSearch} 
        />
          <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          <CirclePlus size={18} />
          <span>Thêm quốc gia</span>
        </button>
      </div>
      <CountryTable
      countries = {countries}
      loading = {loading}
      page = {page}
      pagination = {pagination}
      />

      <CountryPagination
        page = {page}
        setPage={setPage}
        pagination={pagination}
      />

    </div>
  )
}

export default CountryManagerPage