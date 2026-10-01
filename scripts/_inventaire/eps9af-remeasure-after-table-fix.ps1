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
  Write-Output "Sections: $sectionCount"

  # STEP A: temporarily make ALL sections continuous (no restart) so Information() reflects true
  # physical position again, same as on the pristine original document.
  for ($i = 1; $i -le $sectionCount; $i++) {
    $sec = $doc.Sections.Item($i)
    foreach ($hf in @($sec.Footers.Item(1), $sec.Headers.Item(1))) {
      $hf.PageNumbers.RestartNumberingAtSection = $false
      $hf.PageNumbers.NumberStyle = $wdArabic
    }
  }
  Write-Output "Numerotation temporairement rendue continue sur toutes les sections"

  # STEP B: measure each chapter heading's TRUE physical position now.
  $targets = @(
    @{ Label="Chapitre 2";  Text="CHAPITRE"; Occurrence=2 },
    @{ Label="Chapitre 3";  Text="CHAPITRE"; Occurrence=3 },
    @{ Label="Chapitre 4";  Text="CHAPITRE"; Occurrence=4 },
    @{ Label="Chapitre 5";  Text="CHAPITRE"; Occurrence=5 },
    @{ Label="Chapitre 6";  Text="CHAPITRE"; Occurrence=6 },
    @{ Label="Chapitre 7";  Text="CHAPITRE"; Occurrence=7 },
    @{ Label="Chapitre 8";  Text="CHAPITRE"; Occurrence=8 },
    @{ Label="Chapitre 9";  Text="CHAPITRE"; Occurrence=9 },
    @{ Label="Chapitre 10"; Text="CHAPITRE"; Occurrence=10 },
    @{ Label="Chapitre 11"; Text="CHAPITRE"; Occurrence=11 },
    @{ Label="Chapitre 12"; Text="CHAPITRE"; Occurrence=12 },
    @{ Label="Corrige";     Text="Corrig${eacute} g${eacute}n${eacute}ral des exercices"; Occurrence=2 },
    @{ Label="Glossaire";   Text="Glossaire g${eacute}n${eacute}ral EPS 9e AF"; Occurrence=2 },
    @{ Label="References";  Text="R${eacute}f${eacute}rences"; Occurrence=2 }
  )

  # Find chapter 12's character position first, to bound the back-matter searches after it
  # (avoids matching the same phrases as they appear inside the table of contents).
  $ch12Range = $doc.Content
  $ch12Range.SetRange(0, $doc.Content.End)
  $ch12Find = $ch12Range.Find
  $ch12Find.ClearFormatting()
  $ch12Find.Text = "CHAPITRE"
  $ch12Find.MatchCase = $true
  $ch12Find.MatchWholeWord = $true
  $ch12Find.Forward = $true
  $ch12Find.Wrap = 0
  $ch12Start = 0
  for ($n = 1; $n -le 12; $n++) {
    if (-not $ch12Find.Execute()) { break }
    if ($n -eq 12) { $ch12Start = $ch12Range.Start }
    $ch12Range.Collapse(0)
  }
  Write-Output "Chapitre 12 caractere (pour bornage): $ch12Start"

  $results = @{}
  foreach ($t in $targets) {
    $r = $doc.Content
    if ($t.Label -in @("Corrige", "Glossaire", "References")) {
      $r.SetRange($ch12Start, $doc.Content.End)
    } else {
      $r.SetRange(0, $doc.Content.End)
    }
    $found = $false
    for ($n = 1; $n -le 1; $n++) {
      $f = $r.Find
      $f.ClearFormatting()
      $f.Text = $t.Text
      $f.MatchCase = $true
      $f.MatchWholeWord = $true
      $f.Forward = $true
      $f.Wrap = 0
      $found = $f.Execute()
    }
    if ($found) {
      $page = $r.Information(3)
      $results[$t.Label] = $page
      Write-Output "$($t.Label): page physique $page"
    } else {
      Write-Output "$($t.Label): NON TROUVE (occurrence $($t.Occurrence))"
    }
  }

  $lastPageRange = $doc.Content
  $lastPageRange.Collapse(0)
  Write-Output "Derniere page du document: $($lastPageRange.Information(3))"

  # Close WITHOUT saving — this was a read-only measurement pass using a temporary numbering
  # change; we don't want to persist "all continuous" as the real numbering.
  $doc.Close([ref]0)
  Write-Output "TERMINE_OK (fermeture sans enregistrement, mesure seulement)"
} catch {
  Write-Output "ERREUR: $($_.Exception.Message)"
  if ($doc -ne $null) { $doc.Close([ref]0) }
} finally {
  $word.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
}
