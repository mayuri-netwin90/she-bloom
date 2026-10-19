import { useEffect, useRef } from 'react'

export interface UseIdleTimeoutOptions {
  /**
   * Timeout in milliseconds.
   * Default: 30 minutes (1,800,000 ms) as specified in RF-BO-ACC-05.
   */
  timeoutMs?: number
  /**
   * Callback fired when inactivity threshold is exceeded.
   */
  onTimeout: () => void
  /**
   * Whether the timer is currently enabled.
   */
  enabled?: boolean
}

/**
 * useIdleTimeout Hook
 * Tracks user activity events ('mousemove', 'keydown', 'click', 'scroll')
 * and triggers onTimeout when the user has been inactive for timeoutMs.
 */
export function useIdleTimeout({
  timeoutMs = 1800000, // 30 minutes default
  onTimeout,
  enabled = true,
}: UseIdleTimeoutOptions) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onTimeoutRef = useRef(onTimeout)

  // Keep callback reference fresh
  useEffect(() => {
    onTimeoutRef.current = onTimeout
  }, [onTimeout])

  useEffect(() => {
    if (!enabled) {
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        onTimeoutRef.current()
      }, timeoutMs)
    }

    // Set initial timer
    resetTimer()

    // Activity event listeners
    const events: Array<keyof WindowEventMap> = [
      'mousemove',
      'keydown',
      'click',
      'scroll',
      'touchstart',
    ]

    const handleActivity = () => {
      resetTimer()
    }

    events.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true })
    })

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity)
      })
    }
  }, [timeoutMs, enabled])
}
