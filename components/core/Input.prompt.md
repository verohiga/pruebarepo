Text input following the Newno form token spec — 10px padding, radius 10, Gray-300 border, Inter 13px.

```jsx
// Basic
<Input
  label="Nombre de campaña"
  placeholder="Q3 · Lead-gen · Madrid"
  value={name}
  onChange={setName}
/>

// With icon (search)
<Input
  placeholder="Buscar campañas…"
  icon={<iconify-icon icon="iconoir:search" width="15" height="15"/>}
  value={query}
  onChange={setQuery}
/>

// Error state
<Input
  label="Presupuesto"
  value={budget}
  onChange={setBudget}
  error="Introduce un valor válido"
/>
```

Rules:
- Focus state → border shifts to `--fg2` (dark gray), no colored ring.
- Placeholder color is `--fg4`.
- Never use a colored border focus state (no lime ring on inputs).
