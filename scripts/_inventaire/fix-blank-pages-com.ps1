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
    "Trois touches pour coop${eacute}rer",
    "Auto${eacute}valuation"
  )

  $removedCount = 0
  $searchFrom = 0
  foreach ($t in $targets) {
    # Locate the heading text itself (single Execute call, no loop).
    $headRange = $doc.Content
    $headRange.SetRange($searchFrom, $doc.Content.End)
    $hf = $headRange.Find
    $hf.ClearFormatting()
    $hf.Text = $t
    $hf.Forward = $true
    $hf.Wrap = 0
    if (-not $hf.Execute()) {
      Write-Output "Heading NON TROUVE: $t"
      continue
    }
    $headingStart = $headRange.Start
    Write-Output "Heading '$t' trouve au caractere $headingStart"

    # Search for a manual page break (^m in wildcard Find) in the 500 chars immediately before it.
    $breakRange = $doc.Range([Math]::Max(0, $headingStart - 500), $headingStart)
    $bf = $breakRange.Find
    $bf.ClearFormatting()
    $bf.Text = "^m"
    $bf.MatchWildcards = $false
    $bf.Forward = $true
    $bf.Wrap = 0
    if ($bf.Execute()) {
      Write-Output "Saut de page manuel trouve au caractere $($breakRange.Start), longueur $($breakRange.End - $breakRange.Start)"
      # Delete just the manual break character itself (breakRange now collapsed to the found match).
      $breakRange.Delete()
      $removedCount++
      Write-Output "Supprime."
    } else {
      Write-Output "Aucun saut de page manuel trouve avant: $t"
    }

    $searchFrom = $doc.Content.End -1
    if ($t -eq $targets[0]) { $searchFrom = $headingStart }  # for next search, start from here forward
  }

  Write-Output "Total supprime: $removedCount"

  if ($removedCount -eq 2) {
    $safeToSaveClose = $true
    $doc.Save()
    Write-Output "Document enregistre"
  } else {
    Write-Output "ABANDON: pas exactement 2 suppressions, pas d'enregistrement"
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
