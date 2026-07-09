import React, { useEffect, useState } from "react";
import { CirclePlus, Users, Shield, User } from "lucide-react";
import usePagination from "../../hooks/usePagination";
import useSearch from "../../hooks/useSearch";
import { getAllUsers } from "../../services/admin/userApi";
import UserTable from "../../components/admin/UserTable";
import UserSearch from "../../components/admin/UserSearch";
import UserPagination from "../../components/admin/UserPagination";
import UserModal from "../../components/admin/UserModal";

const UserManagerPage = () => {
  const { page, setPage } = usePagination();
  const { search, setSearch } = useSearch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [open, setOpen] = useState(false);

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
      />

      <UserPagination
        page={page}
        setPage={setPage}
        pagination={pagination}
      />

      <UserModal
        open={open}
        onClose={() => setOpen(false)}
        fetchUsers={fetchUsers}
      />
    </div>
  );
};

export default UserManagerPage;