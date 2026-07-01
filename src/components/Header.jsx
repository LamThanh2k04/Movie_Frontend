import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')

    }
    const { user, isAuthenticated } = useSelector((state) => state.auth)
    console.log(user)
    console.log(isAuthenticated)
    return (
        <nav>
            <Link to="/">Home</Link>

            {isAuthenticated ? (
                <>
                    <span>Xin chào, {user.name}</span>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    )
}

export default Header