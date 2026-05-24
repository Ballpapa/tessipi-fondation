import { useEffect, useState } from 'react'
import { navLinks } from '../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('accueil')
  const [lang, setLang] = useState('fr')

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50)

      // Détermine la section active (équivalent updateActiveNavLink)
      let current = ''
      document.querySelectorAll('section[id]').forEach((section) => {
        const top = section.offsetTop - 100
        if (window.scrollY >= top && window.scrollY < top + section.offsetHeight) {
          current = section.getAttribute('id')
        }
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloque le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const toggleLang = () => setLang((l) => (l === 'fr' ? 'en' : 'fr'))

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="container nav-container">
        <a href="#accueil" className="logo">
          <img src="/images/logo.svg" alt="TESSIPI Foundation" />
        </a>

        <button
          className={`mobile-menu-btn${menuOpen ? ' active' : ''}`}
          id="mobileMenuBtn"
          aria-label="Menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu${menuOpen ? ' active' : ''}`} id="navMenu">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link${activeSection === link.href.slice(1) ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="lang-btn" id="langBtn" onClick={toggleLang}>
            <span className="flag">{lang === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
            <span>{lang === 'fr' ? 'FR' : 'EN'}</span>
            <i className="fas fa-chevron-down"></i>
          </button>
          <a href="#don" className="btn btn-primary">Donner</a>
        </div>
      </div>
    </nav>
  )
}
