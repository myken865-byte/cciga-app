$path = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\EPS\9AF\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_PHASE4.docx"
$eacute = [char]0x00E9

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $null
try {
  $doc = $word.Documents.Open($path, $false, $true)
  Start-Sleep -Seconds 2

  # Find "CHAPITRE" (all caps, as seen in the extracted text right after the TOC block) — search
  # from the very start, single Execute call, to find the FIRST chapter heading occurrence.
  $r = $doc.Content
  $r.SetRange(0, $doc.Content.End)
  $find = $r.Find
  $find.ClearFormatting()
  $find.Text = "CHAPITRE"
  $find.Forward = $true
  $find.Wrap = 0
  $found = $find.Execute()
  if ($found) {
    Write-Output "Premiere occurrence de 'CHAPITRE' a la page physique $($r.Information(3)), position caractere $($r.Start)"
  } else {
    Write-Output "CHAPITRE non trouve"
  }

  # Also check where section 1 actually ends / section 2 begins relative to this.
  $sec1EndRange = $doc.Sections.Item(1).Range
  $sec1EndRange.Collapse(0)
  Write-Output "Fin de la section 1 a la page physique $($sec1EndRange.Information(3)), position caractere $($sec1EndRange.Start)"

  Write-Output "TERMINE_OK"
} catch {
  Write-Output "ERREUR: $($_.Exception.Message)"
} finally {
  if ($doc -ne $null) { $doc.Close([ref]0) }
  $word.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
}
