import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

/**
 * Configure and export MSW browser worker instance.
 */
export const worker = setupWorker(...handlers)
