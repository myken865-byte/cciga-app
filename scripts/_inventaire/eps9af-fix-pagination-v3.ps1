$path = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\EPS\9AF\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx"

$wdArabic = 0
$wdLowerRoman = 2
# Values computed from TRUE physical page positions confirmed via real PDF export + visual
# inspection (Word's Information()/ComputeStatistics() proved unreliable for this document and are
# NOT used here). Chapter 1 = physical page 6 = arabic "1"; every later section = physical_start - 5.
$plan = @(
  @{ Section=1;  Style=$wdLowerRoman; Start=1 },    # front matter, physical 1-5 -> i..v
  @{ Section=2;  Style=$wdArabic; Start=1 },         # Chapitre 1, physical 6
  @{ Section=3;  Style=$wdArabic; Start=18 },        # Chapitre 2, physical 23
  @{ Section=4;  Style=$wdArabic; Start=36 },        # Chapitre 3, physical 41
  @{ Section=5;  Style=$wdArabic; Start=54 },        # Chapitre 4, physical 59
  @{ Section=6;  Style=$wdArabic; Start=71 },        # Chapitre 5, physical 76
  @{ Section=7;  Style=$wdArabic; Start=88 },        # Chapitre 6, physical 93
  @{ Section=8;  Style=$wdArabic; Start=106 },       # Chapitre 7, physical 111
  @{ Section=9;  Style=$wdArabic; Start=123 },       # Chapitre 8, physical 128
  @{ Section=10; Style=$wdArabic; Start=142 },       # Chapitre 9, physical 147
  @{ Section=11; Style=$wdArabic; Start=160 },       # Chapitre 10, physical 165
  @{ Section=12; Style=$wdArabic; Start=177 },       # Chapitre 11, physical 182
  @{ Section=13; Style=$wdArabic; Start=195 },       # Chapitre 12, physical 200
  @{ Section=14; Style=$wdArabic; Start=214 },       # Corrige general, physical 219
  @{ Section=15; Style=$wdArabic; Start=241 },       # Glossaire, physical 246
  @{ Section=16; Style=$wdArabic; Start=245 }        # References (+suite), physical 250
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
  if ($sectionCount -ne 16) { throw "Nombre de sections inattendu ($sectionCount, 16 attendues) - le document ne correspond pas a l'etat prevu apres insertion du saut" }

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
  Write-Output "Numerotation appliquee sur les 16 sections"

  # Also fix footer/header distance while we're here (720 twips -> 36 points = 0.5in = 1.27cm).
  for ($i = 1; $i -le $sectionCount; $i++) {
    $ps = $doc.Sections.Item($i).PageSetup
    $ps.FooterDistance = 36
    $ps.HeaderDistance = 36
  }
  Write-Output "Distances en-tete/pied corrigees (36 points = 1.27 cm)"

  $doc.Content.ParagraphFormat.WidowControl = $true
  Write-Output "Controle veuves/orphelines active"

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
