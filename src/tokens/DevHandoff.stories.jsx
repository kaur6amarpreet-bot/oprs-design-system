import React, { useState } from 'react';

export default {
  title: 'Design Tokens/Developer Handoff',
  parameters: {
    layout: 'fullscreen',
    docs:     { page: null },
    controls: { disable: true },
    a11y:     { disable: true },
  },
};

/* ─────────────────────────────────────────────────────────
   Download helper
───────────────────────────────────────────────────────── */
function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ─────────────────────────────────────────────────────────
   DownloadButton — pill with format label
───────────────────────────────────────────────────────── */
function DownloadBtn({ label, ext, content, componentName }) {
  const [flash, setFlash] = useState(false);
  const handle = () => {
    downloadFile(`${componentName.toLowerCase()}.${ext}`, content);
    setFlash(true);
    setTimeout(() => setFlash(false), 1500);
  };
  return (
    <button
      onClick={handle}
      title={`Download ${label}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '5px 11px',
        border: flash ? '1px solid #2E7D32' : '1px solid #C4C6D0',
        borderRadius: 999,
        background: flash ? '#E8F5E9' : '#fff',
        color: flash ? '#2E7D32' : '#44464F',
        fontSize: 12,
        fontWeight: 500,
        cursor: 'pointer',
        fontFamily: "'Roboto', sans-serif",
        transition: 'all .15s ease',
        whiteSpace: 'nowrap',
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 13 }}>
        {flash ? 'check' : 'download'}
      </span>
      {label}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────
   Component card — compact, no inline code
───────────────────────────────────────────────────────── */
function ComponentCard({ name, description, tokens = [], react, html, css }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 14,
      border: '1px solid #E2E8F3',
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1C1E', fontFamily: "'Roboto', sans-serif" }}>
          {name}
        </span>
        <span style={{
          fontSize: 10, background: '#E8F5E9', color: '#2E7D32',
          borderRadius: 999, padding: '2px 8px', fontWeight: 700,
          fontFamily: "'Roboto', sans-serif", letterSpacing: .4,
        }}>
          STABLE
        </span>
      </div>

      {/* Description */}
      {description && (
        <p style={{ margin: 0, fontSize: 13, color: '#44464F', lineHeight: 1.5, fontFamily: "'Roboto', sans-serif" }}>
          {description}
        </p>
      )}

      {/* Token chips */}
      {tokens.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {tokens.map(t => (
            <code key={t} style={{
              fontSize: 11, background: '#E8EDF7', color: '#1A56A0',
              borderRadius: 4, padding: '2px 6px',
              fontFamily: "'Roboto Mono', monospace",
            }}>
              {t}
            </code>
          ))}
        </div>
      )}

      {/* Divider */}
      <div style={{ borderTop: '1px solid #F1F4FB' }} />

      {/* Download buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {react && (
          <DownloadBtn label="React JSX" ext="jsx" content={react} componentName={name} />
        )}
        {html && (
          <DownloadBtn label="HTML" ext="html" content={html} componentName={name} />
        )}
        {css && (
          <DownloadBtn label="CSS Tokens" ext="css" content={css} componentName={name} />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Section header
───────────────────────────────────────────────────────── */
function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontSize: 11, fontWeight: 700, letterSpacing: 1.2,
      textTransform: 'uppercase', color: '#74777F',
      borderBottom: '1px solid #E2E8F3',
      paddingBottom: 8, marginBottom: 16, marginTop: 36,
      fontFamily: "'Roboto', sans-serif",
    }}>
      {children}
    </h2>
  );
}

/* ─────────────────────────────────────────────────────────
   COMPONENT DATA
───────────────────────────────────────────────────────── */
const SETUP_REACT = `// Install & import — add once at the root of your app

import 'oprs-design-system/tokens.css';
import 'oprs-design-system/components.css';

// Then import components as needed:
import { Button }   from 'oprs-design-system';
import { TextField } from 'oprs-design-system';
import { Select }    from 'oprs-design-system';

// Google Fonts (add to your index.html <head>):
// <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet">
// <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">
`;

const SETUP_CSS = `/* OPRS Design System — CSS token overrides
   Place in your root stylesheet to theme the whole product.
   All tokens are CSS custom properties defined in tokens.css */

:root {
  /* ── Brand colours ──────────────────────────────── */
  --color-primary:           #1A56A0;   /* Blue  — headers, links, focus rings */
  --color-on-primary:        #FFFFFF;
  --color-primary-container: #D6E4FF;
  --color-secondary:         #D84315;   /* Orange — primary CTA buttons        */
  --color-on-secondary:      #FFFFFF;
  --color-tertiary:          #2E7D32;   /* Green  — success, confirmed states   */
  --color-error:             #BA1A1A;   /* Red    — errors, cancelled           */

  /* ── Surfaces ───────────────────────────────────── */
  --color-surface:                   #FFFBFE;
  --color-surface-container-low:     #F7F2FA;
  --color-surface-container:         #F3EDF7;
  --color-surface-container-high:    #ECE6F0;
  --color-surface-container-highest: #E6E0E9;

  /* ── Typography ─────────────────────────────────── */
  --font-family-base:  'Roboto', sans-serif;
  --font-family-mono:  'Roboto Mono', monospace;

  /* ── Shape ──────────────────────────────────────── */
  --shape-corner-xs:  4px;
  --shape-corner-sm:  8px;
  --shape-corner-md:  12px;
  --shape-corner-lg:  16px;
  --shape-corner-xl:  28px;
  --shape-corner-full: 999px;
}
`;

const COMPONENTS = [
  {
    name: 'Button',
    description: 'Primary action (orange), secondary (outlined), tonal, text, icon, and FAB variants. One primary CTA per screen.',
    tokens: ['--color-secondary', '--color-on-secondary', '--color-primary'],
    react: `import { Button } from 'oprs-design-system';

// Primary CTA (orange)
<Button variant="filled-secondary" icon="search">
  Search Buses
</Button>

// Secondary / back
<Button variant="outlined" icon="arrow_back">Back</Button>

// Text link
<Button variant="text">View details</Button>

// Confirmation
<Button variant="filled-success" icon="check">Confirm Booking</Button>

// Icon button — always needs aria-label
<Button variant="icon" icon="swap_horiz" aria-label="Swap cities" />

// FAB
<Button variant="fab" icon="add" aria-label="Add passenger" />

// Small size (for table rows / filter bars)
<Button variant="filled-secondary" size="sm">Select</Button>

// Full width (mobile checkout bar)
<Button variant="filled-secondary" fullWidth>Proceed to Payment</Button>
`,
    html: `<!-- Primary CTA -->
<button class="btn btn-filled-secondary">
  <span class="material-symbols-outlined" aria-hidden="true">search</span>
  Search Buses
</button>

<!-- Secondary -->
<button class="btn btn-outlined">
  <span class="material-symbols-outlined" aria-hidden="true">arrow_back</span>
  Back
</button>

<!-- Text -->
<button class="btn btn-text">View details</button>

<!-- Confirmation -->
<button class="btn btn-filled-success">
  <span class="material-symbols-outlined" aria-hidden="true">check</span>
  Confirm Booking
</button>

<!-- Icon button — aria-label required -->
<button class="btn btn-icon" aria-label="Swap cities">
  <span class="material-symbols-outlined" aria-hidden="true">swap_horiz</span>
</button>

<!-- Full width -->
<button class="btn btn-filled-secondary btn-full-width">
  Proceed to Payment
</button>
`,
    css: `/* Button tokens — override in :root to retheme */
--color-secondary:          #D84315;   /* Primary CTA background (orange) */
--color-on-secondary:       #FFFFFF;   /* Primary CTA text */
--color-primary:            #1A56A0;   /* Outlined border / text */
--color-on-surface-variant: #44464F;   /* Text button */
--color-tertiary:           #2E7D32;   /* Success/confirm button */
--shape-corner-full:        999px;     /* Pill shape */
`,
  },
  {
    name: 'TextField',
    description: 'MD3 filled input for search, passenger details, OTP, and filters.',
    tokens: ['--color-surface-container-high', '--color-primary', '--color-on-surface'],
    react: `import { TextField } from 'oprs-design-system';

// Basic filled input
<TextField
  variant="filled"
  label="From"
  placeholder="Enter city"
  leadingIcon="location_on"
/>

// With error validation
<TextField
  variant="filled"
  label="Mobile Number"
  type="tel"
  state="error"
  errorText="Invalid mobile number"
/>

// Search style
<TextField
  variant="search"
  placeholder="Search buses..."
  leadingIcon="search"
/>

// Password with toggle
<TextField
  variant="filled"
  label="Password"
  type="password"
/>

// Read-only display
<TextField
  variant="filled"
  label="PNR"
  defaultValue="OPRS20240614"
  state="readonly"
/>
`,
    html: `<!-- MD3 filled input -->
<div class="field field-filled">
  <label class="field__label" for="field-from">From</label>
  <div class="field__control">
    <span class="material-symbols-outlined field__icon" aria-hidden="true">location_on</span>
    <input
      id="field-from"
      type="text"
      class="field__input"
      placeholder="Enter city"
      aria-describedby="field-from-helper"
    />
  </div>
  <div class="field__indicator" aria-hidden="true"></div>
</div>

<!-- Error state -->
<div class="field field-filled field--error">
  <label class="field__label" for="field-mobile">Mobile Number</label>
  <input id="field-mobile" type="tel" class="field__input"
    aria-invalid="true" aria-describedby="field-mobile-error" />
  <span id="field-mobile-error" class="field__helper field__helper--error" role="alert">
    Invalid mobile number
  </span>
</div>
`,
    css: `/* TextField tokens */
--color-surface-container-high: #ECE6F0;   /* Filled input background */
--color-primary:                #1A56A0;   /* Active indicator line + label */
--color-on-surface:             #1A1C1E;   /* Input text */
--color-on-surface-variant:     #44464F;   /* Placeholder / inactive label */
--color-error:                  #BA1A1A;   /* Error indicator + helper */
--color-outline:                #74777F;   /* Inactive indicator */
`,
  },
  {
    name: 'Select',
    description: 'Single-choice dropdown. Always filled variant in OPRS.',
    tokens: ['--color-surface-container-high', '--color-primary', '--color-outline'],
    react: `import { Select } from 'oprs-design-system';

// Basic
<Select
  variant="filled"
  label="Class Type"
  options={['AIRAVAT CLUB CLASS', 'RAJAHAMSA AC', 'NON AC SLEEPER']}
  onChange={(val) => setClassType(val)}
/>

// With leading icon
<Select
  variant="filled"
  label="Source City"
  leadingIcon="location_on"
  options={['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi']}
/>

// Searchable
<Select
  variant="filled"
  label="Destination"
  searchable
  options={cities}
  placeholder="Type to search..."
/>

// Clearable with default
<Select
  variant="filled"
  label="Filter"
  clearable
  defaultValue="AIRAVAT CLUB CLASS"
  options={classTypes}
/>
`,
    html: `<!-- Filled select trigger -->
<div class="ksrtc-select ksrtc-select--filled">
  <label class="ksrtc-select__label" id="select-class-label">Class Type</label>
  <button
    class="ksrtc-select__trigger"
    aria-haspopup="listbox"
    aria-expanded="false"
    aria-labelledby="select-class-label"
  >
    <span class="ksrtc-select__value">Select class</span>
    <span class="material-symbols-outlined ksrtc-select__chevron" aria-hidden="true">expand_more</span>
  </button>
</div>

<!-- Open panel -->
<ul class="ksrtc-select__panel" role="listbox" aria-labelledby="select-class-label">
  <li class="ksrtc-select__option" role="option" aria-selected="false">AIRAVAT CLUB CLASS</li>
  <li class="ksrtc-select__option" role="option" aria-selected="false">RAJAHAMSA AC</li>
  <li class="ksrtc-select__option" role="option" aria-selected="false">NON AC SLEEPER</li>
</ul>
`,
    css: `/* Select tokens */
--color-surface-container-high: #ECE6F0;   /* Dropdown background */
--color-primary:                #1A56A0;   /* Active indicator + selected highlight */
--color-outline:                #74777F;   /* Border / dividers */
--color-on-surface:             #1A1C1E;   /* Option text */
--color-surface-container-low:  #F7F2FA;   /* Hover state */
`,
  },
  {
    name: 'DatePicker',
    description: 'Calendar picker for journey date and return date selection.',
    tokens: ['--color-primary', '--color-surface-container-high', '--color-on-surface'],
    react: `import { DatePicker } from 'oprs-design-system';

// Basic
<DatePicker
  label="Journey Date"
  onChange={(date) => setJourneyDate(date)}
/>

// With min/max (60-day advance booking window)
const today   = new Date();
const maxDate = new Date();
maxDate.setDate(today.getDate() + 60);

<DatePicker
  label="Journey Date"
  minDate={today}
  maxDate={maxDate}
  onChange={(date) => setJourneyDate(date)}
/>

// Controlled return date
<DatePicker
  label="Return Date"
  value={returnDate}
  minDate={journeyDate}
  onChange={(date) => setReturnDate(date)}
/>
`,
    html: `<!-- DatePicker trigger (filled input style) -->
<div class="ksrtc-dp">
  <label class="ksrtc-dp__label" for="dp-journey">Journey Date</label>
  <button
    id="dp-journey"
    class="ksrtc-dp__trigger"
    aria-haspopup="dialog"
    aria-expanded="false"
    aria-label="Select journey date, currently 14 Jun 2026"
  >
    <span class="material-symbols-outlined ksrtc-dp__icon" aria-hidden="true">calendar_today</span>
    <span class="ksrtc-dp__value">14 Jun 2026</span>
    <span class="material-symbols-outlined ksrtc-dp__chevron" aria-hidden="true">expand_more</span>
  </button>
</div>
`,
    css: `/* DatePicker tokens */
--color-primary:                #1A56A0;   /* Selected date circle + header */
--color-on-primary:             #FFFFFF;   /* Selected date text */
--color-primary-container:      #D6E4FF;   /* Range highlight */
--color-surface-container-high: #ECE6F0;   /* Trigger background */
--color-on-surface:             #1A1C1E;   /* Day text */
--color-on-surface-variant:     #44464F;   /* Weekday labels */
--color-outline-variant:        #CAC4D0;   /* Disabled day text */
`,
  },
  {
    name: 'Chip',
    description: 'Filter chips for bus class, amenities, and timing filters.',
    tokens: ['--color-secondary-container', '--color-on-secondary-container', '--color-outline-variant'],
    react: `import { Chip } from 'oprs-design-system';

// Filter chip (toggleable)
const [selected, setSelected] = useState(false);

<Chip
  variant="filter"
  selected={selected}
  onClick={() => setSelected(s => !s)}
>
  AC
</Chip>

// Multiple filter group
const [filters, setFilters] = useState([]);
const toggle = (v) =>
  setFilters(f => f.includes(v) ? f.filter(x => x !== v) : [...f, v]);

{['AC', 'Non-AC', 'Sleeper', 'Seater'].map(label => (
  <Chip
    key={label}
    variant="filter"
    selected={filters.includes(label)}
    onClick={() => toggle(label)}
  >
    {label}
  </Chip>
))}

// Removable input chip
<Chip variant="input" onDelete={() => removeFilter('AC')}>AC</Chip>

// Assist chip with icon
<Chip variant="assist" icon="location_on">Bengaluru</Chip>
`,
    html: `<!-- Filter chip (unselected) -->
<button class="chip chip-filter" aria-pressed="false">AC</button>

<!-- Filter chip (selected) -->
<button class="chip chip-filter chip--selected" aria-pressed="true">
  <span class="material-symbols-outlined chip__check" aria-hidden="true">check</span>
  AC
</button>

<!-- Input chip with remove -->
<span class="chip chip-input" role="option" aria-selected="true">
  AC
  <button class="chip__delete" aria-label="Remove AC filter">
    <span class="material-symbols-outlined" aria-hidden="true">close</span>
  </button>
</span>

<!-- Assist chip -->
<button class="chip chip-assist">
  <span class="material-symbols-outlined" aria-hidden="true">location_on</span>
  Bengaluru
</button>
`,
    css: `/* Chip tokens */
--color-secondary-container:    #FFDBD1;   /* Selected chip background */
--color-on-secondary-container: #410002;   /* Selected chip text */
--color-outline-variant:        #CAC4D0;   /* Unselected chip border */
--color-on-surface-variant:     #44464F;   /* Unselected chip text */
--color-surface-container-low:  #F7F2FA;   /* Hover state */
--shape-corner-full:            999px;     /* Pill shape */
`,
  },
  {
    name: 'Card',
    description: 'Elevated, filled, and outlined surface containers for bus result and detail cards.',
    tokens: ['--color-surface', '--color-surface-container', '--elevation-level1'],
    react: `import { Card } from 'oprs-design-system';

// Elevated — bus result cards (default shadow)
<Card variant="elevated" onClick={() => selectBus(bus)}>
  <div className="bus-result">
    <h3>{bus.service}</h3>
    <span>{bus.departure} → {bus.arrival}</span>
    <strong>₹ {bus.fare}</strong>
  </div>
</Card>

// Outlined — information panels
<Card variant="outlined" style={{ padding: 20 }}>
  <p>Passenger details</p>
</Card>

// Filled — background sections
<Card variant="filled">
  <p>Journey summary</p>
</Card>
`,
    html: `<!-- Elevated card (bus result) -->
<div class="card card-elevated" tabindex="0" role="button"
     aria-label="Select AIRAVAT CLUB CLASS, departs 06:30">
  <!-- card content -->
</div>

<!-- Outlined card (info panel) -->
<div class="card card-outlined">
  <!-- card content -->
</div>

<!-- Filled card (background section) -->
<div class="card card-filled">
  <!-- card content -->
</div>
`,
    css: `/* Card tokens */
--color-surface:             #FFFBFE;   /* Elevated card background */
--color-surface-container:   #F3EDF7;   /* Filled card background */
--color-outline-variant:     #CAC4D0;   /* Outlined card border */
--elevation-level1: 0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15);
--elevation-level2: 0 1px 2px rgba(0,0,0,.3), 0 2px 6px 2px rgba(0,0,0,.15);
--shape-corner-md:  12px;
`,
  },
  {
    name: 'TopAppBar',
    description: 'Primary navigation bar. Always OPRS blue at the top of every screen.',
    tokens: ['--color-primary', '--color-on-primary'],
    react: `import { TopAppBar } from 'oprs-design-system';
import { Button } from 'oprs-design-system';

// Home screen
<TopAppBar
  title="OPRS"
  onLeadingClick={() => setDrawerOpen(true)}
  trailingItems={
    <Button
      variant="icon"
      icon="account_circle"
      aria-label="Profile"
      style={{ color: '#fff' }}
    />
  }
/>

// Inner page with back button
<TopAppBar
  title="Bengaluru → Mysuru"
  subtitle="Mon, 14 Jun · 1 Adult"
  leadingIcon="arrow_back"
  leadingLabel="Go back"
  onLeadingClick={() => router.back()}
  trailingItems={
    <span className="counter-chip">14 buses found</span>
  }
/>
`,
    html: `<header class="top-app-bar" role="banner">
  <!-- Leading: menu / back -->
  <button class="icon-btn icon-btn-on-primary" aria-label="Open navigation menu">
    <div class="brand-icon" aria-hidden="true">
      <span class="material-symbols-outlined">directions_bus</span>
    </div>
  </button>

  <!-- Title -->
  <div class="brand-text" aria-label="OPRS Online Passenger Reservation System">OPRS</div>

  <!-- Spacer -->
  <div class="spacer" aria-hidden="true"></div>

  <!-- Trailing actions -->
  <button class="icon-btn icon-btn-on-primary" aria-label="View profile">
    <span class="material-symbols-outlined">account_circle</span>
  </button>
</header>
`,
    css: `/* TopAppBar tokens */
--color-primary:     #1A56A0;   /* Bar background */
--color-on-primary:  #FFFFFF;   /* Title, icon color */
`,
  },
  {
    name: 'Tabs',
    description: 'One-Way / Return journey toggle and detail page section tabs.',
    tokens: ['--color-primary', '--color-surface-container-lowest', '--color-on-surface-variant'],
    react: `import { Tabs } from 'oprs-design-system';

const [activeTab, setActiveTab] = useState('oneway');

// Basic journey type tabs
<Tabs
  value={activeTab}
  onChange={setActiveTab}
  tabs={[
    { label: 'One-Way', value: 'oneway' },
    { label: 'Return',  value: 'return'  },
  ]}
/>

// With icons — bus detail page
<Tabs
  value={activeTab}
  onChange={setActiveTab}
  tabs={[
    { label: 'Details',      value: 'details', icon: 'info'                           },
    { label: 'Seat Map',     value: 'seats',   icon: 'airline_seat_recline_normal'    },
    { label: 'Cancellation', value: 'cancel',  icon: 'cancel'                         },
  ]}
/>
`,
    html: `<div class="ksrtc-tabs" role="tablist" aria-label="Journey type">
  <button
    class="ksrtc-tab ksrtc-tab--active"
    role="tab"
    id="tab-oneway"
    aria-selected="true"
    aria-controls="panel-oneway"
  >
    One-Way
    <span class="ksrtc-tab__indicator" aria-hidden="true"></span>
  </button>
  <button
    class="ksrtc-tab"
    role="tab"
    id="tab-return"
    aria-selected="false"
    aria-controls="panel-return"
    tabindex="-1"
  >
    Return
  </button>
</div>

<div id="panel-oneway" role="tabpanel" aria-labelledby="tab-oneway">
  <!-- One-Way content -->
</div>
<div id="panel-return" role="tabpanel" aria-labelledby="tab-return" hidden>
  <!-- Return content -->
</div>
`,
    css: `/* Tabs tokens */
--color-primary:                #1A56A0;   /* Active tab indicator */
--color-on-surface:             #1A1C1E;   /* Active tab text */
--color-on-surface-variant:     #44464F;   /* Inactive tab text */
--color-surface-container-lowest: #FFFBFE; /* Tab bar background */
`,
  },
  {
    name: 'Dialog',
    description: 'Confirmation modals — cancel booking, OTP verification, policy alerts.',
    tokens: ['--color-surface-container-high', '--color-on-surface', '--color-primary'],
    react: `import { Dialog } from 'oprs-design-system';

const [open, setOpen] = useState(false);

// Destructive confirmation
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  icon="cancel"
  title="Cancel booking?"
  confirmLabel="Yes, Cancel"
  cancelLabel="Keep booking"
  onConfirm={handleCancellation}
  destructive
>
  This action cannot be undone. Cancellation charges may apply
  as per OPRS refund policy.
</Dialog>

// Success / informational
<Dialog
  open={bookingSuccess}
  onClose={() => router.push('/home')}
  icon="check_circle"
  title="Booking confirmed!"
  confirmLabel="View Ticket"
  onConfirm={() => router.push('/tickets')}
>
  Ticket <strong>OPRS20240614</strong> sent to your mobile.
</Dialog>
`,
    html: `<!-- Scrim -->
<div class="ksrtc-dialog-scrim" aria-hidden="true"></div>

<!-- Dialog -->
<div
  class="ksrtc-dialog"
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-body"
>
  <span class="material-symbols-outlined ksrtc-dialog__icon" aria-hidden="true">cancel</span>
  <h2 id="dialog-title" class="ksrtc-dialog__title">Cancel booking?</h2>
  <p id="dialog-body" class="ksrtc-dialog__content">
    This action cannot be undone.
  </p>
  <div class="ksrtc-dialog__actions">
    <button class="btn btn-text">Keep booking</button>
    <button class="btn btn-filled-secondary">Yes, Cancel</button>
  </div>
</div>
`,
    css: `/* Dialog tokens */
--color-surface-container-high: #ECE6F0;   /* Dialog surface */
--color-on-surface:             #1A1C1E;   /* Title + body text */
--color-on-surface-variant:     #44464F;   /* Secondary text */
--color-primary:                #1A56A0;   /* Confirm button */
--color-error:                  #BA1A1A;   /* Destructive confirm */
--shape-corner-xl:              28px;      /* Dialog corner radius */
`,
  },
  {
    name: 'Snackbar',
    description: 'Toast notifications — success, error, warning, info variants.',
    tokens: ['--color-inverse-surface', '--color-inverse-on-surface'],
    react: `import { Snackbar } from 'oprs-design-system';

const [snack, setSnack] = useState(null);

// Trigger examples
const showSuccess = () => setSnack({ type: 'success', message: 'Booking confirmed!' });
const showError   = () => setSnack({ type: 'error',   message: 'Payment failed. Try again.' });
const showWarning = () => setSnack({ type: 'warning', message: 'Session expires in 2 minutes.' });

// Render
{snack && (
  <Snackbar
    type={snack.type}
    message={snack.message}
    duration={4000}
    actionLabel="Dismiss"
    onAction={() => setSnack(null)}
    onClose={() => setSnack(null)}
  />
)}

// Types: 'success' | 'error' | 'warning' | 'info' | 'default'
`,
    html: `<!-- Success (role="status" for non-urgent) -->
<div
  class="ksrtc-snackbar ksrtc-snackbar--success"
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  <span class="material-symbols-outlined" aria-hidden="true">check_circle</span>
  <span class="ksrtc-snackbar__message">Booking confirmed!</span>
  <button class="ksrtc-snackbar__action">Dismiss</button>
</div>

<!-- Error (role="alert" for urgent) -->
<div
  class="ksrtc-snackbar ksrtc-snackbar--error"
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
>
  <span class="material-symbols-outlined" aria-hidden="true">error</span>
  <span>Payment failed. Try again.</span>
</div>
`,
    css: `/* Snackbar tokens */
--color-inverse-surface:    #313033;   /* Snackbar background */
--color-inverse-on-surface: #F4EFF4;   /* Snackbar text */
--color-tertiary:           #2E7D32;   /* Success icon */
--color-error:              #BA1A1A;   /* Error icon */
`,
  },
  {
    name: 'SeatMap',
    description: 'Interactive sleeper bus berth selector with status legend.',
    tokens: ['--color-tertiary-container', '--color-tertiary', '--color-error-container'],
    react: `import { SeatMap } from 'oprs-design-system';

const [selectedSeats, setSelectedSeats] = useState([]);

<SeatMap
  upperBerths={upperBerthData}
  lowerBerths={lowerBerthData}
  maxSelectable={2}
  onSelectionChange={(seats) => setSelectedSeats(seats)}
/>

// Seat data shape:
// {
//   id: 14,
//   number: '14',
//   status: 'available' | 'selected' | 'ladies' | 'blocked' | 'conductor' | 'quota'
// }

// After selection, get seat numbers:
// selectedSeats → [{ id: 14, number: '14', status: 'selected' }]
`,
    html: `<div class="ksrtc-seat-map" role="group" aria-label="Bus seat map">
  <!-- Upper berths section -->
  <div class="ksrtc-berth-section">
    <div class="ksrtc-berth-label" aria-hidden="true">UPPER BERTHS</div>
    <div class="ksrtc-berth-grid" role="group" aria-label="Upper berths">
      <button
        class="ksrtc-seat ksrtc-seat--available"
        aria-pressed="false"
        aria-label="Seat 1, upper berth, available"
      >1</button>
      <button
        class="ksrtc-seat ksrtc-seat--ladies"
        aria-pressed="false"
        aria-label="Seat 2, upper berth, reserved for ladies"
        disabled
      >2</button>
    </div>
  </div>

  <!-- Legend -->
  <div class="ksrtc-seat-map__legend" aria-label="Seat status legend">
    <span class="ksrtc-seat ksrtc-seat--available" aria-hidden="true">A</span>
    <span>Available</span>
    <span class="ksrtc-seat ksrtc-seat--selected" aria-hidden="true">S</span>
    <span>Selected</span>
    <span class="ksrtc-seat ksrtc-seat--ladies" aria-hidden="true">L</span>
    <span>Ladies only</span>
  </div>
</div>
`,
    css: `/* SeatMap tokens */
--color-tertiary-container:    #C8E6C9;   /* Available seat */
--color-tertiary:              #2E7D32;   /* Selected seat background */
--color-on-tertiary:           #FFFFFF;   /* Selected seat number */
--color-error-container:       #FFDAD6;   /* Blocked / unavailable seat */
--color-secondary-container:   #FFE7D6;   /* Ladies-only seat */
`,
  },
  {
    name: 'NavigationDrawer',
    description: 'Slide-in side nav with accordion groups and user profile area.',
    tokens: ['--color-surface', '--color-primary', '--color-on-surface-variant'],
    react: `import { NavigationDrawer } from 'oprs-design-system';

const [open, setOpen] = useState(false);

<NavigationDrawer
  open={open}
  onClose={() => setOpen(false)}
  userLabel="Amarpreet Kaur"
  userSub="amarpreet@example.com"
  items={[
    {
      label: 'Ticket Booking',
      icon: 'confirmation_number',
      children: [
        { label: 'Book Ticket',   href: '/book',     active: true },
        { label: 'My Bookings',   href: '/bookings'               },
        { label: 'Cancel Ticket', href: '/cancel'                 },
      ],
    },
    {
      label: 'My Account',
      icon: 'account_circle',
      children: [
        { label: 'Profile',  href: '/profile'  },
        { label: 'Settings', href: '/settings' },
      ],
    },
  ]}
/>
`,
    html: `<!-- Backdrop -->
<div class="ksrtc-nav-backdrop" aria-hidden="true"></div>

<!-- Drawer -->
<nav
  class="ksrtc-nav-drawer"
  role="dialog"
  aria-modal="true"
  aria-label="Main navigation"
>
  <!-- Brand header -->
  <div class="ksrtc-nav-drawer__header">
    <div class="ksrtc-nav-drawer__brand">
      <span class="material-symbols-outlined" aria-hidden="true">directions_bus</span>
      <span>OPRS</span>
    </div>
    <button class="ksrtc-nav-drawer__close" aria-label="Close navigation">
      <span class="material-symbols-outlined" aria-hidden="true">close</span>
    </button>
  </div>

  <!-- Nav group -->
  <div class="ksrtc-nav-group">
    <button class="ksrtc-nav-group__header" aria-expanded="true">
      <span class="material-symbols-outlined" aria-hidden="true">confirmation_number</span>
      Ticket Booking
    </button>
    <ul class="ksrtc-nav-group__items" role="list">
      <li><a href="/book" class="ksrtc-nav-item ksrtc-nav-item--active"
             aria-current="page">Book Ticket</a></li>
      <li><a href="/bookings" class="ksrtc-nav-item">My Bookings</a></li>
    </ul>
  </div>
</nav>
`,
    css: `/* NavigationDrawer tokens */
--color-surface:               #FFFBFE;   /* Drawer background */
--color-primary:               #1A56A0;   /* Active item indicator */
--color-secondary-container:   #FFDBD1;   /* Active item background */
--color-on-secondary-container:#410002;   /* Active item text */
--color-on-surface-variant:    #44464F;   /* Inactive item text */
`,
  },
  {
    name: 'FareSummary',
    description: 'Booking fare breakdown — base, deductions, taxes, total.',
    tokens: ['--color-tertiary', '--color-on-surface-variant', '--color-surface-container'],
    react: `import { FareSummary } from 'oprs-design-system';

<FareSummary
  lines={[
    { label: 'Base fare (1 adult)',    amount: 899                    },
    { label: 'Promo Code (OPRS10)',    amount: -60,    type: 'deduction' },
    { label: 'Service tax (5%)',       amount: 41.95,  type: 'tax'       },
    { label: 'Total',                  amount: 880.95, type: 'subtotal'  },
  ]}
  balance={250}
  balanceLabel="Wallet balance"
/>

// Line types:
// (default)    — grey label row
// 'deduction'  — green text, negative amount shown as −₹
// 'tax'        — muted smaller text
// 'subtotal'   — bold, separator above
`,
    html: `<div class="ksrtc-fare-summary" role="region" aria-label="Fare breakdown">
  <div class="ksrtc-fare-row">
    <span class="ksrtc-fare-label">Base fare (1 adult)</span>
    <span class="ksrtc-fare-amount">₹ 899</span>
  </div>
  <div class="ksrtc-fare-row ksrtc-fare-row--deduction">
    <span class="ksrtc-fare-label">Promo Code (OPRS10)</span>
    <span class="ksrtc-fare-amount" aria-label="Minus 60 rupees">−₹ 60</span>
  </div>
  <div class="ksrtc-fare-row ksrtc-fare-row--tax">
    <span class="ksrtc-fare-label">Service tax (5%)</span>
    <span class="ksrtc-fare-amount">₹ 41.95</span>
  </div>
  <hr class="ksrtc-fare-divider" aria-hidden="true" />
  <div class="ksrtc-fare-row ksrtc-fare-row--subtotal">
    <span class="ksrtc-fare-label">Total</span>
    <span class="ksrtc-fare-amount">₹ 880.95</span>
  </div>
</div>
`,
    css: `/* FareSummary tokens */
--color-on-surface:         #1A1C1E;   /* Base row text */
--color-on-surface-variant: #44464F;   /* Tax row text */
--color-tertiary:           #2E7D32;   /* Deduction (savings) text */
--color-surface-container:  #F3EDF7;   /* Summary card background */
`,
  },
  {
    name: 'FilterDropdown',
    description: 'Multi-select dropdown for bus class and amenity filters.',
    tokens: ['--color-surface-container-low', '--color-outline-variant', '--color-secondary'],
    react: `import { FilterDropdown } from 'oprs-design-system';

const [classFilter, setClassFilter] = useState([]);

<FilterDropdown
  label="Class Type"
  options={[
    'AIRAVAT CLUB CLASS',
    'AIRAVAT GOLD CLASS',
    'RAJAHAMSA AC',
    'NON AC SLEEPER',
    'NON AC EXPRESS',
    'ORDINARY',
  ]}
  value={classFilter}
  onChange={setClassFilter}
  allLabel="All Classes"
/>

// When empty → shows "All" (no filter applied)
// When selected → shows count badge, e.g. "Class Type: 2"
`,
    html: `<!-- Trigger (inactive) -->
<button class="ksrtc-filter__btn" aria-haspopup="listbox" aria-expanded="false">
  <span class="material-symbols-outlined" aria-hidden="true">tune</span>
  Class Type
  <span class="material-symbols-outlined" aria-hidden="true">expand_more</span>
</button>

<!-- Trigger (2 selected) -->
<button class="ksrtc-filter__btn ksrtc-filter__btn--active"
  aria-haspopup="listbox" aria-expanded="true"
  aria-label="Class Type filter, 2 selected">
  <span class="material-symbols-outlined" aria-hidden="true">tune</span>
  Class Type
  <span class="ksrtc-filter__count" aria-hidden="true">2</span>
</button>

<!-- Panel -->
<ul class="ksrtc-filter__panel" role="listbox" aria-multiselectable="true"
  aria-label="Class Type options">
  <li class="ksrtc-filter__option ksrtc-filter__option--all"
    role="option" aria-selected="false">All Classes</li>
  <li class="ksrtc-filter__option ksrtc-filter__option--selected"
    role="option" aria-selected="true">AIRAVAT CLUB CLASS</li>
</ul>
`,
    css: `/* FilterDropdown tokens */
--color-surface-container-low:  #F7F2FA;   /* Panel background */
--color-outline-variant:        #CAC4D0;   /* Panel border */
--color-secondary:              #D84315;   /* Active trigger border */
--color-secondary-container:    #FFDBD1;   /* Selected option highlight */
`,
  },
  {
    name: 'TicketStub',
    description: 'Booking confirmation ticket card with route, seat, and fare details.',
    tokens: ['--color-tertiary-container', '--color-on-tertiary-container', '--color-error-container'],
    react: `import { TicketStub } from 'oprs-design-system';

<TicketStub
  booking={{
    ticketNumber: 'OPRS20240614',
    from:         'Bengaluru',
    to:           'Mysuru',
    departure:    '06:30',
    arrival:      '09:30',
    date:         '14 Jun 2026',
    service:      'AIRAVAT CLUB CLASS',
    seats:        ['14A', '14B'],
    fare:         '₹ 1,798',
    paxName:      'Amarpreet Kaur',
    status:       'confirmed', // 'confirmed' | 'pending' | 'cancelled'
  }}
/>
`,
    html: `<article class="ksrtc-ticket" aria-label="Booking confirmation OPRS20240614">
  <header class="ksrtc-ticket__header">
    <div class="ksrtc-ticket__brand">
      <span class="material-symbols-outlined" aria-hidden="true">directions_bus</span>
      <span>OPRS</span>
    </div>
    <span class="ksrtc-ticket__status ksrtc-ticket__status--confirmed">Confirmed</span>
  </header>

  <div class="ksrtc-ticket__route">
    <div class="ksrtc-ticket__city">
      <span class="ksrtc-ticket__city-name">Bengaluru</span>
      <time class="ksrtc-ticket__time">06:30</time>
    </div>
    <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
    <div class="ksrtc-ticket__city ksrtc-ticket__city--right">
      <span class="ksrtc-ticket__city-name">Mysuru</span>
      <time class="ksrtc-ticket__time">09:30</time>
    </div>
  </div>

  <footer class="ksrtc-ticket__stub">
    <code class="ksrtc-ticket__number">OPRS20240614</code>
    <strong class="ksrtc-ticket__fare">₹ 1,798</strong>
  </footer>
</article>
`,
    css: `/* TicketStub tokens */
--color-tertiary-container:    #C8E6C9;   /* Confirmed status background */
--color-on-tertiary-container: #1B3D1C;   /* Confirmed status text */
--color-error-container:       #FFDAD6;   /* Cancelled status background */
--color-secondary-container:   #FFE7D6;   /* Pending status background */
`,
  },
  {
    name: 'StatItem',
    description: 'Label/value pair for bus metadata and ticket detail rows.',
    tokens: ['--color-primary', '--color-secondary', '--color-on-surface'],
    react: `import { StatItem, StatGroup } from 'oprs-design-system';

// Single stat
<StatItem label="Seats Available" value="14" icon="event_seat" />

// Currency variant (highlights value in brand colour)
<StatItem label="Fare" value="₹ 899" variant="currency" />

// Grouped row (horizontal with dividers — bus result card)
<StatGroup>
  <StatItem label="Departure" value="06:30" />
  <StatItem label="Arrival"   value="09:30" />
  <StatItem label="Duration"  value="3h 00m" />
  <StatItem label="Seats"     value="22"     />
  <StatItem label="Fare"      value="₹ 899"  variant="currency" />
</StatGroup>
`,
    html: `<!-- Single stat item -->
<div class="ksrtc-stat-item">
  <span class="ksrtc-stat-item__label">Fare</span>
  <span class="ksrtc-stat-item__value ksrtc-stat-item__value--currency">₹ 899</span>
</div>

<!-- Stat group (horizontal, with dividers) -->
<div class="ksrtc-stat-group" role="list">
  <div class="ksrtc-stat-item" role="listitem">
    <span class="ksrtc-stat-item__label">Departure</span>
    <span class="ksrtc-stat-item__value">06:30</span>
  </div>
  <div class="ksrtc-stat-group__divider" aria-hidden="true"></div>
  <div class="ksrtc-stat-item" role="listitem">
    <span class="ksrtc-stat-item__label">Arrival</span>
    <span class="ksrtc-stat-item__value">09:30</span>
  </div>
</div>
`,
    css: `/* StatItem tokens */
--color-on-surface:         #1A1C1E;   /* Value text */
--color-on-surface-variant: #44464F;   /* Label text */
--color-secondary:          #D84315;   /* Currency value highlight */
--color-outline-variant:    #CAC4D0;   /* Divider between stat items */
`,
  },
  {
    name: 'Checkbox',
    description: 'Single checkbox or labelled checkbox group.',
    tokens: ['--color-primary', '--color-on-primary', '--color-surface-container-highest'],
    react: `import { Checkbox } from 'oprs-design-system';

// Single checkbox
<Checkbox
  label="Single Lady Passenger"
  checked={singleLady}
  onChange={(e) => setSingleLady(e.target.checked)}
/>

// With helper text + error state
<Checkbox
  label="I agree to the cancellation policy"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
  error={!agreed && submitted}
  helperText={!agreed && submitted ? 'You must agree to continue' : ''}
/>

// Indeterminate (select-all pattern)
<Checkbox label="Select all passengers" indeterminate />
`,
    html: `<label class="ksrtc-checkbox">
  <input
    type="checkbox"
    class="ksrtc-checkbox__input"
    id="cb-lady"
    aria-describedby="cb-lady-helper"
  />
  <span class="ksrtc-checkbox__box" aria-hidden="true">
    <span class="material-symbols-outlined ksrtc-checkbox__check">check</span>
  </span>
  <span class="ksrtc-checkbox__label">Single Lady Passenger</span>
</label>

<!-- Error state -->
<label class="ksrtc-checkbox ksrtc-checkbox--error">
  <input type="checkbox" class="ksrtc-checkbox__input"
    id="cb-agree" aria-invalid="true" aria-describedby="cb-agree-error" />
  <span class="ksrtc-checkbox__box" aria-hidden="true"></span>
  <span class="ksrtc-checkbox__label">I agree to the cancellation policy</span>
</label>
<span id="cb-agree-error" class="ksrtc-checkbox__helper--error" role="alert">
  You must agree to continue
</span>
`,
    css: `/* Checkbox tokens */
--color-primary:                #1A56A0;   /* Checked background */
--color-on-primary:             #FFFFFF;   /* Check icon colour */
--color-surface-container-highest: #E6E0E9; /* Unchecked box */
--color-error:                  #BA1A1A;   /* Error state border */
--color-outline:                #74777F;   /* Unchecked border */
`,
  },
  {
    name: 'Toggle',
    description: 'MD3 switch for boolean settings — SMS alerts, dark mode.',
    tokens: ['--color-primary', '--color-on-primary', '--color-surface-container-highest'],
    react: `import { Toggle } from 'oprs-design-system';

// With label
<Toggle
  label="SMS Alerts"
  checked={smsAlerts}
  onChange={(e) => setSmsAlerts(e.target.checked)}
/>

// Without visible label (needs ariaLabel)
<Toggle
  checked={darkMode}
  ariaLabel="Toggle dark mode"
  onChange={(e) => setDarkMode(e.target.checked)}
/>
`,
    html: `<div class="ksrtc-toggle">
  <input
    type="checkbox"
    role="switch"
    class="ksrtc-toggle__input"
    id="toggle-sms"
    aria-checked="false"
  />
  <div class="ksrtc-toggle__track" aria-hidden="true">
    <div class="ksrtc-toggle__thumb"></div>
  </div>
  <label for="toggle-sms" class="ksrtc-toggle__label">SMS Alerts</label>
</div>
`,
    css: `/* Toggle tokens */
--color-primary:                #1A56A0;   /* On-state track */
--color-on-primary:             #FFFFFF;   /* On-state thumb */
--color-surface-container-highest: #E6E0E9; /* Off-state track */
--color-outline:                #74777F;   /* Off-state thumb */
`,
  },
  {
    name: 'RadioButton',
    description: 'Single-choice selection within a group — passenger type, seat preference.',
    tokens: ['--color-primary', '--color-on-surface', '--color-outline'],
    react: `import { RadioButton, RadioGroup } from 'oprs-design-system';

const [passengerType, setPassengerType] = useState('adult');

<RadioGroup
  label="Passenger type"
  value={passengerType}
  onChange={setPassengerType}
>
  <RadioButton value="adult"  label="Adult"           />
  <RadioButton value="child"  label="Child (5–12 yrs)" />
  <RadioButton value="senior" label="Senior Citizen"   />
</RadioGroup>
`,
    html: `<fieldset class="ksrtc-radio-group">
  <legend class="ksrtc-radio-group__label">Passenger type</legend>

  <label class="ksrtc-radio">
    <input type="radio" name="pax-type" value="adult"
      class="ksrtc-radio__input" checked />
    <span class="ksrtc-radio__dot" aria-hidden="true"></span>
    <span class="ksrtc-radio__label">Adult</span>
  </label>

  <label class="ksrtc-radio">
    <input type="radio" name="pax-type" value="child" class="ksrtc-radio__input" />
    <span class="ksrtc-radio__dot" aria-hidden="true"></span>
    <span class="ksrtc-radio__label">Child (5–12 yrs)</span>
  </label>

  <label class="ksrtc-radio">
    <input type="radio" name="pax-type" value="senior" class="ksrtc-radio__input" />
    <span class="ksrtc-radio__dot" aria-hidden="true"></span>
    <span class="ksrtc-radio__label">Senior Citizen</span>
  </label>
</fieldset>
`,
    css: `/* RadioButton tokens */
--color-primary:  #1A56A0;   /* Selected dot + ring */
--color-outline:  #74777F;   /* Unselected ring */
--color-on-surface: #1A1C1E; /* Label text */
`,
  },
  {
    name: 'EmptyState',
    description: 'Zero-results and error state illustrations with action.',
    tokens: ['--color-outline', '--color-on-surface-variant'],
    react: `import { EmptyState } from 'oprs-design-system';

// No results
<EmptyState
  icon="directions_bus_filled"
  title="No buses found"
  description="Try a different date or route to find available OPRS buses."
  action={{ label: 'Change Date', onClick: handleChangeDate }}
/>

// Network / error state
<EmptyState
  icon="wifi_off"
  title="Something went wrong"
  description="Check your connection and try again."
  action={{ label: 'Retry', onClick: handleRetry }}
  variant="error"
/>
`,
    html: `<div class="ksrtc-empty-state" role="region" aria-label="No buses found">
  <span
    class="material-symbols-outlined ksrtc-empty-state__icon"
    aria-hidden="true"
  >
    directions_bus_filled
  </span>
  <h2 class="ksrtc-empty-state__title">No buses found</h2>
  <p class="ksrtc-empty-state__desc">
    Try a different date or route to find available OPRS buses.
  </p>
  <button class="btn btn-filled-secondary">Change Date</button>
</div>
`,
    css: `/* EmptyState tokens */
--color-outline:            #74777F;   /* Icon colour */
--color-on-surface-variant: #44464F;   /* Description text */
--color-on-surface:         #1A1C1E;   /* Title text */
`,
  },
  {
    name: 'DataTable',
    description: 'Sortable, selectable table for booking history and reports.',
    tokens: ['--color-surface-container-low', '--color-primary', '--color-outline-variant'],
    react: `import { DataTable } from 'oprs-design-system';

<DataTable
  columns={[
    { key: 'pnr',    label: 'PNR',    sortable: true  },
    { key: 'route',  label: 'Route',  sortable: true  },
    { key: 'date',   label: 'Date',   sortable: true  },
    { key: 'seats',  label: 'Seats'                   },
    { key: 'fare',   label: 'Fare',   sortable: true  },
    { key: 'status', label: 'Status', type: 'status'  },
  ]}
  rows={bookingHistory}
  selectable
  onRowClick={(row) => viewBooking(row.pnr)}
  loading={isFetching}
/>
`,
    html: `<div role="region" aria-label="Booking history" aria-live="polite">
  <table class="ksrtc-data-table">
    <thead>
      <tr>
        <th class="ksrtc-data-table__th" scope="col"
          aria-sort="ascending" tabindex="0">
          PNR
          <span class="material-symbols-outlined" aria-hidden="true">arrow_upward</span>
        </th>
        <th class="ksrtc-data-table__th" scope="col">Route</th>
        <th class="ksrtc-data-table__th" scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr class="ksrtc-data-table__row" tabindex="0"
        aria-label="OPRS20240614, Bengaluru to Mysuru, Confirmed">
        <td class="ksrtc-data-table__td">OPRS20240614</td>
        <td class="ksrtc-data-table__td">BLR → MYS</td>
        <td class="ksrtc-data-table__td">
          <span class="ksrtc-status-chip ksrtc-status-chip--confirmed">Confirmed</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`,
    css: `/* DataTable tokens */
--color-surface-container-low: #F7F2FA;   /* Table header background */
--color-surface:               #FFFBFE;   /* Row background */
--color-primary:               #1A56A0;   /* Sort indicator + selected row */
--color-outline-variant:       #CAC4D0;   /* Row borders */
--color-on-surface:            #1A1C1E;   /* Cell text */
`,
  },
];

/* ─────────────────────────────────────────────────────────
   MAIN STORY
───────────────────────────────────────────────────────── */
export const Handoff = {
  name: 'Developer Handoff',
  render: () => (
    <div style={{
      fontFamily: "'Roboto', sans-serif",
      maxWidth: 960,
      margin: '0 auto',
      padding: '32px 32px 80px',
    }}>

      {/* ── Page header ─────────────────────────────── */}
      <div style={{ marginBottom: 40 }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: 1.2,
          textTransform: 'uppercase', color: '#74777F', marginBottom: 6,
        }}>
          OPRS Design System
        </div>
        <h1 style={{
          fontSize: 32, fontWeight: 700, color: '#1A1C1E',
          margin: '0 0 12px', letterSpacing: -.3,
        }}>
          Developer Handoff
        </h1>
        <p style={{ fontSize: 15, color: '#44464F', lineHeight: 1.6, maxWidth: 560, margin: 0 }}>
          Download code snippets for any component. Each card has separate downloads for
          <strong> React JSX</strong>, <strong>HTML</strong>, and <strong>CSS tokens</strong>.
        </p>
      </div>

      {/* ── Setup card ──────────────────────────────── */}
      <div style={{
        background: '#F8FAFF', borderRadius: 14,
        border: '1px solid #D6E4FF', padding: '20px 24px',
        marginBottom: 48, display: 'flex',
        alignItems: 'flex-start', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1C1E', marginBottom: 4 }}>
            Setup
          </div>
          <p style={{ fontSize: 13, color: '#44464F', margin: 0, lineHeight: 1.5 }}>
            Import tokens + component CSS once at your app root. Add Material Symbols and Roboto via Google Fonts.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <DownloadBtn
            label="React setup"
            ext="jsx"
            content={SETUP_REACT}
            componentName="oprs-setup"
          />
          <DownloadBtn
            label="CSS tokens"
            ext="css"
            content={SETUP_CSS}
            componentName="oprs-tokens"
          />
        </div>
      </div>

      {/* ── Component sections ──────────────────────── */}
      <SectionTitle>Foundation Components</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
        {COMPONENTS.slice(0, 6).map(c => <ComponentCard key={c.name} {...c} />)}
      </div>

      <SectionTitle>Navigation &amp; Overlay</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
        {COMPONENTS.slice(6, 10).map(c => <ComponentCard key={c.name} {...c} />)}
      </div>

      <SectionTitle>OPRS-Specific Components</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
        {COMPONENTS.slice(10, 16).map(c => <ComponentCard key={c.name} {...c} />)}
      </div>

      <SectionTitle>Form Controls</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
        {COMPONENTS.slice(16, 20).map(c => <ComponentCard key={c.name} {...c} />)}
      </div>

      <SectionTitle>Feedback &amp; Data</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
        {COMPONENTS.slice(20).map(c => <ComponentCard key={c.name} {...c} />)}
      </div>

    </div>
  ),
};
