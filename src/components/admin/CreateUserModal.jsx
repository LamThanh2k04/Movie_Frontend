import React, { useState } from "react";
import { X, Upload } from "lucide-react";
import { createUser } from "../../services/admin/userApi";
import toast from "react-hot-toast";
const CeateUserModal = ({ open, onClose, fetchUsers }) => {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const hanleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    try {
      const data = new FormData()
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);

      if (avatar) {
        data.append("avatar", avatar);
      }
      setLoading(true);
      await createUser(data)
      toast.success('Tạo người dùng thành công')
      setFormData({
        name: '',
        email: '',
        password: ''
      })
      setAvatar(null)
      onClose()
      await fetchUsers()
    } catch (error) {
      toast.error('Tạo người dùng thất bại', error)
    } finally {
      setLoading(false)
    }
  }
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl">


        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <h2 className="text-xl font-bold text-white">
            Thêm người dùng
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <X size={22} />
          </button>
        </div>
        <div className="space-y-5 p-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ảnh đại diện
            </label>

            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-red-500 transition">

              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="Avatar Preview"
                  className="w-28 h-28 rounded-full object-cover border-2 border-red-500"
                />
              ) : (
                <>
                  <Upload
                    className="text-gray-400 mb-2"
                    size={30}
                  />

                  <p className="text-gray-400 text-sm">
                    Nhấn để tải ảnh lên
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    setAvatar(file);
                  }
                }}
              />
            </label>
          </div>


          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Họ và tên
            </label>

            <input
              type="text"
              name='name'
              value={formData.name}
              onChange={hanleChange}
              placeholder="Nhập họ và tên..."
              className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-red-500"
            />
          </div>


          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              name='email'
              value={formData.email}
              onChange={hanleChange}
              placeholder="Nhập email..."
              className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-red-500"
            />
          </div>


          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Mật khẩu
            </label>

            <input
              type="password"
              name='password'
              value={formData.password}
              onChange={hanleChange}
              placeholder="Nhập mật khẩu..."
              className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-red-500"
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-800 px-6 py-4">

          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-5 py-2 text-gray-300 hover:bg-zinc-800 transition"
          >
            Hủy
          </button>

          <button onClick={handleSubmit} disabled = {loading}
            className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700 transition"
          >
            {loading ? 'Đang tạo...' : 'Thêm người dùng'}
          </button>

        </div>

      </div>
    </div>
  );
};

export default CeateUserModal;