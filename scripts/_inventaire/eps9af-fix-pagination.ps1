$path = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\EPS\9AF\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_PHASE4.docx"

# Section -> (NumberStyle, StartingNumber), computed from the verified physical page positions
# (1,23,41,59,76,93,111,128,147,165,182,200,219,246,250) so that section 2 (chapter 1) prints "1"
# and every later section continues arabic numbering relative to that, matching physical reality.
$wdArabic = 0
$wdLowerRoman = 2
$plan = @(
  @{ Section=1;  Style=$wdLowerRoman; Start=1 },
  @{ Section=2;  Style=$wdArabic; Start=1 },
  @{ Section=3;  Style=$wdArabic; Start=19 },
  @{ Section=4;  Style=$wdArabic; Start=37 },
  @{ Section=5;  Style=$wdArabic; Start=54 },
  @{ Section=6;  Style=$wdArabic; Start=71 },
  @{ Section=7;  Style=$wdArabic; Start=89 },
  @{ Section=8;  Style=$wdArabic; Start=106 },
  @{ Section=9;  Style=$wdArabic; Start=125 },
  @{ Section=10; Style=$wdArabic; Start=143 },
  @{ Section=11; Style=$wdArabic; Start=160 },
  @{ Section=12; Style=$wdArabic; Start=178 },
  @{ Section=13; Style=$wdArabic; Start=197 },
  @{ Section=14; Style=$wdArabic; Start=224 },
  @{ Section=15; Style=$wdArabic; Start=228 }
)

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $null
$safeToSaveClose = $false
try {
  $doc = $word.Documents.Open($path, $false, $false)
  Start-Sleep -Seconds 2

  $pagesBefore = $null
  $endRange = $doc.Content
  $endRange.Collapse(0)
  $pagesBefore = $endRange.Information(3)
  Write-Output "Derniere page (verite terrain) AVANT correction pagination: $pagesBefore"

  foreach ($p in $plan) {
    $sec = $doc.Sections.Item($p.Section)
    # wdHeaderFooterPrimary = 1
    $footer = $sec.Footers.Item(1)
    $footer.PageNumbers.RestartNumberingAtSection = $true
    $footer.PageNumbers.StartingNumber = $p.Start
    $footer.PageNumbers.NumberStyle = $p.Style
    $header = $sec.Headers.Item(1)
    $header.PageNumbers.RestartNumberingAtSection = $true
    $header.PageNumbers.StartingNumber = $p.Start
    $header.PageNumbers.NumberStyle = $p.Style
  }
  Write-Output "Numerotation appliquee sur $($plan.Count) sections"

  $endRange2 = $doc.Content
  $endRange2.Collapse(0)
  $pagesAfter = $endRange2.Information(3)
  Write-Output "Derniere page (verite terrain) APRES correction pagination: $pagesAfter"

  if ($pagesAfter -ne $pagesBefore) {
    Write-Output "ALERTE: le nombre de pages a change alors qu'un changement de FORMAT de numerotation ne devrait jamais reflow le contenu ($pagesBefore -> $pagesAfter) - ARRET, PAS D'ENREGISTREMENT"
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
