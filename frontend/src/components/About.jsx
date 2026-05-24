import Reveal from './Reveal'
import { values } from '../data/content'

export default function About() {
  return (
    <section id="apropos" className="about-section">
      <div className="container">
        <div className="about-header">
          <span className="section-label">QUI SOMMES-NOUS</span>
          <h2 className="section-title">Une fondation engagée pour un monde plus juste</h2>
          <p className="about-description">
            TESSIPI Foundation (Transformative Equity, Safety & Support Initiative for Inclusive Progress)
            est une ONG internationale créée en 2008, dédiée à l'aide humanitaire et au développement durable.
          </p>
          <p className="about-description">
            Nous intervenons dans 12 pays à travers des programmes de santé, d'éducation, de protection
            et d'accompagnement des communautés vulnérables.
          </p>
          <a href="#" className="link-arrow">En savoir plus sur nous <i className="fas fa-arrow-right"></i></a>
        </div>

        <div className="values-grid">
          {values.map((value, i) => (
            <Reveal as="div" className="value-card" index={i} key={value.title}>
              <div className="value-icon">
                <i className={`fas ${value.icon}`}></i>
              </div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
