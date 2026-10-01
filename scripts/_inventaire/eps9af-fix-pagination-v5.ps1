$path = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\EPS\9AF\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx"

$wdArabic = 0
$wdLowerRoman = 2
# Recomputed from TRUE physical positions measured after the 3 table-width fixes caused content
# reflow (+3 pages total, unevenly distributed). Formula: display = physical - 5 (Chapitre 1 is
# physical page 6 = display "1").
$plan = @(
  @{ Section=1;  Style=$wdLowerRoman; Start=1 },    # front matter, physical 1-5
  @{ Section=2;  Style=$wdArabic; Start=1 },         # Chapitre 1, physical 6
  @{ Section=3;  Style=$wdArabic; Start=18 },        # Chapitre 2, physical 23
  @{ Section=4;  Style=$wdArabic; Start=37 },        # Chapitre 3, physical 42
  @{ Section=5;  Style=$wdArabic; Start=55 },        # Chapitre 4, physical 60
  @{ Section=6;  Style=$wdArabic; Start=72 },        # Chapitre 5, physical 77
  @{ Section=7;  Style=$wdArabic; Start=89 },        # Chapitre 6, physical 94
  @{ Section=8;  Style=$wdArabic; Start=107 },       # Chapitre 7, physical 112
  @{ Section=9;  Style=$wdArabic; Start=125 },       # Chapitre 8, physical 130
  @{ Section=10; Style=$wdArabic; Start=142 },       # Chapitre 9, physical 147
  @{ Section=11; Style=$wdArabic; Start=161 },       # Chapitre 10, physical 166
  @{ Section=12; Style=$wdArabic; Start=178 },       # Chapitre 11, physical 183
  @{ Section=13; Style=$wdArabic; Start=196 },       # Chapitre 12, physical 201
  @{ Section=14; Style=$wdArabic; Start=215 },       # Corrige general, physical 220
  @{ Section=15; Style=$wdArabic; Start=242 },       # Glossaire, physical 247
  @{ Section=16; Style=$wdArabic; Start=246 }        # References, physical 251
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
    $footer.PageNumbers.NumberStyle = $p.Style
    $header = $sec.Headers.Item(1)
    $header.PageNumbers.RestartNumberingAtSection = $true
    $header.PageNumbers.StartingNumber = $p.Start
    $header.PageNumbers.NumberStyle = $p.Style
  }
  Write-Output "Numerotation (v5, apres reflow tableaux) appliquee sur les 16 sections"

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
