import { useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Donation from './components/Donation'
import About from './components/About'
import Actions from './components/Actions'
import Engage from './components/Engage'
import Transparency from './components/Transparency'
import News from './components/News'
import Impact from './components/Impact'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingDonate from './components/FloatingDonate'
import Modals from './components/Modals'
import { ModalProvider } from './context/ModalContext'

export default function App() {
  const [activeModal, setActiveModal] = useState(null)

  const openModal = useCallback((name) => setActiveModal(name), [])
  const closeModal = useCallback(() => setActiveModal(null), [])

  // Scroll doux pour tous les liens d'ancre, avec un offset pour la navbar fixe.
  // Délégation au niveau document, comme l'ancien initSmoothScroll().
  useEffect(() => {
    function onClick(e) {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (href === '#') return

      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' })
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // Respecte la préférence de réduction des animations
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <ModalProvider openModal={openModal}>
      <Navbar />
      <Hero />
      <Donation />
      <About />
      <Actions />
      <Engage />
      <Transparency />
      <News />
      <Impact />
      <Contact />
      <Footer />
      <FloatingDonate />
      <Modals active={activeModal} onClose={closeModal} />
    </ModalProvider>
  )
}
