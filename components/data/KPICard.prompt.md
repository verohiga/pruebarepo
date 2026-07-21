Marketing KPI metric card with eyebrow label, large tabular number, delta indicator and sparkline trend.

```jsx
// Standard 4-column KPI row
<div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}}>
  <KPICard label="Inversión"    prefix="€" value="1.28M" delta={12.4}  data={trend1} />
  <KPICard label="Conversiones"            value="2,184" delta={8.1}   data={trend2} accent />
  <KPICard label="ROAS medio"  suffix="×"  value="4.82"  delta={4.0}   data={trend3} />
  <KPICard label="CPL"          prefix="€" value="8.20"  delta={-3.1}  data={trend4} invert />
</div>

// Compact for sidebar / secondary grids
<KPICard label="CTR" suffix="%" value="2.4" delta={0.3} data={ctrData} compact />
```

Rules:
- Use `accent` on the **primary hero metric** — one per view, max.
- `invert` for cost metrics (CPL, CPC, CPA) where a negative delta is good.
- `value` should be pre-formatted: `"€1.28M"`, `"4.82×"`, `"2,184"`.
- `data` array drives the sparkline; omit to hide it.
- Requires Iconify web component loaded in page for `Delta` arrows.
