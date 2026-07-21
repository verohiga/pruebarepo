Sidebar navigation button with Iconoir icon. Active state fills with lime accent.

```jsx
// Standard nav list (controlled by parent state)
const [active, setActive] = React.useState('home');

<nav style={{display:'flex',flexDirection:'column',gap:2}}>
  <NavItem
    icon={<iconify-icon icon="iconoir:home-simple" width="18" height="18"/>}
    label="Resumen"
    active={active === 'home'}
    onClick={() => setActive('home')}
  />
  <NavItem
    icon={<iconify-icon icon="iconoir:megaphone" width="18" height="18"/>}
    label="Campañas"
    active={active === 'campaigns'}
    onClick={() => setActive('campaigns')}
  />
</nav>
```

Rules:
- Icon size: **18×18**, Iconoir stroke 1.5 (default).
- Active: `background: var(--accent)`, text `var(--accent-ink)`, `font-weight: 600`.
- Hover (inactive): `background: var(--line-2)`.
- Never bold inactive items.
- Requires Iconify web component loaded in page.
