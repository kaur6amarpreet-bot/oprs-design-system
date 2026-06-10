import React, { useEffect, useRef } from 'react';
import './Dialog.css';

/**
 * KSRTC Dialog / Modal
 * Use for: booking confirmation, cancellation warning, session expiry.
 *
 * size: 'sm' | 'md' | 'lg'
 * type: 'default' | 'alert' | 'confirm'
 *
 * Accessibility:
 * - Focus is trapped inside the dialog while open (WCAG 2.1.2)
 * - Focus returns to the trigger element on close (WCAG 2.4.3)
 * - Escape closes the dialog (WCAG 2.1.1)
 * - role="dialog", aria-modal="true", aria-labelledby tied to title
 */
export function Dialog({
  open = false,
  title,
  children,
  actions,
  onClose,
  size = 'md',
  type = 'default',
  icon,
  // Pass the ref of the element that triggered the dialog
  // so focus returns there on close
  triggerRef,
}) {
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Trap focus inside dialog while open
  useEffect(() => {
    if (!open) return;

    // Store the element that had focus before opening
    previousFocusRef.current = document.activeElement;

    // Focus the first focusable element in the dialog
    const focusable = dialogRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable?.length) {
      focusable[0].focus();
    } else {
      dialogRef.current?.focus();
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose?.();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusableEls = Array.from(
        dialogRef.current?.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) || []
      );
      if (!focusableEls.length) return;

      const first = focusableEls[0];
      const last  = focusableEls[focusableEls.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    // Prevent background scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      // Return focus to previous element (or explicit triggerRef)
      const target = triggerRef?.current || previousFocusRef.current;
      target?.focus();
    };
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return (
    <div
      className="ksrtc-dialog-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      aria-hidden="false"
    >
      <div
        ref={dialogRef}
        className={`ksrtc-dialog ksrtc-dialog--${size} ksrtc-dialog--${type}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'ksrtc-dialog-title' : undefined}
        aria-describedby="ksrtc-dialog-content"
        tabIndex={-1}
      >
        {icon && (
          <div className="ksrtc-dialog__icon" aria-hidden="true">
            <span className="material-symbols-outlined">{icon}</span>
          </div>
        )}
        {title && (
          <h2 className="ksrtc-dialog__title" id="ksrtc-dialog-title">
            {title}
          </h2>
        )}
        <div className="ksrtc-dialog__content" id="ksrtc-dialog-content">
          {children}
        </div>
        {actions && (
          <div className="ksrtc-dialog__actions">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dialog;
