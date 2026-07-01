import { useEffect } from 'react'
import './App.css'
import AppRouter from './routes/AppRouter'
import { useDispatch } from 'react-redux'
import { login } from './features/auth/authSlice'
import { Toaster } from 'react-hot-toast'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem("user"))

    if (accessToken && user) {
      dispatch(login({ accessToken, user }))
    }
  }, [dispatch])

  return (
    <>
      <AppRouter />
      <Toaster position="top-center" />
    </>
  )
}

export default App