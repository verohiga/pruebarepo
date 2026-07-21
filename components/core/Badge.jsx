import React from 'react';

/**
 * Badge (Pill) — compact status/tag label.
 * Variants map to semantic color roles in the Newno palette.
 */
export function Badge({
  children,
  variant = 'neutral',
  dot = false,
}) {
  const variantStyles = {
    accent:  { background: 'var(--accent-soft)',  color: 'var(--accent-deep)' },
    pos:     { background: 'var(--pos-soft)',     color: 'var(--pos-ink)' },
    neg:     { background: 'var(--neg-soft)',     color: 'var(--neg-ink)' },
    paused:  { background: 'var(--paused-bg)',    color: 'var(--paused-ink)' },
    test:    { background: 'var(--warn-bg)',      color: 'var(--warn-ink)' },
    neutral: { background: 'var(--line-2)',       color: '#4A4C4F' },
    dark:    { background: 'var(--fg1)',          color: 'var(--bg)' },
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '3px 8px',
    borderRadius: 'var(--r-sm)',
    fontSize: 'var(--fs-eyebrow)',
    fontWeight: 'var(--fw-semibold)',
    letterSpacing: '0.02em',
    fontFamily: 'var(--font-ui)',
    whiteSpace: 'nowrap',
  };

  const dotStyle = {
    width: '6px',
    height: '6px',
    borderRadius: '999px',
    background: 'currentColor',
    flexShrink: 0,
  };

  return (
    <span style={{ ...base, ...variantStyles[variant] }}>
      {dot && <span style={dotStyle} />}
      {children}
    </span>
  );
}
