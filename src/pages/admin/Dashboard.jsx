import React from 'react';
import StatCard from '../../components/admin/StatCard';
import ChartCard from '../../components/admin/ChartCard';
import LineChart from '../../components/admin/charts/LineChart';
import BarChart from '../../components/admin/charts/BarChart';

function AdminDashboard() {
  const usersByMonth = [
    { x: 1, y: 320, label: 'T1' },
    { x: 2, y: 410, label: 'T2' },
    { x: 3, y: 520, label: 'T3' },
    { x: 4, y: 670, label: 'T4' },
    { x: 5, y: 760, label: 'T5' },
    { x: 6, y: 900, label: 'T6' },
    { x: 7, y: 980, label: 'T7' },
    { x: 8, y: 1050, label: 'T8' },
    { x: 9, y: 1180, label: 'T9' },
    { x: 10, y: 1240, label: 'T10' },
    { x: 11, y: 1310, label: 'T11' },
    { x: 12, y: 1450, label: 'T12' }
  ];

  const visitsByDay = Array.from({ length: 7 }, (_, i) => ({
    x: i + 1,
    y: [180, 220, 160, 300, 280, 340, 260][i],
    label: ['T2','T3','T4','T5','T6','T7','CN'][i]
  }));

  const visitsByMonth = [
    { x: 1, y: 1200, label: 'T1' },
    { x: 2, y: 1500, label: 'T2' },
    { x: 3, y: 1800, label: 'T3' },
    { x: 4, y: 2100, label: 'T4' },
    { x: 5, y: 2400, label: 'T5' },
    { x: 6, y: 2300, label: 'T6' },
    { x: 7, y: 2600, label: 'T7' },
    { x: 8, y: 2900, label: 'T8' },
    { x: 9, y: 3000, label: 'T9' },
    { x: 10, y: 3200, label: 'T10' },
    { x: 11, y: 3400, label: 'T11' },
    { x: 12, y: 3600, label: 'T12' }
  ];

  const userGrowthByMonth = [
    { x: 1, y: 80, label: 'T1' },
    { x: 2, y: 95, label: 'T2' },
    { x: 3, y: 110, label: 'T3' },
    { x: 4, y: 140, label: 'T4' },
    { x: 5, y: 120, label: 'T5' },
    { x: 6, y: 160, label: 'T6' },
    { x: 7, y: 170, label: 'T7' },
    { x: 8, y: 150, label: 'T8' },
    { x: 9, y: 200, label: 'T9' },
    { x: 10, y: 210, label: 'T10' },
    { x: 11, y: 190, label: 'T11' },
    { x: 12, y: 230, label: 'T12' }
  ];
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Tổng quan hệ thống và các thống kê chính.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Lượt truy cập hôm nay" value="1,284" subtitle="So với hôm qua +5.3%" />
        <StatCard title="Lượt truy cập tháng này" value="38,920" subtitle="So với tháng trước +12.1%" />
        <StatCard title="Tổng tài khoản" value="12,457" subtitle="Hoạt động 24h qua: 1,102" />
        <StatCard title="Tổng đề thi được tạo" value="3,764" subtitle="7 ngày gần đây: 214" />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          <ChartCard title="Biểu đồ người dùng theo tháng" height={340} actionTo="/admin/analytics/users-monthly">
            <LineChart data={usersByMonth} />
          </ChartCard>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <ChartCard title="Lượt truy cập theo ngày" height={340} actionTo="/admin/analytics/visits-daily">
            <BarChart data={visitsByDay} gap={18} />
          </ChartCard>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-6">
          <ChartCard title="Lượt truy cập theo tháng" height={320} actionTo="/admin/analytics/visits-monthly">
            <BarChart data={visitsByMonth} />
          </ChartCard>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <ChartCard title="Tăng trưởng người dùng theo tháng" height={320} actionTo="/admin/analytics/users-growth">
            <LineChart data={userGrowthByMonth} stroke="#f59e0b" />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;


