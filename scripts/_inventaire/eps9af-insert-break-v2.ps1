$path = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\EPS\9AF\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx"

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $null
$safeToSaveClose = $false
try {
  $doc = $word.Documents.Open($path, $false, $false)
  Start-Sleep -Seconds 2

  $sectionsBefore = $doc.Sections.Count
  Write-Output "Sections AVANT: $sectionsBefore"

  # Find "CHAPITRE" (first occurrence) purely by character position — text-based, not
  # page-layout-dependent, so reliable regardless of Word's pagination cache state.
  # IMPORTANT: Word's Find is case-INSENSITIVE by default, which previously matched the lowercase
  # word "chapitres" inside the Avant-propos paragraph instead of the intended all-caps "CHAPITRE"
  # heading label. MatchCase + MatchWholeWord fixes this.
  $r = $doc.Content
  $r.SetRange(0, $doc.Content.End)
  $find = $r.Find
  $find.ClearFormatting()
  $find.Text = "CHAPITRE"
  $find.MatchCase = $true
  $find.MatchWholeWord = $true
  $find.Forward = $true
  $find.Wrap = 0
  $found = $find.Execute()
  if (-not $found) { throw "CHAPITRE introuvable" }
  Write-Output "CHAPITRE (majuscule exacte) trouve au caractere $($r.Start)"

  $paraStart = $r.Paragraphs.Item(1).Range
  $paraStart.Collapse(1)
  Write-Output "Paragraphe CHAPITRE 1 commence au caractere $($paraStart.Start)"

  # Also insert a bookmark right there so we can verify/re-find this exact spot later without
  # relying on page-number properties at all.
  $doc.Bookmarks.Add("AVANT_CHAPITRE1", $paraStart) | Out-Null

  $insertPoint = $doc.Range($paraStart.Start, $paraStart.Start)
  $insertPoint.InsertBreak(3)  # wdSectionBreakContinuous
  Write-Output "Saut de section continu insere"

  $sectionsAfter = $doc.Sections.Count
  Write-Output "Sections APRES: $sectionsAfter"

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
