import React, { useEffect, useState } from 'react'
import usePagination from '../../hooks/usePagination';
import useSearch from '../../hooks/useSearch';
import { getAllMovies, updateMovieStatus } from '../../services/admin/movieApi';
import MovieTable from '../../components/admin/MovieTable';
import MovieSearch from '../../components/admin/MovieSearch';
import { CirclePlus } from 'lucide-react';
import MoviePagination from '../../components/admin/MoviePagination';
import CreateMovieModal from '../../components/admin/CreateMovieModal';
import toast from 'react-hot-toast';
import UpdateMovieModal from '../../components/admin/UpdateMovieModal';

const MovieManagerPage = () => {
  const { page, setPage } = usePagination();
  const { search, setSearch } = useSearch();
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [open,setOpen] = useState(false)
  const [selectedMovie,setSelectedMovie] = useState(null)
  const [openUpdate,setOpenUpdate] = useState(false)
  const fetchMovies = async () => {
    setLoading(true)
    try {
      const params = {}

      if (search) {
        params.search = search;
      }

      if (page > 1) {
        params.page = page;
      }
      const response = await getAllMovies(params)
      const data = response.data.data
      setMovies(data.movies)
      setPagination(data.pagination);
    } catch (error) {
      console.error('Lấy danh sách phim thất bại', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (movie) => {
     setSelectedMovie(movie)
     setOpenUpdate(true)
  }

  const handleToggleStatus = async (movieId) => {
    try {
      await updateMovieStatus(movieId)
      toast.success('Cập nhật trạng thái phim thành công')
      await fetchMovies()
    } catch (error) {
      toast.error('Cập nhật trạng thái phim thất bại')
    }
  }
  useEffect(() => {
    fetchMovies();
  }, [page, search]);
  return (
    <div className='text-white'>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Quản lý phim
        </h1>

        <p className="text-zinc-400 mt-2">
          Quản lý phim có trong hệ thống
        </p>
      </div>
      <div className='flex justify-end mb-6 gap-4'>
        <MovieSearch
          search={search}
          setSearch={setSearch}
        />
        <button onClick={() => setOpen(true)} className = 'flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition'>
          <CirclePlus size = {18}/>
          <span>Thêm phim</span>
          </button>  
      </div>
      <MovieTable
        movies={movies}
        loading={loading}
        page={page}
        pagination={pagination}
        handleEdit = {handleEdit}
        handleToggleStatus = {handleToggleStatus}
      />
      <MoviePagination
        page = {page}
        setPage = {setPage}
        pagination = {pagination}
      />

      <CreateMovieModal
      open={open}
      onClose={() => setOpen(false)}
      fetchMovies={fetchMovies}
      />

      <UpdateMovieModal
      open={openUpdate}
      onClose={()=> {
        setSelectedMovie(null)
        setOpenUpdate(false)
      }}
      fetchMovies={fetchMovies}
      movie={selectedMovie}
      />
    </div>
  )
}

export default MovieManagerPage