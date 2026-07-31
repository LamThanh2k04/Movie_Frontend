import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  CircleUserRound,
  ChevronDown,
  ChevronUp,
  LogOut,
  Heart,
  User,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import useAuth from "../hooks/useAuth";
import useSearch from "../hooks/useSearch";
import MovieSearch from "./admin/MovieSearch";

const Header = ({ search, setSearch }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/80 to-transparent backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide text-red-600 hover:scale-105 transition-transform"
          >
            CINESTREAM
          </Link>
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            <Link to = '/' className="text-white font-semibold relative group">
              Trang chủ
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-red-600 scale-x-100"></span>
            </Link>
            {["Phim", "Series", "Mới"].map((item, index) => (
              <Link
                key={index}
                to={`/${item.toLowerCase()}`}
                className="text-zinc-400 hover:text-white transition relative group"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            ))}
          </nav>
        </div>


        <div className="flex items-center gap-4">


          <div className="hidden lg:flex items-center bg-zinc-900/80 border border-zinc-700 rounded-full px-3 py-1 focus-within:border-red-600 transition">
            <Search size={16} className="text-zinc-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm phim..."
              className="bg-transparent outline-none text-sm px-2 text-white w-48 placeholder:text-zinc-500"
            />
          </div>


          {isAuthenticated && (
            <div className="relative p-2 rounded-full hover:bg-zinc-800 transition cursor-pointer">
              <Bell size={18} className="text-zinc-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </div>
          )}


          {!isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to={'/login'} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-semibold transition">
                Đăng nhập
              </Link>
            </div>
          ) : (
            <div className="relative">
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 cursor-pointer group"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border border-zinc-700 group-hover:border-red-600 transition"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center">
                    <CircleUserRound size={20} className="text-zinc-400" />
                  </div>
                )}

                <ChevronDown
                  size={16}
                  className={`text-zinc-400 transition-transform ${open ? "rotate-180" : ""
                    }`}
                />
              </div>


              {open && (
                <div className="absolute right-0 mt-3 w-60 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden animate-fadeIn">

                  <div className="px-4 py-3 border-b border-zinc-800">
                    <p className="text-white font-semibold">{user?.name}</p>
                    <p className="text-xs text-zinc-400">{user?.email}</p>
                  </div>

                  <div className="py-1">
                    <Link className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-zinc-800 text-zinc-300">
                      <User size={16} /> Hồ sơ
                    </Link>

                    {user?.role === "ADMIN" ? (
                      <Link className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-zinc-800 text-zinc-300">
                        <User size={16} /> Trang quản trị
                      </Link>
                    ) : (
                      <Link
                        to="/user/favoriteMovie"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-zinc-800 text-zinc-300"
                      >
                        <Heart size={16} />
                        Yêu thích
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-zinc-800"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-600/10"
                  >
                    <LogOut size={16} /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;