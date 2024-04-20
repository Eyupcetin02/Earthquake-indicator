while ($true) {
    $randomLat = -90 + (Get-Random -Minimum 0 -Maximum 180)
    $randomLon = -180 + (Get-Random -Minimum 0 -Maximum 360)
    $randomSiddet = Get-Random -Minimum 0 -Maximum 10

    $body = @{
        "lat" = $randomLat
        "lon" = $randomLon
        "siddet" = $randomSiddet
    } | ConvertTo-Json

    Invoke-RestMethod -Uri "http://localhost:5000/send" -Method Post -Body $body -ContentType "application/json"

    Start-Sleep -Seconds 1
}
