import { useEffect, useRef, useState } from 'react'

/**
 * Anime un compteur de 0 jusqu'à `target` lorsqu'il devient visible.
 * Reproduit l'animation easeOutQuart de l'ancien main.js.
 *
 * Retourne [ref, displayValue] : brancher `ref` sur l'élément et afficher `displayValue`.
 */
export function useCountUp(target, duration = 2000) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            animate()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    function animate() {
      const startTime = performance.now()
      function step(now) {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const current = Math.floor(target * easeOutQuart)
        setValue(progress < 1 ? current : target)
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  const display = target >= 1000 ? value.toLocaleString('fr-FR') : value
  return [ref, display]
}
