import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginApi } from '../services/authApi'
import { login } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import bgLogin from '../assets/backgroundLogin.png';
import toast from 'react-hot-toast'
import { validateFormLogin } from '../utils/validateForm'
// React thấy sate thay đổi reder component
// UI luôn được render từ State.

// Khi bấm submit thì nó sẽ submit form nó sẽ Refresh trang
// nếu muốn không refresh trang thì dùng preventDefault()

// Hook chỉ được gọi bên trong Function Component hoặc Custom Hook.
const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })
  // e là event object chứa thông tin sự kiện
  // e.target là phần tử gây ra sự kiện (ví dụ: ô <input>).
  const handleChange = (e) => {
    setFormData({
      ...formData, // format data sẽ sao chép dữ liệu ban đầu của formdata sau đó những thuộc tính viết phía sau sẽ ghi đè (overwrite) nếu trùng tên.
      [e.target.name]: e.target.value, // cái [] nghĩa là Hãy tính giá trị bên trong [] rồi dùng kết quả làm tên property thành key
      // ví dụ const const key = "age"; 
      // const obj = {[key] : 20}
      // Kết quả: {age: 20}
    })
    setErrors((prev) => ({
        ...prev,
        [e.target.name] : ''
      }))
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    const newErrors = validateFormLogin(formData)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return // return ở đây là để dừng hàm này hk có gọi api
    try {
      const response = await loginApi(formData)
      dispatch(login(response.data.data))
      localStorage.setItem('token', response.data.data.accessToken)
      localStorage.setItem('user', JSON.stringify(response.data.data.user))
      toast.success('Đăng nhập thành công')
      navigate('/')
    } catch (error) {
      toast.error('Sai email hoặc mật khẩu')
      console.log(error)
    }

  }
  return (
    <div className="min-h-screen flex flex-col text-[#e5e2e1] relative overflow-x-hidden">
      <div className="fixed inset-0 -z-10">
        <img
          className="w-full h-full object-cover"
          src={bgLogin}
          alt="Background"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <nav className="flex justify-between items-center px-6 py-4 max-w-[1200px] mx-auto">
          <div className="text-red-600 text-2xl font-extrabold tracking-tight uppercase">
            CINESTREAM
          </div>
        </nav>
      </header>


      <main className="flex-grow flex items-center justify-center px-4 py-16 mt-16">
        <div className="bg-black/70 backdrop-blur-2xl border border-white/10 w-full max-w-[450px] p-8 rounded-lg shadow-2xl">

          <h1 className="text-2xl font-bold mb-6">Đăng nhập</h1>

          <form className="space-y-4" onSubmit={handleLogin}>

            <div className="relative">
              <input
                name='email'
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email hoặc số điện thoại"

                className="peer w-full bg-[#1c1b1b] text-white p-4 rounded-lg outline-none placeholder-transparent focus:ring-2 focus:ring-red-600"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.email}
                </p>
              )}
              <label className="absolute left-4 top-4 text-gray-400 transition-all 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-red-500
              peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs
              bg-[#1c1b1b] px-1">
                Email
              </label>

            </div>
            <div className="relative">
              <input
                name='password'
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mật khẩu"
                className="peer w-full bg-[#1c1b1b] text-white p-4 rounded-lg outline-none placeholder-transparent focus:ring-2 focus:ring-red-600"
              />
 {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.password}
                </p>
              )}
              <label className="absolute left-4 top-4 text-gray-400 transition-all 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-red-500
              peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs
              bg-[#1c1b1b] px-1">
                Mật khẩu
              </label>
            </div>


            <button
              type='submit'
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg transition active:scale-95"
            >
              Đăng nhập
            </button>


            <div className="flex justify-between items-center text-sm mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-red-600" />
                <span className="text-gray-400">Ghi nhớ tôi</span>
              </label>

              <Link to="#" className="text-gray-400 hover:underline">
                Bạn cần trợ giúp?
              </Link>
            </div>
          </form>


          <div className="mt-8 space-y-3 text-sm text-gray-400">
            <div>
              Mới sử dụng?{" "}
              <Link to="/register" className="text-white font-bold hover:underline">
                Đăng ký ngay
              </Link>
            </div>
            <p className="text-xs text-gray-500">
              Trang này được bảo vệ bởi reCAPTCHA để đảm bảo bạn không phải là robot.
            </p>
          </div>

        </div>
      </main>


      <footer className="w-full py-6 border-t border-gray-700 bg-black mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 max-w-[1200px] mx-auto text-sm text-gray-400">

          <div className="text-red-600 font-bold">CINESTREAM</div>

          <div className="flex flex-wrap gap-4">
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms
            </Link>
            <Link to="/help" className="hover:underline">
              Help
            </Link>
          </div>

          <div>© 2024 CINESTREAM</div>
        </div>
      </footer>

    </div>
  );
};

export default LoginPage