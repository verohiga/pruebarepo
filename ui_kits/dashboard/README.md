# Newno Dashboard UI Kit

Interactive recreation of Newno's marketing dashboard product. Built with React + Babel (no bundler), self-hosted fonts, and the canonical token set.

## Views

| View | Route key | Description |
|---|---|---|
| Resumen | `home` | KPI row + area chart + campaign table + channel donut + AI insight |
| Campañas | `campaigns` | Full campaigns table with search, filter, sort + stat strip |
| Insights | `insights` | AI-generated recommendations with severity + digest card |
| Canales | `channels` | Channel cards + ROAS comparison bar chart + donut |
| Audiencias | `audiences` | Audience segments table + demographics (age/device/geo) |
| Ajustes | `settings` | Tabs: Cuenta · Integraciones · Miembros · Notificaciones |

## Files

| File | Role |
|---|---|
| `index.html` | Entry point — loads all JSX in order |
| `Sidebar.jsx` | Left nav (Icon, ICONS, Sidebar) |
| `Header.jsx` | PageHeader, KPI card, Delta, Sparkline |
| `Table.jsx` | CampaignTable, ChannelDot, StatusPill, CHANNEL_COLORS |
| `Charts.jsx` | AreaChart, ChannelDonut, AIInsight |
| `Data.jsx` | Sample data (CAMPAIGNS_FULL, CHANNELS_FULL, INSIGHTS, AUDIENCES, DEMOGRAPHICS, MEMBERS) |
| `Primitives.jsx` | MiniSpark, BarRow, CardHead, SearchInput, FilterChips, Segmented, Toggle, StatStrip, Avatar |
| `Campaigns.jsx` | CampaignsView |
| `Insights.jsx` | InsightsView |
| `Channels.jsx` | ChannelsView |
| `Audiences.jsx` | AudiencesView |
| `Settings.jsx` | SettingsView |
| `App.jsx` | Root App component + NewCampaignModal + Toast |

## Usage

Open `index.html` directly in a browser or dev server. No build step required.

To add a new screen: create a `<Name>View.jsx`, add it to App.jsx's PAGES map, add a nav item to Sidebar.jsx's items array, and add the script tag to index.html.
