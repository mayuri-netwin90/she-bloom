import { createTheme, type CSSVariablesResolver, type MantineColorsTuple } from '@mantine/core'

/**
 * Pink palette (Primary brand color for She Bloom, primaryShade 5)
 */
export const pink: MantineColorsTuple = [
  '#FFF0F3', // 0
  '#FCE6EF', // 1
  '#FBD0E0', // 2
  '#F7A6B6', // 3
  '#F48498', // 4
  '#F56CA8', // 5 - primary
  '#DE4F8F', // 6
  '#B0215F', // 7
  '#8D1A4C', // 8
  '#6A1439', // 9
]
export const brandPink = pink

/**
 * Violet palette (Sidebar = violet.8)
 */
export const violet: MantineColorsTuple = [
  '#F6F1FC', // 0
  '#E9D9FF', // 1
  '#D9C7F1', // 2
  '#C8B5E3', // 3
  '#A18AC5', // 4
  '#7A5FA8', // 5
  '#634A8F', // 6
  '#4C3577', // 7
  '#3C2F58', // 8 - sidebar
  '#2A2140', // 9
]
export const sidebarViolet = violet

/**
 * Gray palette
 */
export const gray: MantineColorsTuple = [
  '#FBFAFA', // 0
  '#F2F2F6', // 1
  '#EFEBEA', // 2
  '#E8E2E0', // 3
  '#DFDFDF', // 4
  '#BDB5B3', // 5
  '#9A938F', // 6
  '#7A7A7A', // 7
  '#3A3A3A', // 8
  '#1F1B24', // 9
]

/**
 * Green palette
 */
export const green: MantineColorsTuple = [
  '#E0F3D9', // 0
  '#D0F3C3', // 1
  '#B0DBAC', // 2
  '#8FC395', // 3
  '#6FAA7D', // 4
  '#4E9266', // 5
  '#2E7A4F', // 6
  '#276843', // 7
  '#205537', // 8
  '#19432B', // 9
]

/**
 * Yellow palette
 */
export const yellow: MantineColorsTuple = [
  '#FFF1CC', // 0
  '#EBD8AA', // 1
  '#D8BF88', // 2
  '#C5A566', // 3
  '#B18C44', // 4
  '#9D7322', // 5
  '#8A5A00', // 6
  '#754D00', // 7
  '#613F00', // 8
  '#4C3200', // 9
]

/**
 * Red palette
 */
export const red: MantineColorsTuple = [
  '#FDE3E7', // 0
  '#F7C6CE', // 1
  '#F0A8B4', // 2
  '#E98B9B', // 3
  '#E36E82', // 4
  '#DD5068', // 5
  '#D6334F', // 6
  '#B62B43', // 7
  '#962437', // 8
  '#761C2B', // 9
]

/**
 * Blue palette
 */
export const blue: MantineColorsTuple = [
  '#E1E8FA', // 0
  '#C3CEEA', // 1
  '#A6B3DA', // 2
  '#8899CA', // 3
  '#6A7FBA', // 4
  '#4D64AA', // 5
  '#2F4A9A', // 6
  '#283F83', // 7
  '#21346C', // 8
  '#1A2955', // 9
]

/**
 * Figma Semantic Background Tokens
 */
export const semanticBg = {
  canvas: '#F2F2F6',
  surface: '#FFFFFF',
  subtle: '#FBFAFA',
  muted: '#EFEBEA',
  sidebar: '#3C2F58',
  sidebarHover: '#4C3577',
  brandSoft: '#FFF0F3',
  violetSoft: '#F6F1FC',
} as const

/**
 * Figma Semantic Text Tokens
 */
export const semanticText = {
  primary: '#3A3A3A',
  secondary: '#7A7A7A',
  muted: '#9A938F',
  onBrand: '#FFFFFF',
  onSidebar: '#FFFFFF',
  onSidebarMuted: '#C8B5E3',
  heading: '#3C2F58',
  link: '#DE4F8F',
} as const

/**
 * Figma Semantic Brand Tokens
 */
