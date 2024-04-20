
$latitude = Read-Host "Lütfen enlem değerini girin"
$longitude = Read-Host "Lütfen boylam değerini girin"
$magnitude = Read-Host "Lütfen deprem şiddetini girin"


$jsonData = @{
    lat = $latitude
    lon = $longitude
    siddet = $magnitude
} | ConvertTo-Json


Invoke-RestMethod -Uri "http://localhost:5000/send" -Method Post -Body $jsonData -ContentType "application/json"
