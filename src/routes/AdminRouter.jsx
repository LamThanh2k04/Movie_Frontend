import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'

const AdminRouter = () => {
    const { user, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

      if (user.role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }
    return <Outlet />
}

export default AdminRouter