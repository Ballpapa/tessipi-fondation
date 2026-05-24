# Backend TESSIPI Foundation — Django + DRF

Remplace l'ancien backend PHP (conservé dans [../backend-php/](../backend-php/) pour référence).
Stack : **Django 5.1 + Django REST Framework + PostgreSQL**.

## Prérequis

- Python 3.11+ (testé avec 3.13)
- PostgreSQL en cours d'exécution

## Installation

```bash
cd backend
python -m venv venv
venv\Scripts\activate            # Windows (PowerShell : venv\Scripts\Activate.ps1)
pip install -r requirements.txt

copy .env.example .env           # puis renseigner les identifiants Postgres
```

Créer la base de données :

```bash
psql -h 127.0.0.1 -U postgres -c "CREATE DATABASE tessipi_foundation;"
```

Appliquer les migrations (crée les tables + données initiales news/stats) :

```bash
python manage.py migrate
```

Lancer le serveur :

```bash
python manage.py runserver 127.0.0.1:8000
```

Créer un compte admin (optionnel, pour /admin/) :

```bash
python manage.py createsuperuser
```

## Endpoints

Base : `/api/` — format de réponse compatible avec le frontend
(`{success, message, id}` / `{success:false, errors:[...]}` / 409 sur doublon).

| Méthode | Endpoint            | Rôle                          | Ancien PHP        |
|---------|---------------------|-------------------------------|-------------------|
| POST    | `/api/contact/`     | Message de contact            | contact.php       |
| POST    | `/api/newsletter/`  | Inscription newsletter (409 si doublon) | newsletter.php |
| POST    | `/api/donation/`    | Enregistrement d'un don       | donation.php      |
| POST    | `/api/partners/`    | Demande de partenariat        | partners.php      |
| POST    | `/api/volunteers/`  | Inscription bénévole          | volunteers.php    |
| POST    | `/api/members/`     | Adhésion (409 si doublon)     | members.php       |
| GET     | `/api/news/`        | Actualités publiées (paginées, `?page=&limit=&category=`) | news.php |

## Structure

```
backend/
├── manage.py
├── requirements.txt
├── .env.example            # modèle de configuration
├── config/                 # projet Django (settings, urls, wsgi/asgi)
└── api/                    # app principale
    ├── models.py           # Contact, Donation, Newsletter, Partner,
    │                       # Volunteer, Member, News, Stat
    ├── serializers.py      # validation (équivalente à l'ancien PHP)
    ├── views.py            # vues DRF + format de réponse
    ├── urls.py             # routes /api/*
    └── migrations/         # schéma + seed (news, stats)
```

## Lien avec le frontend

Le frontend React appelle `/api/<type>/` via le proxy Vite (voir
`frontend/vite.config.js`). Le branchement réel est activé par
`USE_REAL_API = true` dans `frontend/src/api.js`.

> Note : le formulaire de don du frontend ne collecte pour l'instant que le
> montant et le type ; l'endpoint `/api/donation/` attend en plus `email`,
> `firstname`, `lastname`. Compléter le formulaire React avant de le brancher.

## Passage en production

- `DJANGO_DEBUG=False`, `DJANGO_SECRET_KEY` robuste, `DJANGO_ALLOWED_HOSTS` renseigné
- Servir via WSGI/ASGI (gunicorn/uvicorn) derrière nginx
- `python manage.py collectstatic`
