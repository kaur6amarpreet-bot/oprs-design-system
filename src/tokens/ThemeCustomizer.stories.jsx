import React, { useState, useEffect, useCallback } from 'react';

export default {
  title: 'Design Tokens/Theme Customizer',
  parameters: {
    docs: {
      description: {
        component: 'Live color token editor. Change any value and every component on the page updates instantly. Use presets to switch full themes. Export the result as CSS.',
      },
    },
    controls: { disable: true },
    layout: 'fullscreen',
  },
};

/* ─────────────────────────────────────────────────────────────────
   PRESETS
────────────────────────────────────────────────────────────────── */
const PRESETS = {
  'OPRS Default': {
    '--color-primary':                   '#1A56A0',
    '--color-on-primary':                '#FFFFFF',
    '--color-primary-container':         '#D6E4FF',
    '--color-on-primary-container':      '#00205F',
    '--color-primary-fixed-dim':         '#A8C8FF',
    '--color-secondary':                 '#D84315',
    '--color-on-secondary':              '#FFFFFF',
    '--color-secondary-container':       '#FFDBCA',
    '--color-on-secondary-container':    '#5C1900',
    '--color-tertiary':                  '#2E7D32',
    '--color-on-tertiary':               '#FFFFFF',
    '--color-tertiary-container':        '#E8F5E9',
    '--color-on-tertiary-container':     '#1B5E20',
    '--color-surface':                   '#FFFFFF',
    '--color-surface-container-low':     '#EEF2F9',
    '--color-surface-container':         '#E8EDF7',
    '--color-surface-container-high':    '#E2E8F3',
    '--color-background':                '#F1F4FB',
    '--color-on-surface':                '#1A1C1E',
    '--color-on-surface-variant':        '#44464F',
    '--color-outline':                   '#74777F',
    '--color-outline-variant':           '#C4C6D0',
    '--color-error':                     '#B3261E',
    '--color-error-container':           '#F9DEDC',
  },
  'OPRS Green': {
    '--color-primary':                   '#1B5E20',
    '--color-on-primary':                '#FFFFFF',
    '--color-primary-container':         '#C8E6C9',
    '--color-on-primary-container':      '#003300',
    '--color-primary-fixed-dim':         '#A5D6A7',
    '--color-secondary':                 '#E65100',
    '--color-on-secondary':              '#FFFFFF',
    '--color-secondary-container':       '#FFE0C3',
    '--color-on-secondary-container':    '#5A1A00',
    '--color-tertiary':                  '#0277BD',
    '--color-on-tertiary':               '#FFFFFF',
    '--color-tertiary-container':        '#E1F5FE',
    '--color-on-tertiary-container':     '#01355A',
    '--color-surface':                   '#FAFFF9',
    '--color-surface-container-low':     '#EBF5ED',
    '--color-surface-container':         '#E4EEE6',
    '--color-surface-container-high':    '#DCE8DE',
    '--color-background':                '#F0F7F0',
    '--color-on-surface':                '#1A1C1A',
    '--color-on-surface-variant':        '#424742',
    '--color-outline':                   '#727972',
    '--color-outline-variant':           '#C2C9C2',
    '--color-error':                     '#B3261E',
    '--color-error-container':           '#F9DEDC',
  },
  'MD3 Purple': {
    '--color-primary':                   '#6750A4',
    '--color-on-primary':                '#FFFFFF',
    '--color-primary-container':         '#EADDFF',
    '--color-on-primary-container':      '#21005D',
    '--color-primary-fixed-dim':         '#D0BCFF',
    '--color-secondary':                 '#625B71',
    '--color-on-secondary':              '#FFFFFF',
    '--color-secondary-container':       '#E8DEF8',
    '--color-on-secondary-container':    '#1D192B',
    '--color-tertiary':                  '#7D5260',
    '--color-on-tertiary':               '#FFFFFF',
    '--color-tertiary-container':        '#FFD8E4',
    '--color-on-tertiary-container':     '#31111D',
    '--color-surface':                   '#FFFBFE',
    '--color-surface-container-low':     '#F7F2FA',
    '--color-surface-container':         '#F3EDF7',
    '--color-surface-container-high':    '#ECE6F0',
    '--color-background':                '#FFFBFE',
    '--color-on-surface':                '#1C1B1F',
    '--color-on-surface-variant':        '#49454F',
    '--color-outline':                   '#79747E',
    '--color-outline-variant':           '#CAC4D0',
    '--color-error':                     '#B3261E',
    '--color-error-container':           '#F9DEDC',
  },
  'Teal + Amber': {
    '--color-primary':                   '#00695C',
    '--color-on-primary':                '#FFFFFF',
    '--color-primary-container':         '#B2DFDB',
    '--color-on-primary-container':      '#002E28',
    '--color-primary-fixed-dim':         '#80CBC4',
    '--color-secondary':                 '#FF6F00',
    '--color-on-secondary':              '#FFFFFF',
    '--color-secondary-container':       '#FFE57F',
    '--color-on-secondary-container':    '#3E1E00',
    '--color-tertiary':                  '#1565C0',
    '--color-on-tertiary':               '#FFFFFF',
    '--color-tertiary-container':        '#BBDEFB',
    '--color-on-tertiary-container':     '#002A6A',
    '--color-surface':                   '#FAFFFE',
    '--color-surface-container-low':     '#EDF6F5',
    '--color-surface-container':         '#E5EFEE',
    '--color-surface-container-high':    '#DCE9E8',
    '--color-background':                '#F0F9F8',
    '--color-on-surface':                '#1A1E1D',
    '--color-on-surface-variant':        '#424947',
    '--color-outline':                   '#727978',
    '--color-outline-variant':           '#C1C9C8',
    '--color-error':                     '#B3261E',
    '--color-error-container':           '#F9DEDC',
  },
};

