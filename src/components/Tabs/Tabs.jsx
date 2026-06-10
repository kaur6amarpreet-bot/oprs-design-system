import React, { useRef } from 'react';
import './Tabs.css';

/**
 * KSRTC Tabs
 * variant: 'primary' | 'secondary'
 * tabs: [{ label, value, icon, badge }]
 *
 * Accessibility:
 * - role="tablist" on container (WCAG 4.1.2)
 * - role="tab" on each tab button with aria-selected (WCAG 4.1.2)
 * - Left/Right arrow keys navigate between tabs (WCAG 2.1.1 — ARIA tab pattern)
 * - Only the active tab is in the natural tab order; others use tabIndex={-1}
 *   so Tab key skips to the panel content, arrows move between tabs
 * - aria-controls links each tab to its panel when panelId is provided
 */
export function Tabs({ tabs = [], value, onChange, variant = 'primary' }) {
  const listRef = useRef(null);

  const handleKeyDown = (e, currentIdx) => {
    const tabCount = tabs.length;
    let nextIdx = currentIdx;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIdx = (currentIdx + 1) % tabCount;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIdx = (currentIdx - 1 + tabCount) % tabCount;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIdx = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIdx = tabCount - 1;
    } else {
      return;
    }

    // Move focus to the next tab button
    const tabButtons = listRef.current?.querySelectorAll('[role="tab"]');
    tabButtons?.[nextIdx]?.focus();
    onChange?.(tabs[nextIdx].value);
  };

  return (
    <div
      ref={listRef}
      className={`ksrtc-tabs ksrtc-tabs--${variant}`}
      role="tablist"
      aria-orientation="horizontal"
    >
      {tabs.map((tab, idx) => {
        const isActive = value === tab.value;
        return (
          <button
            key={tab.value}
            id={`tab-${tab.value}`}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-controls={tab.panelId || undefined}
            className={`ksrtc-tab${isActive ? ' ksrtc-tab--active' : ''}`}
            onClick={() => onChange?.(tab.value)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            tabIndex={isActive ? 0 : -1}
          >
            {tab.icon && (
              <span
                className="material-symbols-outlined ksrtc-tab__icon"
                aria-hidden="true"
              >
                {tab.icon}
              </span>
            )}
            <span className="ksrtc-tab__label">{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className="ksrtc-tab__badge"
                aria-label={`${tab.badge} notifications`}
              >
                {tab.badge}
              </span>
            )}
            {isActive && <div className="ksrtc-tab__indicator" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
