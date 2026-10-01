$path = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\EPS\9AF\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_PHASE4.docx"

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $null
try {
  $doc = $word.Documents.Open($path, $false, $true)
  Start-Sleep -Milliseconds 500

  $pages = $doc.ComputeStatistics(2)
  $words = $doc.ComputeStatistics(0)
  $paras = $doc.ComputeStatistics(4)
  $sections = $doc.Sections.Count
  $tocCount = $doc.TablesOfContents.Count
  $inlineShapes = $doc.InlineShapes.Count
  $bookmarks = $doc.Bookmarks.Count

  Write-Output "Pages (ComputeStatistics): $pages"
  Write-Output "Mots: $words"
  Write-Output "Paragraphes: $paras"
  Write-Output "Sections (COM): $sections"
  Write-Output "Tables des matieres (champ TOC natif): $tocCount"
  Write-Output "InlineShapes: $inlineShapes"
  Write-Output "Signets: $bookmarks"

  # Page count per section, using Range.Information — read-only property access, no loop risk
  $sectionPageInfo = @()
  for ($i = 1; $i -le $sections; $i++) {
    $sec = $doc.Sections.Item($i)
    $startRange = $sec.Range
    $startRange.Collapse(1)
    $startPage = $startRange.Information(3)  # wdActiveEndPageNumber
    $sectionPageInfo += "Section $i debute page (affichee) $startPage"
  }
  $sectionPageInfo | ForEach-Object { Write-Output $_ }

  Write-Output "TERMINE_OK"
} catch {
  Write-Output "ERREUR: $($_.Exception.Message)"
} finally {
  if ($doc -ne $null) { $doc.Close([ref]0) }
  $word.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
}
