import React from 'react';

/** @module Input */

export interface InputProps {
  /** Controlled value */
  value?: string;
  /** Change handler — receives new string value */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** HTML input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
  /** Field label shown above input */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Validation error message shown below */
  error?: string;
  /** Leading icon node (Iconify web component) */
  icon?: React.ReactNode;
  /** Extra inline styles on the input element */
  style?: React.CSSProperties;
}
