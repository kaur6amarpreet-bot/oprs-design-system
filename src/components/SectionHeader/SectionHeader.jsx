import React from 'react';
import './SectionHeader.css';

/**
 * KSRTC SectionHeader + SectionSubheader
 *
 * SectionHeader  — primary blue bar, title + optional action slot
 * SectionSubheader — light container bar, meta info + optional action
 * HeadlineBar    — primary-container bar used above result grids
 */

export function SectionHeader({ icon, title, actions, size = 'md' }) {
  return (
    <div className={`ksrtc-sec-header ksrtc-sec-header--${size}`}>
      <h2 className="ksrtc-sec-header__title">
        {icon && <span className="material-symbols-outlined ksrtc-sec-header__icon">{icon}</span>}
        {title}
      </h2>
      {actions && <div className="ksrtc-sec-header__actions">{actions}</div>}
    </div>
  );
}

export function SectionSubheader({ children, actions }) {
  return (
    <div className="ksrtc-sec-subheader">
      <span className="ksrtc-sec-subheader__content">{children}</span>
      {actions && <div className="ksrtc-sec-subheader__actions">{actions}</div>}
    </div>
  );
}

export function HeadlineBar({ icon, title, meta }) {
  return (
    <div className="ksrtc-headline-bar">
      {icon && <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-primary)' }}>{icon}</span>}
      <h1 className="ksrtc-headline-bar__title">{title}</h1>
      {meta && <span className="ksrtc-headline-bar__meta">{meta}</span>}
    </div>
  );
}

export default SectionHeader;
