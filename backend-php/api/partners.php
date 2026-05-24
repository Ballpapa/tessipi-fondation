<?php
/**
 * API - Gestion des demandes de partenariat
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

if (empty($data['organization']) || strlen(trim($data['organization'])) < 2) {
    $errors[] = 'Le nom de l\'organisation est requis';
}

if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Un email valide est requis';
}

if (empty($data['partnership_type'])) {
    $errors[] = 'Le type de partenariat est requis';
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
    $stmt = $db->prepare("INSERT INTO partners (organization, email, phone, partnership_type, message, status, created_at) VALUES (:organization, :email, :phone, :partnership_type, :message, 'pending', NOW())");
    
    $stmt->execute([
        ':organization' => htmlspecialchars(trim($data['organization'])),
        ':email' => filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL),
        ':phone' => !empty($data['phone']) ? htmlspecialchars(trim($data['phone'])) : null,
        ':partnership_type' => htmlspecialchars(trim($data['partnership_type'])),
        ':message' => !empty($data['message']) ? htmlspecialchars(trim($data['message'])) : null
    ]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Votre demande de partenariat a été envoyée. Nous vous contacterons prochainement.',
        'id' => $db->lastInsertId()
    ]);
    
} catch (Exception $e) {
    error_log("Erreur lors de l'envoi de la demande de partenariat: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Une erreur est survenue. Veuillez réessayer plus tard.']);
}
?>
