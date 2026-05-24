import { createContext, useContext } from 'react'

/**
 * Expose openModal('partner' | 'volunteer' | 'member') aux composants profonds
 * (Engage, Footer) sans prop drilling. Le state réel vit dans App.
 */
const ModalContext = createContext(() => {})

export function ModalProvider({ openModal, children }) {
  return <ModalContext.Provider value={openModal}>{children}</ModalContext.Provider>
}

export function useModal() {
  return useContext(ModalContext)
}
