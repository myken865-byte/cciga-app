$path = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\EPS\9AF\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_PHASE4.docx"

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
  Write-Output "Pages AVANT insertion du saut de section: $pagesBefore"

  # Locate "CHAPITRE" (first occurrence = Chapitre 1 heading), then move to the START of its
  # paragraph so the new section break lands exactly before the heading, not mid-run.
  $r = $doc.Content
  $r.SetRange(0, $doc.Content.End)
  $find = $r.Find
  $find.ClearFormatting()
  $find.Text = "CHAPITRE"
  $find.Forward = $true
  $find.Wrap = 0
  $found = $find.Execute()
  if (-not $found) { throw "CHAPITRE introuvable, abandon" }

  $paraStart = $r.Paragraphs.Item(1).Range
  $paraStart.Collapse(1)  # wdCollapseStart
  Write-Output "Paragraphe du titre CHAPITRE 1 commence a la position caractere $($paraStart.Start), page physique $($paraStart.Information(3))"
  $hasPageBreakBefore = $r.Paragraphs.Item(1).Format.PageBreakBefore
  Write-Output "PageBreakBefore sur ce paragraphe: $hasPageBreakBefore"

  # Insert a CONTINUOUS section break right before this paragraph (does not itself force a new
  # physical page — the chapter already starts on its own page via its own formatting).
  # wdSectionBreakContinuous = 3
  $insertPoint = $doc.Range($paraStart.Start, $paraStart.Start)
  $insertPoint.InsertBreak(3)
  Write-Output "Saut de section continu insere"

  $endRangeA = $doc.Content
  $endRangeA.Collapse(0)
  $pagesAfter = $endRangeA.Information(3)
  $sectionsAfter = $doc.Sections.Count
  Write-Output "Pages APRES insertion: $pagesAfter (sections: $sectionsAfter)"

  if ([Math]::Abs($pagesAfter - $pagesBefore) -gt 1) {
    Write-Output "ALERTE: le saut de section continu a modifie le nombre de pages de facon inattendue ($pagesBefore -> $pagesAfter) - ARRET, PAS D'ENREGISTREMENT"
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
