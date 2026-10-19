import { type ReactNode } from 'react'
import { Box, Card, Container, Stack, Text, Title } from '@mantine/core'

export interface AuthLayoutProps {
  children: ReactNode
}

/**
 * Responsive Split-Screen Auth Layout matching Figma_3_Access.pdf and Figma_8_Responsive.pdf.
 *
 * Responsive behavior:
 * 1. Desktop (>= 1200px):
 *    - Left pane: 42% width, dark violet background with brand statement and decorative circles.
 *    - Right pane: 58% soft canvas (#f4f4f7) with centered floating white card (shadow, rounded corners).
 *
 * 2. Tablet (768px - 1199px):
 *    - Left pane remains visible (proportional 38-42% split).
 *    - Right pane with centered floating white card.
 *
 * 3. Mobile (< 768px):
 *    - Single column layout.
 *    - Top compact violet banner (#2e2148) with "She Bloom" and "BACKOFFICE" branding.
 *    - White container underneath with the card and form inputs.
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box
      style={{
        minHeight: '100dvh',
        backgroundColor: 'var(--bg-canvas)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ================= MOBILE TOP HEADER (< 768px) ================= */}
      <Box
        hiddenFrom="sm"
        px="md"
        py="sm"
        style={{
          backgroundColor: 'var(--bg-sidebar)',
          color: 'var(--text-on-sidebar)',
          textAlign: 'left',
          flexShrink: 0,
        }}
      >
        <Title
          order={2}
          size="h4"
          c="var(--text-on-sidebar)"
          style={{
            fontFamily: 'var(--font-family-heading)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
          }}
        >
          She Bloom
        </Title>
        <Text
          size="9px"
          c="var(--text-on-sidebar-muted)"
          tt="uppercase"
          fw={700}
          mt={2}
          style={{ letterSpacing: '0.12em' }}
        >
          Backoffice
        </Text>
      </Box>

      {/* ================= DESKTOP & TABLET SPLIT / MOBILE BODY ================= */}
      <Box
        className="auth-layout-grid"
        style={{
          flex: 1,
          display: 'grid',
        }}
      >
        {/* ================= LEFT BRAND PANE (Visible on >= 768px: Tablet & Desktop) ================= */}
        <Box
          visibleFrom="sm"
          p={{ sm: 'xl', md: 44, lg: 64 }}
          style={{
            backgroundColor: 'var(--bg-sidebar)',
            color: 'var(--text-on-sidebar)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {/* Decorative Translucent Figma Circles */}
          <div
            style={{
              position: 'absolute',
              width: 130,
              height: 130,
              borderRadius: '50%',
              backgroundColor: 'var(--bg-sidebar-hover)',
              opacity: 0.6,
              top: '12%',
              right: '18%',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 320,
              height: 320,
              borderRadius: '50%',
              backgroundColor: 'var(--brand-accent)',
              opacity: 0.35,
              bottom: '15%',
              right: '-10%',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 200,
              height: 200,
              borderRadius: '50%',
              backgroundColor: 'var(--bg-sidebar-hover)',
              opacity: 0.45,
              bottom: '8%',
              left: '12%',
              pointerEvents: 'none',
            }}
          />

          {/* Top Branding (Serif Title + Uppercase Subtitle) */}
          <Box style={{ position: 'relative', zIndex: 2 }}>
            <Title
              order={2}
              size="h3"
              c="var(--text-on-sidebar)"
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
              }}
            >
              She Bloom
            </Title>
            <Text
              size="11px"
              c="var(--text-on-sidebar-muted)"
              tt="uppercase"
              fw={700}
              mt={4}
              style={{ letterSpacing: '0.14em' }}
            >
              Backoffice
            </Text>
          </Box>

          {/* Center Marketing Statement */}
          <Stack gap="md" my="auto" maw={440} py={48} style={{ position: 'relative', zIndex: 2 }}>
            <Title
              order={1}
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'clamp(2rem, 3.2vw, 2.5rem)',
                lineHeight: 1.15,
                fontWeight: 500,
                color: 'var(--text-on-sidebar)',
              }}
            >
              Let your Bloom blossom.
            </Title>
            <Text size="md" style={{ lineHeight: 1.6, color: 'var(--text-on-sidebar-muted)' }}>
              The She Bloom team workspace: content, community, Mentors and sessions, all in one
              place.
            </Text>
          </Stack>

          {/* Bottom Access Notice */}
          <Text
            size="xs"
            style={{
              position: 'relative',
              zIndex: 2,
              lineHeight: 1.4,
              color: 'var(--text-on-sidebar-muted)',
              opacity: 0.9,
            }}
          >
            Access restricted to authorised Admins, Moderators and Mentors.
          </Text>
        </Box>

        {/* ================= RIGHT FORM PANE / MOBILE CONTAINER ================= */}
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'var(--bg-canvas)',
            padding: '16px 12px',
          }}
        >
          <Container size={440} w="100%" p={0}>
            <Card
              withBorder={false}
              radius="lg"
              p={{ base: 18, xs: 24, sm: 36 }}
              style={{
                backgroundColor: 'var(--bg-surface)',
                boxShadow: 'var(--shadow-card)',
                borderRadius: '16px',
              }}
            >
              {children}
            </Card>
          </Container>
        </Box>
      </Box>

      {/* Responsive Grid Styles for Desktop vs Tablet vs Mobile */}
      <style>{`
        /* Desktop (>= 1200px) */
        @media (min-width: 1200px) {
          .auth-layout-grid {
            grid-template-columns: minmax(420px, 44%) 1fr !important;
          }
        }
        /* Tablet (768px - 1199px) */
        @media (min-width: 768px) and (max-width: 1199.9px) {
          .auth-layout-grid {
            grid-template-columns: minmax(320px, 38%) 1fr !important;
          }
        }
        /* Mobile (< 768px): Single column, soft canvas backdrop, centered floating card */
        @media (max-width: 767.9px) {
          .auth-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Box>
  )
}



