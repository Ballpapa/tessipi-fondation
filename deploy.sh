#!/bin/bash
# ============================================
# Script de déploiement TESSIPI Foundation
# ============================================

set -e

echo "🚀 Déploiement TESSIPI Foundation"
echo "=================================="

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérifier les dépendances
echo -e "${YELLOW}📦 Vérification des dépendances...${NC}"

if ! command -v php &> /dev/null; then
    echo -e "${RED}❌ PHP n'est pas installé${NC}"
    exit 1
fi

if ! command -v mysql &> /dev/null; then
    echo -e "${RED}❌ MySQL n'est pas installé${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Toutes les dépendances sont installées${NC}"

# Créer la base de données
echo -e "${YELLOW}🗄️ Configuration de la base de données...${NC}"

read -p "Nom d'utilisateur MySQL (défaut: root): " DB_USER
DB_USER=${DB_USER:-root}

read -sp "Mot de passe MySQL: " DB_PASS
echo

# Tester la connexion
if ! mysql -u "$DB_USER" -p"$DB_PASS" -e "SELECT 1;" &> /dev/null; then
    echo -e "${RED}❌ Impossible de se connecter à MySQL${NC}"
    exit 1
fi

# Créer la base de données
mysql -u "$DB_USER" -p"$DB_PASS" < database/schema.sql

echo -e "${GREEN}✓ Base de données créée avec succès${NC}"

# Mettre à jour la configuration
echo -e "${YELLOW}⚙️ Configuration...${NC}"

CONFIG_FILE="backend/config/database.php"
sed -i "s/define('DB_USER', 'root')/define('DB_USER', '$DB_USER')/" "$CONFIG_FILE"
sed -i "s/define('DB_PASS', '')/define('DB_PASS', '$DB_PASS')/" "$CONFIG_FILE"

echo -e "${GREEN}✓ Configuration mise à jour${NC}"

# Vérifier les permissions
echo -e "${YELLOW}🔒 Vérification des permissions...${NC}"

chmod 755 backend/
chmod 755 backend/api/
chmod 644 backend/api/*.php
chmod 644 backend/config/database.php

echo -e "${GREEN}✓ Permissions configurées${NC}"

# Test de l'installation
echo -e "${YELLOW}🧪 Test de l'installation...${NC}"

php backend/test.php > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Tests réussis${NC}"
else
    echo -e "${YELLOW}⚠️ Certains tests ont échoué. Vérifiez http://votre-site/backend/test.php${NC}"
fi

echo ""
echo -e "${GREEN}✅ Déploiement terminé avec succès !${NC}"
echo ""
echo "📋 Prochaines étapes:"
echo "   1. Accédez au site: http://votre-site/frontend/"
echo "   2. Testez l'installation: http://votre-site/backend/test.php"
echo "   3. Changez le mot de passe admin dans la base de données"
echo "   4. Configurez HTTPS pour la production"
echo ""
echo "📖 Documentation: README.md"
