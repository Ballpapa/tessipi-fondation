import { useCountUp } from '../hooks/useCountUp'

/**
 * Affiche un nombre animé au scroll. `className` reprend les classes existantes
 * (stat-number / impact-number) pour conserver le style.
 */
export default function Counter({ target, className }) {
  const [ref, value] = useCountUp(target)
  return (
    <span className={className} ref={ref} data-target={target}>
      {value}
    </span>
  )
}
