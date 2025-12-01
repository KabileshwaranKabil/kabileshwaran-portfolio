# PowerShell helper: download project images referenced from `data/projects.json`
# Usage: from project root run: .\scripts\fetch_repo_assets.ps1

$projectJson = 'data/projects.json'
if (-not (Test-Path $projectJson)) { Write-Error "Missing $projectJson"; exit 1 }

$projects = Get-Content $projectJson -Raw | ConvertFrom-Json
$changed = $false

foreach ($p in $projects) {
    if ($null -ne $p.images) {
        for ($i = 0; $i -lt $p.images.Count; $i++) {
            $url = $p.images[$i]
            if ($url -match 'raw.githubusercontent.com') {
                $filename = [System.IO.Path]::GetFileName($url)
                $outDir = 'assets/images'
                if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
                $outPath = Join-Path $outDir $filename
                Write-Host "Downloading $url -> $outPath"
                try {
                    Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing -ErrorAction Stop
                } catch {
                    Write-Warning "Failed to download $url : $_"
                    continue
                }
                # normalize path to forward slashes for JSON usage in web
                $localPath = $outPath -replace '\\','/'
                $p.images[$i] = $localPath
                if (-not $p.image -or $p.image -like 'assets/images/*') { $p.image = $localPath }
                $changed = $true
            }
        }
    }
}

if ($changed) {
    $projects | ConvertTo-Json -Depth 5 | Set-Content -Path $projectJson -Encoding UTF8
    Write-Host "Updated $projectJson with local image paths."
} else {
    Write-Host "No raw.githubusercontent.com images found to download."
}
