/**
 * Service Worker - TESSIPI Foundation
 * Gestion du cache pour une meilleure performance
 */

const CACHE_NAME = 'tessipi-foundation-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/images/logo.svg',
    '/images/asset_1.jpg',
    '/images/asset_2.jpg',
    '/images/asset_3.jpg',
    '/images/asset_4.jpg',
    '/images/asset_5.jpg',
    '/images/asset_6.jpg',
    '/images/asset_7.jpg',
    '/images/asset_8.jpg',
    '/images/asset_9.jpg',
    '/images/asset_10.jpg'
];

// Installation du Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Cache ouvert');
                return cache.addAll(urlsToCache);
            })
    );
});

// Interception des requêtes
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});

// Mise à jour du Service Worker
self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];
    
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
