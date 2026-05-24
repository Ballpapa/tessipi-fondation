import Reveal from './Reveal'
import { news } from '../data/content'

export default function News() {
  return (
    <section id="actualites" className="news-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">ACTUALITÉS</span>
          <h2 className="section-title">Nos dernières nouvelles</h2>
          <a href="#" className="link-arrow">Voir toutes les actualités <i className="fas fa-arrow-right"></i></a>
        </div>

        <div className="news-grid">
          {news.map((item, i) => (
            <Reveal as="article" className="news-card" index={i} key={item.title}>
              <div className="news-image">
                <img src={item.image} alt={item.alt} />
                <span className="news-category">{item.category}</span>
              </div>
              <div className="news-content">
                <h3 className="news-title">{item.title}</h3>
                <p className="news-excerpt">{item.excerpt}</p>
                <div className="news-footer">
                  <span className="news-date"><i className="far fa-calendar"></i> {item.date}</span>
                  <a href="#" className="link-arrow">Lire</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
