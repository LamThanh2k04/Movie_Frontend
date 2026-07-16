import React, { useEffect, useState } from 'react'
import { updateGenre } from '../../services/admin/genreApi';
import toast from 'react-hot-toast';
import { Tag, X } from 'lucide-react';

const UpdateGenreModal = ({ open, onClose, genre, fetchGenres }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: ''
    })

useEffect(() => {
    if (genre) {
        setFormData({
            name: genre.name || "",
        });
    }
}, [genre]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async() => {
        try {
            setLoading(true)
            await updateGenre(genre.id,formData)
            toast.success('Cập nhật thể loại thành công')
            setFormData({
                name : ''
            })
            onClose()
            await fetchGenres()
        } catch (error) {
             toast.error('Cập nhật thể loại thất bại')
        } finally {
          setLoading(false)
        }
    }
      if (!open) return null;

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl">


        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <h2 className="text-xl font-bold text-white">
            Cập nhật thể loại
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <X size={22} />
          </button>
        </div>

   
        <div className="p-6 space-y-5">

          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <Tag
                size={35}
                className="text-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Tên thể loại
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên thể loại..."
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

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading
              ? "Đang cập nhật..."
              : "Cập nhật thể loại"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateGenreModal