import { useEffect, useRef } from 'react'

/**
 * Fait apparaître l'élément (fade + translate) quand il entre dans le viewport.
 * Reproduit initScrollAnimations de l'ancien main.js, avec un délai en escalier.
 *
 * Usage : const ref = useScrollReveal(index); <div ref={ref}>...
 */
export function useScrollReveal(index = 0) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return ref
}
