import React from 'react';

function UsersMonthly() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900">Người dùng theo tháng</h1>
      <p className="mt-1 text-sm text-gray-500">Thông tin chi tiết: tổng người dùng, so sánh tháng trước, và xu hướng các tháng.</p>
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-gray-600">
        Đây là trang chi tiết. Bạn có thể hiển thị bảng số liệu, so sánh theo tháng, phân tích tăng trưởng, v.v.
      </div>
    </div>
  );
}

export default UsersMonthly;


