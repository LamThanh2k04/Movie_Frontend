import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllMoviesRandom, getInfoMovie } from '../services/movieApi'
import MovieDetailHero from '../components/movie/MovieDetailHero'
import MovieActors from '../components/movie/MovieActors'
import MovieSection from '../components/home/MovieSection'

const MovieDetailPage = () => {
  const [movie, setMovie] = useState()
  const [loading, setLoading] = useState(true)
  const [moviesRandom, setMoviesRandom] = useState([])
  const { movieId } = useParams()

  const fetchDetailMovie = async () => {
    try {
      const response = await getInfoMovie(movieId)
      const data = response.data.data
      console.log(data)
      setMovie(data)
    } catch (error) {
      console.log('Lây thông tin của 1 phim không thành công', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMoviesRandom = async () => {
    try {
      const response = await getAllMoviesRandom()
      setMoviesRandom(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log('Lỗi lấy tất cả phim thất bại', error)
    }
  }

  useEffect(() => {
    fetchDetailMovie()
    fetchMoviesRandom()
  }, [movieId])

  if (loading) {
    return <div className='text-center text-gray-400 py-10'>Đang tải dữ liệu phim</div>
  }
  if (!movie) {
    return <div className='text-center text-gray-400 py-10'>Không có dữ liệu phim</div>
  }
  return (
    <div className='text-white'>
      <MovieDetailHero
        movie={movie}
      />
      <MovieActors
        actors={movie.actors}
      />
      <div className= 'relative overflow-hidden bg-[#141414] text-white'>
        <h2 className='mb-4 px-6 text-2xl font-bold text-white md:px-10 lg:px-16'>Danh sách phim liên quan</h2>
        <MovieSection
          movies={moviesRandom}
        />
      </div>
    </div>
  );
}

export default MovieDetailPage