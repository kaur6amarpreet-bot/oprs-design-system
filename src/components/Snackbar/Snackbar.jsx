import React, { useEffect } from 'react';
import './Snackbar.css';

/**
 * KSRTC Snackbar / Toast
 * type: 'default' | 'success' | 'error' | 'warning'
 * actionLabel: string — optional CTA text (e.g. "Undo", "View")
 * duration: ms — auto-dismiss duration (0 = persistent)
 *
 * Accessibility:
 * - error/warning use role="alert" + aria-live="assertive" to interrupt SR (WCAG 4.1.3)
 * - success/default use role="status" + aria-live="polite" (non-interrupting)
 * - Icon is aria-hidden; message carries the full meaning
 * - Dismiss button has aria-label (WCAG 4.1.2)
 */
export function Snackbar({
  message,
  type = 'default',
  actionLabel,
  onAction,
  onDismiss,
  duration = 4000,
  visible = true,
}) {
  useEffect(() => {
    if (visible && duration > 0 && onDismiss) {
      const t = setTimeout(onDismiss, duration);
      return () => clearTimeout(t);
    }
  }, [visible, duration, onDismiss]);

  const iconMap = {
    success: 'check_circle',
    error:   'error',
    warning: 'warning',
    default: 'info',
  };

  // Errors and warnings must interrupt — assertive + alert
  // Success and info can wait — polite + status
  const isUrgent = type === 'error' || type === 'warning';

  if (!visible) return null;

  return (
    <div
      className={`ksrtc-snackbar ksrtc-snackbar--${type}`}
      role={isUrgent ? 'alert' : 'status'}
      aria-live={isUrgent ? 'assertive' : 'polite'}
      aria-atomic="true"
    >
      <span
        className="material-symbols-outlined ksrtc-snackbar__icon"
        aria-hidden="true"
      >
        {iconMap[type]}
      </span>
      <span className="ksrtc-snackbar__message">{message}</span>
      {actionLabel && (
        <button
          className="ksrtc-snackbar__action"
          onClick={onAction}
          type="button"
        >
          {actionLabel}
        </button>
      )}
      <button
        className="ksrtc-snackbar__close"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        type="button"
      >
        <span className="material-symbols-outlined" style={{ fontSize: 18 }} aria-hidden="true">
          close
        </span>
      </button>
    </div>
  );
}

export default Snackbar;
