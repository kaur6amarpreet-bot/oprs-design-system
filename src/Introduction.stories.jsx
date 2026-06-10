import React from 'react';
import { Button }          from './components/Button/Button';
import { Chip }            from './components/Chip/Chip';
import { TicketStub }      from './components/TicketStub/TicketStub';

export default {
  title: 'Introduction',
  parameters: {
    docs:     { page: null },
    controls: { disable: true },
    a11y:     { disable: true },
    backgrounds: { default: 'canvas' },
    layout: 'fullscreen',
  },
};

const components = [
  { name: 'Button',          status: 'stable', path: '?path=/docs/components-button--docs',           preview: <><Button variant="filled" size="sm">Filled</Button><Button variant="outlined" size="sm" style={{marginLeft:8}}>Outlined</Button></> },
  { name: 'Card',            status: 'stable', path: '?path=/docs/components-card--docs',             preview: <div style={{width:100,height:56,background:'#fff',borderRadius:10,boxShadow:'0 1px 4px rgba(0,0,0,.15)'}} /> },
  { name: 'TextField',       status: 'stable', path: '?path=/docs/components-textfield--docs',        preview: <div style={{border:'1.5px solid #74777F',borderRadius:4,height:32,width:120,background:'#fff',padding:'0 8px',display:'flex',alignItems:'center',fontSize:12,color:'#9e9e9e'}}>City name</div> },
  { name: 'Chip',            status: 'stable', path: '?path=/docs/components-chip--docs',             preview: <><Chip variant="filter" selected>AC</Chip><Chip variant="filter" style={{marginLeft:6}}>Non-AC</Chip></> },
  { name: 'SegmentedButton', status: 'stable', path: '?path=/docs/components-segmentedbutton--docs',  preview: <div style={{display:'flex',border:'1.5px solid #74777F',borderRadius:999,overflow:'hidden',fontSize:11}}><span style={{padding:'4px 10px',background:'#D6E4FF',color:'#1A56A0',fontWeight:600}}>One-Way</span><span style={{padding:'4px 10px',color:'#44464F'}}>Return</span></div> },
  { name: 'TopAppBar',       status: 'stable', path: '?path=/docs/components-topappbar--docs',        preview: <div style={{width:120,height:28,background:'#1A56A0',borderRadius:6,display:'flex',alignItems:'center',paddingLeft:8,gap:6}}><span style={{width:14,height:14,borderRadius:'50%',background:'rgba(255,255,255,.2)'}} /><span style={{width:50,height:6,borderRadius:3,background:'rgba(255,255,255,.6)'}} /></div> },
  { name: 'Checkbox',        status: 'stable', path: '?path=/docs/components-checkbox--docs',         preview: <div style={{display:'flex',alignItems:'center',gap:6,fontSize:12}}><div style={{width:18,height:18,borderRadius:4,background:'#1A56A0',display:'flex',alignItems:'center',justifyContent:'center'}}><span className="material-symbols-outlined" style={{fontSize:12,color:'#fff'}}>check</span></div>Single Lady</div> },
  { name: 'RadioButton',     status: 'stable', path: '?path=/docs/components-radiobutton--docs',      preview: <div style={{display:'flex',alignItems:'center',gap:6,fontSize:12}}><div style={{width:18,height:18,borderRadius:'50%',border:'2px solid #1A56A0',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:8,height:8,borderRadius:'50%',background:'#1A56A0'}} /></div>Adult</div> },
  { name: 'Toggle',          status: 'stable', path: '?path=/docs/components-toggle--docs',           preview: <div style={{width:44,height:26,borderRadius:999,background:'#1A56A0',position:'relative'}}><div style={{position:'absolute',right:3,top:3,width:20,height:20,borderRadius:'50%',background:'#fff'}} /></div> },
  { name: 'Tabs',            status: 'stable', path: '?path=/docs/components-tabs--docs',             preview: <div style={{display:'flex',gap:0,borderBottom:'1px solid #E2E8F3',fontSize:11}}><span style={{padding:'6px 10px',borderBottom:'3px solid #1A56A0',color:'#1A56A0',fontWeight:600}}>Onward</span><span style={{padding:'6px 10px',color:'#74777F'}}>Return</span></div> },
  { name: 'Badge',           status: 'stable', path: '?path=/docs/components-badge--docs',            preview: <div style={{position:'relative',display:'inline-block'}}><span className="material-symbols-outlined" style={{fontSize:24}}>notifications</span><span style={{position:'absolute',top:-4,right:-4,width:14,height:14,borderRadius:'50%',background:'#D84315',fontSize:9,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700}}>3</span></div> },
  { name: 'Divider',         status: 'stable', path: '?path=/docs/components-divider--docs',          preview: <div style={{width:120,height:1,background:'#C4C6D0'}} /> },
  { name: 'Progress',        status: 'stable', path: '?path=/docs/components-progress--docs',         preview: <div style={{width:100,height:4,background:'#DCE3EE',borderRadius:4,overflow:'hidden'}}><div style={{width:'65%',height:'100%',background:'#1A56A0',borderRadius:4}} /></div> },
  { name: 'Snackbar',        status: 'stable', path: '?path=/docs/components-snackbar--docs',         preview: <div style={{background:'#2F3033',color:'#fff',borderRadius:8,padding:'6px 10px',fontSize:11,display:'flex',alignItems:'center',gap:6}}><span className="material-symbols-outlined" style={{fontSize:14,color:'#69e96a'}}>check_circle</span>Booking confirmed</div> },
  { name: 'Dialog',          status: 'stable', path: '?path=/docs/components-dialog--docs',           preview: <div style={{border:'1px solid #E2E8F3',borderRadius:12,background:'#fff',padding:'10px 14px',width:110,boxShadow:'0 4px 12px rgba(0,0,0,.12)',fontSize:11}}><div style={{fontWeight:600,marginBottom:4}}>Cancel booking?</div><div style={{display:'flex',justifyContent:'flex-end',gap:6}}><span style={{fontSize:10,color:'#1A56A0'}}>Keep</span><span style={{fontSize:10,color:'#D84315',fontWeight:600}}>Cancel</span></div></div> },
  { name: 'EmptyState',      status: 'stable', path: '?path=/docs/components-emptystate--docs',       preview: <div style={{textAlign:'center',padding:'4px 0'}}><span className="material-symbols-outlined" style={{fontSize:28,color:'#C4C6D0'}}>search_off</span><div style={{fontSize:10,color:'#74777F',marginTop:2}}>No buses found</div></div> },
  { name: 'Skeleton',        status: 'stable', path: '?path=/docs/components-skeleton--docs',         preview: <div style={{display:'flex',flexDirection:'column',gap:6,padding:'4px 0'}}>{[100,80,60].map(w=><div key={w} style={{height:8,borderRadius:4,background:'linear-gradient(90deg,#E2E8F3 25%,#EEF2F9 50%,#E2E8F3 75%)',width:w}} />)}</div> },
  { name: 'SectionHeader',   status: 'stable', path: '?path=/docs/components-sectionheader--docs',    preview: <div style={{width:120,height:28,background:'#1A56A0',borderRadius:4,display:'flex',alignItems:'center',paddingLeft:10,gap:6}}><span style={{width:40,height:5,borderRadius:3,background:'rgba(255,255,255,.7)'}} /><span style={{width:20,height:5,borderRadius:3,background:'rgba(255,255,255,.35)'}} /></div> },
  { name: 'DataTable',       status: 'stable', path: '?path=/docs/components-datatable--docs',        preview: <div style={{border:'1px solid #E2E8F3',borderRadius:6,overflow:'hidden',width:110}}><div style={{background:'#EEF2F9',height:18,display:'flex',alignItems:'center',padding:'0 6px',gap:4}}>{[40,30,25].map((w,i)=><div key={i} style={{height:4,width:w,background:'#C4C6D0',borderRadius:2}} />)}</div>{[0,1].map(r=><div key={r} style={{height:16,display:'flex',alignItems:'center',padding:'0 6px',gap:4,borderTop:'1px solid #F1F4FB'}}>{[40,30,25].map((w,i)=><div key={i} style={{height:3,width:w,background:'#E2E8F3',borderRadius:2}} />)}</div>)}</div> },
  { name: 'Select',          status: 'stable', path: '?path=/docs/components-select--docs',           preview: <div style={{border:'1.5px solid #74777F',borderRadius:4,height:32,width:120,background:'#ECE6F0',padding:'0 8px',display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:11}}><span style={{color:'#44464F'}}>Select city</span><span style={{fontSize:14,color:'#49454E'}}>▾</span></div> },
  { name: 'DatePicker',      status: 'stable', path: '?path=/docs/components-datepicker--docs',       preview: <div style={{border:'1.5px solid #74777F',borderRadius:4,height:32,width:120,background:'#ECE6F0',padding:'0 8px',display:'flex',alignItems:'center',gap:6,fontSize:11}}><span className="material-symbols-outlined" style={{fontSize:14,color:'#49454E'}}>calendar_today</span><span style={{color:'#44464F'}}>14 Jun 2026</span></div> },
  { name: 'SeatMap',         status: 'stable', path: '?path=/docs/oprs-specific-seatmap--docs',       preview: <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:3}}>{[{s:'available'},{s:'ladies'},{s:'blocked'},{s:'available'},{s:'selected'},{s:'available'}].map((c,i)=><div key={i} style={{width:20,height:22,borderRadius:4,border:'1.5px solid',background:c.s==='available'?'#E8F5E9':c.s==='ladies'?'#FCE4EC':c.s==='selected'?'#D6E4FF':'#ECEFF1',borderColor:c.s==='available'?'#A5D6A7':c.s==='ladies'?'#F48FB1':c.s==='selected'?'#1A56A0':'#B0BEC5'}} />)}</div> },
  { name: 'TicketStub',      status: 'stable', path: '?path=/docs/oprs-specific-ticketstub--docs',    preview: <div style={{border:'1.5px dashed #bdbdbd',borderRadius:8,padding:'6px 10px',background:'#fff',fontSize:10,width:110}}><div style={{color:'#1A56A0',fontWeight:700,fontSize:9,marginBottom:2}}>OPRS</div><div style={{fontWeight:700}}>BLR → MYS</div><div style={{color:'#2E7D32',fontWeight:700,letterSpacing:1,marginTop:2}}>OPRS24001</div></div> },
  { name: 'NavigationDrawer',status: 'stable', path: '?path=/docs/oprs-specific-navigationdrawer--docs', preview: <div style={{width:56,height:72,borderRadius:'0 8px 8px 0',background:'#1A56A0',padding:'6px 8px',display:'flex',flexDirection:'column',gap:4}}>{[60,45,50].map((w,i)=><div key={i} style={{height:4,width:`${w}%`,background:'rgba(255,255,255,.5)',borderRadius:2}} />)}</div> },
  { name: 'FareSummary',     status: 'stable', path: '?path=/docs/oprs-specific-faresummary--docs',   preview: <div style={{border:'1px solid #E2E8F3',borderRadius:8,padding:'6px 10px',width:110,fontSize:10}}>{[['Base fare','₹ 899'],['Discount','-₹ 60'],['Total','₹ 839']].map(([l,v],i)=><div key={i} style={{display:'flex',justifyContent:'space-between',marginBottom:2}}><span style={{color:'#74777F'}}>{l}</span><span style={{fontWeight:i===2?700:400,color:i===1?'#2E7D32':'#1A1C1E'}}>{v}</span></div>)}</div> },
  { name: 'FilterDropdown',  status: 'stable', path: '?path=/docs/oprs-specific-filterdropdown--docs', preview: <div style={{display:'inline-flex',alignItems:'center',gap:4,padding:'4px 10px',background:'#F7F2FA',border:'1px solid #CAC4D0',borderRadius:999,fontSize:11,color:'#1C1B1F'}}><span className="material-symbols-outlined" style={{fontSize:13}}>tune</span>Class Type<span className="material-symbols-outlined" style={{fontSize:13}}>expand_more</span></div> },
  { name: 'StatItem',        status: 'stable', path: '?path=/docs/oprs-specific-statitem--docs',      preview: <div style={{display:'flex',gap:12,padding:'4px 0'}}>{[['Seats','22'],['Fare','₹ 899']].map(([l,v])=><div key={l}><div style={{fontSize:9,color:'#74777F',textTransform:'uppercase',letterSpacing:.5}}>{l}</div><div style={{fontSize:13,fontWeight:700,color:'#1A56A0'}}>{v}</div></div>)}</div> },
];

