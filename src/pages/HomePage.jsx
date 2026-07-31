import React, { useEffect, useState } from 'react'
import {useOutletContext } from 'react-router-dom'
import { getAllMoviesRandom, getFavoriteMovieUser, getMovieRandom, getMoviesBySearch, getMoviesFavorite } from '../services/admin/movieApi'
import HeroMovie from '../components/home/HeroMovie'
import MovieSection from '../components/home/MovieSection'
import useAuth from '../hooks/useAuth'
import FavoriteSection from '../components/movie/FavoriteSection'

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const { search } = useOutletContext()
  const [movieRandom, setMovieRandom] = useState(null)
  const [moviesRandom, setMoviesRandom] = useState([])
  const [moviesFavorite, setMoviesFavorite] = useState([])
  const [moviesSearch, setMoviesSearch] = useState([])
  const [movieFavoriteUser, setMovieFavoriteUser] = useState([])


  const fetchMovieRandom = async () => {
    try {
      const response = await getMovieRandom()
      setMovieRandom(response.data.data[0])
    } catch (error) {
      console.log('Lỗi lấy phim thất bại', error)
    }
  }

  const fetchMoviesRandom = async () => {
    try {
      const response = await getAllMoviesRandom()
      setMoviesRandom(response.data.data)
    } catch (error) {
      console.log('Lỗi lấy tất cả phim thất bại', error)
    }
  }

  const fetchFavoriteMoviesUser = async () => {
    try {
      const response = await getFavoriteMovieUser()
      setMovieFavoriteUser(response.data.data)
    } catch (error) {
      console.log('Lỗi lấy tất cả phim yêu thích của người dùng thất bại', error)
    }
  }

  const fetchMoviesBySearch = async () => {
    try {
      const params = {}
      if (search) {
        params.search = search
      }
      const response = await getMoviesBySearch(params)
      setMoviesSearch(response.data.data)
    } catch (error) {
      console.log('Lỗi lấy phim tìm kiếm thất bại', error)
    }
  }

  const fetchMoviesFavorite = async () => {
    try {
      const response = await getMoviesFavorite()
      setMoviesFavorite(response.data.data)
    } catch (error) {
      console.log('Lỗi lấy phim yêu thích thất bại', error)
    }
  }
  useEffect(() => {
    fetchMovieRandom()
    fetchMoviesRandom()
    fetchMoviesFavorite()
    if (isAuthenticated) {
      fetchFavoriteMoviesUser()
    }
  }, [])

  useEffect(() => {
    fetchMoviesBySearch()
  }, [search])
  
  return (
    <div>
      {
        search ? (
          <div className= 'relative z-10 px-6 pt-24 md:px-10 lg:px-16'>
            <h2 className='mb-4 px-6 text-2xl font-bold text-white md:px-10 lg:px-16'>Danh sách phim đang tìm kiếm {search}</h2>
            <MovieSection
              movies={moviesSearch}
            />
          </div>
        ) : (
          <div>
            <HeroMovie movie={movieRandom} />
            <div>
              {isAuthenticated && movieFavoriteUser.length > 0 && (
                <div>
                  <h2 className='mb-4 px-6 text-2xl font-bold text-white md:px-10 lg:px-16'>Danh sách phim đã yêu thích của {user.name}</h2>
                  <FavoriteSection
                    favorites={movieFavoriteUser}
                  />
                </div>
              )}
            </div>
            <div>
              <h2 className='mb-4 px-6 text-2xl font-bold text-white md:px-10 lg:px-16'>Danh sách phim mới hằng ngày</h2>
              <MovieSection
                movies={moviesRandom}
              />
            </div>
            <div>
              <h2 className='mb-4 px-6 text-2xl font-bold text-white md:px-10 lg:px-16'>Danh sách phim nhiều người dùng yêu thích</h2>
              <MovieSection
                movies={moviesFavorite}
              />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default HomePage