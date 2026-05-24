import Reveal from './Reveal'
import { engagements } from '../data/content'
import { useModal } from '../context/ModalContext'

export default function Engage() {
  const openModal = useModal()

  return (
    <section id="engager" className="engage-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-label">S'ENGAGER</span>
          <h2 className="section-title">Rejoignez l'action</h2>
          <p className="section-description">
            De quelque manière que ce soit — votre temps, vos compétences ou votre soutien.
          </p>
        </div>

        <div className="engage-grid">
          {engagements.map((item, i) => (
            <Reveal as="div" className="engage-card" index={i} key={item.title}>
              <div className="engage-icon">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h3 className="engage-title">{item.title}</h3>
              <p className="engage-description">{item.description}</p>
              {item.cta.type === 'link' ? (
                <a href={item.cta.target} className="btn btn-outline btn-small">
                  {item.cta.label} <i className="fas fa-arrow-right"></i>
                </a>
              ) : (
                <button className="btn btn-outline btn-small" onClick={() => openModal(item.cta.target)}>
                  {item.cta.label} <i className="fas fa-arrow-right"></i>
                </button>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
