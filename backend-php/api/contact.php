<?php
/**
 * API - Gestion des messages de contact
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
    $errors[] = 'Le nom est requis (minimum 2 caractères)';
}

if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Un email valide est requis';
}

if (empty($data['subject']) || strlen(trim($data['subject'])) < 3) {
    $errors[] = 'Le sujet est requis (minimum 3 caractères)';
}

if (empty($data['message']) || strlen(trim($data['message'])) < 10) {
    $errors[] = 'Le message est requis (minimum 10 caractères)';
}

// Si des erreurs, retourner une réponse d'erreur
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

try {
    $db = getDB();
    
    // Préparer et exécuter la requête (protection contre les injections SQL)
    $stmt = $db->prepare("INSERT INTO contacts (name, email, subject, message, created_at) VALUES (:name, :email, :subject, :message, NOW())");
    
    $stmt->execute([
        ':name' => htmlspecialchars(trim($data['name'])),
        ':email' => filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL),
        ':subject' => htmlspecialchars(trim($data['subject'])),
        ':message' => htmlspecialchars(trim($data['message']))
    ]);
    
    // Envoyer un email de notification (optionnel)
    $to = 'contact@tessipi.org';
    $subject = 'Nouveau message de contact: ' . $data['subject'];
    $message = "Nom: " . $data['name'] . "\n";
    $message .= "Email: " . $data['email'] . "\n\n";
    $message .= "Message:\n" . $data['message'];
    $headers = 'From: ' . $data['email'] . "\r\n";
    $headers .= 'Reply-To: ' . $data['email'] . "\r\n";
    
    // Décommenter pour activer l'envoi d'emails
    // mail($to, $subject, $message, $headers);
    
    echo json_encode([
        'success' => true,
        'message' => 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
        'id' => $db->lastInsertId()
    ]);
    
} catch (Exception $e) {
    error_log("Erreur lors de l'envoi du message: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Une erreur est survenue. Veuillez réessayer plus tard.']);
}
?>
