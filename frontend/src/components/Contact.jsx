import { useState } from 'react'
import { submitForm } from '../api'
import { useToast } from '../context/ToastContext'

const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const showToast = useToast()
  const [form, setForm] = useState(EMPTY)

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) {
      showToast('Veuillez remplir tous les champs', 'error')
      return
    }
    try {
      await submitForm(form, 'contact')
      showToast('Message envoyé avec succès !', 'success')
      setForm(EMPTY)
    } catch {
      showToast("Erreur lors de l'envoi. Veuillez réessayer.", 'error')
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-label">CONTACT</span>
          <h2 className="section-title">Parlons de votre projet</h2>
          <p className="section-description">
            Envoyez-nous un message, demandez un dossier de partenariat ou configurez un don mensuel.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
              <div className="contact-details">
                <h4>Adresse</h4>
                <p>123 Rue de la Solidarité<br />75001 Paris, France</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-envelope"></i></div>
              <div className="contact-details">
                <h4>Email</h4>
                <a href="mailto:contact@tessipi.org">contact@tessipi.org</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-phone"></i></div>
              <div className="contact-details">
                <h4>Téléphone</h4>
                <a href="tel:+33123456789">+33 1 23 45 67 89</a>
              </div>
            </div>

            <div className="contact-social">
              <h4>Réseaux sociaux</h4>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="social-link" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-link" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                <a href="#" className="social-link" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>

          <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nom complet</label>
                <input type="text" id="name" name="name" placeholder="Votre nom" value={form.name} onChange={update} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="votre@email.com" value={form.email} onChange={update} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Sujet</label>
              <input type="text" id="subject" name="subject" placeholder="Comment pouvons-nous vous aider ?" value={form.subject} onChange={update} required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Votre message..." value={form.message} onChange={update} required></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-submit">
              Envoyer le message
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
