import React, { useRef, useState } from 'react';

export default {
  title: 'Design Tokens/Overview',
  parameters: {
    docs: {
      description: {
        component: 'All design tokens for the KSRTC Design System. Token-driven — change the token value and the entire UI updates.',
      },
    },
    controls: { disable: true },
  },
};

const tokens = {
  colors: {
    primary:              { var: '--color-primary',              value: '#1A56A0', label: 'Primary — KSRTC Blue' },
    onPrimary:            { var: '--color-on-primary',           value: '#FFFFFF', label: 'On Primary' },
    primaryContainer:     { var: '--color-primary-container',    value: '#D6E4FF', label: 'Primary Container' },
    onPrimaryContainer:   { var: '--color-on-primary-container', value: '#00205F', label: 'On Primary Container' },
    primaryFixedDim:      { var: '--color-primary-fixed-dim',    value: '#A8C8FF', label: 'Primary Fixed Dim' },
  },
  secondaryColors: {
    secondary:            { var: '--color-secondary',            value: '#D84315', label: 'Secondary — Orange CTA (Primary action)' },
    onSecondary:          { var: '--color-on-secondary',         value: '#FFFFFF', label: 'On Secondary' },
    secondaryContainer:   { var: '--color-secondary-container',  value: '#FFDBCA', label: 'Secondary Container' },
    onSecondaryContainer: { var: '--color-on-secondary-container',value: '#5C1900', label: 'On Secondary Container' },
  },
  tertiaryColors: {
    tertiary:             { var: '--color-tertiary',             value: '#2E7D32', label: 'Tertiary — Success / Confirmed' },
    onTertiary:           { var: '--color-on-tertiary',          value: '#FFFFFF', label: 'On Tertiary' },
    tertiaryContainer:    { var: '--color-tertiary-container',   value: '#E8F5E9', label: 'Tertiary Container' },
    onTertiaryContainer:  { var: '--color-on-tertiary-container',value: '#1B5E20', label: 'On Tertiary Container' },
  },
  errorColors: {
    error:                { var: '--color-error',                value: '#B3261E', label: 'Error' },
    onError:              { var: '--color-on-error',             value: '#FFFFFF', label: 'On Error' },
    errorContainer:       { var: '--color-error-container',      value: '#F9DEDC', label: 'Error Container' },
    onErrorContainer:     { var: '--color-on-error-container',   value: '#410E0B', label: 'On Error Container' },
  },
  surfaces: {
    background:           { var: '--color-background',           value: '#F1F4FB', label: 'Background — page bg' },
    surface:              { var: '--color-surface',              value: '#FFFFFF', label: 'Surface — cards, dialogs' },
    surfaceContLow:       { var: '--color-surface-container-low',  value: '#EEF2F9', label: 'Surface Container Low' },
    surfaceCont:          { var: '--color-surface-container',      value: '#E8EDF7', label: 'Surface Container' },
    surfaceContHigh:      { var: '--color-surface-container-high', value: '#E2E8F3', label: 'Surface Container High' },
    surfaceContHighest:   { var: '--color-surface-container-highest',value: '#DCE3EE', label: 'Surface Container Highest' },
    onSurface:            { var: '--color-on-surface',           value: '#1A1C1E', label: 'On Surface — body text' },
    onSurfaceVariant:     { var: '--color-on-surface-variant',   value: '#44464F', label: 'On Surface Variant — labels' },
    outline:              { var: '--color-outline',              value: '#74777F', label: 'Outline — borders, placeholders' },
    outlineVariant:       { var: '--color-outline-variant',      value: '#C4C6D0', label: 'Outline Variant — dividers' },
  },
  seats: {
    available: { var: '--color-seat-available', value: '#E8F5E9', label: 'Seat Available' },
    ladies:    { var: '--color-seat-ladies',    value: '#FCE4EC', label: 'Seat Ladies' },
    blocked:   { var: '--color-seat-blocked',   value: '#ECEFF1', label: 'Seat Blocked' },
    conductor: { var: '--color-seat-conductor', value: '#E3F2FD', label: 'Seat Conductor' },
    quota:     { var: '--color-seat-quota',     value: '#FFF9C4', label: 'Seat Quota' },
  },
  elevation: {
    e1: { value: '0 1px 2px rgba(0,0,0,.25), 0 1px 3px 1px rgba(0,0,0,.12)', label: 'Elevation 1 — Cards' },
    e2: { value: '0 1px 2px rgba(0,0,0,.25), 0 2px 6px 2px rgba(0,0,0,.12)', label: 'Elevation 2 — Dropdowns' },
    e3: { value: '0 1px 3px rgba(0,0,0,.3), 0 4px 8px 3px rgba(0,0,0,.15)',  label: 'Elevation 3 — FAB' },
  },
};

