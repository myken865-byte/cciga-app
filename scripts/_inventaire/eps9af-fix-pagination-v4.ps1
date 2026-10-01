$path = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\EPS\9AF\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx"

$wdArabic = 0
# Only sections 10-16 (Chapitre 9 onward) need updating: removing the 2 blank pages inside
# Chapitre 8 (section 9) shifted everything after it back by 2 physical pages. Sections 1-9 are
# untouched (front matter roman + chapters 1-8 all keep their existing start values).
$plan = @(
  @{ Section=10; Start=140 },  # Chapitre 9  (was 142)
  @{ Section=11; Start=158 },  # Chapitre 10 (was 160)
  @{ Section=12; Start=175 },  # Chapitre 11 (was 177)
  @{ Section=13; Start=193 },  # Chapitre 12 (was 195)
  @{ Section=14; Start=212 },  # Corrige general (was 214)
  @{ Section=15; Start=239 },  # Glossaire (was 241)
  @{ Section=16; Start=243 }   # References (was 245)
)

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $null
$safeToSaveClose = $false
try {
  $doc = $word.Documents.Open($path, $false, $false)
  Start-Sleep -Seconds 2

  $sectionCount = $doc.Sections.Count
  Write-Output "Sections: $sectionCount"
  if ($sectionCount -ne 16) { throw "Nombre de sections inattendu: $sectionCount" }

  foreach ($p in $plan) {
    $sec = $doc.Sections.Item($p.Section)
    $footer = $sec.Footers.Item(1)
    $footer.PageNumbers.RestartNumberingAtSection = $true
    $footer.PageNumbers.StartingNumber = $p.Start
    $footer.PageNumbers.NumberStyle = $wdArabic
    $header = $sec.Headers.Item(1)
    $header.PageNumbers.RestartNumberingAtSection = $true
    $header.PageNumbers.StartingNumber = $p.Start
    $header.PageNumbers.NumberStyle = $wdArabic
  }
  Write-Output "Numerotation mise a jour sur les sections 10 a 16"

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
