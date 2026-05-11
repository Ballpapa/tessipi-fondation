<?php
/**
 * API - Récupération des actualités
 * TESSIPI Foundation
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once '../config/database.php';

// Vérifier la méthode HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

// Paramètres de pagination
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
$offset = ($page - 1) * $limit;

// Paramètre de catégorie
$category = isset($_GET['category']) ? $_GET['category'] : null;

try {
    $db = getDB();
    
    // Construire la requête
    $whereClause = "WHERE status = 'published'";
    $params = [];
    
    if ($category) {
        $whereClause .= " AND category = :category";
        $params[':category'] = htmlspecialchars($category);
    }
    
    // Compter le nombre total d'articles
    $countStmt = $db->prepare("SELECT COUNT(*) as total FROM news " . $whereClause);
    $countStmt->execute($params);
    $total = $countStmt->fetch()['total'];
    
    // Récupérer les articles
    $query = "SELECT id, title, excerpt, content, category, image, author, published_at, created_at 
              FROM news " . $whereClause . " 
              ORDER BY published_at DESC 
              LIMIT :limit OFFSET :offset";
    
    $stmt = $db->prepare($query);
    
    // Binder les paramètres
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    
    $stmt->execute();
    $news = $stmt->fetchAll();
    
    // Formater les dates
    foreach ($news as &$article) {
        $article['published_at'] = date('d M Y', strtotime($article['published_at']));
    }
    
    echo json_encode([
        'success' => true,
        'data' => $news,
        'pagination' => [
            'page' => $page,
            'limit' => $limit,
            'total' => $total,
            'pages' => ceil($total / $limit)
        ]
    ]);
    
} catch (Exception $e) {
    error_log("Erreur lors de la récupération des actualités: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Une erreur est survenue.']);
}
?>
