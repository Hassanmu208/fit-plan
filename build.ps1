$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$manifestPath = Join-Path $root 'manifest.json'
$manifest = Get-Content -LiteralPath $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
$shellPath = Join-Path $root 'src\shell.html'
$html = [System.IO.File]::ReadAllText($shellPath)
$utf8 = [System.Text.UTF8Encoding]::new($false)

foreach ($block in $manifest.blocks) {
    $modulePath = Join-Path $root ($block.file.Replace('/', '\'))
    $content = [System.IO.File]::ReadAllText($modulePath)

    foreach ($asset in $manifest.assets) {
        if ($content.Contains($asset.token)) {
            $assetPath = Join-Path $root ('src\' + $asset.file.Replace('/', '\'))
            if (-not (Test-Path -LiteralPath $assetPath -PathType Leaf)) {
                throw "Embedded source image is missing: $($asset.file)"
            }
            $base64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes($assetPath))
            $content = $content.Replace($asset.token, $base64)
        }
    }

    if (-not $html.Contains($block.slot)) {
        throw "Source block placeholder is missing: $($block.slot)"
    }
    $html = $html.Replace($block.slot, ($block.open + $content + $block.close))
}

if ($html -match '<!-- FITPLAN_SOURCE_BLOCK_\d+ -->' -or $html -match '__FITPLAN_ASSET_\d+__') {
    throw 'The assembled page still contains an unresolved source placeholder.'
}

$outputDirectory = Join-Path $root 'preview'
New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null
$outputPath = Join-Path $outputDirectory 'fitplan.html'
[System.IO.File]::WriteAllText($outputPath, $html, $utf8)

$hash = (Get-FileHash -LiteralPath $outputPath -Algorithm SHA256).Hash
Write-Output "Built standalone FitPlan page: $outputPath"
Write-Output "SHA-256: $hash"
