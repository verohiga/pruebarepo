import React from 'react';
import { Sparkline } from './Sparkline.jsx';
import { Delta } from './Delta.jsx';

/**
 * KPICard — metric card with eyebrow label, large number, delta and sparkline.
 * Pass `accent` for the one highlighted card per view (1.5px lime border).
 */
export function KPICard({
  label,
  value,
  delta,
  data,
  accent = false,
  invert = false,
  prefix = '',
  suffix = '',
  compact = false,
}) {
  const cardStyle = {
    background: 'var(--card)',
    border: accent ? '1.5px solid var(--accent)' : '1px solid var(--line)',
    borderRadius: 'var(--r-xl)',
    padding: compact ? '14px 16px' : '18px 20px',
    boxShadow: 'var(--shadow-e1)',
    display: 'flex',
    flexDirection: 'column',
  };

  const eyebrowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: compact ? '6px' : '10px',
  };

  const labelStyle = {
    fontSize: 'var(--fs-eyebrow)',
    fontWeight: 'var(--fw-semibold)',
    letterSpacing: 'var(--tr-eyebrow)',
    textTransform: 'uppercase',
    color: 'var(--fg4)',
    fontFamily: 'var(--font-ui)',
  };

  const valueStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: compact ? '26px' : '30px',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    color: 'var(--fg1)',
    fontVariantNumeric: 'tabular-nums',
    lineHeight: 1,
  };

  return (
    <div style={cardStyle}>
      <div style={eyebrowStyle}>
        <span style={labelStyle}>{label}</span>
        {delta !== undefined && delta !== null && (
          <Delta value={delta} invert={invert} />
        )}
      </div>
      <div style={valueStyle}>{prefix}{value}{suffix}</div>
      {data && data.length >= 2 && (
        <div style={{ marginTop: compact ? '8px' : '10px' }}>
          <Sparkline data={data} height={compact ? 22 : 28} />
        </div>
      )}
    </div>
  );
}
