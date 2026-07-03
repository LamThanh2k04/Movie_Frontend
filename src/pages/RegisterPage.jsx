import React, { useState } from 'react'
import bgLogin from '../assets/backgroundLogin.png';
import { validateFormRegister } from '../utils/validateForm';
import { registerApi } from '../services/authApi';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: ''
    }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const newErrors = validateFormRegister(formData)
    setErrors(newErrors)
    console.log('newErrors', newErrors)
    if (Object.keys(newErrors).length > 0) return
    try {
      const { confirmPassword, ...registerData } = formData
      const response = await registerApi(registerData)
      toast.success('Đăng ký thành công')
      navigate('/login')
    } catch (error) {
      toast.error('Đăng ký thất bại. Vui lòng thử lại.')
      console.log(error)

    }
  }
  return (
    <div className="font-body-md text-body-md min-h-screen flex flex-col bg-black text-white">

      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 py-4 max-w-[1200px] mx-auto bg-gradient-to-b from-black/80 to-transparent">
        <div className="text-2xl font-bold text-red-500">CINESTREAM</div>
      </header>


      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4 relative">

        <div className="fixed inset-0 z-auto">
          <img
            src={bgLogin}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            alt="bg"
          />
        </div>


        <div className="w-full max-w-[450px] bg-black/70 backdrop-blur-xl border border-white/10 p-8 rounded-lg">
          <h1 className="text-2xl font-bold mb-2">Đăng ký</h1>
          <p className="text-gray-400 mb-6">
            Tham gia ngay để trải nghiệm kho phim đỉnh cao.
          </p>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="flex gap-4">
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Họ và tên"
                  className="w-full p-4 bg-[#111] border border-gray-700 rounded-lg"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name}
                  </p>
                )}
              </div>


              <div className="flex flex-col w-full">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-4 bg-[#111] border border-gray-700 rounded-lg"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder="Mật khẩu"
                className="w-full p-4 bg-[#111] border border-gray-700 rounded-lg"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.password}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu"
                className="w-full p-4 bg-[#111] border border-gray-700 rounded-lg"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.confirmPassword}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <input type="checkbox" />
              <span>
                Đồng ý với điều khoản dịch vụ và chính sách bảo mật
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 py-4 rounded-lg font-bold hover:brightness-110"
            >
              Đăng ký
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-white underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </main>


      <footer className="p-6 text-center text-gray-500 border-t border-gray-800">
        © 2024 CINESTREAM
      </footer>
    </div>
  );
}

export default RegisterPage