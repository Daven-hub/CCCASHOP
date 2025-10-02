<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Fichier de log pour le debug
function logError($message) {
    file_put_contents("error_log.txt", "[" . date("Y-m-d H:i:s") . "] " . $message . "\n", FILE_APPEND);
}

// En-têtes CORS (⚠️ À RESTREINDRE EN PROD)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// OPTIONS (préflight request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Vérifier si une URL est fournie
if (!isset($_GET['url'])) {
    http_response_code(400);
    echo json_encode(["error" => "Aucune URL fournie"]);
    exit;
}

$url = $_GET['url']; 

// Vérifier la validité de l'URL
if (!filter_var($url, FILTER_VALIDATE_URL)) {
    http_response_code(400);
    echo json_encode(["error" => "URL invalide"]);
    exit;
}

// Initialiser cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // ⚠️ À activer en prod
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10); // Timeout connexion
curl_setopt($ch, CURLOPT_TIMEOUT, 30); // Timeout total

// Détecter la méthode HTTP
$method = $_SERVER['REQUEST_METHOD'];
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

// Gérer les requêtes avec données (POST, PUT, DELETE)
if ($method !== 'GET' && $method !== 'OPTIONS') {
    $inputData = file_get_contents("php://input");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $inputData);
}

// Transmettre les en-têtes HTTP (en filtrant ceux problématiques)
$headers = [];
foreach (getallheaders() as $key => $value) {
    if (!in_array(strtolower($key), ["host", "content-length"])) { 
        $headers[] = "$key: $value";
    }
}
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

// Exécuter la requête et récupérer la réponse
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Gestion des erreurs cURL
if ($response === false) {
    $error = curl_error($ch);
    logError("Erreur cURL: $error");
    http_response_code(500);
    echo json_encode(["error" => "Erreur interne du serveur", "details" => $error]);
    curl_close($ch);
    exit;
}

curl_close($ch);

// Retourner la réponse avec le bon code HTTP
http_response_code($httpCode);
echo $response;
?>