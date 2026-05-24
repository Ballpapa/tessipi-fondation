<?php
/**
 * API - Gestion des inscriptions à la newsletter
 * TESSIPI Foundation
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

// Vérifier la méthode HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

// Récupérer les données JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validation de l'email
if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Un email valide est requis']);
    exit;
}

$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);

try {
    $db = getDB();
    
    // Vérifier si l'email existe déjà
    $checkStmt = $db->prepare("SELECT id FROM newsletter_subscribers WHERE email = :email");
    $checkStmt->execute([':email' => $email]);
    
    if ($checkStmt->fetch()) {
        http_response_code(409);
        echo json_encode(['success' => false, 'message' => 'Cet email est déjà inscrit à la newsletter']);
        exit;
    }
    
    // Insérer le nouvel abonné
    $stmt = $db->prepare("INSERT INTO newsletter_subscribers (email, subscribed_at, status) VALUES (:email, NOW(), 'active')");
    $stmt->execute([':email' => $email]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Vous êtes maintenant inscrit à notre newsletter !',
        'id' => $db->lastInsertId()
    ]);
    
} catch (Exception $e) {
    error_log("Erreur lors de l'inscription à la newsletter: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Une erreur est survenue. Veuillez réessayer plus tard.']);
}
?>