export const semanticBrand = {
  primary: '#F56CA8',
  primaryHover: '#DE4F8F',
  secondary: '#F7A6B6',
  accent: '#F48498',
  violet: '#3C2F58',
} as const

/**
 * Figma Semantic Status Tokens
 */
export const semanticStatus = {
  successBg: '#E0F3D9',
  successFg: '#2E7A4F',
  warningBg: '#FFF1CC',
  warningFg: '#8A5A00',
  dangerBg: '#FDE3E7',
  dangerFg: '#D6334F',
  infoBg: '#E1E8FA',
  infoFg: '#2F4A9A',
  neutralBg: '#EFEBEA',
  neutralFg: '#7A7A7A',
  violetBg: '#E9D9FF',
  violetFg: '#4C3577',
} as const

/**
 * Figma Semantic Border Tokens
 */
export const semanticBorder = {
  default: '#E8E2E0',
  strong: '#BDB5B3',
  focus: '#F56CA8',
} as const

/**
 * Figma Typography Tokens & Definitions
 */
export const typography = {
  fonts: {
    headingSerif: "'Erstoria', 'Playfair Display', Georgia, serif",
    body: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
    footnote: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  styles: {
    // Headings
    headingDisplay: {
      fontFamily: "'Erstoria', 'Playfair Display', Georgia, serif",
      fontSize: '2rem', // 32px
      lineHeight: '2.5rem', // 40px
      fontWeight: '400',
    },
    headingH1: {
      fontFamily: "'Erstoria', 'Playfair Display', Georgia, serif",
      fontSize: '1.75rem', // 28px
      lineHeight: '2.25rem', // 36px
      fontWeight: '400',
    },
    headingH2: {
      fontFamily: "'Erstoria', 'Playfair Display', Georgia, serif",
      fontSize: '1.5rem', // 24px
      lineHeight: '2rem', // 32px
      fontWeight: '400',
    },
    headingH3: {
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '1.25rem', // 20px
      lineHeight: '1.75rem', // 28px
      fontWeight: '600',
    },
    headingH4: {
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '1rem', // 16px
      lineHeight: '1.5rem', // 24px
      fontWeight: '600',
    },

    // Body
    bodyRegular: {
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '1rem', // 16px
      lineHeight: '1.5rem', // 24px
      fontWeight: '400',
    },
    bodyMedium: {
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '1rem', // 16px
      lineHeight: '1.5rem', // 24px
      fontWeight: '500',
    },
    bodySmall: {
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25rem', // 20px
      fontWeight: '400',
    },
    bodySmallMedium: {
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25rem', // 20px
      fontWeight: '500',
    },

    // Labels & Buttons
    labelDefault: {
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25rem', // 20px
      fontWeight: '600',
    },
    labelSmall: {
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '0.75rem', // 12px
      lineHeight: '1rem', // 16px
      fontWeight: '600',
    },
    buttonDefault: {
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25rem', // 20px
      fontWeight: '600',
    },
    buttonLarge: {
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '1rem', // 16px
      lineHeight: '1.5rem', // 24px
      fontWeight: '600',
    },

    // Captions & Overline
    captionRegular: {
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '0.75rem', // 12px
      lineHeight: '1.125rem', // 18px
      fontWeight: '400',
    },
    captionBold: {
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '0.75rem', // 12px
      lineHeight: '1.125rem', // 18px
      fontWeight: '600',
    },
    overline: {
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '0.6875rem', // 11px
      lineHeight: '1rem', // 16px
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },

    // Tables
    tableHeader: {
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '0.75rem', // 12px
      lineHeight: '1rem', // 16px
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.04em',
    },
    tableCell: {
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25rem', // 20px
      fontWeight: '400',
    },

    // KPI & Footnote
    kpiValue: {
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '1.5rem', // 24px
      lineHeight: '1.5rem', // 24px
      fontWeight: '700',
    },
    footnote: {
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '0.6875rem', // 11px
      lineHeight: '1rem', // 16px
      fontWeight: '400',
    },
  },
} as const

/**
 * Figma Spacing Tokens
 * 2xs: 2px, xs: 4px, sm: 8px, md: 12px, lg: 16px, xl: 20px, 2xl: 24px, 3xl: 32px, 4xl: 40px, 5xl: 48px
 */
export const spacing = {
  '2xs': '0.125rem', // 2px
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '0.75rem', // 12px
  lg: '1rem', // 16px
  xl: '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '2rem', // 32px
  '4xl': '2.5rem', // 40px
  '5xl': '3rem', // 48px
} as const

/**
 * Figma Radii Tokens
 * sm: 6px, md: 8px, lg: 12px, xl: 16px, 2xl: 24px, full: 9999px
 */
export const radii = {
  xs: '0.25rem', // 4px
  sm: '0.375rem', // 6px
  md: '0.5rem', // 8px
  lg: '0.75rem', // 12px
  xl: '1rem', // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const

/**
 * Figma Shadow Tokens
 */
export const shadows = {
  small: '0 1px 3px rgba(60, 47, 88, 0.08), 0 1px 2px rgba(60, 47, 88, 0.04)',
  card: '0 4px 12px rgba(60, 47, 88, 0.06), 0 1px 3px rgba(60, 47, 88, 0.04)',
  large: '0 10px 25px rgba(60, 47, 88, 0.1), 0 4px 10px rgba(60, 47, 88, 0.05)',
  modal: '0 20px 40px rgba(60, 47, 88, 0.18), 0 8px 16px rgba(60, 47, 88, 0.08)',
  focusRing: '0 0 0 3px rgba(245, 108, 168, 0.35)',
} as const

export const theme = createTheme({
  primaryColor: 'brand-pink',
  primaryShade: 5,
  defaultRadius: 'md', // 8px default
  focusRing: 'always',
  fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
  fontFamilyMonospace: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  // Spacing: xs 10 · sm 12 · md 16 · lg 20 · xl 32
  spacing: {
    '2xs': '0.125rem', // 2px
    xs: '0.625rem', // 10px
    sm: '0.75rem', // 12px
    md: '1rem', // 16px
    lg: '1.25rem', // 20px
    xl: '2rem', // 32px
  },
  // Radius: xs 2 · sm 4 · md 8 (default) · lg 16 · xl 32
  radius: {
    xs: '0.125rem', // 2px
    sm: '0.25rem', // 4px
    md: '0.5rem', // 8px (default)
    lg: '1rem', // 16px
    xl: '2rem', // 32px
  },
  shadows: {
    xs: shadows.small, // StatsCard
    sm: shadows.small,
    md: shadows.card,
    lg: shadows.large,
    xl: shadows.modal, // Modal
  },
  // Breakpoint: xs 576 · sm 768 · md 992 · lg 1200 · xl 1408
  breakpoints: {
    xs: '36em', // 576px
    sm: '48em', // 768px
    md: '62em', // 992px
    lg: '75em', // 1200px
    xl: '88em', // 1408px
  },
  // Font size: xs 12 · sm 14 · md 16 · lg 18 · xl 20
  fontSizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    md: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
  },
  lineHeights: {
    xs: '1rem', // 16px
    sm: '1.25rem', // 20px
    md: '1.5rem', // 24px
    lg: '1.75rem', // 28px
    xl: '2rem', // 32px
  },
  // Headings (Erstoria Regular): h1 34 · h2 26 (titoli pagina) · h3 22 · h4 18 · h5 16 · h6 14
  headings: {
    fontFamily: "'Erstoria', 'Playfair Display', Georgia, serif",
    fontWeight: '400',
    sizes: {
      h1: {
        fontSize: '2.125rem', // 34px
        lineHeight: '2.625rem', // 42px
        fontWeight: '400',
      },
      h2: {
        fontSize: '1.625rem', // 26px (titoli pagina)
        lineHeight: '2.125rem', // 34px
        fontWeight: '400',
      },
      h3: {
        fontSize: '1.375rem', // 22px
        lineHeight: '1.875rem', // 30px
        fontWeight: '400',
      },
      h4: {
        fontSize: '1.125rem', // 18px
        lineHeight: '1.625rem', // 26px
        fontWeight: '400',
      },
      h5: {
        fontSize: '1rem', // 16px
        lineHeight: '1.5rem', // 24px
        fontWeight: '400',
      },
      h6: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.25rem', // 20px
        fontWeight: '400',
      },
    },
  },
  colors: {
    'brand-pink': brandPink,
    pink,
    'sidebar-violet': sidebarViolet,
    violet,
    gray,
    green,
    yellow,
    red,
    blue,
  },
  other: {
    bg: semanticBg,
    text: semanticText,
    border: semanticBorder,
    brand: semanticBrand,
    status: semanticStatus,
    typography,
    spacing,
    radii,
    shadows,
  },
  components: {
    Card: {
      defaultProps: {
        withBorder: true,
        shadow: 'sm',
        radius: 'md',
      },
    },
    Paper: {
      defaultProps: {
        radius: 'md',
      },
    },
    Button: {
      defaultProps: {
        radius: 'md',
        size: 'sm', // sm 36 (default)
      },
      styles: {
        root: {
          fontFamily: "var(--font-family-body)",
          fontWeight: 600,
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          transition: 'background-color 150ms ease, border-color 150ms ease, color 150ms ease, opacity 150ms ease',
          '&[data-size="xs"]': { height: '30px', minHeight: '30px', paddingLeft: '10px', paddingRight: '10px', fontSize: '0.75rem' },
          '&[data-size="sm"]': { height: '36px', minHeight: '36px', paddingLeft: '14px', paddingRight: '14px', fontSize: '0.875rem' },
          '&[data-size="md"]': { height: '42px', minHeight: '42px', paddingLeft: '18px', paddingRight: '18px', fontSize: '1rem' },
          '&[data-size="lg"]': { height: '50px', minHeight: '50px', paddingLeft: '22px', paddingRight: '22px', fontSize: '1rem' },
          '&[data-size="xl"]': { height: '60px', minHeight: '60px', paddingLeft: '26px', paddingRight: '26px', fontSize: '1.125rem' },

          // Disabled state across all button variants
          '&:disabled, &[data-disabled="true"]': {
            backgroundColor: 'var(--bg-muted) !important',
            color: 'var(--text-muted) !important',
            borderColor: 'transparent !important',
            cursor: 'not-allowed',
            opacity: 0.8,
          },
        },
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
        size: 'sm', // sm 36 (default)
      },
      styles: {
        label: {
          fontFamily: "var(--font-family-body)",
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--text-heading)',
          marginBottom: '4px',
        },
        description: {
          fontFamily: "var(--font-family-body)",
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          marginBottom: '6px',
        },
        error: {
          fontFamily: "var(--font-family-body)",
          fontSize: '0.75rem',
          color: 'var(--status-danger-fg)',
          marginTop: '4px',
        },
        input: {
          fontFamily: "var(--font-family-body)",
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-default)',
          color: 'var(--text-primary)',
          transition: 'border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease',
          '&:hover:not(:disabled):not([data-invalid="true"])': {
            borderColor: 'var(--brand-primary)',
          },
          '&:focus': {
            borderColor: 'var(--border-focus)',
            boxShadow: 'var(--focus-ring)',
          },
          '&[data-invalid="true"], &:invalid': {
            borderColor: 'var(--status-danger-fg) !important',
          },
          '&:disabled, &[data-disabled="true"]': {
            backgroundColor: 'var(--bg-muted) !important',
            color: 'var(--text-muted) !important',
            borderColor: 'transparent !important',
            cursor: 'not-allowed',
          },
          '&[data-size="xs"]': { height: '30px', minHeight: '30px' },
          '&[data-size="sm"]': { height: '36px', minHeight: '36px' },
          '&[data-size="md"]': { height: '42px', minHeight: '42px' },
          '&[data-size="lg"]': { height: '50px', minHeight: '50px' },
          '&[data-size="xl"]': { height: '60px', minHeight: '60px' },
        },
      },
    },
    Textarea: {
      defaultProps: {
        radius: 'md',
        size: 'sm',
      },
      styles: {
        label: {
          fontFamily: "var(--font-family-body)",
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--text-heading)',
          marginBottom: '4px',
        },
        description: {
          fontFamily: "var(--font-family-body)",
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          marginBottom: '6px',
        },
        error: {
          fontFamily: "var(--font-family-body)",
          fontSize: '0.75rem',
          color: 'var(--status-danger-fg)',
          marginTop: '4px',
        },
        input: {
          fontFamily: "var(--font-family-body)",
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-default)',
          color: 'var(--text-primary)',
          transition: 'border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease',
          '&:hover:not(:disabled):not([data-invalid="true"])': {
            borderColor: 'var(--brand-primary)',
          },
          '&:focus': {
            borderColor: 'var(--border-focus)',
            boxShadow: 'var(--focus-ring)',
          },
          '&[data-invalid="true"], &:invalid': {
            borderColor: 'var(--status-danger-fg) !important',
          },
          '&:disabled, &[data-disabled="true"]': {
            backgroundColor: 'var(--bg-muted) !important',
            color: 'var(--text-muted) !important',
            borderColor: 'transparent !important',
            cursor: 'not-allowed',
          },
        },
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: 'md',
        size: 'sm',
      },
      styles: {
        label: {
          fontFamily: "var(--font-family-body)",
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--text-heading)',
          marginBottom: '4px',
        },
        description: {
          fontFamily: "var(--font-family-body)",
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          marginBottom: '6px',
        },
        error: {
          fontFamily: "var(--font-family-body)",
          fontSize: '0.75rem',
          color: 'var(--status-danger-fg)',
          marginTop: '4px',
        },
        innerInput: {
          fontFamily: "var(--font-family-body)",
        },
        input: {
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-default)',
          color: 'var(--text-primary)',
          transition: 'border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease',
          '&:hover:not(:disabled):not([data-invalid="true"])': {
            borderColor: 'var(--brand-primary)',
          },
          '&:focus, &:focus-within': {
            borderColor: 'var(--border-focus)',
            boxShadow: 'var(--focus-ring)',
          },
          '&[data-invalid="true"]': {
            borderColor: 'var(--status-danger-fg) !important',
          },
          '&:disabled, &[data-disabled="true"]': {
            backgroundColor: 'var(--bg-muted) !important',
            color: 'var(--text-muted) !important',
            borderColor: 'transparent !important',
            cursor: 'not-allowed',
          },
          '&[data-size="xs"]': { height: '30px', minHeight: '30px' },
          '&[data-size="sm"]': { height: '36px', minHeight: '36px' },
          '&[data-size="md"]': { height: '42px', minHeight: '42px' },
          '&[data-size="lg"]': { height: '50px', minHeight: '50px' },
          '&[data-size="xl"]': { height: '60px', minHeight: '60px' },
        },
      },
    },
    Select: {
      defaultProps: {
        radius: 'md',
        size: 'sm',
      },
      styles: {
        label: {
          fontFamily: "var(--font-family-body)",
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--text-heading)',
          marginBottom: '4px',
        },
        description: {
          fontFamily: "var(--font-family-body)",
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          marginBottom: '6px',
        },
        error: {
          fontFamily: "var(--font-family-body)",
          fontSize: '0.75rem',
          color: 'var(--status-danger-fg)',
          marginTop: '4px',
        },
        input: {
          fontFamily: "var(--font-family-body)",
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-default)',
          color: 'var(--text-primary)',
          transition: 'border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease',
          '&:hover:not(:disabled):not([data-invalid="true"])': {
            borderColor: 'var(--brand-primary)',
          },
          '&:focus': {
            borderColor: 'var(--border-focus)',
            boxShadow: 'var(--focus-ring)',
          },
          '&[data-invalid="true"]': {
            borderColor: 'var(--status-danger-fg) !important',
          },
          '&:disabled, &[data-disabled="true"]': {
            backgroundColor: 'var(--bg-muted) !important',
            color: 'var(--text-muted) !important',
            borderColor: 'transparent !important',
            cursor: 'not-allowed',
          },
          '&[data-size="xs"]': { height: '30px', minHeight: '30px' },
          '&[data-size="sm"]': { height: '36px', minHeight: '36px' },
          '&[data-size="md"]': { height: '42px', minHeight: '42px' },
          '&[data-size="lg"]': { height: '50px', minHeight: '50px' },
          '&[data-size="xl"]': { height: '60px', minHeight: '60px' },
        },
      },
    },
    Checkbox: {
      defaultProps: {
        radius: 'sm',
        color: 'pink',
      },
      styles: {
        label: {
          fontFamily: "var(--font-family-body)",
          fontSize: '0.875rem',
          color: 'var(--text-primary)',
          cursor: 'pointer',
        },
        input: {
          borderColor: 'var(--border-strong)',
          cursor: 'pointer',
          '&:checked': {
            backgroundColor: 'var(--brand-primary)',
            borderColor: 'var(--brand-primary)',
          },
          '&:indeterminate': {
            backgroundColor: 'var(--brand-primary)',
            borderColor: 'var(--brand-primary)',
          },
          '&:disabled': {
            backgroundColor: 'var(--bg-muted) !important',
            borderColor: 'var(--border-default) !important',
            cursor: 'not-allowed',
          },
        },
      },
    },
    Radio: {
      defaultProps: {
        color: 'pink',
      },
      styles: {
        label: {
          fontFamily: "var(--font-family-body)",
          fontSize: '0.875rem',
          color: 'var(--text-primary)',
          cursor: 'pointer',
        },
        radio: {
          borderColor: 'var(--border-strong)',
          cursor: 'pointer',
          '&:checked': {
            backgroundColor: 'var(--brand-primary)',
            borderColor: 'var(--brand-primary)',
          },
          '&:disabled': {
            backgroundColor: 'var(--bg-muted) !important',
            borderColor: 'var(--border-default) !important',
            cursor: 'not-allowed',
          },
        },
      },
    },
    Switch: {
      defaultProps: {
        color: 'pink',
      },
      styles: {
        label: {
          fontFamily: "var(--font-family-body)",
          fontSize: '0.875rem',
          color: 'var(--text-primary)',
          cursor: 'pointer',
        },
        track: {
          cursor: 'pointer',
          borderColor: 'transparent',
          backgroundColor: 'var(--border-strong)',
          '&[data-checked]': {
            backgroundColor: 'var(--brand-primary)',
          },
          '&:disabled': {
            backgroundColor: 'var(--bg-muted) !important',
            cursor: 'not-allowed',
          },
        },
      },
    },
    Table: {
      styles: {
        th: {
          fontFamily: 'var(--font-family-body)',
          fontSize: '0.75rem',
          lineHeight: '1rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: 'var(--text-secondary)',
        },
        td: {
          fontFamily: 'var(--font-family-body)',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          fontWeight: 400,
        },
      },
    },
    Tabs: {
      defaultProps: {
        color: 'pink',
      },
      styles: {
        tab: {
          fontFamily: 'var(--font-family-body)',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          borderBottomWidth: '2px',
          transition: 'color 150ms ease, border-color 150ms ease',
          '&:hover': {
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
          },
          '&[data-active]': {
            color: 'var(--text-heading)',
            borderColor: 'var(--brand-primary)',
          },
        },
      },
    },
    Chip: {
      defaultProps: {
        radius: 'xl',
        size: 'sm',
      },
      styles: {
        label: {
          fontFamily: 'var(--font-family-body)',
          fontSize: '0.8125rem',
          fontWeight: 500,
          '&[data-checked]': {
            backgroundColor: 'var(--bg-sidebar)',
            color: 'var(--text-on-sidebar)',
          },
        },
      },
    },
    Pagination: {
      defaultProps: {
        radius: 'md',
        size: 'sm',
        color: 'sidebar-violet',
      },
      styles: {
        control: {
          fontFamily: 'var(--font-family-body)',
          fontSize: '0.875rem',
          fontWeight: 600,
          borderColor: 'var(--border-default)',
          color: 'var(--text-primary)',
          transition: 'all 150ms ease',
          '&:hover': {
            borderColor: 'var(--brand-primary)',
            backgroundColor: 'var(--bg-subtle)',
          },
          '&[data-active]': {
            backgroundColor: 'var(--bg-sidebar)',
            color: 'var(--text-on-sidebar)',
            borderColor: 'var(--bg-sidebar)',
          },
        },
      },
    },
    Alert: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
        },
        title: {
          fontFamily: 'var(--font-family-body)',
          fontWeight: 600,
          fontSize: '0.875rem',
          marginBottom: '2px',
        },
        message: {
          fontFamily: 'var(--font-family-body)',
          fontSize: '0.75rem',
          lineHeight: 1.4,
        },
      },
    },
  },
})

