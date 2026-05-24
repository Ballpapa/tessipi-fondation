<?php
/**
 * API - Gestion des inscriptions de bénévoles
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

if (empty($data['expertise'])) {
    $errors[] = 'Le domaine d\'expertise est requis';
}

// Si des erreurs, retourner une réponse d'erreur
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

try {
    $db = getDB();
    
    // Préparer et exécuter la requête
    $stmt = $db->prepare("INSERT INTO volunteers (name, email, phone, expertise, experience, availability, message, status, created_at) VALUES (:name, :email, :phone, :expertise, :experience, :availability, :message, 'pending', NOW())");
    
    $stmt->execute([
        ':name' => htmlspecialchars(trim($data['name'])),
        ':email' => filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL),
        ':phone' => !empty($data['phone']) ? htmlspecialchars(trim($data['phone'])) : null,
        ':expertise' => htmlspecialchars(trim($data['expertise'])),
        ':experience' => !empty($data['experience']) ? htmlspecialchars(trim($data['experience'])) : null,
        ':availability' => !empty($data['availability']) ? htmlspecialchars(trim($data['availability'])) : null,
        ':message' => !empty($data['message']) ? htmlspecialchars(trim($data['message'])) : null
    ]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Votre inscription en tant que bénévole a été enregistrée. Nous vous contacterons prochainement.',
        'id' => $db->lastInsertId()
    ]);
    
} catch (Exception $e) {
    error_log("Erreur lors de l'inscription bénévole: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Une erreur est survenue. Veuillez réessayer plus tard.']);
}
?>
