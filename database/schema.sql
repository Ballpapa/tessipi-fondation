-- ============================================
-- TESSIPI Foundation - Schéma de base de données
-- ============================================

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS tessipi_foundation 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

USE tessipi_foundation;

-- ============================================
-- TABLE: contacts
-- Stocke les messages de contact
-- ============================================
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: newsletter_subscribers
-- Stocke les abonnés à la newsletter
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    status ENUM('active', 'unsubscribed', 'bounced') DEFAULT 'active',
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at DATETIME NULL,
    
    INDEX idx_email (email),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: donations
-- Stocke les dons
-- ============================================
CREATE TABLE IF NOT EXISTS donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    type ENUM('once', 'monthly') NOT NULL,
    email VARCHAR(100) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    address VARCHAR(200) NULL,
    city VARCHAR(100) NULL,
    postal_code VARCHAR(20) NULL,
    country VARCHAR(2) DEFAULT 'FR',
    message TEXT NULL,
    status ENUM('pending', 'completed', 'failed', 'cancelled', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50) NULL,
    payment_id VARCHAR(100) NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: partners
-- Stocke les demandes de partenariat
-- ============================================
CREATE TABLE IF NOT EXISTS partners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    organization VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NULL,
    partnership_type ENUM('financier', 'technique', 'media', 'autre') NOT NULL,
    message TEXT NULL,
    status ENUM('pending', 'approved', 'rejected', 'active', 'ended') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_partnership_type (partnership_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: volunteers
-- Stocke les inscriptions de bénévoles
-- ============================================
CREATE TABLE IF NOT EXISTS volunteers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NULL,
    expertise ENUM('sante', 'education', 'admin', 'communication', 'autre') NOT NULL,
    experience TEXT NULL,
    availability TEXT NULL,
    message TEXT NULL,
    status ENUM('pending', 'approved', 'rejected', 'active', 'inactive') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_expertise (expertise)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: members
-- Stocke les adhésions
-- ============================================
CREATE TABLE IF NOT EXISTS members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(200) NULL,
    city VARCHAR(100) NULL,
    postal_code VARCHAR(20) NULL,
    motivation TEXT NULL,
    status ENUM('pending', 'approved', 'rejected', 'active', 'suspended') DEFAULT 'pending',
    membership_type ENUM('individual', 'family', 'student', 'senior') DEFAULT 'individual',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: news
-- Stocke les actualités/articles
-- ============================================
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    excerpt TEXT NULL,
    content LONGTEXT NULL,
    category ENUM('nouveau_projet', 'evenement', 'temoignage', 'rapport', 'autre') DEFAULT 'autre',
    image VARCHAR(255) NULL,
    author VARCHAR(100) NULL,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    published_at DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_published_at (published_at),
    FULLTEXT INDEX idx_title_content (title, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: stats
-- Stocke les statistiques de l'organisation
-- ============================================
CREATE TABLE IF NOT EXISTS stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stat_key VARCHAR(50) NOT NULL UNIQUE,
    stat_value INT NOT NULL DEFAULT 0,
    stat_label VARCHAR(100) NOT NULL,
    description TEXT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_stat_key (stat_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE: users (pour l'administration)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    role ENUM('admin', 'editor', 'moderator') DEFAULT 'editor',
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    last_login DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- INSERTION DES DONNÉES INITIALES
-- ============================================

-- Statistiques initiales
INSERT INTO stats (stat_key, stat_value, stat_label, description) VALUES
('beneficiaries', 147000, 'Bénéficiaires', 'Nombre total de personnes aidées'),
('countries', 12, 'Pays', 'Nombre de pays d\'intervention'),
('clinics', 89, 'Cliniques', 'Nombre de centres de santé'),
('water_points', 234, 'Points d\'eau', 'Forages et pompes installés'),
('schools', 45, 'Écoles', 'Établissements scolaires soutenus'),
('year_founded', 2008, 'Année de création', 'Année de fondation de l\'organisation');

-- Actualités initiales
INSERT INTO news (title, excerpt, content, category, image, author, status, published_at) VALUES
(
    'Inauguration d\'une nouvelle clinique en Afrique de l\'Est',
    'TESSIPI Foundation inaugure une nouvelle clinique pédiatrique qui permettra de soigner plus de 5 000 enfants par an.',
    'Contenu complet de l\'article sur l\'inauguration...',
    'nouveau_projet',
    'images/news/clinic.jpg',
    'Équipe TESSIPI',
    'published',
    '2026-02-10 10:00:00'
),
(
    'Formation internationale des agents de santé communautaire',
    'Rejoignez notre programme de formation virtuel pour devenir agent de santé communautaire certifié TESSIPI.',
    'Contenu complet de l\'article sur la formation...',
    'evenement',
    'images/news/training.jpg',
    'Équipe TESSIPI',
    'published',
    '2026-03-04 14:00:00'
),
(
    'Comment un dépistage a sauvé une année scolaire',
    'L\'histoire de Amina, une jeune fille dont la vie a été transformée grâce à un simple dépistage de vue.',
    'Contenu complet du témoignage...',
    'temoignage',
    'images/news/testimony.jpg',
    'Équipe TESSIPI',
    'published',
    '2026-01-22 09:00:00'
);

-- Utilisateur admin par défaut (mot de passe: admin123)
-- ATTENTION: Changer ce mot de passe en production!
INSERT INTO users (username, email, password_hash, firstname, lastname, role, status) VALUES
('admin', 'admin@tessipi.org', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'TESSIPI', 'admin', 'active');

-- ============================================
-- VUES POUR LES RAPPORTS
-- ============================================

-- Vue des dons par mois
CREATE VIEW donations_by_month AS
SELECT 
    DATE_FORMAT(created_at, '%Y-%m') as month,
    COUNT(*) as total_donations,
    SUM(amount) as total_amount,
    type
FROM donations
WHERE status = 'completed'
GROUP BY DATE_FORMAT(created_at, '%Y-%m'), type
ORDER BY month DESC;

-- Vue des statistiques globales
CREATE VIEW global_stats AS
SELECT 
    (SELECT COUNT(*) FROM donations WHERE status = 'completed') as total_donations,
    (SELECT SUM(amount) FROM donations WHERE status = 'completed') as total_donated,
    (SELECT COUNT(*) FROM newsletter_subscribers WHERE status = 'active') as newsletter_subscribers,
    (SELECT COUNT(*) FROM volunteers WHERE status = 'active') as active_volunteers,
    (SELECT COUNT(*) FROM partners WHERE status = 'active') as active_partners,
    (SELECT COUNT(*) FROM members WHERE status = 'active') as active_members;
