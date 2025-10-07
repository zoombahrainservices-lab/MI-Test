# Test signup API to create a user
Write-Host "🔧 Testing signup API..." -ForegroundColor Cyan

try {
    $signupData = @{
        email = "farzi@gmail.com"
        name = "Test User"
        password = "password123"
    }
    
    Write-Host "📤 Sending signup request..." -ForegroundColor Yellow
    Write-Host "   Email: $($signupData.email)" -ForegroundColor Gray
    Write-Host "   Name: $($signupData.name)" -ForegroundColor Gray
    Write-Host "   Password: $($signupData.password)" -ForegroundColor Gray
    
    $body = $signupData | ConvertTo-Json
    $headers = @{
        'Content-Type' = 'application/json'
    }
    
    $response = Invoke-WebRequest -Uri "https://mi-test-3xgp6450x-zoom-bahrain-services-projects.vercel.app/api/auth/register-supabase" -Method POST -Body $body -Headers $headers
    
    Write-Host "`n📥 Response received:" -ForegroundColor Green
    Write-Host "   Status: $($response.StatusCode)" -ForegroundColor Gray
    Write-Host "   Content: $($response.Content)" -ForegroundColor Gray
    
    if ($response.StatusCode -eq 200) {
        Write-Host "`n✅ User created successfully!" -ForegroundColor Green
        Write-Host "🔑 Login credentials:" -ForegroundColor Yellow
        Write-Host "   Email: $($signupData.email)" -ForegroundColor White
        Write-Host "   Password: $($signupData.password)" -ForegroundColor White
        Write-Host "`n💡 Now you can test login with these credentials!" -ForegroundColor Cyan
    }
    
} catch {
    Write-Host "`n❌ Test failed:" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "   Response: $responseBody" -ForegroundColor Red
        
        if ($responseBody -like "*User already exists*") {
            Write-Host "`n💡 User already exists! Try logging in instead." -ForegroundColor Yellow
            Write-Host "🔑 Login credentials:" -ForegroundColor Yellow
            Write-Host "   Email: $($signupData.email)" -ForegroundColor White
            Write-Host "   Password: $($signupData.password)" -ForegroundColor White
        }
    }
}
