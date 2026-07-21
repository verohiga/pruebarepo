import React from 'react';

/** @module KPICard */

export interface KPICardProps {
  /** KPI label (uppercase eyebrow) */
  label: string;
  /** Formatted value string (e.g. "€1.28M", "4.82×", "2,184") */
  value: string;
  /** Percentage delta for period comparison */
  delta?: number | null;
  /** Sparkline data points */
  data?: number[];
  /** Highlight with lime border (one per view) */
  accent?: boolean;
  /** Invert delta color (for cost metrics where lower is better) */
  invert?: boolean;
  /** Prefix before value (e.g. "€") */
  prefix?: string;
  /** Suffix after value (e.g. "×") */
  suffix?: string;
  /** Compact layout for denser grids */
  compact?: boolean;
}