/**
 * Mantine CSS Variables Resolver.
 * Automatically injects all semantic tokens into CSS :root from theme.ts.
 * Eliminates the need to hardcode any hex colors in CSS files.
 */
export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {
    // Background Tokens
    '--bg-canvas': semanticBg.canvas,
    '--bg-surface': semanticBg.surface,
    '--bg-subtle': semanticBg.subtle,
    '--bg-muted': semanticBg.muted,
    '--bg-sidebar': semanticBg.sidebar,
    '--bg-sidebar-hover': semanticBg.sidebarHover,
    '--bg-brand-soft': semanticBg.brandSoft,
    '--bg-violet-soft': semanticBg.violetSoft,

    // Text Tokens
    '--text-primary': semanticText.primary,
    '--text-secondary': semanticText.secondary,
    '--text-muted': semanticText.muted,
    '--text-on-brand': semanticText.onBrand,
    '--text-on-sidebar': semanticText.onSidebar,
    '--text-on-sidebar-muted': semanticText.onSidebarMuted,
    '--text-heading': semanticText.heading,
    '--text-link': semanticText.link,

    // Border Tokens
    '--border-default': semanticBorder.default,
    '--border-strong': semanticBorder.strong,
    '--border-focus': semanticBorder.focus,
    '--mantine-color-default-border': semanticBorder.default,

    // Brand Tokens
    '--brand-primary': semanticBrand.primary,
    '--brand-primary-hover': semanticBrand.primaryHover,
    '--brand-secondary': semanticBrand.secondary,
    '--brand-accent': semanticBrand.accent,
    '--brand-violet': semanticBrand.violet,
    '--mantine-primary-color-filled': semanticBrand.primary,
    '--mantine-primary-color-filled-hover': semanticBrand.primaryHover,

    // Status Tokens
    '--status-success-bg': semanticStatus.successBg,
    '--status-success-fg': semanticStatus.successFg,
    '--status-warning-bg': semanticStatus.warningBg,
    '--status-warning-fg': semanticStatus.warningFg,
    '--status-danger-bg': semanticStatus.dangerBg,
    '--status-danger-fg': semanticStatus.dangerFg,
    '--status-info-bg': semanticStatus.infoBg,
    '--status-info-fg': semanticStatus.infoFg,
    '--status-neutral-bg': semanticStatus.neutralBg,
    '--status-neutral-fg': semanticStatus.neutralFg,
    '--status-violet-bg': semanticStatus.violetBg,
    '--status-violet-fg': semanticStatus.violetFg,

    // Typography Fonts
    '--font-family-heading': typography.fonts.headingSerif,
    '--font-family-body': typography.fonts.body,
    '--font-family-footnote': typography.fonts.footnote,

    // Spacing Tokens
    '--space-2xs': spacing['2xs'],
    '--space-xs': spacing.xs,
    '--space-sm': spacing.sm,
    '--space-md': spacing.md,
    '--space-lg': spacing.lg,
    '--space-xl': spacing.xl,
    '--space-2xl': spacing['2xl'],
    '--space-3xl': spacing['3xl'],
    '--space-4xl': spacing['4xl'],
    '--space-5xl': spacing['5xl'],

    // Radius Tokens
    '--radius-sm': radii.sm,
    '--radius-md': radii.md,
    '--radius-lg': radii.lg,
    '--radius-xl': radii.xl,
    '--radius-2xl': radii['2xl'],
    '--radius-full': radii.full,

    // Shadow Tokens
    '--shadow-small': shadows.small,
    '--shadow-card': shadows.card,
    '--shadow-large': shadows.large,
    '--shadow-modal': shadows.modal,
    '--focus-ring': shadows.focusRing,
  },
  light: {},
  dark: {},
})
