import React from 'react';

function BarChart({ data = [], width = 600, height = 260, color = '#10b981', gap = 12, minBarWidth = 8 }) {
  const padding = { top: 10, right: 10, bottom: 24, left: 36 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const maxY = Math.max(1, ...data.map((d) => d.y));
  const barGap = gap;
  const barW = Math.max(minBarWidth, (innerW - barGap * (data.length - 1)) / data.length);

  const yScale = (v) => innerH - (v / maxY) * innerH;

  const tickCount = 4;
  const yTicks = Array.from({ length: tickCount + 1 }, (_, i) => Math.round((maxY / tickCount) * i));

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Bar chart" preserveAspectRatio="none">
      <g transform={`translate(${padding.left},${padding.top})`}>
        <line x1={0} y1={innerH} x2={innerW} y2={innerH} stroke="#e5e7eb" />
        <line x1={0} y1={0} x2={0} y2={innerH} stroke="#e5e7eb" />

        {yTicks.map((t, i) => (
          <g key={i}>
            <line x1={0} y1={yScale(t)} x2={innerW} y2={yScale(t)} stroke="#f3f4f6" />
            <text x={-8} y={yScale(t)} textAnchor="end" dominantBaseline="middle" fill="#9ca3af" fontSize="10">
              {t}
            </text>
          </g>
        ))}

        {data.map((d, i) => {
          const x = i * (barW + barGap);
          const y = yScale(d.y);
          const h = innerH - y;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={h} fill={color} rx={4} />
              <text x={x + barW / 2} y={innerH + 14} textAnchor="middle" fill="#9ca3af" fontSize="10">
                {d.label || d.x}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export default BarChart;


