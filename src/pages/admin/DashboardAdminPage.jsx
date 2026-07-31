import React, { useEffect, useState } from 'react'
import { getAllOverView, getFavoriteChart, getMovieFavoriteUser } from '../../services/dashboardApi'
import OverView from '../../components/admin/OverView'
import FavoriteMovieBarChart from '../../components/admin/FavoriteMovieBarChart'
import FavoriteLineChart from '../../components/admin/FavoriteLineChart'

const DashboardAdminPage = () => {
  const [overView, setOverView] = useState(null)
  const [favoriteMovies, setFavoriteMovies] = useState([])
  const [favoriteChart, setFavoriteChart] = useState([])
  const [year, setYear] = useState()
  const fetchOverView = async () => {
    try {
      const response = await getAllOverView()
      setOverView(response.data.data)
    } catch (error) {
      console.log('Lấy tổng quan thất bại', error)
    }
  }

  const fetchFavoriteMovie = async () => {
    try {
      const response = await getMovieFavoriteUser()
      setFavoriteMovies(response.data.data)
    } catch (error) {
      console.log('Lấy dữ liệu các bộ phim yêu thích thất bại', error)
    }
  }

  const fetchFavorite = async () => {
    try {
      const params = {}
      if (year) {
        params.year = year
      }
      const response = await getFavoriteChart(params)
      setFavoriteChart(response.data.data)
    } catch (error) {
      console.log('Lấy dữ liệu yêu thích thất bại', error)
    }
  }

  useEffect(() => {
    console.log(year)
    fetchOverView()
    fetchFavoriteMovie()
  }, [])

  useEffect(() => {
    fetchFavorite()
  },[year])
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Chào mừng trở lại, Admin
        </h1>

        <p className="mt-2 text-zinc-400">
          Đây là tổng quan hệ thống của bạn.
        </p>
      </div>

      <OverView data={overView} />

      <div className='grid grid-cols-2 gap-6'>
        <FavoriteMovieBarChart
          data={favoriteMovies}
        />
        <FavoriteLineChart
          year={year}
          setYear={setYear}
          data={favoriteChart}
        />
      </div>
    </div>
  );
}

export default DashboardAdminPage