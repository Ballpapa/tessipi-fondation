import { useEffect } from 'react'

/**
 * Wrapper de modale : gère la classe active, la fermeture au clic sur le fond,
 * la touche Échap et le blocage du scroll. Reproduit showModal/closeModal.
 */
export default function Modal({ open, onClose, title, intro, children }) {
  useEffect(() => {
    if (!open) return

    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className={`modal${open ? ' active' : ''}`} onClick={onBackdrop}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{title}</h2>
        <p>{intro}</p>
        {children}
      </div>
    </div>
  )
}
