$path = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\EPS\9AF\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx"
$eacute = [char]0x00E9

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $null
$safeToSaveClose = $false
try {
  $doc = $word.Documents.Open($path, $false, $false)
  Start-Sleep -Seconds 2

  $targets = @(
    "Capacit${eacute}s mobilis${eacute}es",
    "Volleyball des d${eacute}buts",
    "Circuit des qualit${eacute}s en action"
  )

  $fixedCount = 0
  foreach ($t in $targets) {
    $r = $doc.Content
    $r.SetRange(0, $doc.Content.End)
    $f = $r.Find
    $f.ClearFormatting()
    $f.Text = $t
    $f.MatchCase = $true
    $f.Forward = $true
    $f.Wrap = 0
    if (-not $f.Execute()) {
      Write-Output "NON TROUVE: $t"
      continue
    }
    if ($t -eq "Circuit des qualit${eacute}s en action") {
      # This anchor is the heading just before the target table (not inside a table itself) —
      # search forward from here for the next table in the document.
      $searchRange = $doc.Range($r.End, $doc.Content.End)
      $tbl = $null
      foreach ($candidate in $doc.Tables) {
        if ($candidate.Range.Start -ge $r.End) { $tbl = $candidate; break }
      }
      if ($tbl -eq $null) { Write-Output "Pas de tableau trouve apres: $t"; continue }
    } else {
      $tbl = $r.Tables.Item(1)
    }
    Write-Output "Table trouvee pour '$t' : $($tbl.Columns.Count) colonnes, largeur preferee actuelle type=$($tbl.PreferredWidthType), valeur=$($tbl.PreferredWidth)"
    $tbl.AutoFitBehavior(2)  # wdAutoFitWindow = 2 : fit table to the page margins/window
    Write-Output "AutoFitToWindow applique sur la table de '$t'"
    $fixedCount++
  }

  Write-Output "Total tables ajustees: $fixedCount"
  if ($fixedCount -eq 3) {
    $safeToSaveClose = $true
    $doc.Save()
    Write-Output "Document enregistre"
  } else {
    Write-Output "ABANDON: pas 3 tables trouvees, pas d'enregistrement"
  }
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
