$path = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\EPS\9AF\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx"

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $null
$safeToSaveClose = $false
try {
  $doc = $word.Documents.Open($path, $false, $false)  # writable this time
  Start-Sleep -Milliseconds 500

  $sections = $doc.Sections.Count
  Write-Output "Sections: $sections"

  $pagesBefore = $doc.ComputeStatistics(2)
  Write-Output "Pages AVANT correction: $pagesBefore"

  # 1) Footer/header distance: 600 twips (1.06 cm) -> 36 points (0.5 in = 1.27 cm), within the
  #    requested 1.2-1.5 cm safety range. IMPORTANT: Word COM PageSetup measurements are in
  #    POINTS (72/inch), NOT twips (1440/inch) as in raw OOXML — confirmed the hard way (setting
  #    720 here previously meant 720 points = 10in and blew the document up to 4888 pages).
  for ($i = 1; $i -le $sections; $i++) {
    $ps = $doc.Sections.Item($i).PageSetup
    $ps.FooterDistance = 36
    $ps.HeaderDistance = 36
  }
  Write-Output "Distances en-tete/pied corrigees (36 points = 0.5 in = 1.27 cm) sur $sections sections"

  $pagesAfterMargins = $doc.ComputeStatistics(2)
  Write-Output "Pages apres correction des marges (verification immediate): $pagesAfterMargins"
  if ([Math]::Abs($pagesAfterMargins - $pagesBefore) -gt 20) {
    Write-Output "ALERTE: variation de pages anormale apres la correction des marges seule ($pagesBefore -> $pagesAfterMargins) - ARRET AVANT WIDOWCONTROL, PAS D'ENREGISTREMENT"
    throw "Anomalie detectee, correction interrompue par securite"
  }

  # 2) Widow/orphan control across the whole document body (single non-looping property set).
  $doc.Content.ParagraphFormat.WidowControl = $true
  Write-Output "Controle veuves/orphelines active sur tout le corps"

  $pagesAfterWidow = $doc.ComputeStatistics(2)
  Write-Output "Pages apres widow control (verification immediate): $pagesAfterWidow"
  if ([Math]::Abs($pagesAfterWidow - $pagesAfterMargins) -gt 20) {
    Write-Output "ALERTE: variation de pages anormale apres widow control ($pagesAfterMargins -> $pagesAfterWidow) - ARRET, PAS D'ENREGISTREMENT"
    throw "Anomalie detectee, correction interrompue par securite"
  }

  $safeToSaveClose = $true
  $doc.Save()
  Write-Output "Document enregistre"

  Start-Sleep -Milliseconds 500
  $pages = $doc.ComputeStatistics(2)
  Write-Output "Pages apres correction des marges: $pages"

  $sectionPageInfo = @()
  for ($i = 1; $i -le $sections; $i++) {
    $sec = $doc.Sections.Item($i)
    $r = $sec.Range
    $r.Collapse(1)
    $startPage = $r.Information(3)
    $sectionPageInfo += "Section $i debute page (physique) $startPage"
  }
  $sectionPageInfo | ForEach-Object { Write-Output $_ }

  Write-Output "TERMINE_OK"
} catch {
  Write-Output "ERREUR: $($_.Exception.Message)"
} finally {
  if ($doc -ne $null) {
    if ($safeToSaveClose) {
      $doc.Close([ref]0)  # already saved explicitly above; close without re-saving
    } else {
      Write-Output "Fermeture SANS enregistrement (anomalie ou erreur avant le point de sauvegarde)"
      $doc.Close([ref]0)  # wdDoNotSaveChanges — discard any in-memory changes
    }
  }
  $word.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
}
