import React, { useEffect, useState } from 'react'
import { getAllCountries, updateCountryStatus } from '../../services/countryApi'
import usePagination from '../../hooks/usePagination'
import useSearch from '../../hooks/useSearch'
import CountryTable from '../../components/admin/CountryTable'
import CountryPagination from '../../components/admin/CountryPagination'
import CountrySearch from '../../components/admin/CountrySearch'
import { CirclePlus } from 'lucide-react'
import CreateCountryModal from '../../components/admin/CreateCountryModal'
import UpdateCountryModal from '../../components/admin/UpdateCountryModal'
import toast from 'react-hot-toast'

const CountryManagerPage = () => {
  const { page, setPage } = usePagination()
  const { search, setSearch } = useSearch()
  const [pagination, setPagination] = useState(null)
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);


  const fetchCountries = async () => {
    setLoading(true)
    try {
      const params = {}
      if (search) {
        params.search = search
      }
      if (page > 1) {
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
  }, [search, page])

  const handleEdit = (country) => {
    setSelectedCountry(country)
    setOpenUpdate(true)
  }

  const handleToggleStatus = async (countryId) => {
    try {
      await updateCountryStatus(countryId)
      toast.success('Cập nhật trạng thái quốc gia thành công')
      await fetchCountries()
    } catch (error) {
      toast.error('Cập nhật trạng thái quốc gia thất bại')
    }
  }
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
          search={search}
          setSearch={setSearch}
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
        countries={countries}
        loading={loading}
        page={page}
        pagination={pagination}
        handleEdit={handleEdit}
        handleToggleStatus={handleToggleStatus}
      />

      <CountryPagination
        page={page}
        setPage={setPage}
        pagination={pagination}
      />
      <CreateCountryModal
        open={open}
        onClose={() => setOpen(false)}
        fetchCountries={fetchCountries}
      />

      <UpdateCountryModal
        open={openUpdate}
        onClose={() => {
          setSelectedCountry(null)
          setOpenUpdate(false)
        }}
        fetchCountries={fetchCountries}
        country={selectedCountry}

      />
    </div>
  )
}

export default CountryManagerPage