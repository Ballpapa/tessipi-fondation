import { useState } from 'react'
import { donationAmounts, donationImpacts } from '../data/content'
import { useToast } from '../context/ToastContext'

function computeImpact(amount, type) {
  let impact
  if (amount <= 25) impact = donationImpacts[25]
  else if (amount <= 50) impact = donationImpacts[50]
  else if (amount <= 100) impact = donationImpacts[100]
  else if (amount <= 250) impact = donationImpacts[250]
  else impact = donationImpacts[500]

  if (type === 'monthly') impact += ' (par mois)'
  return impact
}

export default function Donation() {
  const showToast = useToast()
  const [type, setType] = useState('once')
  const [amount, setAmount] = useState(100)
  const [custom, setCustom] = useState('')

  const selectAmount = (value) => {
    setAmount(value)
    setCustom('')
  }

  const onCustomChange = (e) => {
    const v = e.target.value
    setCustom(v)
    if (v) setAmount(parseInt(v, 10) || 0)
  }

  const handleDonate = () => {
    if (amount <= 0) {
      showToast('Veuillez sélectionner un montant', 'error')
      return
    }
    const message =
      type === 'monthly'
        ? `Don mensuel de ${amount}€ configuré avec succès !`
        : `Don de ${amount}€ enregistré. Merci pour votre générosité !`
    showToast(message, 'success')
  }

  return (
    <section id="don" className="donation-section">
      <div className="container">
        <div className="donation-header">
          <h2 className="section-title">Faites un don</h2>
          <p className="section-subtitle">
            Chaque contribution, quelle que soit sa taille, transforme des vies.{' '}
            <span className="highlight-text">87% de vos dons vont directement à nos programmes sur le terrain.</span>
          </p>
        </div>

        <div className="donation-card">
          <div className="donation-type">
            <button
              className={`type-btn${type === 'once' ? ' active' : ''}`}
              onClick={() => setType('once')}
            >
              Une fois
            </button>
            <button
              className={`type-btn${type === 'monthly' ? ' active' : ''}`}
              onClick={() => setType('monthly')}
            >
              Mensuel
            </button>
          </div>

          <div className="donation-amounts">
            {donationAmounts.map((value) => (
              <button
                key={value}
                className={`amount-btn${amount === value && !custom ? ' active' : ''}`}
                onClick={() => selectAmount(value)}
              >
                {value}<span>€</span>
              </button>
            ))}
            <div className="custom-amount">
              <input
                type="number"
                id="customAmount"
                placeholder="Montant personnalisé"
                min="1"
                value={custom}
                onChange={onCustomChange}
              />
              <span className="currency">€</span>
            </div>
          </div>

          <div className="donation-impact">
            <div className="impact-icon">
              <i className="fas fa-heart"></i>
            </div>
            <div className="impact-text">
              <span className="impact-label">Votre impact</span>
              <span className="impact-value" id="impactValue">{computeImpact(amount, type)}</span>
            </div>
          </div>

          <button className="btn btn-primary btn-donate" id="donateBtn" onClick={handleDonate}>
            <i className="fas fa-heart"></i>
            Faire un don
          </button>

          <p className="donation-note">
            <i className="fas fa-lock"></i>
            Paiement sécurisé • Dons déductibles des impôts • Annulation à tout moment
          </p>
        </div>
      </div>
    </section>
  )
}
