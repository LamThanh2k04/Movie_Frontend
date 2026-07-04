import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Globe,
  Users,
  Star,
  Film,
  LayoutDashboard,
  CircleUserRound,
  LogOut
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch(logout())
    navigate('/login')
  }
  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium
    ${isActive
      ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
      : "text-gray-300 hover:bg-zinc-800 hover:text-red-500"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col">


      <div className="px-6 py-8 border-b border-zinc-800">
        <h1 className="text-3xl font-extrabold text-red-600 tracking-wide">
          MOVIE
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Admin Dashboard
        </p>
      </div>


      <nav className="flex-1 p-4 space-y-2">

        <NavLink to="/admin" end className={menuClass}>
          <LayoutDashboard size={20} />
          <span>Tổng quan</span>
        </NavLink>

        <NavLink to="/admin/users" className={menuClass}>
          <Users size={20} />
          <span>Người dùng</span>
        </NavLink>

        <NavLink to="/admin/movies" className={menuClass}>
          <Film size={20} />
          <span>Phim</span>
        </NavLink>

        <NavLink to="/admin/actors" className={menuClass}>
          <Star size={20} />
          <span>Diễn viên</span>
        </NavLink>

        <NavLink to="/admin/countries" className={menuClass}>
          <Globe size={20} />
          <span>Quốc gia</span>
        </NavLink>

      </nav>
      <div className="border-t border-zinc-800 p-5">
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="bg-zinc-900 rounded-xl p-4 cursor-pointer hover:bg-zinc-800 transition"
          >

            <div className="flex items-center gap-3">

              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-red-500"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border-2 border-red-500">
                  <CircleUserRound
                    className="text-gray-300"
                    size={24}
                  />
                </div>
              )}

              <div>
                <p className="text-white font-semibold">
                  Xin chào, {user?.name}
                </p>

                <p className="text-gray-400 text-sm">
                  {user?.role === "ADMIN"
                    ? "Quản trị viên"
                    : ""}
                </p>
              </div>

            </div>

          </div>
          {open && (
            <div className="absolute bottom-20 left-0 w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl overflow-hidden">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-600 hover:text-white transition"
              >
                <LogOut size={18} />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;