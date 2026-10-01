$path = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\EPS\9AF\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_PHASE4.docx"
$pdfOut = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\08_PDF_DE_CONTROLE\EPS\9AF\EPS_9AF_CONTROLE_PRELIMINAIRE_AVANT_CORRECTIONS_PAGINATION.pdf"

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $null
try {
  $doc = $word.Documents.Open($path, $false, $true)
  Start-Sleep -Seconds 2
  # wdExportFormatPDF = 17, wdExportOptimizeForPrint = 0
  $doc.ExportAsFixedFormat($pdfOut, 17, $false, 0)
  Write-Output "PDF exporte: $pdfOut"
  Write-Output "TERMINE_OK"
} catch {
  Write-Output "ERREUR: $($_.Exception.Message)"
} finally {
  if ($doc -ne $null) { $doc.Close([ref]0) }
  $word.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
}
