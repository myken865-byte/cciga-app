$path = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\EPS\9AF\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_CORRIGE_PAGINATION_20260922.docx"

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $null
try {
  $doc = $word.Documents.Open($path, $false, $true)
  Start-Sleep -Seconds 2

  $sections = $doc.Sections.Count
  Write-Output "Sections: $sections"
  for ($i = 1; $i -le $sections; $i++) {
    $sec = $doc.Sections.Item($i)
    $r = $sec.Range
    $r.Collapse(1)
    $startPage = $r.Information(3)
    Write-Output "Section $i debute page physique $startPage"
  }
  $endRange = $doc.Content
  $endRange.Collapse(0)
  Write-Output "Derniere page: $($endRange.Information(3))"
  Write-Output "TERMINE_OK"
} catch {
  Write-Output "ERREUR: $($_.Exception.Message)"
} finally {
  if ($doc -ne $null) { $doc.Close([ref]0) }
  $word.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
}
