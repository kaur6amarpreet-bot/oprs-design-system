import React, { useState } from 'react';

export default {
  title: 'Design Tokens/Icons',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        component: `
Material Symbols Outlined — the icon set used throughout OPRS.

All icons are loaded via Google Fonts. Use the icon name as the text content of a \`<span class="material-symbols-outlined">\` element.

\`\`\`html
<span class="material-symbols-outlined">directions_bus</span>
\`\`\`

Click any icon to copy its name to clipboard.
        `,
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ICON CATALOGUE  — add / remove names freely, organised by category
// ─────────────────────────────────────────────────────────────────────────────
const ICONS = {
  'OPRS / Transport': [
    'directions_bus','bus_alert','departure_board','airport_shuttle','directions_transit',
    'local_taxi','directions_car','two_wheeler','electric_bus','commute',
    'trip_origin','place','map','route','alt_route','my_location','near_me',
    'location_on','location_off','pin_drop','explore','navigation','turn_right','turn_left',
    'u_turn_left','u_turn_right','straight','roundabout_right','fork_right',
    'event_seat','airline_seat_recline_extra','airline_seat_recline_normal',
    'king_bed','weekend','chair','chair_alt','bed','single_bed',
    'luggage','no_luggage','backpack','work','travel_explore',
    'train','subway','tram','cable_car','gondola_lift','ferry','directions_boat',
    'flight','flight_takeoff','flight_land','local_airport',
  ],

  'Navigation': [
    'home','menu','close','arrow_back','arrow_forward','arrow_upward','arrow_downward',
    'chevron_left','chevron_right','expand_more','expand_less','unfold_more','unfold_less',
    'first_page','last_page','more_vert','more_horiz','apps','grid_view','view_list',
    'view_module','view_agenda','view_carousel','dashboard','space_dashboard',
    'fullscreen','fullscreen_exit','open_in_new','launch','open_in_full','close_fullscreen',
    'swap_horiz','swap_vert','sync','refresh','restart_alt','replay',
    'drag_indicator','drag_handle','reorder','sort','filter_list','filter_alt',
    'search','saved_search','find_replace','manage_search',
  ],

  'Actions': [
    'add','remove','delete','delete_outline','delete_sweep',
    'edit','edit_note','edit_square','draw','create',
    'save','save_as','download','upload','share','send',
    'copy','content_copy','content_paste','content_cut',
    'undo','redo','history','restore','restore_from_trash',
    'print','print_disabled','qr_code','qr_code_2','qr_code_scanner',
    'lock','lock_open','key','no_encryption','security',
    'settings','settings_suggest','tune','build','handyman',
    'verified','verified_user','fact_check','check','check_circle','check_circle_outline',
    'done','done_all','done_outline','cancel','block','not_interested',
    'info','info_outline','help','help_outline','warning','error','error_outline',
    'report','report_problem','announcement','priority_high',
    'flag','bookmark','star','star_outline','star_half','favorite','favorite_outline',
    'thumb_up','thumb_down','mood','mood_bad','sentiment_satisfied','sentiment_dissatisfied',
  ],

  'Communication': [
    'call','call_end','phone','phone_android','phone_iphone','smartphone',
    'message','messages','sms','chat','chat_bubble','comment','forum',
    'email','mail','mail_outline','inbox','outbox','drafts','send',
    'notifications','notifications_active','notifications_none','notifications_off',
    'notification_add','circle_notifications','alarm','alarm_on','alarm_off',
    'contact_mail','contact_phone','contacts','person','person_outline',
    'people','people_outline','group','group_add','groups','account_circle',
    'support_agent','headset','headset_mic','record_voice_over',
  ],

  'Content / Data': [
    'article','description','feed','notes','subject','text_snippet',
    'receipt','receipt_long','summarize','inventory','inventory_2',
    'list','format_list_bulleted','format_list_numbered','checklist',
    'table_chart','grid_on','grid_off','table_rows','table_view',
    'bar_chart','pie_chart','area_chart','show_chart','insights','analytics',
    'trending_up','trending_down','trending_flat','leaderboard','assessment',
    'folder','folder_open','folder_shared','create_new_folder','folder_zip',
    'file_copy','attach_file','attachment','link','link_off',
    'image','broken_image','photo','panorama','image_search',
    'video_file','video_call','movie','play_circle','pause_circle',
    'mic','mic_off','volume_up','volume_off','hearing',
    'code','data_object','data_array','developer_mode','terminal',
    'cloud','cloud_upload','cloud_download','cloud_sync','cloud_off',
    'database','storage','memory','device_hub','dns',
    'tag','label','labels','sell','loyalty',
  ],

  'Finance / Payment': [
    'payments','payment','credit_card','credit_score','contactless',
    'currency_rupee','money','attach_money','price_check','price_change',
    'account_balance','account_balance_wallet','savings','wallet',
    'receipt','receipt_long','request_quote','calculate','percent',
    'discount','local_offer','redeem','card_giftcard','gift',
    'shopping_cart','shopping_bag','add_shopping_cart','remove_shopping_cart',
    'point_of_sale','store','storefront','sell','shopping_basket',
    'confirmation_number','local_activity','ticket','event','event_available',
    'qr_code','qr_code_2','barcode','barcode_scanner',
  ],

  'Time / Calendar': [
    'calendar_today','calendar_month','calendar_view_day','calendar_view_week','calendar_view_month',
    'event','event_available','event_busy','event_note','event_repeat',
    'schedule','access_time','watch_later','timelapse','hourglass_empty',
    'hourglass_top','hourglass_bottom','hourglass_full','hourglass_disabled',
    'timer','timer_10','timer_3','alarm','alarm_add','alarm_on','alarm_off',
    'update','pending','pending_actions','history','history_toggle_off',
    'today','date_range','date_range_off','next_week','next_plan',
    'av_timer','more_time','time_auto','watch','workspaces',
  ],

  'Person / User': [
    'person','person_outline','person_add','person_remove','person_off',
    'account_circle','account_box','manage_accounts','badge','id_card',
    'group','group_add','groups','people','people_outline','diversity_1',
    'face','face_2','face_3','self_improvement','emoji_people','accessible',
    'child_care','elderly','man','woman','boy','girl','pregnant_woman',
    'supervisor_account','support_agent','engineering','construction',
    'medical_services','local_hospital','health_and_safety','emergency',
  ],

  'Places / Maps': [
    'location_on','location_off','location_city','location_pin','location_searching',
    'place','near_me','near_me_disabled','explore','explore_off','navigation',
    'map','maps_home_work','satellite_alt','terrain','traffic',
    'directions','directions_alt','alt_route','fork_right','fork_left',
    'home','home_work','apartment','domain','business','store',
    'local_hospital','local_police','local_fire_department',
    'hotel','restaurant','coffee','local_cafe','local_dining',
    'local_gas_station','local_parking','local_atm','local_mall',
    'stadium','museum','park','beach_access','casino','spa',
    'airport_shuttle','local_airport','flight','directions_bus',
  ],

  'UI / Interface': [
    'visibility','visibility_off','preview','pageview',
    'zoom_in','zoom_out','zoom_in_map','zoom_out_map',
    'dark_mode','light_mode','brightness_auto','contrast',
    'palette','color_lens','format_paint','brush','ink',
    'touch_app','pan_tool','mouse','trackpad','keyboard',
    'screen_share','present_to_all','cast','cast_connected',
    'widgets','extension','layers','layers_clear','stacks',
    'crop','crop_free','aspect_ratio','photo_size_select_large',
    'format_size','text_fields','title','font_download',
    'format_bold','format_italic','format_underlined','strikethrough_s',
    'align_horizontal_left','align_horizontal_center','align_horizontal_right',
    'vertical_align_top','vertical_align_center','vertical_align_bottom',
    'space_bar','keyboard_return','keyboard_tab','keyboard_backspace',
    'power_settings_new','restart_alt','lock_reset','no_accounts',
    'toggle_on','toggle_off','radio_button_checked','radio_button_unchecked',
    'check_box','check_box_outline_blank','indeterminate_check_box',
    'circle','trip_origin','square','rectangle','hexagon','pentagon',
  ],

  'Status / Feedback': [
    'check_circle','check_circle_outline','cancel','error','error_outline',
    'warning','warning_amber','info','info_outline','help','help_outline',
    'report','report_problem','announcement','priority_high','new_releases',
    'verified','verified_user','gpp_good','gpp_bad','gpp_maybe',
    'shield','security','lock','lock_open','privacy_tip',
    'thumb_up','thumb_down','sentiment_very_satisfied','sentiment_satisfied',
    'sentiment_neutral','sentiment_dissatisfied','sentiment_very_dissatisfied',
    'mood','mood_bad','psychology','psychology_alt','emoji_emotions',
    'celebration','star','star_outline','grade','military_tech','workspace_premium',
    'emoji_events','trophy','medal','tour','local_activity',
  ],
};

const ALL_ICON_NAMES = Object.values(ICONS).flat();
const CATEGORIES = Object.keys(ICONS);

// ─────────────────────────────────────────────────────────────────────────────

function IconTile({ name, onCopy }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(name).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
    onCopy?.(name);
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={copy}
      onKeyDown={e => e.key === 'Enter' && copy()}
      title={name}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 6, padding: '12px 8px',
        borderRadius: 8, cursor: 'pointer', userSelect: 'none',
        background: copied ? 'var(--color-primary-container)' : 'var(--color-surface)',
        border: `1px solid ${copied ? 'var(--color-primary)' : 'var(--color-outline-variant)'}`,
        transition: 'all 0.15s ease', minWidth: 72, minHeight: 72,
        outline: 'none',
      }}
      onMouseEnter={e => { if (!copied) e.currentTarget.style.background = 'var(--color-surface-container-low)'; }}
      onMouseLeave={e => { if (!copied) e.currentTarget.style.background = 'var(--color-surface)'; }}
    >
      <span
        className="material-symbols-outlined"
        style={{ fontSize: 24, color: copied ? 'var(--color-primary)' : 'var(--color-on-surface)' }}
      >
        {copied ? 'check' : name}
      </span>
      <span style={{
        fontSize: 9,
        textAlign: 'center', lineHeight: 1.3, maxWidth: 64,
        wordBreak: 'break-all', fontFamily: 'monospace',
        color: copied ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
      }}>
        {copied ? 'Copied!' : name}
      </span>
    </div>
  );
}

