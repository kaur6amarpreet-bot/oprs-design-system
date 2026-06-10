import React, { useRef } from 'react';

/**
 * KSRTC SegmentedButton
 * options: [{ label, value, icon }]
 * value: currently selected value
 * onChange: (value) => void
 *
 * Accessibility:
 * - Uses <button> elements (not <span>) for native keyboard & AT support (WCAG 4.1.2)
 * - role="group" on container with aria-label (WCAG 1.3.1)
 * - aria-pressed on each button communicates state without relying on colour (WCAG 1.4.1)
 * - Arrow keys move between options (WCAG 2.1.1)
 * - Only the active button is in the tab order; arrows navigate within the group
 * - Icons are aria-hidden (WCAG 1.1.1)
 */
export function SegmentedButton({ options = [], value, onChange, label = 'Options' }) {
  const groupRef = useRef(null);

  const handleKeyDown = (e, idx) => {
    const count = options.length;
    let next = idx;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      next = (idx + 1) % count;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      next = (idx - 1 + count) % count;
    } else {
      return;
    }

    const buttons = groupRef.current?.querySelectorAll('button');
    buttons?.[next]?.focus();
    onChange?.(options[next].value);
  };

  return (
    <div
      ref={groupRef}
      className="segmented-btn"
      role="group"
      aria-label={label}
    >
      {options.map((opt, idx) => {
        const isActive = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            className={`seg-opt${isActive ? ' active' : ''}`}
            onClick={() => onChange?.(opt.value)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            aria-pressed={isActive}
            tabIndex={isActive ? 0 : -1}
          >
            {opt.icon && (
              <span className="material-symbols-outlined" aria-hidden="true">
                {opt.icon}
              </span>
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedButton;
