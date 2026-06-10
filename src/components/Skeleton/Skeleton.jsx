import React from 'react';
import './Skeleton.css';

/**
 * KSRTC Skeleton — loading placeholder.
 * shape: 'text' | 'rect' | 'circle'
 */
export function Skeleton({ shape = 'rect', width, height, lines = 1, style }) {
  if (shape === 'circle') {
    const sz = width || height || 40;
    return <div className="ksrtc-skeleton ksrtc-skeleton--circle" style={{ width: sz, height: sz, ...style }} />;
  }
  if (shape === 'text') {
    return (
      <div className="story-col" style={{ gap: 6, ...style }}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="ksrtc-skeleton ksrtc-skeleton--text"
            style={{ width: i === lines - 1 && lines > 1 ? '60%' : (width || '100%') }}
          />
        ))}
      </div>
    );
  }
  return (
    <div
      className="ksrtc-skeleton ksrtc-skeleton--rect"
      style={{ width: width || '100%', height: height || 16, borderRadius: 4, ...style }}
    />
  );
}

/** Pre-built bus row skeleton */
export function BusRowSkeleton() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px', background: '#fff', borderRadius: 8 }}>
      <Skeleton shape="rect" width={160} height={14} />
      <Skeleton shape="rect" width={80}  height={14} />
      <Skeleton shape="rect" width={80}  height={14} />
      <Skeleton shape="rect" width={60}  height={14} />
      <div style={{ flex: 1 }} />
      <Skeleton shape="rect" width={72}  height={32} />
    </div>
  );
}

export default Skeleton;
