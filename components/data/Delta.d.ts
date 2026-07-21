import React from 'react';

/** @module Delta */

export interface DeltaProps {
  /** Numeric percentage change (e.g. 12.4 for +12.4%) */
  value: number | null;
  /** When true, negative values are shown in green (e.g. CPL where lower is better) */
  invert?: boolean;
}
