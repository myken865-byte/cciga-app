$path = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\EPS\9AF\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_PHASE4.docx"

$wdArabic = 0
$wdLowerRoman = 2
# Recomputed after inserting the section break between front matter (physical pages 1-2) and
# Chapitre 1 (starts physical page 3). Formula for arabic sections: start = physical_start - 2.
$plan = @(
  @{ Section=1;  Style=$wdLowerRoman; Start=1 },   # front matter, physical 1-2 -> i, ii
  @{ Section=2;  Style=$wdArabic; Start=1 },        # Chapitre 1, physical 3
  @{ Section=3;  Style=$wdArabic; Start=21 },       # Chapitre 2, physical 23
  @{ Section=4;  Style=$wdArabic; Start=39 },       # Chapitre 3, physical 41
  @{ Section=5;  Style=$wdArabic; Start=57 },       # Chapitre 4, physical 59
  @{ Section=6;  Style=$wdArabic; Start=74 },       # Chapitre 5, physical 76
  @{ Section=7;  Style=$wdArabic; Start=91 },       # Chapitre 6, physical 93
  @{ Section=8;  Style=$wdArabic; Start=109 },      # Chapitre 7, physical 111
  @{ Section=9;  Style=$wdArabic; Start=126 },      # Chapitre 8, physical 128
  @{ Section=10; Style=$wdArabic; Start=145 },      # Chapitre 9, physical 147
  @{ Section=11; Style=$wdArabic; Start=163 },      # Chapitre 10, physical 165
  @{ Section=12; Style=$wdArabic; Start=180 },      # Chapitre 11, physical 182
  @{ Section=13; Style=$wdArabic; Start=198 },      # Chapitre 12, physical 200
  @{ Section=14; Style=$wdArabic; Start=217 },      # Corrige general, physical 219
  @{ Section=15; Style=$wdArabic; Start=244 },      # Glossaire, physical 246
  @{ Section=16; Style=$wdArabic; Start=248 }       # References (+ suite), physical 250
)

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $null
$safeToSaveClose = $false
try {
  $doc = $word.Documents.Open($path, $false, $false)
  Start-Sleep -Seconds 2

  $endRangeB = $doc.Content
  $endRangeB.Collapse(0)
  $pagesBefore = $endRangeB.Information(3)
  Write-Output "Pages AVANT: $pagesBefore, sections: $($doc.Sections.Count)"

  foreach ($p in $plan) {
    $sec = $doc.Sections.Item($p.Section)
    $footer = $sec.Footers.Item(1)
    $footer.PageNumbers.RestartNumberingAtSection = $true
    $footer.PageNumbers.StartingNumber = $p.Start
    $footer.PageNumbers.NumberStyle = $p.Style
    $header = $sec.Headers.Item(1)
    $header.PageNumbers.RestartNumberingAtSection = $true
    $header.PageNumbers.StartingNumber = $p.Start
    $header.PageNumbers.NumberStyle = $p.Style
  }
  Write-Output "Numerotation (v2, 16 sections) appliquee"

  $endRangeA = $doc.Content
  $endRangeA.Collapse(0)
  $pagesAfter = $endRangeA.Information(3)
  Write-Output "Pages APRES: $pagesAfter"

  if ($pagesAfter -ne $pagesBefore) {
    Write-Output "ALERTE: variation de pages inattendue - ARRET, PAS D'ENREGISTREMENT"
    throw "Anomalie detectee"
  }

  $safeToSaveClose = $true
  $doc.Save()
  Write-Output "Document enregistre"
  Write-Output "TERMINE_OK"
} catch {
  Write-Output "ERREUR: $($_.Exception.Message)"
} finally {
  if ($doc -ne $null) {
    if ($safeToSaveClose) { $doc.Close([ref]0) } else { Write-Output "Fermeture SANS enregistrement"; $doc.Close([ref]0) }
  }
  $word.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
}
