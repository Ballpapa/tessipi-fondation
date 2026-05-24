/**
 * Service Worker - TESSIPI Foundation
 *
 * Avec Vite, les fichiers JS/CSS portent un hash dans leur nom (inconnu à
 * l'avance), on ne peut donc pas précacher une liste figée comme avant.
 * Stratégie : précache minimal de la coquille + cache runtime au fil des requêtes
 * (network-first pour la navigation, cache-first pour les assets statiques).
 */

const CACHE_NAME = 'tessipi-foundation-v2'
const PRECACHE = ['/', '/manifest.json', '/images/logo.svg']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  // Navigation : réseau d'abord, repli sur le cache hors-ligne
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('/')))
    return
  }

  // Assets : cache d'abord, sinon réseau (et on met en cache au passage)
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request).then((response) => {
        if (response.ok && response.type === 'basic') {
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
        }
        return response
      })
    })
  )
})
