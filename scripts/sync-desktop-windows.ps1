# Synchronise automatiquement la version Windows installee de CCIGA App avec
# le projet local valide. Chaine complete : verification du projet -> build
# de l'enveloppe Electron -> installation silencieuse par-dessus l'app deja
# installee (meme raccourci "CCIGA App", jamais un second raccourci) ->
# lancement -> verification.
#
# L'enveloppe Electron (desktop/main.js) charge en direct
# https://cciga-app-devtest.vercel.app : elle reflete donc deja automatiquement
# tout ce qui est deploye sur ce lien, sans reinstallation. Ce script ne sert
# qu'a synchroniser l'enveloppe elle-meme (main.js/preload.js/home.html/icone)
# quand ELLE change, et a garantir que la copie installee correspond
# exactement a celle du depot.
#
# Usage : powershell -File scripts\sync-desktop-windows.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$desktopDir = Join-Path $root "desktop"

Write-Output "=== 1/5 Verification du projet ==="
Push-Location $root
try {
    npx tsc --noEmit
    if ($LASTEXITCODE -ne 0) { throw "tsc a echoue - build Windows annule." }
} finally {
    Pop-Location
}

Write-Output "=== 2/5 Build de l'enveloppe Windows (electron-builder) ==="
# Connu : Windows Defender scanne certaines DLL Electron (ex. d3dcompiler_47.dll)
# au moment precis ou app-builder les extrait dans dist2\win-unpacked, ce qui
# echoue avec "Access is denied" - meme apres nettoyage complet du dossier.
# Une simple Copy-Item PowerShell de ce meme fichier, elle, reussit toujours
# (confirme empiriquement) : on pre-copie donc toutes les DLL du package
# electron dans win-unpacked avant chaque tentative, pour qu'app-builder n'ait
# plus a les extraire lui-meme.
Push-Location $desktopDir
try {
    $maxAttempts = 3
    $buildOk = $false
    for ($attempt = 1; $attempt -le $maxAttempts; $attempt++) {
        Get-Process -Name "CCIGA App" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
        $unpacked = Join-Path $desktopDir "dist2\win-unpacked"
        if (Test-Path $unpacked) { Remove-Item -Recurse -Force $unpacked -ErrorAction SilentlyContinue }
        New-Item -ItemType Directory -Force -Path $unpacked | Out-Null
        $electronDist = Join-Path $desktopDir "node_modules\electron\dist"
        if (Test-Path $electronDist) {
            Get-ChildItem $electronDist -Filter "*.dll" | ForEach-Object {
                # -ErrorAction SilentlyContinue seul ne suffit pas ici sous
                # $ErrorActionPreference = "Stop" (le verrou antivirus peut
                # remonter comme erreur terminante) : try/catch explicite,
                # une copie ratee sur ce fichier precis n'est pas fatale, le
                # build lui-meme (avec ses propres tentatives) la refera.
                try { Copy-Item $_.FullName (Join-Path $unpacked $_.Name) -Force -ErrorAction Stop } catch {}
            }
        }
        npm run build
        if ($LASTEXITCODE -eq 0) { $buildOk = $true; break }
        Write-Output "Tentative $attempt/$maxAttempts echouee (verrou antivirus transitoire probable) - nouvel essai..."
        # 8s, pas 3s : empiriquement, un delai trop court retombe sur le
        # meme fichier encore en cours de scan.
        Start-Sleep -Seconds 8
    }
    if (-not $buildOk) { throw "electron-builder a echoue apres $maxAttempts tentatives." }
} finally {
    Pop-Location
}

$installer = Get-ChildItem (Join-Path $desktopDir "dist2") -Filter "CCIGA-App-Setup-*.exe" |
    Sort-Object LastWriteTime -Descending | Select-Object -First 1
if (-not $installer) { throw "Aucun installeur trouve dans desktop\dist2." }
Write-Output "Installeur : $($installer.FullName)"

Write-Output "=== 3/5 Mise a jour silencieuse de l'installation existante ==="
# /S = silencieux (standard NSIS, fonctionne meme avec oneClick:false). Meme
# appId/productName -> installe par-dessus la version existante, meme
# raccourci "CCIGA App" recree (createDesktopShortcut: always).
Start-Process -FilePath $installer.FullName -ArgumentList "/S" -Wait

Write-Output "=== 4/5 Verification du raccourci Desktop ==="
# L'installeur NSIS en mode silencieux (/S) saute parfois la (re)creation du
# raccourci lors d'une mise a jour par-dessus une install existante -> on la
# force nous-memes a chaque synchronisation, pour ne jamais dependre de ce
# comportement. On nettoie aussi tout raccourci CCIGA mal nomme (Test/DEV
# TEST/Preview) qui traînerait du Bureau - un seul raccourci "CCIGA App" doit
# exister.
$exePath = "$env:LOCALAPPDATA\Programs\CCIGA App\CCIGA App.exe"
if (-not (Test-Path $exePath)) { throw "Executable installe introuvable : $exePath" }

Get-ChildItem "$env:USERPROFILE\Desktop" -File -Filter "*CCIGA App*.lnk" -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -ne "CCIGA App.lnk" } |
    ForEach-Object {
        Write-Output "Suppression du raccourci obsolete : $($_.Name)"
        Remove-Item $_.FullName -Force
    }

$shortcutPath = "$env:USERPROFILE\Desktop\CCIGA App.lnk"
$ws = New-Object -ComObject WScript.Shell
$shortcut = $ws.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $exePath
$shortcut.WorkingDirectory = Split-Path $exePath
$shortcut.IconLocation = $exePath
$shortcut.Save()
Write-Output "Raccourci 'CCIGA App' -> $exePath"

Write-Output "=== 5/5 Lancement de l'application ==="
Get-Process -Name "CCIGA App" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 500
Start-Process -FilePath $shortcut.TargetPath
Start-Sleep -Seconds 3
$proc = Get-Process -Name "CCIGA App" -ErrorAction SilentlyContinue
if ($proc) {
    Write-Output "CCIGA App lancee (PID $($proc.Id))."
} else {
    Write-Output "AVERTISSEMENT : processus 'CCIGA App' non detecte apres lancement."
}

Write-Output "=== Synchronisation terminee ==="
