import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import useSearch from '../hooks/useSearch'
import Footer from '../components/Footer'
// outlet hk phải component mình tạo nên hk dùng cách props đc 
// vì hk biết bên trong nó chứa home hay là gì nên hk dùng cách props
const MainLayout = () => {
    const {search, setSearch} = useSearch()
    return (
        <div className = 'text-white bg-black min-h-screen'>
            <Header
            search={search}
            setSearch={setSearch}
            />
            
            <Outlet 
            context={{search}}
            />
            <Footer/>
        </div>
    )
}

export default MainLayout