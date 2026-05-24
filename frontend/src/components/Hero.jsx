import Counter from './Counter'
import { heroStats } from '../data/content'

export default function Hero() {
  return (
    <section id="accueil" className="hero">
      <div className="hero-background">
        <img src="/images/asset_1.jpg" alt="Enfant souriant" />
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-content">
        <div className="hero-text">
          <span className="hero-label">ONG INTERNATIONALE</span>
          <h1 className="hero-title">
            TRANSFORMER<br />
            <span className="highlight">DES VIES</span><br />
            PAR L'ACTION
          </h1>
          <p className="hero-description">
            TESSIPI Foundation œuvre pour l'équité, la sécurité et le soutien des communautés vulnérables à travers le monde.
          </p>
          <div className="hero-buttons">
            <a href="#don" className="btn btn-primary btn-large">
              Faire un don
              <i className="fas fa-arrow-right"></i>
            </a>
            <a href="#actions" className="btn btn-outline btn-large">
              Découvrir nos actions
            </a>
          </div>
        </div>

        <div className="hero-stats">
          {heroStats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <Counter target={stat.target} className="stat-number" />
              {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <a href="#don" className="scroll-indicator">
        <i className="fas fa-chevron-down"></i>
      </a>
    </section>
  )
}
