/**
 * The browser user prefers to have reduced motion.
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion)').matches
}
