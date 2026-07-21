import React from 'react';

/** @module Sparkline */

export interface SparklineProps {
  /** Array of numeric data points (min 2) */
  data: number[];
  /** Stroke + fill color (CSS value or custom property) */
  color?: string;
  /** SVG viewBox width in px */
  width?: number;
  /** Chart height in px */
  height?: number;
  /** Whether to render the gradient fill area */
  fill?: boolean;
  /** Stroke width in px */
  strokeWidth?: number;
}
