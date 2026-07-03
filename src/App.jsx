import { useEffect } from 'react'
import './App.css'
import AppRouter from './routes/AppRouter'
import { useDispatch } from 'react-redux'
import { login } from './features/auth/authSlice'
import { Toaster } from 'react-hot-toast'

function App() {
  const dispatch = useDispatch()

  return (
    <>
      <AppRouter />
      <Toaster position="top-center" />
    </>
  )
}

export default App