import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLayout from './layouts/AdminLayout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Users from './pages/admin/Users.jsx';
import Quizzes from './pages/admin/Quizzes.jsx';
import Questions from './pages/admin/Questions.jsx';
import Exams from './pages/admin/Exams.jsx';
import Results from './pages/admin/Results.jsx';
import Categories from './pages/admin/Categories.jsx';
import Reports from './pages/admin/Reports.jsx';
import Settings from './pages/admin/Settings.jsx';
import UsersMonthly from './pages/admin/analytics/UsersMonthly.jsx';
import VisitsDaily from './pages/admin/analytics/VisitsDaily.jsx';
import VisitsMonthly from './pages/admin/analytics/VisitsMonthly.jsx';
import UsersGrowth from './pages/admin/analytics/UsersGrowth.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route element={<AdminLayout />}> 
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/quizzes" element={<Quizzes />} />
          <Route path="/admin/questions" element={<Questions />} />
          <Route path="/admin/exams" element={<Exams />} />
          <Route path="/admin/results" element={<Results />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/analytics/users-monthly" element={<UsersMonthly />} />
          <Route path="/admin/analytics/visits-daily" element={<VisitsDaily />} />
          <Route path="/admin/analytics/visits-monthly" element={<VisitsMonthly />} />
          <Route path="/admin/analytics/users-growth" element={<UsersGrowth />} />
        </Route>
        <Route path="*" element={<div className="p-8 text-center text-gray-600">Không tìm thấy trang</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
