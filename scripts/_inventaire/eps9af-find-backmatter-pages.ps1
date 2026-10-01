$path = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\EPS\9AF\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_PHASE4.docx"

# Build accented strings from Unicode code points to avoid the PowerShell 5.1 ANSI-vs-UTF8 source
# file encoding pitfall (accented literals typed directly get mis-decoded when the .ps1 has no BOM).
$eacute = [char]0x00E9

$targets = @(
  "Corrig${eacute} g${eacute}n${eacute}ral des exercices",
  "Glossaire g${eacute}n${eacute}ral EPS 9e AF",
  "R${eacute}f${eacute}rences",
  "Annexes p${eacute}dagogiques et dossier d'${eacute}valuation"
)

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $null
try {
  $doc = $word.Documents.Open($path, $false, $true)
  Start-Sleep -Seconds 2

  foreach ($t in $targets) {
    $r = $doc.Content
    $r.SetRange(6000, $doc.Content.End)
    $find = $r.Find
    $find.ClearFormatting()
    $find.Text = $t
    $find.Forward = $true
    $find.Wrap = 0
    $found = $find.Execute()
    if ($found) {
      $pageNum = $r.Information(3)
      Write-Output "FOUND|$t|$pageNum"
    } else {
      Write-Output "NOTFOUND|$t"
    }
  }

  Write-Output "TERMINE_OK"
} catch {
  Write-Output "ERREUR: $($_.Exception.Message)"
} finally {
  if ($doc -ne $null) { $doc.Close([ref]0) }
  $word.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
}
