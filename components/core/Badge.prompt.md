Compact status pill for campaign states, deltas, and tags. Maps directly to Newno semantic colors.

```jsx
// Campaign statuses
<Badge variant="accent" dot>Activo</Badge>
<Badge variant="paused">Pausado</Badge>
<Badge variant="test">Test</Badge>
<Badge variant="neg">Eliminado</Badge>

// Positive change
<Badge variant="pos">+12.4%</Badge>

// Neutral tag
<Badge variant="neutral">LinkedIn</Badge>

// Dark inverse
<Badge variant="dark">Pro</Badge>
```

Variants:
- `accent` → lime soft (active, featured)
- `pos` → green soft (positive delta)
- `neg` → red soft (negative, error)
- `paused` → gray (inactive)
- `test` → amber (A/B experiment)
- `neutral` → light gray (tags, labels)
- `dark` → black pill (plan badge, inverse)
