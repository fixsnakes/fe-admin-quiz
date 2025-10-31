import React from 'react';

function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">{value}</div>
          {subtitle ? (
            <div className="mt-1 text-xs text-gray-400">{subtitle}</div>
          ) : null}
        </div>
        {icon ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-gray-600">
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default StatCard;


