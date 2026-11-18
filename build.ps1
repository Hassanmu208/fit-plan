$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$manifestPath = Join-Path $root 'manifest.json'
$manifest = Get-Content -LiteralPath $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
$shellPath = Join-Path $root 'src\shell.html'
$shell = [System.IO.File]::ReadAllText($shellPath)
$utf8 = [System.Text.UTF8Encoding]::new($false)
$html = $shell
$htmlHosted = $shell

foreach ($block in $manifest.blocks) {
    $modulePath = Join-Path $root ($block.file.Replace('/', '\'))
    $content = [System.IO.File]::ReadAllText($modulePath)
    $contentHosted = $content

    foreach ($asset in $manifest.assets) {
        if ($content.Contains($asset.token)) {
            $assetPath = Join-Path $root ('src\' + $asset.file.Replace('/', '\'))
            if (-not (Test-Path -LiteralPath $assetPath -PathType Leaf)) {
                throw "Embedded source image is missing: $($asset.file)"
            }
            $base64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes($assetPath))
            $content = $content.Replace($asset.token, $base64)
            $assetUrl = 'src/assets/' + [System.IO.Path]::GetFileName($asset.file)
            $contentHosted = [regex]::Replace($contentHosted, 'data:image/[a-zA-Z0-9.+-]+;base64,' + [regex]::Escape($asset.token), $assetUrl)
            if ($contentHosted.Contains($asset.token)) { $contentHosted = $contentHosted.Replace($asset.token, $assetUrl) }
        }
    }

    if (-not $html.Contains($block.slot)) {
        throw "Source block placeholder is missing: $($block.slot)"
    }
    $html = $html.Replace($block.slot, ($block.open + $content + $block.close))
    $htmlHosted = $htmlHosted.Replace($block.slot, ($block.open + $contentHosted + $block.close))
}

if ($html -match '<!-- FITPLAN_SOURCE_BLOCK_\d+ -->' -or $html -match '__FITPLAN_ASSET_\d+__' -or
    $htmlHosted -match '<!-- FITPLAN_SOURCE_BLOCK_\d+ -->' -or $htmlHosted -match '__FITPLAN_ASSET_\d+__') {
    throw 'The assembled page still contains an unresolved source placeholder.'
}

$outputDirectory = Join-Path $root 'preview'
New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null
$outputPath = Join-Path $outputDirectory 'fitplan.html'
[System.IO.File]::WriteAllText($outputPath, $html, $utf8)

$hostedPath = Join-Path $root 'index.html'
[System.IO.File]::WriteAllText($hostedPath, $htmlHosted, $utf8)

$hash = (Get-FileHash -LiteralPath $outputPath -Algorithm SHA256).Hash
Write-Output "Built standalone FitPlan page: $outputPath"
Write-Output "Built hosted FitPlan page:    $hostedPath"
Write-Output "SHA-256: $hash"
