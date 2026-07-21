import React from 'react';

/** @module NavItem */

export interface NavItemProps {
  /** Iconify web component or SVG element (18×18) */
  icon?: React.ReactNode;
  /** Navigation label */
  label: string;
  /** Active/selected state — renders with lime background */
  active?: boolean;
  /** Click handler */
  onClick?: () => void;
}
