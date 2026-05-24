import { useState } from 'react'
import { submitForm } from '../api'
import { useToast } from '../context/ToastContext'
import { useModal } from '../context/ModalContext'

export default function Footer() {
  const showToast = useToast()
  const openModal = useModal()
  const [email, setEmail] = useState('')

  const handleNewsletter = async (e) => {
    e.preventDefault()
    if (!email) {
      showToast('Veuillez entrer votre email', 'error')
      return
    }
    try {
      await submitForm({ email }, 'newsletter')
      showToast('Inscription à la newsletter réussie !', 'success')
      setEmail('')
    } catch {
      showToast("Erreur lors de l'inscription.", 'error')
    }
  }

  // Ouvre une modale depuis un lien de footer sans naviguer
  const modalLink = (target) => (e) => {
    e.preventDefault()
    openModal(target)
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/images/logo.svg" alt="TESSIPI Foundation" className="footer-logo" />
            <p className="footer-tagline">Transformative Equity, Safety & Support Initiative for Inclusive Progress.</p>

            <div className="newsletter">
              <h4>Newsletter</h4>
              <p>Recevez nos actualités — pas de spam.</p>
              <form className="newsletter-form" id="newsletterForm" onSubmit={handleNewsletter}>
                <input
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" aria-label="S'inscrire">
                  <i className="fas fa-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>

          <div className="footer-links">
            <h4>À propos</h4>
            <ul>
              <li><a href="#apropos">À propos</a></li>
              <li><a href="#actions">Nos actions</a></li>
              <li><a href="#transparence">Transparence</a></li>
              <li><a href="#actualites">Actualités</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>S'engager</h4>
            <ul>
              <li><a href="#don">Faire un don</a></li>
              <li><a href="#" onClick={modalLink('partner')}>Devenir partenaire</a></li>
              <li><a href="#" onClick={modalLink('volunteer')}>Bénévolat</a></li>
              <li><a href="#" onClick={modalLink('member')}>Adhérer</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>123 Rue de la Solidarité<br />75001 Paris, France</p>
            <a href="mailto:contact@tessipi.org">contact@tessipi.org</a>
            <a href="tel:+33123456789">+33 1 23 45 67 89</a>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 TESSIPI Foundation. Tous droits réservés.</p>
          <div className="footer-legal">
            <a href="#">Mentions légales</a>
            <a href="#">Politique de confidentialité</a>
            <a href="#">Politique de cookies</a>
            <a href="#">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
