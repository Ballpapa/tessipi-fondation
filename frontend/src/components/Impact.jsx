import Reveal from './Reveal'
import Counter from './Counter'
import { impactItems } from '../data/content'

export default function Impact() {
  return (
    <section className="impact-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-label">NOTRE IMPACT</span>
          <h2 className="section-title">Chiffres clés</h2>
          <p className="section-description">
            Des résultats concrets qui témoignent de notre engagement aux côtés des communautés vulnérables.
          </p>
        </div>

        <div className="impact-grid">
          {impactItems.map((item, i) => (
            <Reveal as="div" className="impact-item" index={i} key={item.label}>
              <div className="impact-icon">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <Counter target={item.target} className="impact-number" />
              {item.suffix && <span className="impact-suffix">{item.suffix}</span>}
              <span className="impact-label">{item.label}</span>
              <span className="impact-sublabel">{item.sublabel}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
