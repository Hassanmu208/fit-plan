$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$msg = if ($args[0]) { $args[0] } else { "Deploy build $(Get-Date -Format 'yyyy-MM-dd HH:mm')" }

& "$root\build.ps1"

git add index.html src manifest.json build.ps1 deploy.ps1 tools
git commit -m $msg
git push origin main
Write-Output "Deployed: https://hassanmu208.github.io/fit-plan/"
