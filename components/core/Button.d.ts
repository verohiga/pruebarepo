import React from 'react';
import { createElement } from 'react';

/** @module Button */

/**
 * @startingPoint section="Components" subtitle="Primary · ghost · dark button" viewport="700x100"
 */
export interface ButtonProps {
  /** Content inside the button */
  children: React.ReactNode;
  /** Visual style */
  variant?: 'primary' | 'ghost' | 'dark';
  /** Size variant */
  size?: 'sm' | 'md';
  /** Optional icon node (Iconify web component or SVG) placed before children */
  icon?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
  /** Extra inline styles */
  style?: React.CSSProperties;
}
