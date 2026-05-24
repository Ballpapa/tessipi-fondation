<?php
/**
 * API - Gestion des adhésions
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

// Validation des données
$errors = [];

if (empty($data['name']) || strlen(trim($data['name'])) < 2) {
    $errors[] = 'Le nom complet est requis';
}

if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Un email valide est requis';
}

if (empty($data['phone'])) {
    $errors[] = 'Le numéro de téléphone est requis';
}

// Si des erreurs, retourner une réponse d'erreur
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

try {
    $db = getDB();
    
    // Vérifier si l'email existe déjà
    $checkStmt = $db->prepare("SELECT id FROM members WHERE email = :email");
    $checkStmt->execute([':email' => filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL)]);
    
    if ($checkStmt->fetch()) {
        http_response_code(409);
        echo json_encode(['success' => false, 'message' => 'Cet email est déjà associé à un compte membre']);
        exit;
    }
    
    // Préparer et exécuter la requête
    $stmt = $db->prepare("INSERT INTO members (name, email, phone, address, city, postal_code, motivation, status, created_at) VALUES (:name, :email, :phone, :address, :city, :postal_code, :motivation, 'pending', NOW())");
    
    $stmt->execute([
        ':name' => htmlspecialchars(trim($data['name'])),
        ':email' => filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL),
        ':phone' => htmlspecialchars(trim($data['phone'])),
        ':address' => !empty($data['address']) ? htmlspecialchars(trim($data['address'])) : null,
        ':city' => !empty($data['city']) ? htmlspecialchars(trim($data['city'])) : null,
        ':postal_code' => !empty($data['postal_code']) ? htmlspecialchars(trim($data['postal_code'])) : null,
        ':motivation' => !empty($data['motivation']) ? htmlspecialchars(trim($data['motivation'])) : null
    ]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Votre demande d\'adhésion a été enregistrée. Bienvenue dans la communauté TESSIPI !',
        'id' => $db->lastInsertId()
    ]);
    
} catch (Exception $e) {
    error_log("Erreur lors de l'adhésion: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Une erreur est survenue. Veuillez réessayer plus tard.']);
}
?>