/* ─────────────────────────────────────────────────────────────────
   TOKEN GROUPS (which tokens to expose as pickers)
────────────────────────────────────────────────────────────────── */
const TOKEN_GROUPS = [
  {
    group: 'Primary',
    desc: 'Main brand colour — headers, links, focus rings, outlined buttons',
    tokens: [
      { var: '--color-primary',               label: 'Primary'           },
      { var: '--color-on-primary',            label: 'On Primary (text)' },
      { var: '--color-primary-container',     label: 'Primary Container' },
      { var: '--color-primary-fixed-dim',     label: 'Primary Fixed Dim' },
    ],
  },
  {
    group: 'CTA / Secondary',
    desc: 'Main action button (orange "Select", "Book Now"). Highest visual weight.',
    tokens: [
      { var: '--color-secondary',             label: 'CTA Fill'              },
      { var: '--color-on-secondary',          label: 'CTA Text'              },
      { var: '--color-secondary-container',   label: 'CTA Container'         },
    ],
  },
  {
    group: 'Tertiary / Success',
    desc: 'Confirmed state, success chips, balance amount, green accents',
    tokens: [
      { var: '--color-tertiary',              label: 'Tertiary'              },
      { var: '--color-on-tertiary',           label: 'On Tertiary'           },
      { var: '--color-tertiary-container',    label: 'Tertiary Container'    },
    ],
  },
  {
    group: 'Surfaces',
    desc: 'Background layers — cards, panels, inputs, page background',
    tokens: [
      { var: '--color-surface',               label: 'Surface (white)'       },
      { var: '--color-surface-container-low', label: 'Container Low'         },
      { var: '--color-surface-container',     label: 'Container'             },
      { var: '--color-surface-container-high',label: 'Container High'        },
      { var: '--color-background',            label: 'Background (page)'     },
    ],
  },
  {
    group: 'Text & Outline',
    desc: 'Body text, secondary text, borders, dividers',
    tokens: [
      { var: '--color-on-surface',            label: 'On Surface (body)'     },
      { var: '--color-on-surface-variant',    label: 'On Surface Variant'    },
      { var: '--color-outline',               label: 'Outline (border)'      },
      { var: '--color-outline-variant',       label: 'Outline Variant'       },
    ],
  },
  {
    group: 'Error',
    desc: 'Validation errors, form error states',
    tokens: [
      { var: '--color-error',                 label: 'Error'                 },
      { var: '--color-error-container',       label: 'Error Container'       },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────
   HELPER — merge all preset values into a flat default map
────────────────────────────────────────────────────────────────── */
const DEFAULT_TOKENS = PRESETS['OPRS Default'];

/* ─────────────────────────────────────────────────────────────────
   SUB-COMPONENTS
────────────────────────────────────────────────────────────────── */

function ColorSwatch({ label, cssVar, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Colour box = clickable label for the hidden input */}
        <label style={{ cursor: 'pointer', flexShrink: 0 }}>
          <div
            style={{
              width: 32, height: 32,
              borderRadius: 6,
              background: value,
              border: '1.5px solid rgba(0,0,0,.15)',
              boxShadow: '0 1px 3px rgba(0,0,0,.12)',
            }}
          />
          <input
            type="color"
            value={value}
            onChange={e => onChange(cssVar, e.target.value)}
            style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
          />
        </label>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-on-surface)', lineHeight: 1.2 }}>
            {label}
          </div>
          <div style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--color-on-surface-variant)', marginTop: 1 }}>
            {cssVar}
          </div>
        </div>
        {/* Hex input */}
        <input
          type="text"
          value={value}
          onChange={e => {
            const v = e.target.value;
            if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(cssVar, v);
          }}
          style={{
            marginLeft: 'auto',
            width: 80,
            height: 28,
            border: '1px solid var(--color-outline-variant)',
            borderRadius: 6,
            padding: '0 8px',
            fontFamily: 'monospace',
            fontSize: 12,
            background: 'var(--color-surface)',
            color: 'var(--color-on-surface)',
          }}
        />
      </div>
    </div>
  );
}

