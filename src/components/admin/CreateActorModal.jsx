import React, { useState } from 'react'
import { createActor } from '../../services/admin/actorApi'
import toast from 'react-hot-toast'
import { Upload, X } from 'lucide-react'

const CreateActorModal = ({ open, onClose, fetchActors }) => {
    const [formData, setFormData] = useState({
        name: '',
        anotherName: '',
        dateOfbirth: '',
        description: ''
    })
    const [avatar, setAvatar] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async () => {
        try {
            const data = new FormData()
            data.append('name', formData.name)
            if (formData.anotherName) {
                data.append('anotherName', formData.anotherName)
            }
            if (formData.dateOfbirth) {
                data.append('dateOfbirth', formData.dateOfbirth)
            }
            if (formData.description) {
                data.append('description', formData.description)
            }
            if (avatar) {
                data.append('avatar', avatar);
            }
            setLoading(true)
            await createActor(data)
            toast.success('Tạo diễn viên thành công')
            setFormData({
                name: '',
                anotherName: '',
                dateOfbirth: '',
                description: ''
            })
            setAvatar(null)

            onClose();

            await fetchActors();
        } catch (error) {
            toast.error('Tạo diễn viên thất bại')
        } finally {
            setLoading(false)
        }
    }
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">
                        Thêm diễn viên
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-500 transition"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-5 p-6">

                    {/* Avatar */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Ảnh đại diện
                        </label>

                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-red-500 transition overflow-hidden">

                            {avatar ? (
                                <img
                                    src={URL.createObjectURL(avatar)}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <>
                                    <Upload
                                        className="text-gray-400 mb-2"
                                        size={28}
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

                    {/* 2 cột */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm text-gray-300 mb-2">
                                Tên diễn viên
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nhập tên..."
                                className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white outline-none focus:border-red-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-2">
                                Tên khác
                            </label>

                            <input
                                type="text"
                                name="anotherName"
                                value={formData.anotherName}
                                onChange={handleChange}
                                placeholder="Tên khác..."
                                className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white outline-none focus:border-red-500"
                            />
                        </div>

                    </div>

                    {/* Ngày sinh */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Ngày sinh
                        </label>

                        <input
                            type="date"
                            name="dateOfbirth"
                            value={formData.dateOfbirth}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white outline-none focus:border-red-500"
                        />
                    </div>

                    {/* Mô tả */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Tiểu sử
                        </label>

                        <textarea
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Nhập tiểu sử..."
                            className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white outline-none focus:border-red-500 resize-none"
                        />
                    </div>

                </div>

                {/* Footer */}
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
                        {loading ? "Đang tạo..." : "Thêm diễn viên"}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default CreateActorModal