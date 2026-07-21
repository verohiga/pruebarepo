Minimal SVG sparkline with optional gradient fill. Used inside KPI cards and table rows.

```jsx
// Default (lime accent, with fill)
<Sparkline data={[820, 880, 760, 940, 1080, 1240]} />

// Comparison line (gray, no fill)
<Sparkline
  data={[780, 820, 800, 860, 940, 1020]}
  color="var(--fg2)"
  fill={false}
/>

// Compact inline (height 20)
<Sparkline data={trend} height={20} strokeWidth={1.5} />
```

Rules:
- Default color is `var(--accent)` (lime `#C5E818`), stroke 2px.
- Comparison series: `var(--fg2)` (`#4A4C4F`), `fill={false}`, `strokeDasharray="4 4"` (apply via CSS if needed).
- Min data points: 2. Renders nothing if fewer.
- `width` is the SVG viewBox width; the element scales to 100% of its container via `preserveAspectRatio="none"`.
