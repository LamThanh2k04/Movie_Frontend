import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Globe,
  Users,
  Star,
  Film,
  LayoutDashboard,
  CircleUserRound,
  LogOut,
  ChevronUp,
  ChevronDown,
  Clapperboard,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(logout());

    navigate("/login");
  };

  
  const menuClass = ({ isActive }) =>
    `group flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium
    ${isActive
      ? "bg-red-500/10 text-red-500 font-semibold"
      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
    }`;

  return (
    <aside className="w-64 h-screen sticky top-0 bg-zinc-950 border-r border-zinc-900 flex flex-col">
   
      <div className="px-6 py-6 border-b border-zinc-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center shadow-md shadow-red-600/20">
            <Film className="text-white" size={20} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-wider text-zinc-100">
              MOVIE
            </h1>
            <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-tight">
              Admin Dashboard
            </p>
          </div>
        </div>
      </div>

      
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        <NavLink to="/admin" end className={menuClass}>
          {({ isActive }) => (
            <>
              <LayoutDashboard size={18} className={isActive ? "text-red-500" : "text-zinc-400 group-hover:text-zinc-100"} />
              <span className="flex-1">Tổng quan</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
              )}
            </>
          )}
        </NavLink>

        <NavLink to="/admin/users" className={menuClass}>
          {({ isActive }) => (
            <>
              <Users size={18} className={isActive ? "text-red-500" : "text-zinc-400 group-hover:text-zinc-100"} />
              <span className="flex-1">Người dùng</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
              )}
            </>
          )}
        </NavLink>

        <NavLink to="/admin/movies" className={menuClass}>
          {({ isActive }) => (
            <>
              <Film size={18} className={isActive ? "text-red-500" : "text-zinc-400 group-hover:text-zinc-100"} />
              <span className="flex-1">Phim</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
              )}
            </>
          )}
        </NavLink>

        <NavLink to="/admin/actors" className={menuClass}>
          {({ isActive }) => (
            <>
              <Star size={18} className={isActive ? "text-red-500" : "text-zinc-400 group-hover:text-zinc-100"} />
              <span className="flex-1">Diễn viên</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
              )}
            </>
          )}
        </NavLink>

        <NavLink to="/admin/countries" className={menuClass}>
          {({ isActive }) => (
            <>
              <Globe size={18} className={isActive ? "text-red-500" : "text-zinc-400 group-hover:text-zinc-100"} />
              <span className="flex-1">Quốc gia</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
              )}
            </>
          )}
        </NavLink>
        <NavLink to="/admin/genres" className={menuClass}>
          {({ isActive }) => (
            <>
              <Clapperboard size={18} className={isActive ? "text-red-500" : "text-zinc-400 group-hover:text-zinc-100"} />
              <span className="flex-1">Thể loại</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
              )}
            </>
          )}
        </NavLink>
      </nav>

   
      <div className="border-t border-zinc-900 p-4">
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="bg-zinc-900/40 rounded-xl p-3 cursor-pointer hover:bg-zinc-900/80 transition-all border border-zinc-900"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 overflow-hidden">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover border border-red-500/30 shadow-sm"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <CircleUserRound className="text-zinc-400" size={20} />
                  </div>
                )}

                <div className="truncate">
                  <p className="text-sm text-zinc-200 font-medium truncate">
                    {user?.name || "Admin"}
                  </p>
                  <p className="text-[11px] text-zinc-500 font-medium">
                    {user?.role === "ADMIN" ? "Quản trị viên" : "Người dùng"}
                  </p>
                </div>
              </div>

              {open ? (
                <ChevronDown size={16} className="text-zinc-500 flex-shrink-0" />
              ) : (
                <ChevronUp size={16} className="text-zinc-500 flex-shrink-0" />
              )}
            </div>
          </div>


          {open && (
            <div className="absolute bottom-20 left-0 w-full bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-150">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-colors font-medium"
              >
                <LogOut size={16} />
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