const statusLabel = { stable: 'Stable', beta: 'Beta', new: 'New', deprecated: 'Deprecated' };
const statusColor = {
  stable:     { bg: '#E8F5E9', color: '#2E7D32' },
  beta:       { bg: '#FFF9C4', color: '#F57F17' },
  new:        { bg: '#E3F2FD', color: '#1565C0' },
  deprecated: { bg: '#FAFAFA', color: '#9E9E9E' },
};

export const Welcome = {
  name: 'Welcome',
  render: () => (
    <div style={{ fontFamily: "'Roboto', sans-serif", maxWidth: 1100, margin: '0 auto', padding: '0 32px 64px' }}>

      {/* ── Hero ───────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #0D3370 0%, #1A56A0 60%, #1565C0 100%)',
        borderRadius: 20,
        padding: '52px 48px',
        color: '#fff',
        marginBottom: 48,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,.05)' }} />
        <div style={{ position:'absolute', bottom:-30, right:80,  width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,.04)' }} />

        <div style={{ display:'flex', alignItems:'flex-start', gap:20, position:'relative' }}>
          <div style={{ width:56, height:56, borderRadius:14, background:'rgba(255,255,255,.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <span className="material-symbols-outlined" style={{ fontSize:30, color:'#fff' }}>directions_bus</span>
          </div>
          <div>
            <div style={{ fontSize:12, fontWeight:600, letterSpacing:1.2, textTransform:'uppercase', opacity:.7, marginBottom:6 }}>OPRS Portal</div>
            <h1 style={{ fontSize:36, fontWeight:700, lineHeight:1.15, margin:0, letterSpacing:-.5 }}>OPRS<br />Design System</h1>
            <p style={{ fontSize:15, opacity:.8, marginTop:12, lineHeight:1.6, maxWidth:480 }}>
              A token-driven component library built on Material Design 3. Consistent, accessible, and aligned to the OPRS product language.
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginTop:24 }}>
              {[
                { icon:'widgets',     label:`${components.length} Components` },
                { icon:'palette',     label:'MD3 Tokens'       },
                { icon:'devices',     label:'Responsive'       },
                { icon:'accessibility',label:'WCAG 2.1 AA'     },
              ].map(b => (
                <div key={b.label} style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(255,255,255,.12)', borderRadius:999, padding:'6px 14px', fontSize:13, fontWeight:500 }}>
                  <span className="material-symbols-outlined" style={{ fontSize:16 }}>{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick stats ─────────────────────────────────── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:48 }}>
        {[
          { num:`${components.length}`, label:'Components',    icon:'widgets',     color:'#1A56A0' },
          { num:'77',    label:'Stories',       icon:'auto_stories', color:'#D84315' },
          { num:'5',     label:'Token layers',  icon:'layers',      color:'#2E7D32' },
          { num:'100%',  label:'MD3 aligned',   icon:'check_circle', color:'#6750A4' },
        ].map(s => (
          <div key={s.label} style={{ background:'#fff', borderRadius:14, padding:'20px 20px', border:'1px solid #E2E8F3', display:'flex', flexDirection:'column', gap:8 }}>
            <span className="material-symbols-outlined" style={{ fontSize:22, color:s.color }}>{s.icon}</span>
            <div style={{ fontSize:28, fontWeight:700, color:s.color, lineHeight:1 }}>{s.num}</div>
            <div style={{ fontSize:13, color:'#44464F' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Component index ─────────────────────────────── */}
      <div style={{ marginBottom:48 }}>
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:20 }}>
          <h2 style={{ fontSize:20, fontWeight:600, color:'#1A1C1E', margin:0 }}>All Components</h2>
          <span style={{ fontSize:12, color:'#74777F' }}>{components.length} components · all stable</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(175px, 1fr))', gap:14 }}>
          {components.map(c => {
            const sc = statusColor[c.status];
            return (
              <a key={c.name} href={c.path} style={{ textDecoration:'none' }}>
                <div style={{
                  border:'1px solid #E2E8F3', borderRadius:14, overflow:'hidden',
                  background:'#fff', cursor:'pointer',
                  transition:'box-shadow 150ms, border-color 150ms, transform 150ms',
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow='0 4px 16px rgba(26,86,160,.14)'; e.currentTarget.style.borderColor='#A8C8FF'; e.currentTarget.style.transform='translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='#E2E8F3'; e.currentTarget.style.transform='none'; }}
                >
                  <div style={{ height:96, background:'#F8FAFF', display:'flex', alignItems:'center', justifyContent:'center', padding:12 }}>
                    {c.preview}
                  </div>
                  <div style={{ padding:'10px 12px', borderTop:'1px solid #F1F4FB' }}>
                    <div style={{ fontSize:13, fontWeight:500, color:'#1A1C1E' }}>{c.name}</div>
                    <div style={{ marginTop:5 }}>
                      <span style={{ fontSize:10, fontWeight:700, letterSpacing:.4, textTransform:'uppercase', background:sc.bg, color:sc.color, borderRadius:999, padding:'2px 7px' }}>
                        {statusLabel[c.status]}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* ── Design Tokens section ───────────────────────── */}
      <div style={{ marginBottom:48 }}>
        <h2 style={{ fontSize:20, fontWeight:600, color:'#1A1C1E', marginBottom:20 }}>Design Tokens</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:14 }}>
          {[
            { title:'Color',      desc:'Brand, semantic, seat map', icon:'palette',     path:'?path=/docs/design-tokens-overview--color-tokens' },
            { title:'Typography', desc:'MD3 type scale — Roboto',    icon:'text_fields', path:'?path=/docs/design-tokens-overview--typography' },
            { title:'Spacing',    desc:'4px base unit system',        icon:'space_bar',   path:'?path=/docs/design-tokens-overview--spacing-scale' },
            { title:'Elevation',  desc:'5-level shadow system',       icon:'layers',      path:'?path=/docs/design-tokens-overview--elevation' },
            { title:'Shape',      desc:'Border radius scale',         icon:'rounded_corner', path:'?path=/docs/design-tokens-overview--shape-border-radius' },
          ].map(t => (
            <a key={t.title} href={t.path} style={{ textDecoration:'none' }}>
              <div style={{ border:'1px solid #E2E8F3', borderRadius:14, padding:'18px 18px', background:'#fff', cursor:'pointer', transition:'box-shadow 150ms, border-color 150ms' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow='0 2px 10px rgba(26,86,160,.1)'; e.currentTarget.style.borderColor='#A8C8FF'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='#E2E8F3'; }}
              >
                <span className="material-symbols-outlined" style={{ fontSize:24, color:'#1A56A0', marginBottom:8, display:'block' }}>{t.icon}</span>
                <div style={{ fontSize:14, fontWeight:600, color:'#1A1C1E' }}>{t.title}</div>
                <div style={{ fontSize:12, color:'#74777F', marginTop:3 }}>{t.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── Getting started ─────────────────────────────── */}
      <div style={{ background:'#fff', border:'1px solid #E2E8F3', borderRadius:16, padding:'28px 32px' }}>
        <h2 style={{ fontSize:18, fontWeight:600, color:'#1A1C1E', marginBottom:16 }}>How to use</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:20 }}>
          {[
            { step:'1', title:'Browse components',    desc:'Use the sidebar to navigate. Each component has a Docs page + individual stories.', icon:'explore' },
            { step:'2', title:'Try the controls',     desc:'In any story, open the Controls panel (bottom) to modify props live and see the effect.', icon:'tune' },
            { step:'3', title:'Check the tokens',     desc:'All values come from Design Tokens. Change a token → every component updates.', icon:'palette' },
            { step:'4', title:'Test responsiveness',  desc:'Use the viewport switcher in the toolbar to preview on mobile, tablet, and desktop.', icon:'devices' },
          ].map(s => (
            <div key={s.step} style={{ display:'flex', gap:14 }}>
              <div style={{ width:32, height:32, borderRadius:'50%', background:'#D6E4FF', color:'#1A56A0', fontWeight:700, fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{s.step}</div>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:'#1A1C1E', marginBottom:4 }}>{s.title}</div>
                <div style={{ fontSize:12, color:'#44464F', lineHeight:1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  ),
};
