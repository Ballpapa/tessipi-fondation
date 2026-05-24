import Reveal from './Reveal'
import { actions } from '../data/content'

export default function Actions() {
  return (
    <section id="actions" className="actions-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">NOS ACTIONS</span>
          <h2 className="section-title">Des programmes qui changent des vies</h2>
          <p className="section-description">
            TESSIPI Foundation intervient dans 6 domaines prioritaires pour répondre aux besoins
            essentiels des communautés vulnérables à travers le monde.
          </p>
        </div>

        <div className="actions-grid">
          {actions.map((action, i) => (
            <Reveal as="div" className="action-card" index={i} key={action.title}>
              <div className="action-image">
                <img src={action.image} alt={action.alt} />
                <span className="action-badge">{action.badge}</span>
              </div>
              <div className="action-content">
                <h3 className="action-title">{action.title}</h3>
                <p className="action-description">{action.description}</p>
                <a href="#" className="link-arrow">En savoir plus <i className="fas fa-arrow-right"></i></a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
