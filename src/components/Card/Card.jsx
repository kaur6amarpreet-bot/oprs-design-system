import React from 'react';

/**
 * KSRTC Card
 * variant: 'elevated' | 'outlined' | 'filled'
 * padding: 'none' | 'sm' | 'md' | 'lg'
 */
export function Card({
  variant = 'elevated',
  padding = 'md',
  children,
  style,
  onClick,
  ...props
}) {
  const variantClass = {
    elevated: 'card-elevated',
    outlined: 'card-outlined',
    filled:   'card-filled',
    default:  'card',
  }[variant] || 'card-elevated';

  const paddingMap = {
    none: '0',
    sm:   'var(--space-3)',
    md:   'var(--space-4)',
    lg:   'var(--space-6)',
  };

  return (
    <div
      className={variantClass}
      onClick={onClick}
      style={{
        padding: paddingMap[padding] || paddingMap.md,
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
