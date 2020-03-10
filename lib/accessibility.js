/**
 * The browser user prefers to have reduced motion.
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion)').matches
}

/**
 * Environment is a browser.
 */
export function isBrowser() {
  return typeof window !== 'undefined'
}
