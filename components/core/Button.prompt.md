Primary action button for the Newno design system — use `variant="primary"` for the one CTA per view, `"ghost"` for secondary actions, `"dark"` for inverse/footer contexts.

```jsx
// Primary — one per header
<Button variant="primary" icon={<iconify-icon icon="iconoir:plus" width="14" height="14"/>}>
  Nueva campaña
</Button>

// Ghost secondary
<Button variant="ghost" icon={<iconify-icon icon="iconoir:download" width="14" height="14"/>}>
  Exportar
</Button>

// Small ghost (table, inline)
<Button variant="ghost" size="sm">Ver detalle</Button>

// Disabled
<Button variant="primary" disabled>Sin permisos</Button>
```

Notable rules:
- Only **one** primary button per page header section.
- Text on primary (lime) background is always `--accent-ink` (`#282A2D`), never white.
- Hover: background shifts to `--accent-strong` (`#B9D50D`) + lime glow outline.
- Icon size: 14×14 inline with `gap: 8px`.
