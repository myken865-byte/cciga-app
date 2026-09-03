# Installe automatiquement l'APK CCIGA App de test deja valide sur un telephone
# Android branche par USB. Reutilisable pour n'importe quel futur telephone.
# NO REDO : ne reconstruit jamais l'APK, ne le retelecharge jamais.

$ErrorActionPreference = "Stop"
$ProjectRoot = "C:\Users\Me. Alcide\Desktop\cciga app"
$Adb = "C:\Android\sdk\platform-tools\adb.exe"
$LogFile = Join-Path $ProjectRoot "test-builds\usb-install-log.csv"
$Package = "ht.cciga.app"

function Write-Log($Device, $State, $Version, $Result) {
    $line = "{0},{1},{2},{3},{4}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Device, $State, $Version, $Result
    if (-not (Test-Path $LogFile)) {
        "timestamp,device,adb_state,apk_version,result" | Out-File -FilePath $LogFile -Encoding utf8
    }
    Add-Content -Path $LogFile -Value $line -Encoding utf8
}

function Fail($msg, $device = "-", $state = "-", $version = "-") {
    Write-Host ""
    Write-Host "RESULTAT : FAIL" -ForegroundColor Red
    Write-Host $msg -ForegroundColor Red
    Write-Log $device $state $version "FAIL"
    Read-Host "Appuyez sur Entree pour fermer"
    exit 1
}

Write-Host "=== Installation CCIGA App sur telephone connecte ===" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path $Adb)) {
    Fail "ADB introuvable a l'emplacement attendu : $Adb"
}

# --- 1. Demarrer/verifier ADB ---
Write-Host "1. Demarrage du service ADB..."
& $Adb start-server | Out-Null

# --- 2/3. Detecter l'appareil et son etat, avec attente si necessaire ---
function Get-DeviceList {
    $raw = & $Adb devices -l 2>&1
    $lines = $raw | Where-Object { $_ -match "^\S+\s+\S+" -and $_ -notmatch "^List of devices" }
    $result = @()
    foreach ($l in $lines) {
        if ($l -match "^(\S+)\s+(\S+)(.*)$") {
            $result += [PSCustomObject]@{ Serial = $matches[1]; State = $matches[2]; Extra = $matches[3] }
        }
    }
    return $result
}

Write-Host "2. Recherche d'un telephone Android connecte..."
$devices = Get-DeviceList
$waited = 0
while ($devices.Count -eq 0 -and $waited -lt 20) {
    Start-Sleep -Seconds 2
    $waited += 2
    $devices = Get-DeviceList
}

if ($devices.Count -eq 0) {
    Fail "Aucun telephone detecte par ADB apres 20 secondes d'attente.`nVerifiez : cable USB (data, pas charge seule), port USB, et que le pilote du peripherique est bien installe (Gestionnaire de peripheriques Windows)."
}

if ($devices.Count -gt 1) {
    Write-Host ""
    Write-Host "Plusieurs telephones detectes - impossible de choisir automatiquement :" -ForegroundColor Yellow
    foreach ($d in $devices) { Write-Host "  - $($d.Serial) [$($d.State)] $($d.Extra)" }
    Fail "Ne laissez branche que le telephone cible, puis relancez ce raccourci."
}

$device = $devices[0]
Write-Host "   Trouve : $($device.Serial) - etat ADB : $($device.State)"

# --- Etat unauthorized : attendre l'autorisation humaine sur le telephone ---
if ($device.State -eq "unauthorized") {
    Write-Host ""
    Write-Host "Ce telephone n'a pas encore autorise le debogage USB." -ForegroundColor Yellow
    Write-Host "Sur le telephone : appuyez sur AUTORISER dans la fenetre 'Autoriser le debogage USB ?'." -ForegroundColor Yellow
    Write-Host "En attente (jusqu'a 60 secondes)..."
    $waited = 0
    while ($device.State -eq "unauthorized" -and $waited -lt 60) {
        Start-Sleep -Seconds 3
        $waited += 3
        $devices = Get-DeviceList
        $device = $devices | Where-Object { $_.Serial -eq $device.Serial }
        if (-not $device) { $device = [PSCustomObject]@{ Serial = "-"; State = "disconnected" } }
    }
    if ($device.State -ne "device") {
        Fail "Autorisation non recue dans le delai. Relancez ce raccourci apres avoir autorise le debogage USB sur le telephone." $device.Serial $device.State
    }
    Write-Host "   Autorise ! Poursuite automatique." -ForegroundColor Green
}

