import { NavLink } from "react-router-dom";
import { Camera, Bookmark, ChefHat, LogOut, User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-800">
              Recipe Finder
            </span>
          </NavLink>

          <div className="flex items-center gap-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Camera size={20} />
              <span className="hidden sm:inline">Scan Ingredients</span>
            </NavLink>
            <NavLink
              to="/saved"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Bookmark size={20} />
              <span className="hidden sm:inline">Saved Recipes</span>
            </NavLink>

            {/* User menu */}
            <div className="ml-2 pl-2 border-l border-gray-200 flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                <User size={18} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg font-medium transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
