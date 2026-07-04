import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from '../pages/HomePage';
import MainLayout from '../layouts/MainLayout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardAdminPage from '../pages/admin/DashboardAdminPage';
import AdminRouter from './AdminRouter';
import AdminLayout from '../layouts/AdminLayout';
import UserManagerPage from '../pages/admin/UserManagerPage';
import ActorManagerPage from '../pages/admin/ActorManagerPage';
import CountryManagerPage from '../pages/admin/CountryManagerPage';
import MovieManagerPage from '../pages/admin/MovieManagerPage';
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<AdminRouter/>}>
                    <Route element={<AdminLayout />} >
                        <Route path="/admin" element={<DashboardAdminPage />} />
                        <Route path="/admin/users" element={<UserManagerPage />} />
                        <Route path="/admin/actors" element={<ActorManagerPage />} />
                        <Route path="/admin/countries" element={<CountryManagerPage />} />
                        <Route path="/admin/movies" element={<MovieManagerPage />} />
                    </Route>
                </Route>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter