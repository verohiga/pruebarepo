import React from 'react';

/** @module Card */

export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Visual variant. `accent` = 1.5px lime border (one per view max). `dark` = dark-mode surface. */
  variant?: 'default' | 'accent' | 'dark';
  /** Internal padding. `compact` = 14px/16px for dense layouts. */
  padding?: 'default' | 'compact';
  /** Extra inline styles */
  style?: React.CSSProperties;
}
