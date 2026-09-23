# Adminutes - PowerShell HTTP Server
$port = 8080
$url = "http://localhost:$port/"
$root = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)
$listener.Start()

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "Adminutes - Consumable Management System server started!" -ForegroundColor Green
Write-Host "Access URL: $url" -ForegroundColor Yellow
Write-Host "Press Ctrl+C in this window to stop server." -ForegroundColor Gray
Write-Host "=======================================================" -ForegroundColor Cyan

# Open default browser
Start-Process $url

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath
        if ($path -eq "/" -or [string]::IsNullOrWhiteSpace($path)) {
            $path = "/index.html"
        }

        $localPath = Join-Path $root ($path.TrimStart('/'))

        if (Test-Path $localPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html" }
                ".css"  { "text/css" }
                ".js"   { "application/javascript" }
                ".json" { "application/json" }
                ".png"  { "image/png" }
                default { "application/octet-stream" }
            }

            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            $response.ContentType = $contentType
            $response.Headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
            $response.Headers['Pragma'] = 'no-cache'
            $response.Headers['Expires'] = '0'
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
