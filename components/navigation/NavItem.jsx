import React from 'react';

/**
 * NavItem — sidebar navigation button with icon and label.
 * Active state uses lime accent background.
 */
export function NavItem({ icon, label, active = false, onClick }) {
  const style = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '11px 14px',
    borderRadius: 'var(--r-lg)',
    fontFamily: 'var(--font-ui)',
    fontSize: '13.5px',
    fontWeight: active ? 600 : 500,
    color: active ? 'var(--accent-ink)' : 'var(--fg1)',
    background: active ? 'var(--accent)' : 'transparent',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    transition: 'background var(--dur-fast) var(--ease)',
  };

  return (
    <button
      style={style}
      onClick={onClick}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--line-2)'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      {icon && (
        <span style={{ display: 'inline-flex', flexShrink: 0, color: active ? 'var(--accent-ink)' : 'var(--fg2)' }}>
          {icon}
        </span>
      )}
      {label}
    </button>
  );
}
