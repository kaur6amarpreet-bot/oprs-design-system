import React, { useState, useEffect, useRef } from 'react';
import './NavigationDrawer.css';

/**
 * KSRTC NavigationDrawer
 *
 * items: array of nav groups:
 * [
 *   {
 *     label: 'Ticket Booking',
 *     icon: 'confirmation_number',
 *     children: [
 *       { label: 'Book Ticket', href: '#', active: false },
 *       ...
 *     ]
 *   },
 *   ...
 * ]
 *
 * open: boolean — controlled visibility
 * onClose: () => void
 */

export function NavigationDrawer({
  open = false,
  onClose,
  items = [],
  userLabel = 'Guest User',
  userSub   = 'Not signed in',
}) {
  const [expanded, setExpanded] = useState(
    () => items.reduce((acc, _, i) => ({ ...acc, [i]: i === 0 }), {})
  );

  const drawerRef    = useRef(null);
  const prevFocusRef = useRef(null);

  // Focus trap + focus management
  useEffect(() => {
    if (!open) return;

    // Remember what had focus before opening
    prevFocusRef.current = document.activeElement;

    // Focus the close button (first interactive element)
    const firstFocusable = drawerRef.current?.querySelector(
      'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    function onKey(e) {
      if (e.key === 'Escape') { onClose?.(); return; }
      if (e.key !== 'Tab') return;

      const focusable = Array.from(
        drawerRef.current?.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) || []
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prevFocusRef.current?.focus(); // return focus on close
    };
  }, [open, onClose]);

  const toggleGroup = (i) => {
    setExpanded(prev => ({ ...prev, [i]: !prev[i] }));
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="ksrtc-nav-backdrop"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className="ksrtc-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        ref={drawerRef}
      >
        {/* Header */}
        <div className="ksrtc-nav-drawer__header">
          <div className="ksrtc-nav-drawer__brand">
            <span className="material-symbols-outlined ksrtc-nav-drawer__brand-icon" aria-hidden="true">directions_bus</span>
            <span className="ksrtc-nav-drawer__brand-name">OPRS</span>
          </div>
          <button
            type="button"
            className="ksrtc-nav-drawer__close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>

        {/* User row */}
        <div className="ksrtc-nav-drawer__user">
          <span className="material-symbols-outlined ksrtc-nav-drawer__user-icon" aria-hidden="true">account_circle</span>
          <div>
            <div className="ksrtc-nav-drawer__user-name">{userLabel}</div>
            <div className="ksrtc-nav-drawer__user-sub">{userSub}</div>
          </div>
        </div>

        <div className="ksrtc-nav-rule" />

        {/* Nav groups */}
        <nav className="ksrtc-nav-drawer__body">
          {items.map((group, gi) => (
            <div key={gi} className="ksrtc-nav-group">

              {/* Group trigger */}
              <button
                type="button"
                className={`ksrtc-nav-group__trigger ${expanded[gi] ? 'ksrtc-nav-group__trigger--open' : ''}`}
                onClick={() => toggleGroup(gi)}
                aria-expanded={expanded[gi]}
              >
                {group.icon && (
                  <span className="material-symbols-outlined ksrtc-nav-group__icon" aria-hidden="true">
                    {group.icon}
                  </span>
                )}
                <span className="ksrtc-nav-group__label">{group.label}</span>
                <span className="material-symbols-outlined ksrtc-nav-group__chevron" aria-hidden="true">
                  {expanded[gi] ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {/* Sub-items */}
              {expanded[gi] && group.children?.length > 0 && (
                <div className="ksrtc-nav-group__items" role="list">
                  {group.children.map((item, ii) => (
                    <a
                      key={ii}
                      href={item.href || '#'}
                      role="listitem"
                      className={`ksrtc-nav-item ${item.active ? 'ksrtc-nav-item--active' : ''}`}
                      onClick={e => { e.preventDefault(); item.onClick?.(); }}
                    >
                      {item.icon && (
                        <span className="material-symbols-outlined ksrtc-nav-item__icon" aria-hidden="true">{item.icon}</span>
                      )}
                      {item.label}
                      {item.active && (
                        <span className="ksrtc-nav-item__indicator" aria-hidden="true" />
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="ksrtc-nav-rule" />
        <div className="ksrtc-nav-drawer__footer">
          <a href="#" className="ksrtc-nav-footer-link">
            <span className="material-symbols-outlined" aria-hidden="true">help_outline</span>
            Help &amp; Support
          </a>
          <a href="#" className="ksrtc-nav-footer-link">
            <span className="material-symbols-outlined" aria-hidden="true">logout</span>
            Sign Out
          </a>
        </div>
      </div>
    </>
  );
}

export default NavigationDrawer;
