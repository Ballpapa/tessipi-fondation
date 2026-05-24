<?php
/**
 * Configuration de la base de données
 * TESSIPI Foundation
 */

// Paramètres de connexion (à modifier selon votre environnement)
define('DB_HOST', 'localhost');
define('DB_NAME', 'tessipi_foundation');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

/**
 * Classe de connexion à la base de données (Singleton)
 */
class Database {
    private static $instance = null;
    private $connection;
    
    private function __construct() {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            
            $this->connection = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            error_log("Erreur de connexion à la base de données: " . $e->getMessage());
            throw new Exception("Erreur de connexion à la base de données");
        }
    }
    
    /**
     * Récupère l'instance unique de la base de données
     */
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Récupère la connexion PDO
     */
    public function getConnection() {
        return $this->connection;
    }
}

/**
 * Fonction utilitaire pour obtenir la connexion
 */
function getDB() {
    return Database::getInstance()->getConnection();
}
?>
