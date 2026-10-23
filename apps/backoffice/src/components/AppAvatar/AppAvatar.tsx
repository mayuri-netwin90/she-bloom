import React from 'react'

export interface AppAvatarProps {
  initials?: string
  src?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | number
  alt?: string
  bgColor?: string
  textColor?: string
}

const avatarSizes = {
  xs: 28,
  sm: 36,
  md: 48,
  lg: 72,
}

/**
 * Figma Avatar: Pink background with deep violet bold initials
 */
export const AppAvatar: React.FC<AppAvatarProps> = ({
  initials = 'EM',
  src,
  size = 'md',
  alt = 'Avatar',
  bgColor = 'var(--brand-secondary)',
  textColor = 'var(--bg-sidebar)',
}) => {
  const pixelSize = typeof size === 'number' ? size : avatarSizes[size]

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        style={{
          width: pixelSize,
          height: pixelSize,
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
    )
  }

  return (
    <div
      style={{
        width: pixelSize,
        height: pixelSize,
        borderRadius: '50%',
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: 'var(--font-family-body)',
        fontWeight: 700,
        fontSize: `${pixelSize * 0.4}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
      }}
    >
      {initials}
    </div>
  )
}
