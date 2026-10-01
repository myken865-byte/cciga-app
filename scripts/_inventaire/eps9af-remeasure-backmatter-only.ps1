$path = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\EPS\9AF\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx"
$eacute = [char]0x00E9
$wdArabic = 0

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $null
try {
  $doc = $word.Documents.Open($path, $false, $false)
  Start-Sleep -Seconds 2

  $sectionCount = $doc.Sections.Count
  for ($i = 1; $i -le $sectionCount; $i++) {
    $sec = $doc.Sections.Item($i)
    foreach ($hf in @($sec.Footers.Item(1), $sec.Headers.Item(1))) {
      $hf.PageNumbers.RestartNumberingAtSection = $false
      $hf.PageNumbers.NumberStyle = $wdArabic
    }
  }
  Write-Output "Numerotation temporairement continue"

  # Find chapter 12's character position (12th occurrence of "CHAPITRE") to bound back-matter search.
  $r0 = $doc.Content
  $r0.SetRange(0, $doc.Content.End)
  $f0 = $r0.Find
  $f0.ClearFormatting()
  $f0.Text = "CHAPITRE"
  $f0.MatchCase = $true
  $f0.MatchWholeWord = $true
  $f0.Forward = $true
  $f0.Wrap = 0
  $ch12Start = 0
  for ($n = 1; $n -le 12; $n++) {
    if (-not $f0.Execute()) { break }
    if ($n -eq 12) { $ch12Start = $r0.Start }
    $r0.Collapse(0)
  }
  Write-Output "Chapitre 12 au caractere: $ch12Start"

  $targets = @(
    @{ Label="Corrige";    Text="Corrig${eacute} g${eacute}n${eacute}ral des exercices" },
    @{ Label="Glossaire";  Text="Glossaire g${eacute}n${eacute}ral EPS 9e AF" },
    @{ Label="References"; Text="R${eacute}f${eacute}rences" }
  )
  foreach ($t in $targets) {
    $r = $doc.Range($ch12Start, $doc.Content.End)
    $f = $r.Find
    $f.ClearFormatting()
    $f.Text = $t.Text
    $f.MatchCase = $true
    $f.MatchWholeWord = $true
    $f.Forward = $true
    $f.Wrap = 0
    if ($f.Execute()) {
      Write-Output "$($t.Label): page physique $($r.Information(3))"
    } else {
      Write-Output "$($t.Label): NON TROUVE apres chapitre 12"
    }
  }

  $lastPageRange = $doc.Content
  $lastPageRange.Collapse(0)
  Write-Output "Derniere page du document: $($lastPageRange.Information(3))"

  $doc.Close([ref]0)
  Write-Output "TERMINE_OK"
} catch {
  Write-Output "ERREUR: $($_.Exception.Message)"
  if ($doc -ne $null) { $doc.Close([ref]0) }
} finally {
  $word.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
}
