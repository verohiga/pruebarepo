import React from 'react';

/**
 * Sparkline — minimal SVG line chart with optional gradient fill.
 */
export function Sparkline({
  data,
  color = 'var(--accent)',
  width = 220,
  height = 28,
  fill = true,
  strokeWidth = 2,
}) {
  if (!data || data.length < 2) return null;
  const w = width;
  const h = height;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) =>
    `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`
  );
  const linePath = 'M' + pts.join(' L');
  const id = 'spark-' + Math.abs(data[0] * 1000 | 0) + '-' + data.length;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      width="100%"
      height={h}
      style={{ display: 'block', overflow: 'visible' }}
    >
      {fill && (
        <defs>
          <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity="0.30" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {fill && (
        <path
          d={`${linePath} L${w},${h} L0,${h} Z`}
          fill={`url(#${id})`}
        />
      )}
      <path
        d={linePath}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
