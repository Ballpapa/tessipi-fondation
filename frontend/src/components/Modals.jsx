import Modal from './Modal'
import { submitForm } from '../api'
import { useToast } from '../context/ToastContext'

/**
 * Les trois modales d'engagement (partenaire / bénévole / adhésion).
 * `active` vaut 'partner' | 'volunteer' | 'member' | null.
 */
export default function Modals({ active, onClose }) {
  const showToast = useToast()

  const handleSubmit = (type, successMessage) => async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    try {
      await submitForm(data, type)
      showToast(successMessage, 'success')
      e.target.reset()
      onClose()
    } catch {
      showToast("Une erreur est survenue. Veuillez réessayer.", 'error')
    }
  }

  return (
    <>
      <Modal
        open={active === 'partner'}
        onClose={onClose}
        title="Devenir partenaire"
        intro="Rejoignez notre réseau de partenaires et amplifiez votre impact social."
      >
        <form onSubmit={handleSubmit('partners', 'Demande de partenariat envoyée !')}>
          <div className="form-group">
            <label>Nom de l'organisation</label>
            <input type="text" name="organization" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-group">
            <label>Type de partenariat souhaité</label>
            <select name="partnership_type" required defaultValue="">
              <option value="">Sélectionnez...</option>
              <option value="financier">Partenariat financier</option>
              <option value="technique">Partenariat technique</option>
              <option value="media">Partenariat média</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Envoyer la demande</button>
        </form>
      </Modal>

      <Modal
        open={active === 'volunteer'}
        onClose={onClose}
        title="Devenir bénévole"
        intro="Votre temps et vos compétences peuvent changer des vies."
      >
        <form onSubmit={handleSubmit('volunteers', 'Inscription en tant que bénévole réussie !')}>
          <div className="form-group">
            <label>Nom complet</label>
            <input type="text" name="name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-group">
            <label>Domaine d'expertise</label>
            <select name="expertise" required defaultValue="">
              <option value="">Sélectionnez...</option>
              <option value="sante">Santé</option>
              <option value="education">Éducation</option>
              <option value="admin">Administration</option>
              <option value="communication">Communication</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">S'inscrire</button>
        </form>
      </Modal>

      <Modal
        open={active === 'member'}
        onClose={onClose}
        title="Adhérer à TESSIPI"
        intro="Rejoignez notre communauté de membres engagés."
      >
        <form onSubmit={handleSubmit('members', "Demande d'adhésion envoyée !")}>
          <div className="form-group">
            <label>Nom complet</label>
            <input type="text" name="name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-group">
            <label>Téléphone</label>
            <input type="tel" name="phone" required />
          </div>
          <button type="submit" className="btn btn-primary">Devenir membre</button>
        </form>
      </Modal>
    </>
  )
}
