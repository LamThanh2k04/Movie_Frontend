import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const AdminRouter = () => {
    const { user, isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

      if (user.role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }
    return <Outlet />
}

export default AdminRouter