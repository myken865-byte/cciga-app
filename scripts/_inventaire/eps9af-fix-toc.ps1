$path = "C:\Users\Me. Alcide\Desktop\Collection_Potentiel_en_Eveil_12_Manuels\02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER\EPS\9AF\Potentiel_en_Eveil_EPS_9AF_TRAVAIL_PHASE4.docx"
$eacute = [char]0x00E9
$egrave = [char]0x00E8

# Old -> New page number strings for the TOC. Kept as exact old values (mostly unique 2-3 digit
# numbers within the bounded TOC range) so a single scoped Find/Replace per pair is safe. Annexes
# is intentionally excluded: its content could not be located anywhere in the document body (see
# audit), so its TOC page number is left untouched and flagged instead of guessed.
$replacements = @(
  @{ Old = "|1|";   New = "|1|" },     # Chapitre 1: already correct (1 -> 1), no-op, listed for completeness
  @{ Old = "|14|";  New = "|21|" },
  @{ Old = "|27|";  New = "|39|" },
  @{ Old = "|41|";  New = "|57|" },
  @{ Old = "|54|";  New = "|74|" },
  @{ Old = "|66|";  New = "|91|" },
  @{ Old = "|80|";  New = "|109|" },
  @{ Old = "|94|";  New = "|126|" },
  @{ Old = "|108|"; New = "|145|" },
  @{ Old = "|123|"; New = "|163|" },
  @{ Old = "|137|"; New = "|180|" },
  @{ Old = "|152|"; New = "|198|" },
  @{ Old = "|168|"; New = "|217|" },
  @{ Old = "|195|"; New = "|244|" },
  @{ Old = "|199|"; New = "|248|" }
)

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

  # Locate "Table des mati" + egrave + "res" heading to bound the TOC block precisely.
  $tocFind = $doc.Content
  $tocFind.SetRange(0, $doc.Content.End)
  $f = $tocFind.Find
  $f.ClearFormatting()
  $f.Text = "Table des mati" + $egrave + "res"
  $f.Forward = $true
  $f.Wrap = 0
  if (-not $f.Execute()) { throw "Table des matieres introuvable" }
  $tocStart = $tocFind.End

  # Locate "Annexes p" + eacute + "dagogiques" (last TOC line) to bound the end of the TOC block.
  $tocEndFind = $doc.Content
  $tocEndFind.SetRange($tocStart, $doc.Content.End)
  $f2 = $tocEndFind.Find
  $f2.ClearFormatting()
  $f2.Text = "Annexes p" + $eacute + "dagogiques"
  $f2.Forward = $true
  $f2.Wrap = 0
  if (-not $f2.Execute()) { throw "Fin de table des matieres introuvable" }
  $tocEnd = $tocEndFind.End + 20  # small buffer past the last line's page number

  Write-Output "Bloc TOC repere: caracteres $tocStart a $tocEnd"

  $count = 0
  foreach ($rep in $replacements) {
    if ($rep.Old -eq $rep.New) { continue }
    $scoped = $doc.Range($tocStart, $tocEnd)
    $rf = $scoped.Find
    $rf.ClearFormatting()
    $rf.Text = $rep.Old
    $rf.Replacement.Text = $rep.New
    $rf.Forward = $true
    $rf.Wrap = 0
    $ok = $rf.Execute($rep.Old, $false, $false, $false, $false, $false, $true, 1, $false, $rep.New, 2)  # wdReplaceOne = 1
    if ($ok) { $count++ } else { Write-Output "NON REMPLACE: $($rep.Old)" }
  }
  Write-Output "$count remplacements effectues dans la table des matieres"

  $endRangeA = $doc.Content
  $endRangeA.Collapse(0)
  $pagesAfter = $endRangeA.Information(3)
  Write-Output "Pages: $pagesBefore -> $pagesAfter"
  if ($pagesAfter -ne $pagesBefore) {
    Write-Output "ALERTE: variation de pages - ARRET, PAS D'ENREGISTREMENT"
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
