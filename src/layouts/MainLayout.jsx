import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
const MainLayout = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <h2>Footer</h2>
        </div>
    )
}

export default MainLayout