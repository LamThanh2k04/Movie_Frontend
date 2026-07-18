import React, { useEffect, useState } from 'react'
import { updateCountry } from '../../services/admin/countryApi';
import toast from 'react-hot-toast';
import { Upload, X } from 'lucide-react';

const UpdateCountryModal = ({ open, onClose, fetchCountries, country }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: ''
    })

    useEffect(() => {
        if (country) {
            setFormData({
                name: country.name || ""
            })
            setImage(null);
        }
    }, [country])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        try {
            const data = new FormData();

            data.append("name", formData.name);

            data.append("image", image);

            setLoading(true);

            await updateCountry(country.id, data);

            toast.success("Cập nhật quốc gia thành công");

            setFormData({
                name: "",
            });

            setImage(null);

            onClose();

            await fetchCountries();
        } catch (error) {
            toast.error("Cập nhật quốc gia thất bại");
        } finally {
            setLoading(false);
        }
    };
    if (!open) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-lg rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">
                        Thêm quốc gia
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

                    {/* Upload ảnh */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Ảnh quốc gia
                        </label>

                        <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-red-500 transition overflow-hidden">

                            {image ? (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : country?.image ? (
                                <img
                                    src={country.image}
                                    alt={country.name}
                                    className="w-full h-full object-cover"
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
                                        setImage(file);
                                    }
                                }}
                            />
                        </label>
                    </div>

                    {/* Tên quốc gia */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Tên quốc gia
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nhập tên quốc gia..."
                            className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-red-500"
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
                        {loading
                            ? "Đang cập nhật..."
                            : "Cập nhật quốc gia quốc gia"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateCountryModal