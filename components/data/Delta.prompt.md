Positive/negative percentage change with directional arrow. Used in KPI card headers and table rows.

```jsx
// Positive delta (green arrow up)
<Delta value={12.4} />     // +12.4% ↑ green

// Negative delta (red arrow down)
<Delta value={-3.1} />     // −3.1% ↓ red

// Inverted metric (CPL: lower is better)
<Delta value={-3.1} invert />  // −3.1% ↓ green

// No change / null
<Delta value={null} />     // renders nothing
```

Rules:
- Positive: `#047857` (green ink), arrow-up.
- Negative: `#BE123C` (red ink), arrow-down.
- `invert=true` flips color logic for cost metrics (CPL, CPA, CPC).
- Always `tabular-nums`, 1 decimal place.
- Icon via Iconify web component (`iconoir:arrow-up` / `iconoir:arrow-down`), 10×10.
