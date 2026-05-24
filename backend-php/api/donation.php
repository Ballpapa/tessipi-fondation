<?php
/**
 * API - Gestion des dons
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

if (empty($data['amount']) || !is_numeric($data['amount']) || $data['amount'] < 1) {
    $errors[] = 'Un montant valide est requis (minimum 1€)';
}

if (empty($data['type']) || !in_array($data['type'], ['once', 'monthly'])) {
    $errors[] = 'Le type de don est invalide';
}

if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Un email valide est requis';
}

if (empty($data['firstname']) || strlen(trim($data['firstname'])) < 2) {
    $errors[] = 'Le prénom est requis';
}

if (empty($data['lastname']) || strlen(trim($data['lastname'])) < 2) {
    $errors[] = 'Le nom est requis';
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
    $stmt = $db->prepare("INSERT INTO donations (amount, type, email, firstname, lastname, address, city, postal_code, country, message, status, created_at) VALUES (:amount, :type, :email, :firstname, :lastname, :address, :city, :postal_code, :country, :message, 'pending', NOW())");
    
    $stmt->execute([
        ':amount' => floatval($data['amount']),
        ':type' => $data['type'],
        ':email' => filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL),
        ':firstname' => htmlspecialchars(trim($data['firstname'])),
        ':lastname' => htmlspecialchars(trim($data['lastname'])),
        ':address' => !empty($data['address']) ? htmlspecialchars(trim($data['address'])) : null,
        ':city' => !empty($data['city']) ? htmlspecialchars(trim($data['city'])) : null,
        ':postal_code' => !empty($data['postal_code']) ? htmlspecialchars(trim($data['postal_code'])) : null,
        ':country' => !empty($data['country']) ? htmlspecialchars(trim($data['country'])) : 'FR',
        ':message' => !empty($data['message']) ? htmlspecialchars(trim($data['message'])) : null
    ]);
    
    $donationId = $db->lastInsertId();
    
    // Ici, vous intégreriez votre passerelle de paiement (Stripe, PayPal, etc.)
    // Exemple avec Stripe:
    // $paymentIntent = createPaymentIntent($data['amount'], $data['email']);
    
    echo json_encode([
        'success' => true,
        'message' => 'Don enregistré. Redirection vers la page de paiement...',
        'donation_id' => $donationId,
        'amount' => $data['amount'],
        'type' => $data['type']
    ]);
    
} catch (Exception $e) {
    error_log("Erreur lors de l'enregistrement du don: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Une erreur est survenue. Veuillez réessayer plus tard.']);
}

/**
 * Fonction pour créer un PaymentIntent avec Stripe
 * (À implémenter avec votre clé API Stripe)
 */
function createPaymentIntent($amount, $email) {
    // require_once 'vendor/autoload.php';
    // \Stripe\Stripe::setApiKey('sk_test_...');
    // 
    // return \Stripe\PaymentIntent::create([
    //     'amount' => $amount * 100, // en centimes
    //     'currency' => 'eur',
    //     'receipt_email' => $email,
    // ]);
}
?>
