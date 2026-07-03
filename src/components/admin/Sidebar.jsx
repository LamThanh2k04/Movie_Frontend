import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='flex flex-col'>
    <Link to= '/admin'>Tổng quan</Link>
    <Link to= '/admin/users'>Người dùng</Link>
    <Link to= '/admin/movies'>Phim</Link>
    <Link to= '/admin/actors'>Diễn viên</Link>
    <Link to= '/admin/countries'>Quốc gia</Link>
    </div>
  )
}

export default Sidebar