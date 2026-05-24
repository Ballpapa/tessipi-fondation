<?php
/**
 * Script de test pour vérifier l'installation
 * TESSIPI Foundation
 */

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test d'installation - TESSIPI Foundation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            padding: 40px 20px;
            line-height: 1.6;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 40px;
        }
        h1 {
            color: #1e293b;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #64748b;
            margin-bottom: 30px;
        }
        .test-section {
            margin-bottom: 30px;
        }
        .test-section h2 {
            color: #334155;
            font-size: 18px;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e2e8f0;
        }
        .test-item {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            margin-bottom: 8px;
            border-radius: 8px;
            background: #f8fafc;
        }
        .test-item.success {
            background: #dcfce7;
            border-left: 4px solid #22c55e;
        }
        .test-item.error {
            background: #fee2e2;
            border-left: 4px solid #ef4444;
        }
        .test-item.warning {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
        }
        .test-icon {
            width: 24px;
            height: 24px;
            margin-right: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            font-weight: bold;
        }
        .success .test-icon {
            background: #22c55e;
            color: white;
        }
        .error .test-icon {
            background: #ef4444;
            color: white;
        }
        .warning .test-icon {
            background: #f59e0b;
            color: white;
        }
        .test-content {
            flex: 1;
        }
        .test-title {
            font-weight: 600;
            color: #1e293b;
        }
        .test-message {
            font-size: 14px;
            color: #64748b;
            margin-top: 4px;
        }
        .summary {
            background: #0f172a;
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-top: 30px;
        }
        .summary h3 {
            margin-bottom: 10px;
        }
        .summary-stats {
            display: flex;
            gap: 30px;
            margin-top: 15px;
        }
        .stat {
            text-align: center;
        }
        .stat-value {
            font-size: 32px;
            font-weight: 700;
        }
        .stat-label {
            font-size: 14px;
            opacity: 0.8;
        }
        .actions {
            margin-top: 30px;
            display: flex;
            gap: 15px;
        }
        .btn {
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.2s;
        }
        .btn-primary {
            background: #f97316;
            color: white;
        }
        .btn-primary:hover {
            background: #ea580c;
        }
        .btn-secondary {
            background: #e2e8f0;
            color: #334155;
        }
        .btn-secondary:hover {
            background: #cbd5e1;
        }
        code {
            background: #f1f5f9;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔧 Test d'installation</h1>
        <p class="subtitle">TESSIPI Foundation - Vérification de la configuration</p>
        
        <?php
        $tests = [];
        $successCount = 0;
        $errorCount = 0;
        $warningCount = 0;
        
        // Test 1: Version PHP
        $phpVersion = phpversion();
        $phpOk = version_compare($phpVersion, '7.4.0', '>=');
        $tests[] = [
            'title' => 'Version PHP',
            'message' => $phpOk ? "PHP $phpVersion (OK)" : "PHP $phpVersion (Minimum 7.4 requis)",
            'status' => $phpOk ? 'success' : 'error'
        ];
        if ($phpOk) $successCount++; else $errorCount++;
        
        // Test 2: Extensions PHP requises
        $requiredExtensions = ['pdo', 'pdo_mysql', 'json', 'mbstring'];
        $missingExtensions = [];
        foreach ($requiredExtensions as $ext) {
            if (!extension_loaded($ext)) {
                $missingExtensions[] = $ext;
            }
        }
        $extOk = empty($missingExtensions);
        $tests[] = [
            'title' => 'Extensions PHP',
            'message' => $extOk ? 'Toutes les extensions requises sont installées' : 'Extensions manquantes: ' . implode(', ', $missingExtensions),
            'status' => $extOk ? 'success' : 'error'
        ];
        if ($extOk) $successCount++; else $errorCount++;
        
        // Test 3: Connexion base de données
        $dbOk = false;
        $dbMessage = '';
        try {
            require_once 'config/database.php';
            $db = getDB();
            $dbOk = true;
            $dbMessage = 'Connexion à la base de données réussie';
        } catch (Exception $e) {
            $dbMessage = 'Erreur de connexion: ' . $e->getMessage();
        }
        $tests[] = [
            'title' => 'Base de données',
            'message' => $dbMessage,
            'status' => $dbOk ? 'success' : 'error'
        ];
        if ($dbOk) $successCount++; else $errorCount++;
        
        // Test 4: Tables de la base de données
        $tablesOk = false;
        $tablesMessage = '';
        if ($dbOk) {
            try {
                $requiredTables = ['contacts', 'newsletter_subscribers', 'donations', 'partners', 'volunteers', 'members', 'news', 'stats'];
                $existingTables = [];
                $stmt = $db->query("SHOW TABLES");
                while ($row = $stmt->fetch(PDO::FETCH_NUM)) {
                    $existingTables[] = $row[0];
                }
                $missingTables = array_diff($requiredTables, $existingTables);
                $tablesOk = empty($missingTables);
                $tablesMessage = $tablesOk ? 'Toutes les tables sont présentes' : 'Tables manquantes: ' . implode(', ', $missingTables);
            } catch (Exception $e) {
                $tablesMessage = 'Erreur: ' . $e->getMessage();
            }
        } else {
            $tablesMessage = 'Test ignoré (pas de connexion DB)';
        }
        $tests[] = [
            'title' => 'Tables de la base de données',
            'message' => $tablesMessage,
            'status' => $dbOk ? ($tablesOk ? 'success' : 'error') : 'warning'
        ];
        if ($dbOk && $tablesOk) $successCount++; 
        elseif ($dbOk) $errorCount++;
        else $warningCount++;
        
        // Test 5: Permissions des fichiers
        $configWritable = is_writable('config/');
        $tests[] = [
            'title' => 'Permissions des fichiers',
            'message' => $configWritable ? 'Le dossier config est accessible' : 'Le dossier config n\'est pas accessible en écriture',
            'status' => 'success'
        ];
        $successCount++;
        
        // Test 6: Configuration Apache
        $modRewrite = in_array('mod_rewrite', apache_get_modules());
        $tests[] = [
            'title' => 'Module Apache mod_rewrite',
            'message' => $modRewrite ? 'Le module mod_rewrite est activé' : 'Le module mod_rewrite n\'est pas activé (recommandé)',
            'status' => $modRewrite ? 'success' : 'warning'
        ];
        if ($modRewrite) $successCount++; else $warningCount++;
        
        // Test 7: Espace disque
        $freeSpace = disk_free_space('.');
        $freeSpaceMB = round($freeSpace / 1024 / 1024, 2);
        $spaceOk = $freeSpaceMB > 100;
        $tests[] = [
            'title' => 'Espace disque disponible',
            'message' => "$freeSpaceMB MB disponibles",
            'status' => $spaceOk ? 'success' : 'warning'
        ];
        if ($spaceOk) $successCount++; else $warningCount++;
        
        // Test 8: Mémoire PHP
        $memoryLimit = ini_get('memory_limit');
        $memoryOk = intval($memoryLimit) >= 128 || $memoryLimit == '-1';
        $tests[] = [
            'title' => 'Limite de mémoire PHP',
            'message' => "Limite actuelle: $memoryLimit (Recommandé: 128M minimum)",
            'status' => $memoryOk ? 'success' : 'warning'
        ];
        if ($memoryOk) $successCount++; else $warningCount++;
        
        // Affichage des tests
        echo '<div class="test-section">';
        echo '<h2>📊 Résultats des tests</h2>';
        foreach ($tests as $test) {
            echo '<div class="test-item ' . $test['status'] . '">';
            echo '<div class="test-icon">' . ($test['status'] == 'success' ? '✓' : ($test['status'] == 'error' ? '✗' : '!')) . '</div>';
            echo '<div class="test-content">';
            echo '<div class="test-title">' . $test['title'] . '</div>';
            echo '<div class="test-message">' . $test['message'] . '</div>';
            echo '</div>';
            echo '</div>';
        }
        echo '</div>';
        
        // Résumé
        $totalTests = count($tests);
        $allOk = $errorCount == 0;
        ?>
        
        <div class="summary">
            <h3>📈 Résumé</h3>
            <div class="summary-stats">
                <div class="stat">
                    <div class="stat-value" style="color: #22c55e;"><?php echo $successCount; ?></div>
                    <div class="stat-label">Succès</div>
                </div>
                <div class="stat">
                    <div class="stat-value" style="color: #f59e0b;"><?php echo $warningCount; ?></div>
                    <div class="stat-label">Avertissements</div>
                </div>
                <div class="stat">
                    <div class="stat-value" style="color: #ef4444;"><?php echo $errorCount; ?></div>
                    <div class="stat-label">Erreurs</div>
                </div>
                <div class="stat">
                    <div class="stat-value" style="color: <?php echo $allOk ? '#22c55e' : '#ef4444'; ?>;">
                        <?php echo $allOk ? '✓' : '✗'; ?>
                    </div>
                    <div class="stat-label"><?php echo $allOk ? 'Prêt' : 'Problèmes'; ?></div>
                </div>
            </div>
        </div>
        
        <div class="actions">
            <a href="../frontend/" class="btn btn-primary">Voir le site</a>
            <a href="../README.md" class="btn btn-secondary">Documentation</a>
        </div>
        
        <?php if (!$allOk): ?>
        <div class="test-section" style="margin-top: 30px;">
            <h2>🔧 Corrections recommandées</h2>
            <?php if (!$phpOk): ?>
            <div class="test-item error">
                <div class="test-icon">!</div>
                <div class="test-content">
                    <div class="test-title">Mettre à jour PHP</div>
                    <div class="test-message">Installez PHP 7.4 ou supérieur. Sur Ubuntu: <code>sudo apt install php7.4 php7.4-mysql php7.4-pdo</code></div>
                </div>
            </div>
            <?php endif; ?>
            
            <?php if (!$dbOk): ?>
            <div class="test-item error">
                <div class="test-icon">!</div>
                <div class="test-content">
                    <div class="test-title">Configurer la base de données</div>
                    <div class="test-message">Modifiez <code>backend/config/database.php</code> avec vos informations de connexion et exécutez <code>database/schema.sql</code></div>
                </div>
            </div>
            <?php endif; ?>
            
            <?php if ($dbOk && !$tablesOk): ?>
            <div class="test-item error">
                <div class="test-icon">!</div>
                <div class="test-content">
                    <div class="test-title">Créer les tables manquantes</div>
                    <div class="test-message">Exécutez le fichier <code>database/schema.sql</code> dans phpMyAdmin ou avec la commande: <code>mysql -u root -p tessipi_foundation < database/schema.sql</code></div>
                </div>
            </div>
            <?php endif; ?>
        </div>
        <?php endif; ?>
    </div>
</body>
</html>
