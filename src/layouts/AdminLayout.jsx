import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="text-lg font-bold">Admin Quiz</div>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/admin" end className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/analytics/users-monthly" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}>
              Users Monthly
            </NavLink>
            <NavLink to="/admin/analytics/visits-daily" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}>
              Visits Daily
            </NavLink>
            <NavLink to="/admin/analytics/visits-monthly" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}>
              Visits Monthly
            </NavLink>
            <NavLink to="/admin/analytics/users-growth" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}>
              Users Growth
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="mt-10 border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-gray-500">© {new Date().getFullYear()} Admin Quiz</div>
      </footer>
    </div>
  );
}

export default AdminLayout;