/* Live preview of key components */
function LivePreview({ tokens: t }) {
  const primary   = t['--color-primary']           || '#1A56A0';
  const onPrimary = t['--color-on-primary']         || '#FFFFFF';
  const secondary = t['--color-secondary']          || '#D84315';
  const onSec     = t['--color-on-secondary']       || '#FFFFFF';
  const secCont   = t['--color-secondary-container']|| '#FFDBCA';
  const tertiary  = t['--color-tertiary']           || '#2E7D32';
  const surface   = t['--color-surface']            || '#FFFFFF';
  const surfLow   = t['--color-surface-container-low'] || '#EEF2F9';
  const surfHigh  = t['--color-surface-container-high']|| '#E2E8F3';
  const bg        = t['--color-background']         || '#F1F4FB';
  const onSurf    = t['--color-on-surface']         || '#1A1C1E';
  const onSurfVar = t['--color-on-surface-variant'] || '#44464F';
  const outline   = t['--color-outline']            || '#74777F';
  const outlineVar= t['--color-outline-variant']    || '#C4C6D0';
  const error     = t['--color-error']              || '#B3261E';

  return (
    <div style={{
      background: bg, borderRadius: 12, padding: 20,
      border: `1px solid ${outlineVar}`,
      display: 'flex', flexDirection: 'column', gap: 16,
      fontFamily: 'var(--font-family-base, Roboto, sans-serif)',
    }}>

      {/* Top bar sample */}
      <div style={{
        background: primary, borderRadius: 8,
        padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="material-symbols-outlined" style={{ color: onPrimary, fontSize: 20 }}>directions_bus</span>
          <span style={{ color: onPrimary, fontWeight: 800, fontSize: 14, letterSpacing: 1 }}>OPRS</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="material-symbols-outlined" style={{ color: onPrimary, fontSize: 20 }}>search</span>
          <span className="material-symbols-outlined" style={{ color: onPrimary, fontSize: 20 }}>menu</span>
        </div>
      </div>

      {/* Search form sample */}
      <div style={{
        background: surface, border: `1px solid ${outlineVar}`,
        borderRadius: 10, padding: 16, display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: onSurf, marginBottom: 2 }}>Search Buses</div>

        {/* Input row */}
        <div style={{ display: 'flex', gap: 10 }}>
          {['From · Bengaluru', 'To · Mysuru'].map(label => (
            <div key={label} style={{ flex: 1 }}>
              <div style={{
                background: surfHigh,
                borderBottom: `2px solid ${primary}`,
                borderRadius: '4px 4px 0 0',
                padding: '10px 12px', fontSize: 13, color: onSurf,
              }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Date field */}
        <div>
          <div style={{
            background: surfHigh,
            border: `1px solid ${outlineVar}`,
            borderBottom: `2px solid ${primary}`,
            borderRadius: '4px 4px 0 0',
            padding: '10px 12px', fontSize: 13, color: onSurf,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: onSurfVar }}>calendar_today</span>
            14 Jun 2026
          </div>
        </div>

        {/* CTA button */}
        <button style={{
          background: secondary, color: onSec,
          border: 'none', borderRadius: 100,
          padding: '11px 24px', fontWeight: 700, fontSize: 14,
          cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>search</span>
          Search Buses
        </button>
      </div>

      {/* Results row sample */}
      <div style={{
        background: surface, border: `1px solid ${outlineVar}`,
        borderRadius: 10, overflow: 'hidden',
      }}>
        <div style={{
          background: surfLow, borderBottom: `1px solid ${outlineVar}`,
          padding: '8px 14px', fontSize: 11, fontWeight: 700,
          letterSpacing: 0.5, textTransform: 'uppercase', color: onSurfVar,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span>12 buses found</span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: surface, border: `1px solid ${outlineVar}`,
            borderRadius: 100, padding: '3px 10px', fontSize: 11,
            color: onSurf, fontWeight: 500, textTransform: 'none', letterSpacing: 0,
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 12 }}>tune</span>
            Class Type
          </span>
        </div>
        {[
          { name: 'AIRAVAT CLUB CLASS', time: '06:30', fare: '₹ 899', seats: '14 seats' },
          { name: 'RAJAHAMSA AC',       time: '08:00', fare: '₹ 650', seats: '22 seats' },
        ].map((bus, i) => (
          <div key={bus.name} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 14px',
            borderBottom: i === 0 ? `1px solid ${outlineVar}` : 'none',
            gap: 12,
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: onSurf }}>{bus.name}</div>
              <div style={{ fontSize: 11, color: onSurfVar, marginTop: 2 }}>
                {bus.time} · {bus.fare} · {bus.seats}
              </div>
            </div>
            <button style={{
              background: secondary, color: onSec,
              border: 'none', borderRadius: 100,
              padding: '5px 14px', fontWeight: 700, fontSize: 12,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>Select</button>
          </div>
        ))}
      </div>

      {/* Chips + badge row */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {[
          { label: 'Confirmed', bg: tertiary, tx: '#fff' },
          { label: 'In Progress', bg: secCont, tx: onSurf },
          { label: 'Cancelled', bg: '#FEF2F2', tx: error },
        ].map(c => (
          <span key={c.label} style={{
            background: c.bg, color: c.tx,
            borderRadius: 100, padding: '4px 12px',
            fontSize: 11, fontWeight: 700,
          }}>
            {c.label}
          </span>
        ))}
        {/* Outlined secondary button */}
        <button style={{
          background: 'transparent', color: primary,
          border: `1.5px solid ${primary}`, borderRadius: 100,
          padding: '5px 14px', fontWeight: 600, fontSize: 12,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          View Details
        </button>
        {/* Error state field */}
        <div style={{ flex: 1, minWidth: 140 }}>
          <div style={{
            background: surfHigh, borderBottom: `2px solid ${error}`,
            borderRadius: '4px 4px 0 0', padding: '6px 10px', fontSize: 11, color: error,
          }}>
            Invalid date
          </div>
          <div style={{ fontSize: 10, color: error, paddingLeft: 4, marginTop: 2 }}>
            Please select a valid date
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN STORY COMPONENT
────────────────────────────────────────────────────────────────── */
function ThemeCustomizerUI() {
  const [activePreset, setActivePreset] = useState('OPRS Default');
  const [tokenValues, setTokenValues]   = useState({ ...DEFAULT_TOKENS });
  const [copied, setCopied]             = useState(false);

  // Apply all token values to :root whenever they change
  useEffect(() => {
    Object.entries(tokenValues).forEach(([cssVar, val]) => {
      document.documentElement.style.setProperty(cssVar, val);
    });
    // Cleanup — remove overrides when component unmounts
    return () => {
      Object.keys(tokenValues).forEach(cssVar => {
        document.documentElement.style.removeProperty(cssVar);
      });
    };
  }, [tokenValues]);

  const handleChange = useCallback((cssVar, val) => {
    setTokenValues(prev => ({ ...prev, [cssVar]: val }));
    setActivePreset(null); // no longer matches any preset
  }, []);

  const applyPreset = (name) => {
    setActivePreset(name);
    setTokenValues({ ...PRESETS[name] });
  };

  const resetToDefault = () => {
    applyPreset('OPRS Default');
  };

  const copyCSS = () => {
    const lines = Object.entries(tokenValues)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join('\n');
    const css = `:root {\n${lines}\n}`;
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '360px 1fr',
      minHeight: '100vh',
      fontFamily: 'var(--font-family-base, Roboto, sans-serif)',
    }}>

      {/* ── Left panel: controls ── */}
      <div style={{
        background: 'var(--color-surface-container-low, #EEF2F9)',
        borderRight: '1px solid var(--color-outline-variant, #C4C6D0)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--color-outline-variant, #C4C6D0)',
          background: 'var(--color-surface, #fff)',
        }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-on-surface)', letterSpacing: 0.3 }}>
            Theme Customizer
          </div>
          <div style={{ fontSize: 11, color: 'var(--color-on-surface-variant)', marginTop: 2 }}>
            Changes update every component live
          </div>
        </div>

        {/* Preset buttons */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-outline-variant, #C4C6D0)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--color-on-surface-variant)', marginBottom: 8 }}>
            Presets
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {Object.keys(PRESETS).map(name => (
              <button
                key={name}
                onClick={() => applyPreset(name)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 100,
                  border: `1.5px solid ${activePreset === name ? 'var(--color-primary)' : 'var(--color-outline-variant)'}`,
                  background: activePreset === name ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: activePreset === name ? 'var(--color-on-primary)' : 'var(--color-on-surface)',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 150ms ease',
                }}
              >
                {name}
              </button>
            ))}
          </div>
          {/* Colour preview strip for active preset */}
          <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
            {['--color-primary','--color-secondary','--color-tertiary','--color-surface-container-low','--color-on-surface'].map(v => (
              <div key={v} style={{
                flex: 1, height: 6, borderRadius: 3,
                background: tokenValues[v] || '#ccc',
                border: '1px solid rgba(0,0,0,.1)',
              }} title={`${v}: ${tokenValues[v]}`} />
            ))}
          </div>
        </div>

        {/* Token groups */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {TOKEN_GROUPS.map(group => (
            <div key={group.group} style={{
              padding: '12px 20px',
              borderBottom: '1px solid var(--color-outline-variant, #C4C6D0)',
            }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--color-on-surface)', marginBottom: 2 }}>
                {group.group}
              </div>
              <div style={{ fontSize: 11, color: 'var(--color-on-surface-variant)', marginBottom: 10, lineHeight: 1.4 }}>
                {group.desc}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {group.tokens.map(t => (
                  <ColorSwatch
                    key={t.var}
                    label={t.label}
                    cssVar={t.var}
                    value={tokenValues[t.var] || '#000000'}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer buttons */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid var(--color-outline-variant, #C4C6D0)',
          background: 'var(--color-surface, #fff)',
          display: 'flex', gap: 8,
        }}>
          <button
            onClick={copyCSS}
            style={{
              flex: 1,
              padding: '9px 0',
              background: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
              border: 'none', borderRadius: 8,
              fontWeight: 700, fontSize: 13,
              cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'opacity 150ms ease',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              {copied ? 'check' : 'content_copy'}
            </span>
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
          <button
            onClick={resetToDefault}
            style={{
              padding: '9px 14px',
              background: 'var(--color-surface-container)',
              color: 'var(--color-on-surface)',
              border: '1px solid var(--color-outline-variant)',
              borderRadius: 8,
              fontWeight: 600, fontSize: 13,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* ── Right panel: live preview ── */}
      <div style={{
        background: tokenValues['--color-background'] || '#F1F4FB',
        padding: 32,
        overflowY: 'auto',
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: 0.6, color: tokenValues['--color-on-surface-variant'] || '#44464F',
          marginBottom: 16,
        }}>
          Live Preview — updates as you edit
        </div>

        <div style={{ maxWidth: 500 }}>
          <LivePreview tokens={tokenValues} />
        </div>

        {/* Token export preview */}
        <div style={{ marginTop: 28, maxWidth: 500 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: 0.6, color: tokenValues['--color-on-surface-variant'] || '#44464F',
            marginBottom: 10,
          }}>
            CSS Output
          </div>
          <pre style={{
            background: '#1e1e2e',
            color: '#cdd6f4',
            borderRadius: 10,
            padding: '14px 18px',
            fontSize: 11,
            lineHeight: 1.7,
            overflow: 'auto',
            maxHeight: 320,
            margin: 0,
            fontFamily: 'monospace',
          }}>
            {`:root {\n${
              Object.entries(tokenValues)
                .map(([k, v]) => `  ${k}: ${v};`)
                .join('\n')
            }\n}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export const Customizer = {
  name: 'Theme Customizer',
  render: () => <ThemeCustomizerUI />,
};
