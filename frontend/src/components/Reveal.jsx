import { createElement } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

/**
 * Wrapper qui applique l'animation d'apparition au scroll directement sur
 * l'élément porteur (et non un conteneur en plus), pour préserver le layout CSS.
 *
 * <Reveal as="div" className="value-card" index={i}>...</Reveal>
 */
export default function Reveal({ as = 'div', index = 0, children, ...props }) {
  const ref = useScrollReveal(index)
  return createElement(as, { ref, ...props }, children)
}
