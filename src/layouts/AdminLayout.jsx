
import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'

const AdminLayout = () => {
  return (
    <div className='flex bg-zinc-900 min-h-screen'>
        <Sidebar/>
        <main className='flex-1 bg-zinc-900 p-8 overflow-y-auto'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminLayout