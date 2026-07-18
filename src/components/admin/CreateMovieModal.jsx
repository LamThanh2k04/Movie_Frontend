import React, { useEffect, useState } from 'react'
import { createMovie } from '../../services/admin/movieApi'
import toast from 'react-hot-toast'
import { getAllGenresSimple } from '../../services/admin/genreApi'
import { getAllActorsSimple } from '../../services/admin/actorApi'
import { getAllCountriesSimple } from '../../services/admin/countryApi'
import Select from "react-select";
import { Upload, X } from "lucide-react";
const CreateMovieModal = ({ open, onClose, fetchMovies }) => {

  const [countries, setCountries] = useState([])
  const [actors, setActors] = useState([])
  const [genres, setGenres] = useState([])
  const [banner, setBanner] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    star: '',
    releaseYear: '',
    countryId: '',
    genreIds: [],
    actorIds: []
  })
  const [loading, setLoading] = useState(false)


  const fetchData = async () => {
    try {
      const [countries, actors, genres] = await Promise.all([
        getAllCountriesSimple(),
        getAllActorsSimple(),
        getAllGenresSimple()
      ])

      setCountries(countries.data.data)
      setActors(actors.data.data)
      setGenres(genres.data.data)
    } catch (error) {
      toast.error("Lấy dữ liệu thất bại");
    }
  }

  useEffect(() => {
    if (open) {
      fetchData()
    }
  }, [open])

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
      if (formData.description) {
        data.append('description', formData.description)
      }
      data.append('type', formData.type)
      if (formData.star) {
        data.append('star', Number(formData.star));
      }

      data.append(
        'releaseYear',
        Number(formData.releaseYear)
      );

      data.append(
        'countryId',
        Number(formData.countryId)
      );

      formData.genreIds.forEach((id) => {
        data.append('genreIds', id);
      });

      formData.actorIds.forEach((id) => {
        data.append('actorIds', id);
      });

      if (thumbnail) {
        data.append('thumbnail', thumbnail);
      }

      if (banner) {
        data.append('banner', banner);
      }

      if (trailer) {
        data.append('trailer', trailer);
      }
      setLoading(true)
      await createMovie(data)
      toast.success('Tạo phim thành công')
      setFormData({
        name: '',
        description: '',
        type: '',
        star: '',
        releaseYear: '',
        countryId: '',
        genreIds: [],
        actorIds: []
      })
      setBanner(null)
      setThumbnail(null)
      setTrailer(null)
      onClose()
      await fetchMovies()
    } catch (error) {
      toast.error('Tạo phim thất bại')
    } finally {
      setLoading(false)
    }
  }
  if (!open) return null
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#18181b",
      borderColor: state.isFocused
        ? "#ef4444"
        : "#3f3f46",
      minHeight: "50px",
      borderRadius: "12px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#ef4444",
      },
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: "#18181b",
      color: "white",
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "#27272a"
        : "#18181b",
      color: "white",
      cursor: "pointer",
    }),

    singleValue: (base) => ({
      ...base,
      color: "white",
    }),

    input: (base) => ({
      ...base,
      color: "white",
    }),

    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
    }),

    multiValue: (base) => ({
      ...base,
      backgroundColor: "#dc2626",
      borderRadius: "8px",
    }),

    multiValueLabel: (base) => ({
      ...base,
      color: "white",
    }),

    multiValueRemove: (base) => ({
      ...base,
      color: "white",
      ":hover": {
        backgroundColor: "#b91c1c",
        color: "white",
      },
    }),
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
          <h2 className="text-2xl font-bold text-white">
            Thêm phim mới
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:bg-zinc-800 hover:text-red-500 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* Upload */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Thumbnail */}
            <div>
              <p className="mb-2 text-sm text-gray-400">
                Thumbnail
              </p>

              <label className="flex h-44 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900 hover:border-red-500 transition">
                {thumbnail ? (
                  <img
                    src={URL.createObjectURL(thumbnail)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <Upload size={30} />
                    <span>Tải ảnh lên</span>
                  </div>
                )}

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    setThumbnail(e.target.files[0])
                  }
                />
              </label>
            </div>

            {/* Banner */}
            <div>
              <p className="mb-2 text-sm text-gray-400">
                Banner
              </p>

              <label className="flex h-44 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900 hover:border-red-500 transition">
                {banner ? (
                  <img
                    src={URL.createObjectURL(banner)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <Upload size={30} />
                    <span>Tải ảnh lên</span>
                  </div>
                )}

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    setBanner(e.target.files[0])
                  }
                />
              </label>
            </div>

            {/* Trailer */}
            <div>
              <p className="mb-2 text-sm text-gray-400">
                Trailer
              </p>

              <label className="flex h-44 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900 hover:border-red-500 transition">
                {trailer ? (
                  <video
                    src={URL.createObjectURL(trailer)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <Upload size={30} />
                    <span>Tải video lên</span>
                  </div>
                )}

                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) =>
                    setTrailer(e.target.files[0])
                  }
                />
              </label>
            </div>
          </div>

          {/* Tên phim */}
          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Tên phim
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên phim..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-red-500"
            />
          </div>

          {/* Mô tả */}
          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Mô tả
            </label>

            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Nhập mô tả phim..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-red-500 resize-none"
            />
          </div>

          {/* Hàng thông tin */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Loại phim
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-red-500"
              >
                <option value="" className="bg-zinc-900">
                  Chọn loại phim
                </option>
                <option value="SINGLE" className="bg-zinc-900">
                  Phim lẻ
                </option>
                <option value="SERIES" className="bg-zinc-900">
                  Phim bộ
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Đánh giá
              </label>

              <input
                type="number"
                step="0.1"
                name="star"
                value={formData.star}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Năm phát hành
              </label>

              <input
                type="number"
                name="releaseYear"
                value={formData.releaseYear}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Quốc gia
              </label>

              <select
                name="countryId"
                value={formData.countryId}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-red-500"
              >
                <option value="" className="bg-zinc-900">
                  Chọn quốc gia
                </option>

                {countries.map((country) => (
                  <option
                    key={country.id}
                    value={country.id}
                    className="bg-zinc-900"
                  >
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Genres */}
          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Thể loại
            </label>

            <Select
              isMulti
              styles={customSelectStyles}
              placeholder="Chọn thể loại..."
              options={genres.map((g) => ({
                value: g.id,
                label: g.name,
              }))}
              onChange={(selected) =>
                setFormData((prev) => ({
                  ...prev,
                  genreIds: selected
                    ? selected.map((item) => item.value)
                    : [],
                }))
              }
            />
          </div>

          {/* Actors */}
          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Diễn viên
            </label>

            <Select
              isMulti
              styles={customSelectStyles}
              placeholder="Chọn diễn viên..."
              options={actors.map((a) => ({
                value: a.id,
                label: a.name,
              }))}
              onChange={(selected) =>
                setFormData((prev) => ({
                  ...prev,
                  actorIds: selected
                    ? selected.map((item) => item.value)
                    : [],
                }))
              }
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-zinc-800 px-6 py-5">
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
            {loading ? "Đang tạo..." : "Thêm phim"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateMovieModal