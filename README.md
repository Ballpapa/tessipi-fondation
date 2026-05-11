# TESSIPI Foundation - Site Web Complet

![TESSIPI Foundation](frontend/images/logo.svg)

Un site web complet pour une ONG internationale, avec frontend HTML/CSS/JS pur, backend PHP et base de données MySQL.

## 📋 Table des matières

- [Structure du projet](#structure-du-projet)
- [Technologies utilisées](#technologies-utilisées)
- [Installation locale](#installation-locale)
- [Déploiement en ligne](#déploiement-en-ligne)
- [Configuration](#configuration)
- [API Backend](#api-backend)
- [Sécurité](#sécurité)
- [Optimisation](#optimisation)

## 📁 Structure du projet

```
tessipi-foundation/
├── frontend/               # Frontend (HTML, CSS, JS)
│   ├── index.html         # Page principale
│   ├── css/
│   │   └── style.css      # Styles complets
│   ├── js/
│   │   └── main.js        # JavaScript principal
│   └── images/            # Images du site
│       ├── logo.svg
│       ├── asset_1.jpg    # Hero background
│       ├── asset_2.jpg    # Santé & Bien-être
│       ├── asset_3.jpg    # Nutrition
│       ├── asset_4.jpg    # Éducation
│       ├── asset_5.jpg    # Protection
│       ├── asset_6.jpg    # Eau & Assainissement
│       ├── asset_7.jpg    # Urgence
│       ├── asset_8.jpg    # Actualité 1
│       ├── asset_9.jpg    # Actualité 2
│       └── asset_10.jpg   # Actualité 3
├── backend/               # Backend PHP
│   ├── config/
│   │   └── database.php   # Configuration DB
│   ├── api/               # API endpoints
│   │   ├── contact.php    # Formulaire de contact
│   │   ├── newsletter.php # Inscription newsletter
│   │   ├── donation.php   # Gestion des dons
│   │   ├── partners.php   # Demandes de partenariat
│   │   ├── volunteers.php # Inscriptions bénévoles
│   │   ├── members.php    # Adhésions
│   │   └── news.php       # Récupération des actualités
│   └── .htaccess          # Configuration Apache
├── database/
│   └── schema.sql         # Schéma de la base de données
└── README.md              # Ce fichier
```

## 🛠 Technologies utilisées

### Frontend
- **HTML5** - Structure sémantique
- **CSS3** - Flexbox, Grid, animations
- **JavaScript (ES6+)** - Interactivité, sans framework
- **Font Awesome** - Icônes
- **Google Fonts** - Typographie Inter

### Backend
- **PHP 7.4+** - API REST
- **MySQL 5.7+** - Base de données
- **PDO** - Connexion sécurisée à la DB

## 💻 Installation locale

### Prérequis
- XAMPP, WAMP, MAMP ou LAMP installé
- PHP 7.4 ou supérieur
- MySQL 5.7 ou supérieur

### Étapes d'installation

#### 1. Cloner ou copier le projet

```bash
# Copier le dossier dans le répertoire web de XAMPP
# Windows: C:\xampp\htdocs\
# macOS: /Applications/XAMPP/htdocs/
# Linux: /var/www/html/

cp -r tessipi-foundation /var/www/html/
```

#### 2. Créer la base de données

```bash
# Se connecter à MySQL
mysql -u root -p

# Ou utiliser phpMyAdmin
# http://localhost/phpmyadmin
```

```sql
-- Créer la base de données et les tables
SOURCE /var/www/html/tessipi-foundation/database/schema.sql;
```

#### 3. Configurer la connexion à la base de données

Éditer le fichier `backend/config/database.php` :

```php
<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'tessipi_foundation');
define('DB_USER', 'root');       // Votre utilisateur MySQL
define('DB_PASS', '');           // Votre mot de passe MySQL
define('DB_CHARSET', 'utf8mb4');
?>
```

#### 4. Accéder au site

```
http://localhost/tessipi-foundation/frontend/
```

## 🚀 Déploiement en ligne

### Sur un hébergement mutualisé (OVH, 1&1, etc.)

#### 1. Préparer les fichiers

```bash
# Créer une archive ZIP du projet
zip -r tessipi-foundation.zip tessipi-foundation/
```

#### 2. Uploader les fichiers

- Connectez-vous à votre FTP (FileZilla, Cyberduck)
- Uploadez le contenu du dossier `frontend/` dans `public_html/` ou `www/`
- Uploadez le dossier `backend/` à la racine (hors accès public)

#### 3. Créer la base de données

- Connectez-vous à votre panneau de contrôle (cPanel, Plesk)
- Créez une base de données MySQL
- Créez un utilisateur avec tous les privilèges
- Importez le fichier `database/schema.sql`

#### 4. Configurer la connexion

Éditer `backend/config/database.php` avec vos informations :

```php
<?php
define('DB_HOST', 'votre-hote-mysql');  // Ex: mysql-votresite.alwaysdata.net
define('DB_NAME', 'votre-nom-de-db');
define('DB_USER', 'votre-utilisateur');
define('DB_PASS', 'votre-mot-de-passe');
define('DB_CHARSET', 'utf8mb4');
?>
```

### Sur un VPS (DigitalOcean, AWS, etc.)

#### 1. Installer les dépendances

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install apache2 mysql-server php php-mysql php-pdo

# Activer les modules Apache
sudo a2enmod rewrite
sudo a2enmod deflate
sudo a2enmod expires
sudo systemctl restart apache2
```

#### 2. Configurer le virtual host

```bash
sudo nano /etc/apache2/sites-available/tessipi.conf
```

```apache
<VirtualHost *:80>
    ServerName votredomaine.com
    DocumentRoot /var/www/tessipi-foundation/frontend
    
    <Directory /var/www/tessipi-foundation/frontend>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Protection du backend
    <Directory /var/www/tessipi-foundation/backend>
        Require all denied
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/tessipi-error.log
    CustomLog ${APACHE_LOG_DIR}/tessipi-access.log combined
</VirtualHost>
```

```bash
sudo a2ensite tessipi
sudo systemctl reload apache2
```

#### 3. Configurer MySQL

```bash
sudo mysql_secure_installation
mysql -u root -p
```

```sql
CREATE DATABASE tessipi_foundation CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'tessipi_user'@'localhost' IDENTIFIED BY 'votre-mot-de-passe-securise';
GRANT ALL PRIVILEGES ON tessipi_foundation.* TO 'tessipi_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

```bash
mysql -u tessipi_user -p tessipi_foundation < database/schema.sql
```

## ⚙️ Configuration

### Variables d'environnement

Créer un fichier `.env` à la racine du backend (non inclus dans le git) :

```bash
# backend/.env
DB_HOST=localhost
DB_NAME=tessipi_foundation
DB_USER=root
DB_PASS=votre-mot-de-passe

# Configuration email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-app

# Clés API (Stripe, etc.)
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Sécurité

#### 1. Changer le mot de passe admin par défaut

```sql
-- Se connecter à MySQL
USE tessipi_foundation;

-- Mettre à jour le mot de passe (utiliser password_hash en PHP)
UPDATE users SET password_hash = '$2y$10$...' WHERE username = 'admin';
```

#### 2. Activer HTTPS

```bash
# Installer Certbot (Let's Encrypt)
sudo apt install certbot python3-certbot-apache

# Générer le certificat
sudo certbot --apache -d votredomaine.com
```

#### 3. Protection contre les attaques

Le fichier `.htaccess` inclus protège déjà contre :
- L'accès aux fichiers cachés (.")
- L'accès aux fichiers sensibles (.ini, .log, .sql)
- L'affichage des répertoires

## 🔌 API Backend

### Endpoints disponibles

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/contact.php` | POST | Envoyer un message de contact |
| `/api/newsletter.php` | POST | S'inscrire à la newsletter |
| `/api/donation.php` | POST | Enregistrer un don |
| `/api/partners.php` | POST | Demande de partenariat |
| `/api/volunteers.php` | POST | Inscription bénévole |
| `/api/members.php` | POST | Demande d'adhésion |
| `/api/news.php` | GET | Récupérer les actualités |

### Exemples d'utilisation

#### Envoyer un message de contact

```javascript
fetch('/backend/api/contact.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'Jean Dupont',
        email: 'jean@example.com',
        subject: 'Question',
        message: 'Bonjour, j\'ai une question...'
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

#### Récupérer les actualités

```javascript
fetch('/backend/api/news.php?page=1&limit=5')
    .then(response => response.json())
    .then(data => console.log(data));
```

## 🔒 Sécurité

### Mesures implémentées

1. **Protection SQL Injection** - Utilisation de PDO avec requêtes préparées
2. **XSS Protection** - Échappement des sorties avec htmlspecialchars()
3. **CSRF Protection** - Tokens CSRF (à implémenter selon besoin)
4. **Validation des entrées** - Vérification côté client et serveur
5. **Headers de sécurité** - Configuration Apache via .htaccess

### Recommandations

- Changez le mot de passe admin par défaut immédiatement
- Activez HTTPS en production
- Mettez à jour régulièrement PHP et MySQL
- Sauvegardez régulièrement la base de données
- Utilisez un pare-feu (fail2ban)

## ⚡ Optimisation

### Performance

1. **Compression Gzip** - Activée via .htaccess
2. **Cache navigateur** - Configuration des headers Expires
3. **Lazy loading** - Pour les images (à implémenter)
4. **Minification** - Compresser CSS et JS en production

### SEO

- Structure HTML5 sémantique
- Meta tags optimisés
- URLs propres
- Images avec attributs alt
- Responsive design

### Accessibilité

- Attributs ARIA
- Contraste des couleurs
- Navigation au clavier
- Support des lecteurs d'écran

## 📞 Support

Pour toute question ou problème :

- Email : contact@tessipi.org
- Documentation : https://docs.tessipi.org
- Issues : https://github.com/tessipi/foundation/issues

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

**TESSIPI Foundation** - Transformer des vies par l'action ❤️
