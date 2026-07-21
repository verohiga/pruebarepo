import React from 'react';

/**
 * Input — text input with optional label, icon and error state.
 */
export function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  label,
  disabled = false,
  error,
  icon,
  style: extraStyle,
}) {
  const inputStyle = {
    fontFamily: 'var(--font-ui)',
    fontSize: 'var(--fs-body-s)',
    padding: icon ? '10px 12px 10px 36px' : '10px 12px',
    background: 'var(--card)',
    border: error ? '1px solid var(--neg)' : '1px solid var(--line)',
    borderRadius: 'var(--r-lg)',
    color: 'var(--fg1)',
    outline: 'none',
    transition: 'border-color var(--dur-fast) var(--ease)',
    width: '100%',
    boxSizing: 'border-box',
    opacity: disabled ? 0.6 : 1,
  };

  const wrapStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%',
  };

  const labelStyle = {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--fg3)',
    fontFamily: 'var(--font-ui)',
  };

  const iconWrapStyle = {
    position: 'relative',
    width: '100%',
  };

  const iconStyle = {
    position: 'absolute',
    left: '11px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--fg4)',
    pointerEvents: 'none',
    display: 'inline-flex',
  };

  return (
    <div style={wrapStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={iconWrapStyle}>
        {icon && <span style={iconStyle}>{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          style={{ ...inputStyle, ...extraStyle }}
        />
      </div>
      {error && (
        <span style={{ fontSize: '11px', color: 'var(--neg-ink)', fontFamily: 'var(--font-ui)' }}>
          {error}
        </span>
      )}
    </div>
  );
}
