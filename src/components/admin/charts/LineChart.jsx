import React from 'react';

function LineChart({ data = [], width = 600, height = 260, stroke = '#2563eb', area = true }) {
  const padding = { top: 10, right: 10, bottom: 24, left: 36 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const xs = data.map((d) => d.x);
  const ys = data.map((d) => d.y);
  const xMax = xs.length > 1 ? xs.length - 1 : 1;
  const yMin = 0;
  const yMax = Math.max(1, ...ys);

  const xScale = (i) => (i / xMax) * innerW;
  const yScale = (v) => innerH - (v - yMin) / (yMax - yMin) * innerH;

  const points = data.map((d, i) => `${xScale(i)},${yScale(d.y)}`).join(' ');

  const tickCount = 4;
  const yTicks = Array.from({ length: tickCount + 1 }, (_, i) => Math.round((yMax / tickCount) * i));

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Line chart" preserveAspectRatio="none">
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

        {area && points && (
          <polygon
            points={`0,${innerH} ${points} ${innerW},${innerH}`}
            fill="#93c5fd"
            opacity="0.3"
          />
        )}

        <polyline points={points} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {data.map((d, i) => (
          <circle key={i} cx={xScale(i)} cy={yScale(d.y)} r={3} fill={stroke} />
        ))}

        {data.map((d, i) => (
          <text key={`x-${i}`} x={xScale(i)} y={innerH + 14} textAnchor="middle" fill="#9ca3af" fontSize="10">
            {d.label || d.x}
          </text>
        ))}
      </g>
    </svg>
  );
}

export default LineChart;