if ($device.State -eq "offline") {
    Fail "Le telephone est detecte mais hors ligne (offline). Debranchez et rebranchez le cable USB, puis relancez." $device.Serial "offline"
}

if ($device.State -ne "device") {
    Fail "Etat ADB inattendu : $($device.State). Relancez ce raccourci." $device.Serial $device.State
}

$serial = $device.Serial
$model = (& $Adb -s $serial shell getprop ro.product.model 2>&1).Trim()
Write-Host "   Modele : $model"

# --- 4. Retrouver l'APK existant (NO REDO - jamais de reconstruction/retelechargement) ---
Write-Host "4. Recherche de l'APK CCIGA App de test existant..."
$candidates = @(
    (Join-Path $ProjectRoot "test-builds\cciga-app-test-v1.1-2.apk"),
    (Join-Path $ProjectRoot "android\app\build\outputs\apk\debug\app-debug.apk")
)
$apkPath = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $apkPath) {
    Fail "Aucun APK CCIGA existant trouve. Emplacements recherches :`n$($candidates -join "`n")`nAucun nouvel APK n'a ete genere (NO REDO)." $serial $device.State
}
Write-Host "   Trouve : $apkPath"

# --- 5. Verifier package / version / integrite ---
Write-Host "5. Verification du package, de la version et de la signature..."
$buildTools = Get-ChildItem "C:\Android\sdk\build-tools" -Directory -ErrorAction SilentlyContinue |
    Sort-Object Name -Descending | Select-Object -First 1
$apkVersion = "inconnue"

if ($buildTools) {
    $aapt2 = Join-Path $buildTools.FullName "aapt2.exe"
    $apksigner = Join-Path $buildTools.FullName "apksigner.bat"

    if (Test-Path $aapt2) {
        $badging = & $aapt2 dump badging $apkPath 2>&1
        $pkgLine = $badging | Select-String "^package:" | Select-Object -First 1
        if ($pkgLine -match "name='([^']+)'") {
            $foundPkg = $matches[1]
            if ($foundPkg -ne $Package) {
                Fail "Le package de l'APK trouve ($foundPkg) ne correspond pas au package CCIGA App attendu ($Package). Installation annulee par securite." $serial $device.State
            }
        }
        if ($pkgLine -match "versionName='([^']+)'") { $apkVersion = $matches[1] }
        Write-Host "   Package verifie : $Package - version $apkVersion"
    }

    if (Test-Path $apksigner) {
        $sigResult = & cmd /c "`"$apksigner`" verify `"$apkPath`" 2>&1"
        if ($LASTEXITCODE -ne 0) {
            Fail "Verification de signature echouee sur l'APK existant. Installation annulee par securite." $serial $device.State $apkVersion
        }
        Write-Host "   Signature : OK"
    }
} else {
    Write-Host "   (build-tools introuvable - verification package/signature ignoree, installation poursuivie)" -ForegroundColor Yellow
}

# --- 6. Installer (remplace si deja installe, conserve les donnees) ---
Write-Host "6. Installation sur $model..."
$installOutput = & $Adb -s $serial install -r $apkPath 2>&1
if ($installOutput -notmatch "Success") {
    Fail "Echec de l'installation :`n$installOutput" $serial $device.State $apkVersion
}
Write-Host "   Installation reussie." -ForegroundColor Green

# --- 7. Lancer CCIGA App ---
Write-Host "7. Lancement de CCIGA App..."
& $Adb -s $serial shell monkey -p $Package -c android.intent.category.LAUNCHER 1 2>&1 | Out-Null
Start-Sleep -Seconds 3

# --- 8. Verifier le demarrage ---
$pid1 = (& $Adb -s $serial shell pidof $Package 2>&1).Trim()
if (-not $pid1 -or $pid1 -match "not found|error") {
    Fail "L'application ne semble pas avoir demarre (aucun processus detecte)." $serial $device.State $apkVersion
}
Write-Host "   CCIGA App demarree (pid $pid1)." -ForegroundColor Green

# --- 9. Resultat ---
Write-Host ""
Write-Host "RESULTAT : PASS" -ForegroundColor Green
Write-Host "Telephone : $model ($serial)"
Write-Host "Version installee : $apkVersion"
Write-Log $serial "device" $apkVersion "PASS"
Read-Host "Appuyez sur Entree pour fermer"
