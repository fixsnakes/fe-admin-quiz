import React from 'react';
import { useNavigate } from 'react-router-dom';

function ChartCard({ title, children, height = 280, actionTo, actionAriaLabel = 'Xem chi tiết' }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {actionTo ? (
          <button
            type="button"
            onClick={() => navigate(actionTo)}
            aria-label={actionAriaLabel}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M10.22 3.22a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06L15.94 10 10.22 4.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h11.69a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </button>
        ) : null}
      </div>
      <div className="w-full" style={{ height }}>
        {children ? (
          <div className="h-full w-full p-4 overflow-hidden">
            {children}
          </div>
        ) : (
          <div className="grid h-full w-full place-items-center rounded-lg bg-gray-50 text-gray-400">
            <div className="text-sm">Chart placeholder</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChartCard;


