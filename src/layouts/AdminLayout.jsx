import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function NavItem({ to, end = false, label, icon }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
          isActive
            ? 'bg-white/15 text-white shadow-inner ring-1 ring-white/20'
            : 'text-indigo-50/90 hover:text-white hover:bg-white/10'
        }`
      }
    >
      {icon ? <span className="inline-flex h-4 w-4 items-center justify-center">{icon}</span> : null}
      <span>{label}</span>
    </NavLink>
  );
}

function AdminLayout() {
  const icons = {
    dashboard: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2.5 10a7.5 7.5 0 1 1 15 0v4.25A2.75 2.75 0 0 1 14.75 17h-9.5A2.75 2.75 0 0 1 2.5 14.25V10Z"/><path d="M7 11a3 3 0 1 0 6 0H7Z"/></svg>
    ),
    users: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 9a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm-7 7a7 7 0 1 1 14 0v1H3Z"/></svg>
    ),
    quizzes: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M4 3.5A1.5 1.5 0 0 1 5.5 2h9A1.5 1.5 0 0 1 16 3.5V14l-3-2-3 2-3-2-3 2V3.5Z"/></svg>
    ),
    questions: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 0 0-6 6h2a4 4 0 1 1 4 4v2h2v-2a6 6 0 0 0-2-12Z"/><circle cx="10" cy="16.5" r="1.5"/></svg>
    ),
    exams: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 0 0-2 2v10.5A1.5 1.5 0 0 0 4.5 17h9A2.5 2.5 0 0 0 16 14.5V6l-3-3H5Z"/></svg>
    ),
    results: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11h4v7H2v-7Zm6-4h4v11H8V7Zm6-5h4v16h-4V2Z"/></svg>
    ),
    categories: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M3 3h6v6H3V3Zm0 8h6v6H3v-6Zm8-8h6v6h-6V3Zm0 8h6v6h-6v-6Z"/></svg>
    ),
    bar: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M3 17V9h3v8H3Zm5 0V5h3v12H8Zm5 0V11h3v6h-3Z"/></svg>
    ),
    line: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M3 16 8 9l3 3 6-7v3l-6 7-3-3-5 7Z"/></svg>
    ),
    report: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M5 2h7l3 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/></svg>
    ),
    settings: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm8 4a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"/></svg>
    ),
  };
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex gap-6 px-6 py-6">
        <aside className="w-64 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-600 to-indigo-700 text-indigo-50 shadow-lg ring-1 ring-indigo-500/20">
          <div className="px-4 pb-3 pt-4 text-lg font-bold tracking-wide">Admin Quiz</div>
          <nav className="space-y-1 px-2 pb-4">
            <div className="px-2 text-[11px] uppercase tracking-wider text-indigo-200/80">Tổng quan</div>
            <NavItem to="/admin" end label="Dashboard" icon={icons.dashboard} />
            <div className="mx-2 my-3 h-px bg-white/10" />
            <div className="px-2 text-[11px] uppercase tracking-wider text-indigo-200/80">Quản lý nội dung</div>
            <NavItem to="/admin/users" label="Người dùng" icon={icons.users} />
            <NavItem to="/admin/quizzes" label="Bộ đề thi" icon={icons.quizzes} />
            <NavItem to="/admin/questions" label="Câu hỏi" icon={icons.questions} />
            <NavItem to="/admin/exams" label="Bài thi" icon={icons.exams} />
            <NavItem to="/admin/results" label="Kết quả" icon={icons.results} />
            <NavItem to="/admin/categories" label="Danh mục" icon={icons.categories} />
            <div className="mx-2 my-3 h-px bg-white/10" />
            <div className="px-2 text-[11px] uppercase tracking-wider text-indigo-200/80">Phân tích</div>
            <NavItem to="/admin/analytics/users-monthly" label="Người dùng theo tháng" icon={icons.line} />
            <NavItem to="/admin/analytics/visits-daily" label="Lượt truy cập theo ngày" icon={icons.bar} />
            <NavItem to="/admin/analytics/visits-monthly" label="Lượt truy cập theo tháng" icon={icons.bar} />
            <NavItem to="/admin/analytics/users-growth" label="Tăng trưởng người dùng" icon={icons.line} />
            <div className="mx-2 my-3 h-px bg-white/10" />
            <div className="px-2 text-[11px] uppercase tracking-wider text-indigo-200/80">Hệ thống</div>
            <NavItem to="/admin/reports" label="Báo cáo" icon={icons.report} />
            <NavItem to="/admin/settings" label="Cài đặt" icon={icons.settings} />
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="mb-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">Bảng điều khiển quản trị</div>
          </header>
          <main>
            <Outlet />
          </main>
          <footer className="mt-10 border-t border-gray-200 bg-white">
            <div className="px-4 py-6 text-xs text-gray-500">© {new Date().getFullYear()} Admin Quiz</div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;



