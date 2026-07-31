import React, { useEffect, useState } from 'react'
import { getFavoriteMovieUser } from '../../services/userApi'
import useAuth from '../../hooks/useAuth'
import FavoriteSection from '../../components/movie/FavoriteSection'

const FavoriteUserPage = () => {

  const [favoriteMovies, setFavoriteMovies] = useState()
  const [loading, setLoading] = useState(true)
  const { user, isAuthenticated } = useAuth()
  const fetchFavoriteMovies = async () => {
    try {
      const response = await getFavoriteMovieUser()
      setFavoriteMovies(response.data.data)
      const data = response.data.data
      console.log(data)
    } catch (error) {
      console.log('Lấy danh sách yêu thích người dùng thất bại', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFavoriteMovies()
  }, [])
  return (
    <div className="min-h-screen bg-[#141414] pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <h2 className="mb-8 text-2xl font-bold text-white md:text-3xl">
          Danh sách yêu thích của{" "}
          <span className="text-red-500">{user.name}</span>
        </h2>

        {favoriteMovies?.length > 0 ? (
          <FavoriteSection favorites={favoriteMovies} />
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50">
            <p className="text-lg text-zinc-400">
              Bạn chưa có bộ phim yêu thích nào.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoriteUserPage