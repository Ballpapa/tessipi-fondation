/**
 * Soumission des formulaires vers l'API Django (DRF).
 *
 * Endpoints : /api/<type>/  (contact, newsletter, partners, volunteers, members…)
 * Le proxy /api est configuré dans vite.config.js pour le dev.
 *
 * Pour revenir à un envoi simulé (sans backend), mettre USE_REAL_API à false.
 */

const USE_REAL_API = true

export async function submitForm(data, type) {
  if (!USE_REAL_API) {
    // Simulation d'un délai réseau
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Formulaire ${type} soumis:`, data)
        resolve({ success: true })
      }, 1000)
    })
  }

  const response = await fetch(`/api/${type}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const result = await response.json().catch(() => ({}))
  if (!response.ok) {
    // L'API renvoie {success:false, errors:[...]} ou {success:false, message:"..."}
    const detail = result.errors?.join(' ') || result.message || `Erreur API (${response.status})`
    throw new Error(detail)
  }
  return result
}

export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}
