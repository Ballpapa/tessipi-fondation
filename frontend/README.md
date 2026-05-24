# Frontend TESSIPI Foundation — React + Vite

Migration du frontend (anciennement HTML/CSS/JS vanilla) vers **React 18 + Vite**.
Le style d'origine (`style.css`) et le rendu sont conservés à l'identique ; seule
la couche d'interaction a été réécrite en composants React.

## Prérequis

- Node.js 18+ (testé avec Node 22 / npm 10)

## Démarrage

```bash
npm install      # installer les dépendances
npm run dev      # serveur de dev (http://localhost:5173)
npm run build    # build de production -> dist/
npm run preview  # prévisualiser le build de production
```

## Structure

```
frontend/
├── index.html              # point d'entrée Vite (monte <div id="root">)
├── vite.config.js          # config Vite + proxy /api vers le backend PHP
├── public/                 # assets servis tels quels à la racine
│   ├── images/             # photos + logo
│   ├── manifest.json       # PWA
│   └── sw.js               # service worker (cache runtime)
└── src/
    ├── main.jsx            # entrée React + enregistrement du service worker
    ├── App.jsx             # composition des sections + state des modales
    ├── api.js              # submitForm (simulé par défaut, voir USE_REAL_API)
    ├── styles/style.css    # CSS d'origine, importé tel quel
    ├── data/content.js     # contenu statique (sections, stats, actualités…)
    ├── context/            # ToastContext, ModalContext
    ├── hooks/              # useCountUp (compteurs), useScrollReveal (animations)
    └── components/         # Navbar, Hero, Donation, About, Actions, Engage,
                            # Transparency, News, Impact, Contact, Footer,
                            # Modal(s), Counter, Reveal, FloatingDonate
```

## Brancher le backend PHP

Les formulaires sont **simulés** par défaut (comme dans l'ancien `main.js`).
Pour appeler les vraies APIs `backend/api/*.php` :

1. Mettre `USE_REAL_API = true` dans [src/api.js](src/api.js).
2. Adapter la cible du proxy `/api` dans [vite.config.js](vite.config.js) vers
   l'URL où tourne le PHP (ex. `http://localhost:8000`).

## Déploiement

`npm run build` produit un site statique dans `dist/`. C'est ce dossier qu'il faut
servir en production (et non plus `frontend/` directement). Le `.htaccess` à la
racine de `frontend/` peut être copié dans `dist/` selon l'hébergement.
