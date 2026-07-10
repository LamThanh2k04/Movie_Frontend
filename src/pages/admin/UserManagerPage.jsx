import React, { useEffect, useState } from "react";
import { CirclePlus, Users, Shield, User } from "lucide-react";
import usePagination from "../../hooks/usePagination";
import useSearch from "../../hooks/useSearch";
import { getAllUsers, updateUserStatus } from "../../services/admin/userApi";
import UserTable from "../../components/admin/UserTable";
import UserSearch from "../../components/admin/UserSearch";
import UserPagination from "../../components/admin/UserPagination";
import CeateUserModal from "../../components/admin/CreateUserModal";
import UpdateUserModal from "../../components/admin/UpdateUserModal";
import toast from "react-hot-toast";

const UserManagerPage = () => {
  const { page, setPage } = usePagination();
  const { search, setSearch } = useSearch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = {};

      if (search) {
        params.search = search;
      }

      if (page > 1) {
        params.page = page;
      }

      const response = await getAllUsers(params);
      const data = response.data.data;

      setUsers(data.users);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Lấy danh sách người dùng thất bại", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenUpdate(true);
  }

  const handleToggleStatus = async(userId) => {
      try {
        await updateUserStatus(userId)
        toast.success('Cập nhật trạng thái người dùng thành công')
        await fetchUsers()
      } catch (error) {
        toast.error('Cập nhật trạng thái người dùng thất bại')
      }
  }

  useEffect(() => {
    fetchUsers();
  }, [page, search]);


  return (
    <div className="text-white">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Quản lý người dùng
        </h1>

        <p className="text-zinc-400 mt-2">
          Quản lý tài khoản người dùng trong hệ thống
        </p>
      </div>

      <div className="flex justify-end mb-6 gap-4">
        <UserSearch
          search={search}
          setSearch={setSearch}
        />

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          <CirclePlus size={18} />
          <span>Thêm người dùng</span>
        </button>
      </div>

      <UserTable
        users={users}
        loading={loading}
        page={page}
        pagination={pagination}
        handleEdit={handleEdit}
        handleToggleStatus = {handleToggleStatus}
      />

      <UserPagination
        page={page}
        setPage={setPage}
        pagination={pagination}
      />

      <CeateUserModal
        open={open}
        onClose={() => setOpen(false)}
        fetchUsers={fetchUsers}
      />

      <UpdateUserModal
        open={openUpdate}
        onClose={() => {
          setOpenUpdate(false);
          setSelectedUser(null);
        }}
        fetchUsers={fetchUsers}
        user={selectedUser}
      />
    </div>
  );
};

export default UserManagerPage;