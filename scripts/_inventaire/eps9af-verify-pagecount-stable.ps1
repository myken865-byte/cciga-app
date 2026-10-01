$path = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\EPS\9AF\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx"

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $null
try {
  $doc = $word.Documents.Open($path, $false, $true)
  Start-Sleep -Seconds 3

  for ($i = 1; $i -le 5; $i++) {
    $p = $doc.ComputeStatistics(2)
    Write-Output "Lecture $i : $p pages"
    Start-Sleep -Seconds 2
  }

  # Also check the actual end-of-document page number directly (most reliable single source of truth)
  $endRange = $doc.Content
  $endRange.Collapse(0)  # collapse to end
  $lastPage = $endRange.Information(3)
  Write-Output "Numero de page de la toute derniere position du document: $lastPage"

  Write-Output "TERMINE_OK"
} catch {
  Write-Output "ERREUR: $($_.Exception.Message)"
} finally {
  if ($doc -ne $null) { $doc.Close([ref]0) }
  $word.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
}