function ColorSwatch({ token }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 8,
        background: `var(${token.var}, ${token.value})`,
        border: '1px solid rgba(0,0,0,.08)', flexShrink: 0,
      }} />
      <div>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{token.label}</div>
        <div style={{ fontSize: 11, color: '#74777F', fontFamily: 'monospace' }}>{token.var}</div>
        <div style={{ fontSize: 11, color: '#74777F' }}>{token.value}</div>
      </div>
    </div>
  );
}

function ElevationSwatch({ e }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
      <div style={{
        width: 60, height: 40, borderRadius: 8, background: '#fff',
        boxShadow: e.value, flexShrink: 0,
      }} />
      <div>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{e.label}</div>
      </div>
    </div>
  );
}

const spacingSteps = [
  { token: '--space-1', px: 4, label: 'xs — icon padding' },
  { token: '--space-2', px: 8, label: 'sm — chip gaps' },
  { token: '--space-3', px: 12, label: 'md — button padding' },
  { token: '--space-4', px: 16, label: 'base — card padding' },
  { token: '--space-5', px: 20, label: 'lg — section padding' },
  { token: '--space-6', px: 24, label: 'xl — dialog padding' },
  { token: '--space-8', px: 32, label: '2x — section margins' },
];

export const Colors = {
  name: 'Color Tokens',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
      <div className="story-section">
        <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: 'var(--color-on-surface-variant)', marginBottom: 12 }}>Primary · KSRTC Blue</h3>
        {Object.values(tokens.colors).map(t => <ColorSwatch key={t.var} token={t} />)}
      </div>
      <div className="story-section">
        <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: 'var(--color-on-surface-variant)', marginBottom: 12 }}>Secondary · Orange (Primary Action)</h3>
        {Object.values(tokens.secondaryColors).map(t => <ColorSwatch key={t.var} token={t} />)}
      </div>
      <div className="story-section">
        <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: 'var(--color-on-surface-variant)', marginBottom: 12 }}>Tertiary · Success</h3>
        {Object.values(tokens.tertiaryColors).map(t => <ColorSwatch key={t.var} token={t} />)}
      </div>
      <div className="story-section">
        <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: 'var(--color-on-surface-variant)', marginBottom: 12 }}>Error</h3>
        {Object.values(tokens.errorColors).map(t => <ColorSwatch key={t.var} token={t} />)}
      </div>
      <div className="story-section" style={{ gridColumn: '1 / -1' }}>
        <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: 'var(--color-on-surface-variant)', marginBottom: 12 }}>Surfaces</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 0 }}>
          {Object.values(tokens.surfaces).map(t => <ColorSwatch key={t.var} token={t} />)}
        </div>
      </div>
      <div className="story-section" style={{ gridColumn: '1 / -1' }}>
        <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: 'var(--color-on-surface-variant)', marginBottom: 12 }}>Seat Map</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {Object.values(tokens.seats).map(t => (
            <div key={t.var} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, minWidth: 200 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 6,
                background: `var(${t.var}, ${t.value})`,
                border: '1px solid rgba(0,0,0,.1)', flexShrink: 0,
              }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{t.label}</div>
                <div style={{ fontSize: 10, color: '#74777F', fontFamily: 'monospace' }}>{t.var}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const SurfaceHierarchy = {
  name: 'Surface Hierarchy',
  render: () => (
    <div className="story-col" style={{ gap: 32 }}>
      <div className="story-section">
        <h3 style={{ marginBottom: 8 }}>MD3 Surface levels — light mode</h3>
        <p style={{ fontSize: 12, color: 'var(--color-on-surface-variant)', marginBottom: 20 }}>
          Each level is slightly darker. Use to create depth without elevation shadows.
        </p>
        <div style={{ display: 'flex', gap: 0, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--color-outline-variant)' }}>
          {[
            { token: '--color-background',              value: '#F1F4FB', label: 'Background',              use: 'Page bg' },
            { token: '--color-surface',                 value: '#FFFFFF', label: 'Surface',                  use: 'Cards, dialogs' },
            { token: '--color-surface-container-low',   value: '#EEF2F9', label: 'Container Low',            use: 'Tonal cards' },
            { token: '--color-surface-container',       value: '#E8EDF7', label: 'Container',                use: 'Input bg' },
            { token: '--color-surface-container-high',  value: '#E2E8F3', label: 'Container High',           use: 'Table head' },
            { token: '--color-surface-container-highest',value:'#DCE3EE', label: 'Container Highest',        use: 'Pressed state' },
          ].map((s, i) => (
            <div key={s.token} style={{
              flex: 1, minHeight: 100, background: `var(${s.token}, ${s.value})`,
              padding: '12px 8px', display: 'flex', flexDirection: 'column',
              justifyContent: 'flex-end', gap: 2,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#1A1C1E' }}>{s.label}</div>
              <div style={{ fontSize: 9, color: '#44464F', fontFamily: 'monospace' }}>{s.value}</div>
              <div style={{ fontSize: 9, color: '#74777F' }}>{s.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="story-section">
        <h3 style={{ marginBottom: 8 }}>Layering in practice</h3>
        <div style={{
          background: 'var(--color-background)',
          borderRadius: 16, padding: 20, border: '1px solid var(--color-outline-variant)',
        }}>
          <div style={{ fontSize: 11, color: 'var(--color-on-surface-variant)', marginBottom: 12, fontWeight: 600 }}>
            BACKGROUND (#F1F4FB)
          </div>
          <div style={{
            background: 'var(--color-surface)',
            borderRadius: 12, padding: 16,
            boxShadow: '0 1px 3px rgba(0,0,0,.12)',
          }}>
            <div style={{ fontSize: 11, color: 'var(--color-on-surface-variant)', marginBottom: 10, fontWeight: 600 }}>
              SURFACE CARD (#FFFFFF)
            </div>
            <div style={{
              background: 'var(--color-surface-container-high)',
              borderRadius: 8, padding: 12,
            }}>
              <div style={{ fontSize: 11, color: 'var(--color-on-surface-variant)', marginBottom: 8, fontWeight: 600 }}>
                TABLE HEADER (#E2E8F3)
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Trip No.', 'Service', 'Departure', 'Fare'].map(h => (
                  <div key={h} style={{ flex: 1, height: 8, background: 'var(--color-outline-variant)', borderRadius: 4 }} />
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 1 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  background: i % 2 === 1 ? 'var(--color-surface-container-low)' : 'var(--color-surface)',
                  padding: '8px 12px', display: 'flex', gap: 8,
                }}>
                  {[0, 1, 2, 3].map(j => (
                    <div key={j} style={{ flex: 1, height: 8, background: 'var(--color-outline-variant)', borderRadius: 4, opacity: .5 }} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Elevation = {
  name: 'Elevation',
  render: () => (
    <div className="story-section">
      <h3>Box Shadows</h3>
      {Object.values(tokens.elevation).map(e => <ElevationSwatch key={e.label} e={e} />)}
    </div>
  ),
};

export const Spacing = {
  name: 'Spacing Scale',
  render: () => (
    <div className="story-section">
      <h3>4px Base Unit</h3>
      {spacingSteps.map(s => (
        <div key={s.token} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
          <div style={{ width: s.px, height: s.px, background: 'var(--color-primary)', borderRadius: 2, flexShrink: 0 }} />
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#1A56A0' }}>{s.token}</span>
            <span style={{ fontSize: 12, color: '#74777F', marginLeft: 8 }}>{s.px}px · {s.label}</span>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Typography = {
  name: 'Type Scale',
  render: () => (
    <div className="story-col" style={{ gap: 32 }}>

      {/* Live scale */}
      <div className="story-section">
        <h3 style={{ marginBottom: 16 }}>Roboto — MD3 Type Scale</h3>
        {[
          { role: 'display',   label: 'Display Small',    token: '--type-display-small',   size: 36, lh: 44, weight: 400 },
          { role: 'headline',  label: 'Headline Large',   token: '--type-headline-large',  size: 32, lh: 40, weight: 400 },
          { role: 'headline',  label: 'Headline Medium',  token: '--type-headline-medium', size: 28, lh: 36, weight: 400 },
          { role: 'headline',  label: 'Headline Small',   token: '--type-headline-small',  size: 24, lh: 32, weight: 400 },
          { role: 'title',     label: 'Title Large',      token: '--type-title-large',     size: 22, lh: 28, weight: 400 },
          { role: 'title',     label: 'Title Medium',     token: '--type-title-medium',    size: 16, lh: 24, weight: 500 },
          { role: 'title',     label: 'Title Small',      token: '--type-title-small',     size: 14, lh: 20, weight: 500 },
          { role: 'label',     label: 'Label Large',      token: '--type-label-large',     size: 14, lh: 20, weight: 500 },
          { role: 'label',     label: 'Label Medium',     token: '--type-label-medium',    size: 12, lh: 16, weight: 500 },
          { role: 'label',     label: 'Label Small',      token: '--type-label-small',     size: 11, lh: 16, weight: 500 },
          { role: 'body',      label: 'Body Large',       token: '--type-body-large',      size: 16, lh: 24, weight: 400 },
          { role: 'body',      label: 'Body Medium',      token: '--type-body-medium',     size: 14, lh: 20, weight: 400 },
          { role: 'body',      label: 'Body Small',       token: '--type-body-small',      size: 12, lh: 16, weight: 400 },
        ].map(t => (
          <div key={t.label} style={{
            display: 'flex', alignItems: 'baseline', gap: 16,
            padding: '10px 0', borderBottom: '1px solid var(--color-outline-variant)',
          }}>
            <div style={{ width: 180, flexShrink: 0 }}>
              <span style={{ fontSize: t.size, fontWeight: t.weight, fontFamily: 'Roboto, sans-serif', lineHeight: `${t.lh}px`, color: 'var(--color-on-surface)' }}>
                {t.label}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 20, fontSize: 11, color: 'var(--color-on-surface-variant)' }}>
              <span><strong>{t.size}px</strong> size</span>
              <span><strong>{t.lh}px</strong> lh</span>
              <span><strong>{t.weight}</strong> wt</span>
              <span style={{ fontFamily: 'monospace', color: 'var(--color-primary)' }}>{t.token}-size</span>
            </div>
          </div>
        ))}
      </div>

      {/* Usage table */}
      <div className="story-section">
        <h3 style={{ marginBottom: 12 }}>Where each style is used</h3>
        <table style={{ borderCollapse: 'collapse', fontSize: 12, width: '100%' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
              {['Style', 'Size', 'Weight', 'Used for'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '6px 12px 8px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', color: 'var(--color-on-surface-variant)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Title Medium',  '16px', '500', 'Top app bar, card title, dialog title'],
              ['Title Small',   '14px', '500', 'Section subheadings, strong labels'],
              ['Label Large',   '14px', '500', 'Button text, tab labels'],
              ['Label Medium',  '12px', '500', 'Chip labels, badge text, table headers'],
              ['Label Small',   '11px', '500', 'Form field labels, helper text headers'],
              ['Body Large',    '16px', '400', 'Main content, form values'],
              ['Body Medium',   '14px', '400', 'Secondary content, table cells'],
              ['Body Small',    '12px', '400', 'Helper text, captions, timestamps'],
            ].map(([s, sz, w, u]) => (
              <tr key={s} style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
                <td style={{ padding: '6px 12px', fontWeight: 600 }}>{s}</td>
                <td style={{ padding: '6px 12px' }}>{sz}</td>
                <td style={{ padding: '6px 12px' }}>{w}</td>
                <td style={{ padding: '6px 12px', color: 'var(--color-on-surface-variant)' }}>{u}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  ),
};

export const Shape = {
  name: 'Shape / Border Radius',
  render: () => (
    <div className="story-row" style={{ alignItems: 'flex-end', gap: 24 }}>
      {[
        { token: '--shape-extra-sm', value: 4,    label: 'Extra SM · Inputs' },
        { token: '--shape-sm',       value: 8,    label: 'SM · Chips' },
        { token: '--shape-md',       value: 12,   label: 'MD · Cards' },
        { token: '--shape-lg',       value: 16,   label: 'LG · Ticket' },
        { token: '--shape-xl',       value: 28,   label: 'XL · Dialog' },
        { token: '--shape-full',     value: 9999, label: 'Full · Buttons' },
      ].map(s => (
        <div key={s.token} style={{ textAlign: 'center' }}>
          <div style={{
            width: 56, height: 56,
            background: 'var(--color-primary-container)',
            borderRadius: Math.min(s.value, 28),
            border: '1.5px solid var(--color-primary)',
          }} />
          <div style={{ fontSize: 10, fontWeight: 600, marginTop: 6 }}>{s.value === 9999 ? '∞' : s.value + 'px'}</div>
          <div style={{ fontSize: 10, color: '#74777F' }}>{s.label}</div>
        </div>
      ))}
    </div>
  ),
};

// ── Grid / Layout ──────────────────────────────────────────────────────────

function GridCol({ span, label, highlight }) {
  return (
    <div style={{
      gridColumn: `span ${span}`,
      background: highlight ? 'var(--color-primary)' : 'var(--color-primary-container)',
      borderRadius: 4,
      padding: '8px 6px',
      textAlign: 'center',
      fontSize: 11,
      fontWeight: 600,
      color: highlight ? 'var(--color-on-primary)' : 'var(--color-on-primary-container)',
      minHeight: 36,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {label}
    </div>
  );
}

function GridDemo({ cols, gap, label, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-on-surface-variant)', marginBottom: 8, letterSpacing: '.3px' }}>
        {label}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, border: '1px solid var(--color-outline-variant)', borderRadius: 8, padding: 8, background: 'var(--color-surface-container-low)' }}>
        {children}
      </div>
    </div>
  );
}

function SpacingPaddingDemo() {
  const paddingCases = [
    { label: 'Icon button', token: '--space-1 (4px)', h: 32, w: 32, p: 4 },
    { label: 'Chip',        token: '--space-2 (8px)', h: 28, w: 64, p: 8 },
    { label: 'Button',      token: '--space-3/4 (12/16px)', h: 40, w: 88, p: 12, pw: 16 },
    { label: 'Card',        token: '--space-4 (16px)', h: 64, w: 120, p: 16 },
    { label: 'Dialog',      token: '--space-6 (24px)', h: 80, w: 140, p: 24 },
  ];
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end' }}>
      {paddingCases.map(c => (
        <div key={c.label} style={{ textAlign: 'center' }}>
          <div style={{
            width: c.w, height: c.h,
            border: '1.5px dashed var(--color-primary)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
            padding: c.p,
            boxSizing: 'border-box',
            background: 'var(--color-primary-fixed-dim)',
          }}>
            <div style={{
              width: '100%', height: '100%',
              background: 'var(--color-primary)',
              borderRadius: 4,
              opacity: .6,
            }} />
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, marginTop: 6 }}>{c.label}</div>
          <div style={{ fontSize: 10, color: '#74777F', fontFamily: 'monospace' }}>{c.token}</div>
        </div>
      ))}
    </div>
  );
}

export const GridLayout = {
  name: 'Grid & Layout',
  parameters: { layout: 'padded' },
  render: () => (
    <div className="story-col" style={{ gap: 40 }}>

      {/* ─ 12-column grid ─ */}
      <div className="story-section">
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>12-Column Grid · Desktop (1280px)</h3>
        <p style={{ fontSize: 12, color: 'var(--color-on-surface-variant)', marginBottom: 16 }}>
          24px gutters · 24px margins · max-width 1280px
        </p>
        <GridDemo cols={12} gap="8px" label="Equal columns">
          {Array.from({ length: 12 }, (_, i) => (
            <GridCol key={i} span={1} label={i + 1} highlight={i % 2 === 0} />
          ))}
        </GridDemo>
        <GridDemo cols={12} gap="8px" label="Booking form layout — 4 + 4 + 4">
          <GridCol span={4} label="From" />
          <GridCol span={4} label="To" />
          <GridCol span={4} label="Date" />
        </GridDemo>
        <GridDemo cols={12} gap="8px" label="Results layout — 3 sidebar + 9 content">
          <GridCol span={3} label="Filters" highlight />
          <GridCol span={9} label="Bus List" />
        </GridDemo>
        <GridDemo cols={12} gap="8px" label="Seat map — 8 main + 4 summary">
          <GridCol span={8} label="Seat Map" />
          <GridCol span={4} label="Booking Summary" highlight />
        </GridDemo>
      </div>

      {/* ─ 4-column grid ─ */}
      <div className="story-section">
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>4-Column Grid · Mobile (360–414px)</h3>
        <p style={{ fontSize: 12, color: 'var(--color-on-surface-variant)', marginBottom: 16 }}>
          16px gutters · 16px margins
        </p>
        <GridDemo cols={4} gap="8px" label="Full-width (span 4)">
          <GridCol span={4} label="Search bar" highlight />
        </GridDemo>
        <GridDemo cols={4} gap="8px" label="Half-half (2+2)">
          <GridCol span={2} label="From" />
          <GridCol span={2} label="To" />
        </GridDemo>
        <GridDemo cols={4} gap="8px" label="Card grid (2+2+2+2)">
          <GridCol span={2} label="Card" />
          <GridCol span={2} label="Card" />
          <GridCol span={2} label="Card" />
          <GridCol span={2} label="Card" />
        </GridDemo>
      </div>

      {/* ─ Spacing padding demo ─ */}
      <div className="story-section">
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Component Padding</h3>
        <p style={{ fontSize: 12, color: 'var(--color-on-surface-variant)', marginBottom: 16 }}>
          The blue area is the content. The dashed border is the outer bounds. Gap = padding token.
        </p>
        <SpacingPaddingDemo />
      </div>

      {/* ─ Spacing reference table ─ */}
      <div className="story-section">
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Spacing Tokens</h3>
        <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: 520, fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
              {['Token', 'Value', 'Rem', 'Usage'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '6px 12px 8px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', color: 'var(--color-on-surface-variant)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['--space-1', '4px',  '0.25rem', 'Icon padding, tight gaps'],
              ['--space-2', '8px',  '0.5rem',  'Chip gaps, small stacks'],
              ['--space-3', '12px', '0.75rem', 'Button padding (inline)'],
              ['--space-4', '16px', '1rem',    'Card padding, base unit'],
              ['--space-5', '20px', '1.25rem', 'Section inner padding'],
              ['--space-6', '24px', '1.5rem',  'Dialog / modal padding'],
              ['--space-8', '32px', '2rem',    'Section margins'],
              ['--space-10','40px', '2.5rem',  'Page-level spacing'],
              ['--space-12','48px', '3rem',    'Hero padding'],
            ].map(([t, v, r, u]) => (
              <tr key={t} style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
                <td style={{ padding: '7px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--color-primary)' }}>{t}</td>
                <td style={{ padding: '7px 12px', fontWeight: 600 }}>{v}</td>
                <td style={{ padding: '7px 12px', color: 'var(--color-on-surface-variant)' }}>{r}</td>
                <td style={{ padding: '7px 12px', color: 'var(--color-on-surface-variant)' }}>{u}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  ),
};

// ── Motion ─────────────────────────────────────────────────────────────────

export const Motion = {
  name: 'Motion & Animation',
  render: () => {
    const [active, setActive] = useState({});
    const trigger = (key) => setActive(s => ({ ...s, [key]: true }));
    const reset   = (key) => setActive(s => ({ ...s, [key]: false }));

    const demos = [
      { key: 'short', label: 'Short', token: '--motion-duration-short', value: '150ms', easing: 'standard', use: 'Hover, focus, ripple' },
      { key: 'medium', label: 'Medium', token: '--motion-duration-medium', value: '250ms', easing: 'standard', use: 'Dropdown open, state change' },
      { key: 'long', label: 'Long', token: '--motion-duration-long', value: '400ms', easing: 'decelerate', use: 'Page transition, dialog enter' },
    ];

    return (
      <div className="story-col" style={{ gap: 40 }}>

        {/* Duration demo */}
        <div className="story-section">
          <h3>Duration tokens</h3>
          <div className="story-row" style={{ gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {demos.map(d => (
              <div key={d.key} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{d.label} · {d.value}</div>
                <div
                  style={{
                    width: 56, height: 56, borderRadius: 12,
                    background: active[d.key] ? 'var(--color-secondary)' : 'var(--color-primary)',
                    transition: `all ${d.value} cubic-bezier(0.2,0,0,1)`,
                    transform: active[d.key] ? 'scale(1.15)' : 'scale(1)',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  onClick={() => { trigger(d.key); setTimeout(() => reset(d.key), 600); }}
                >
                  <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: 24 }}>touch_app</span>
                </div>
                <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-primary)' }}>{d.token}</div>
                <div style={{ fontSize: 11, color: 'var(--color-on-surface-variant)' }}>{d.use}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'var(--color-on-surface-variant)', marginTop: 16 }}>
            Click each square to see the transition.
          </p>
        </div>

        {/* Easing curves */}
        <div className="story-section">
          <h3>Easing tokens</h3>
          <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: 640, fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
                {['Token', 'Curve', 'Usage'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 12px 8px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', color: 'var(--color-on-surface-variant)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['--motion-easing-standard',   'cubic-bezier(0.2, 0, 0, 1)',   'Default for most UI changes'],
                ['--motion-easing-decelerate', 'cubic-bezier(0, 0, 0, 1)',     'Elements entering the screen'],
                ['--motion-easing-accelerate', 'cubic-bezier(0.3, 0, 1, 1)',   'Elements leaving the screen'],
              ].map(([t, v, u]) => (
                <tr key={t} style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
                  <td style={{ padding: '7px 12px', fontFamily: 'monospace', fontSize: 11, color: 'var(--color-primary)' }}>{t}</td>
                  <td style={{ padding: '7px 12px', fontFamily: 'monospace', fontSize: 11 }}>{v}</td>
                  <td style={{ padding: '7px 12px', color: 'var(--color-on-surface-variant)' }}>{u}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Usage guide */}
        <div className="story-section">
          <h3>Motion rules</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { icon: 'mouse', rule: 'Hover interactions',  token: '150ms standard', detail: 'Button hover, input focus ring' },
              { icon: 'touch_app', rule: 'User-triggered',  token: '250ms standard', detail: 'Dropdown open, chip select, tab switch' },
              { icon: 'open_in_full', rule: 'Page / overlay', token: '400ms decelerate', detail: 'Dialog enter, page transition, drawer open' },
              { icon: 'close', rule: 'Dismiss / exit',     token: '200ms accelerate', detail: 'Dialog close, toast fade out' },
            ].map(r => (
              <div key={r.rule} style={{
                background: 'var(--color-surface-container-low)',
                borderRadius: 10, padding: '14px 16px',
                border: '1px solid var(--color-outline-variant)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-primary)' }}>{r.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{r.rule}</span>
                </div>
                <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-primary)', marginBottom: 4 }}>{r.token}</div>
                <div style={{ fontSize: 12, color: 'var(--color-on-surface-variant)' }}>{r.detail}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  },
};
