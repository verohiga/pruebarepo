import React from 'react';

/**
 * Button — primary CTA, ghost secondary, or dark variant.
 * Uses CSS custom properties from tokens/colors_and_type.css.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  onClick,
  type = 'button',
  style: extraStyle,
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: size === 'sm' ? '6px' : '8px',
    fontFamily: 'var(--font-ui)',
    fontSize: size === 'sm' ? '12px' : '13px',
    fontWeight: variant === 'ghost' ? 500 : 600,
    borderRadius: 'var(--r-lg)',
    padding: size === 'sm'
      ? (variant === 'ghost' ? '7px 11px' : '7px 12px')
      : (variant === 'ghost' ? '10px 14px' : '10px 16px'),
    border: variant === 'ghost' ? '1px solid var(--line)' : '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background var(--dur-fast) var(--ease), outline-color var(--dur-fast) var(--ease)',
    outline: '2px solid transparent',
    textDecoration: 'none',
    letterSpacing: variant === 'primary' ? '0.01em' : 0,
    WebkitFontSmoothing: variant === 'primary' ? 'auto' : 'antialiased',
  };

  const variants = {
    primary: { background: 'var(--accent)', color: 'var(--accent-ink)' },
    ghost:   { background: 'transparent', color: 'var(--fg1)' },
    dark:    { background: 'var(--fg1)', color: 'var(--bg)', border: '1px solid transparent' },
  };

  return (
    <button
      type={type}
      style={{ ...base, ...variants[variant], ...extraStyle }}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && icon}
      {children}
    </button>
  );
}
