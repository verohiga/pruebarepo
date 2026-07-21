import React from 'react';

/** @module Badge */

export interface BadgeProps {
  /** Badge label text */
  children: React.ReactNode;
  /** Semantic color variant */
  variant?: 'accent' | 'pos' | 'neg' | 'paused' | 'test' | 'neutral' | 'dark';
  /** Show a leading dot */
  dot?: boolean;
}
