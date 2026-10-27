# Enregistre l'Account ID et la clé Cloudflare Workers AI dans %USERPROFILE%\.cloudflare\workers-ai
# (hors du dépôt Git). La clé reste masquée pendant la saisie.
$id = (Read-Host "Collez votre Account ID Cloudflare puis Entree").Trim()
if ($id -notmatch '^[0-9a-f]{32}$') { Write-Host "Cet Account ID ne semble pas valide (32 caracteres, chiffres et lettres a-f). Relancez la commande."; exit 1 }
$s = Read-Host "Collez votre cle API Cloudflare puis Entree (elle restera masquee)" -AsSecureString
$k = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($s)).Trim()
if ($k.Length -lt 30) { Write-Host "Cette cle semble trop courte. Relancez la commande."; exit 1 }
$dir = Join-Path $env:USERPROFILE ".cloudflare"
New-Item -ItemType Directory -Force $dir | Out-Null
[IO.File]::WriteAllText((Join-Path $dir "workers-ai"), "$id`n$k")
Write-Host "Cle enregistree. Vous pouvez revenir dans la conversation."
