import React from 'react';

/**
 * Card — white container with border + e1 shadow. Variants: default, accent (highlighted), dark.
 */
export function Card({
  children,
  variant = 'default',
  padding = 'default',
  style: extraStyle,
}) {
  const padValue = padding === 'compact' ? '14px 16px' : '20px';

  const base = {
    background: variant === 'dark' ? 'var(--dark-card)' : 'var(--card)',
    borderRadius: 'var(--r-xl)',
    padding: padValue,
    boxShadow: variant === 'dark' ? 'none' : 'var(--shadow-e1)',
  };

  const borders = {
    default: { border: '1px solid var(--line)' },
    accent:  { border: '1.5px solid var(--accent)' },
    dark:    { border: '1px solid var(--dark-line)' },
  };

  return (
    <div style={{ ...base, ...borders[variant], ...extraStyle }}>
      {children}
    </div>
  );
}
