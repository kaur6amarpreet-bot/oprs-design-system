import React from 'react';
import './FareSummary.css';

/**
 * KSRTC FareSummary
 *
 * lines: array of fare line items
 * [
 *   { label: 'Reservation Fee', amount: 800, type: 'base' },
 *   { label: 'Concessions',     amount: -50, type: 'deduction' },
 *   { label: 'GST (5%)',        amount: 38,  type: 'tax' },
 *   ...
 * ]
 *
 * total:   number — final amount
 * balance: number — available credit / balance amount (optional)
 * title:   string — section heading (default "Fare Summary")
 */

function formatAmount(n) {
  const abs = Math.abs(n);
  const sign = n < 0 ? '−' : '';
  return `${sign}₹ ${abs.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function FareSummary({
  lines = [],
  total = 0,
  balance,
  title = 'Fare Summary',
  compact = false,
}) {
  const rootCls = ['ksrtc-fare-card', compact ? 'ksrtc-fare-card--compact' : ''].filter(Boolean).join(' ');

  return (
    <div className={rootCls}>
      {title && (
        <div className="ksrtc-fare-card__title">{title}</div>
      )}

      <div className="ksrtc-fare-lines">
        {lines.map((line, i) => (
          <div
            key={i}
            className={[
              'ksrtc-fare-line',
              line.type === 'deduction' ? 'ksrtc-fare-line--deduction' : '',
              line.type === 'tax'       ? 'ksrtc-fare-line--tax'       : '',
              line.type === 'subtotal'  ? 'ksrtc-fare-line--subtotal'  : '',
            ].filter(Boolean).join(' ')}
          >
            <span className="ksrtc-fare-line__label">{line.label}</span>
            <span className="ksrtc-fare-line__amount">
              {formatAmount(line.amount)}
            </span>
          </div>
        ))}
      </div>

      <div className="ksrtc-fare-divider" />

      {/* Total row */}
      <div className="ksrtc-fare-total">
        <span className="ksrtc-fare-total__label">Total Amount</span>
        <span className="ksrtc-fare-total__amount">{formatAmount(total)}</span>
      </div>

      {/* Balance / credit row */}
      {balance !== undefined && (
        <div className="ksrtc-fare-balance">
          <span className="ksrtc-fare-balance__label">
            <span className="material-symbols-outlined ksrtc-fare-balance__icon">account_balance_wallet</span>
            Balance Amount
          </span>
          <span className="ksrtc-fare-balance__amount">{formatAmount(balance)}</span>
        </div>
      )}
    </div>
  );
}

export default FareSummary;