export const Gallery = {
  name: 'Icon Gallery',
  render: () => {
    const [query,    setQuery]    = useState('');
    const [category, setCategory] = useState('All');
    const [lastCopied, setLastCopied] = useState('');

    const q = query.toLowerCase().replace(/\s+/g, '_');

    const filtered = (() => {
      const src = category === 'All'
        ? Object.entries(ICONS)
        : [[category, ICONS[category]]];
      if (!q) return src;
      return src
        .map(([cat, names]) => [cat, names.filter(n => n.includes(q))])
        .filter(([, names]) => names.length > 0);
    })();

    const totalShown = filtered.reduce((s, [, n]) => s + n.length, 0);

    return (
      <div style={{ fontFamily: 'var(--font-family-base)', color: 'var(--color-on-surface)' }}>

        {/* Search + filter bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-outline-variant)',
          padding: '16px 0 12px', marginBottom: 24,
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'var(--color-surface-container-high)',
              borderRadius: 'var(--shape-full)', padding: '8px 16px',
              flex: '1 1 240px', maxWidth: 360,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-on-surface-variant)' }}>search</span>
              <input
                type="text"
                placeholder="Search icons…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{
                  border: 'none', outline: 'none', background: 'transparent',
                  fontSize: 14, color: 'var(--color-on-surface)', flex: 1,
                  fontFamily: 'inherit',
                }}
              />
              {query && (
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 16, cursor: 'pointer', color: 'var(--color-on-surface-variant)' }}
                  onClick={() => setQuery('')}
                >
                  close
                </span>
              )}
            </div>

            {/* Count */}
            <span style={{ fontSize: 13, color: 'var(--color-on-surface-variant)' }}>
              {totalShown} icon{totalShown !== 1 ? 's' : ''}
            </span>

            {/* Copy indicator */}
            {lastCopied && (
              <span style={{
                fontSize: 12, fontFamily: 'monospace',
                background: 'var(--color-primary-container)',
                color: 'var(--color-on-primary-container)',
                padding: '4px 10px', borderRadius: 20,
              }}>
                ✓ {lastCopied}
              </span>
            )}
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['All', ...CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  border: 'none', borderRadius: 'var(--shape-full)',
                  padding: '4px 12px', fontSize: 12, cursor: 'pointer',
                  fontFamily: 'inherit', fontWeight: 500,
                  background: category === cat ? 'var(--color-primary)' : 'var(--color-surface-container)',
                  color: category === cat ? 'var(--color-on-primary)' : 'var(--color-on-surface-variant)',
                  transition: 'background 0.15s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-on-surface-variant)', fontSize: 14 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 40, display: 'block', marginBottom: 12, opacity: .4 }}>search_off</span>
            No icons match "{query}"
          </div>
        ) : (
          filtered.map(([cat, names]) => (
            <div key={cat} style={{ marginBottom: 40 }}>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '.8px',
                textTransform: 'uppercase', color: 'var(--color-on-surface-variant)',
                marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8,
              }}>
                {cat}
                <span style={{
                  background: 'var(--color-surface-container)',
                  borderRadius: 10, padding: '1px 8px', fontSize: 10, fontWeight: 600,
                }}>
                  {names.length}
                </span>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))',
                gap: 8,
              }}>
                {names.map(name => (
                  <IconTile key={name} name={name} onCopy={setLastCopied} />
                ))}
              </div>
            </div>
          ))
        )}

        {/* Usage guide */}
        <div style={{
          marginTop: 40, padding: '20px 24px',
          background: 'var(--color-surface-container-low)',
          borderRadius: 12, border: '1px solid var(--color-outline-variant)',
        }}>
          <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>How to use</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-primary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.5px' }}>HTML</div>
              <pre style={{ background: 'var(--color-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: 6, padding: '10px 14px', fontSize: 12, fontFamily: 'monospace', margin: 0, overflowX: 'auto' }}>
{`<span class="material-symbols-outlined">
  directions_bus
</span>`}
              </pre>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-primary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.5px' }}>React / JSX</div>
              <pre style={{ background: 'var(--color-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: 6, padding: '10px 14px', fontSize: 12, fontFamily: 'monospace', margin: 0, overflowX: 'auto' }}>
{`<span className="material-symbols-outlined">
  directions_bus
</span>`}
              </pre>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-primary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.5px' }}>Size control</div>
              <pre style={{ background: 'var(--color-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: 6, padding: '10px 14px', fontSize: 12, fontFamily: 'monospace', margin: 0, overflowX: 'auto' }}>
{`/* CSS */
.icon-sm { font-size: 16px; }
.icon-md { font-size: 20px; }
.icon-lg { font-size: 24px; }
.icon-xl { font-size: 32px; }`}
              </pre>
            </div>
          </div>
        </div>

      </div>
    );
  },
};

export const Sizes = {
  name: 'Icon Sizes',
  render: () => (
    <div className="story-col" style={{ gap: 32 }}>
      <div className="story-section">
        <h3>Standard sizes</h3>
        <div className="story-row story-row--center" style={{ gap: 40 }}>
          {[
            { px: 16, label: '16px — inline text', usage: 'Helper text, labels' },
            { px: 18, label: '18px — buttons',     usage: 'Inside buttons' },
            { px: 20, label: '20px — default',     usage: 'Top bar, nav' },
            { px: 24, label: '24px — emphasis',    usage: 'Section headers' },
            { px: 32, label: '32px — large',       usage: 'Empty states' },
            { px: 48, label: '48px — hero',        usage: 'Splash, onboarding' },
          ].map(s => (
            <div key={s.px} style={{ textAlign: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: s.px, color: 'var(--color-primary)', display: 'block', marginBottom: 8 }}>directions_bus</span>
              <div style={{ fontSize: 11, fontWeight: 600 }}>{s.px}px</div>
              <div style={{ fontSize: 10, color: 'var(--color-on-surface-variant)', marginTop: 2 }}>{s.usage}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="story-section">
        <h3>On coloured backgrounds</h3>
        <div className="story-row story-row--center" style={{ gap: 12 }}>
          {[
            { bg: 'var(--color-primary)',           color: 'var(--color-on-primary)',           label: 'On Primary' },
            { bg: 'var(--color-secondary)',          color: 'var(--color-on-secondary)',          label: 'On Secondary' },
            { bg: 'var(--color-tertiary)',           color: 'var(--color-on-tertiary)',           label: 'On Tertiary' },
            { bg: 'var(--color-error)',              color: 'var(--color-on-error)',              label: 'On Error' },
            { bg: 'var(--color-surface-container)',  color: 'var(--color-on-surface)',            label: 'On Surface' },
            { bg: 'var(--color-primary-container)',  color: 'var(--color-on-primary-container)',  label: 'On Primary Container' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 24, color: s.color }}>directions_bus</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--color-on-surface-variant)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
