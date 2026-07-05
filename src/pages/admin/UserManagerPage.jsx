import React, { useEffect, useState } from 'react'
import usePagination from '../../hooks/usePagination'
import useSearch from '../../hooks/useSearch'
import { getAllUsers } from '../../services/admin/userApi'
import UserTable from '../../components/admin/UserTable'
import UserSearch from '../../components/admin/UserSearch'
import UserPagination from '../../components/admin/UserPagination'

const UserManagerPage = () => {
  const { page,setPage } = usePagination()
  const { search, setSearch } = useSearch()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false); // Trạng thái đang gọi API (true: đang tải, false: đã xong hoặc lỗi)
  const [pagination, setPagination] = useState(null); // Lấy pagination từ backend trả về 

  const fetchUsers = async () => {
      setLoading(true);
      try {
        const params = {}
        if(search) {
          params.search = search
        }
        if(page > 1) {
          params.page = page
        }
        const response = await getAllUsers(params)
        const data = response.data.data
        console.log('Lấy danh sách người dùng thành công')
        console.log(data.users)
        setUsers(data.users)
        setPagination(data.pagination)
      } catch (error) {
        console.error('Lấy danh sách người dùng thất bại',error)
      } finally {
        setLoading(false);
      }
  }

  useEffect(()=> {
    fetchUsers()
  },[page,search])
  return (
    <div className='text-white'>
     <div className='flex justify-end mb-6'>
       <UserSearch
       search = {search}
       setSearch={setSearch}
      />
     </div>
      <UserTable 
        users = {users}
        loading = {loading}
      />
      <UserPagination
        page = {page}
        setPage={setPage}
        pagination={pagination}
      />
    </div>
  )
}

export default UserManagerPage