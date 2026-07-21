White container with 1px Gray-300 border and e1 shadow. Use `variant="accent"` for exactly one highlighted card per view.

```jsx
// Standard card
<Card>
  <h3>Campañas activas</h3>
</Card>

// Highlighted (accent border) — one per view
<Card variant="accent">
  <KPICard label="Conversiones" value="2,184" delta={8.1} />
</Card>

// Compact padding for sidebar widgets
<Card padding="compact">
  <BarRow label="LinkedIn" value={48} max={100} />
</Card>

// Dark surface
<Card variant="dark">...</Card>
```

Rules:
- **Max radius 14px** (`--r-xl`) — hardcoded. Never go higher.
- Never two accent cards in the same view.
- Backgrounds are always pure white `#FFFFFF` — cards do NOT use background color for hierarchy.
