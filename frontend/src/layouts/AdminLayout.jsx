// src/layouts/AdminLayout.jsx
import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => (isActive ? "text-blue-400" : "")}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/user"
            className={({ isActive }) => (isActive ? "text-blue-400" : "")}
          >
            Users
          </NavLink>
          <NavLink
            to="/admin/product"
            className={({ isActive }) => (isActive ? "text-blue-400" : "")}
          >
            Products
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
