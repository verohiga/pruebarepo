import React from 'react';

/**
 * Delta — positive/negative percentage change indicator.
 * Arrow icon via Iconify iconoir web component.
 */
export function Delta({ value, invert = false }) {
  if (value === null || value === undefined) return null;
  const good = invert ? value < 0 : value > 0;
  const color = good ? '#047857' : '#BE123C';
  const icon = value > 0 ? 'iconoir:arrow-up' : 'iconoir:arrow-down';

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '3px',
      fontSize: '12px',
      fontWeight: 600,
      color,
      fontVariantNumeric: 'tabular-nums',
      fontFamily: 'var(--font-ui)',
      whiteSpace: 'nowrap',
    }}>
      <iconify-icon icon={icon} width="10" height="10" />
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}
