# Comprehensive debug script for Vercel authentication issues
$VERCEL_URL = 'https://mi-test-3xgp6450x-zoom-bahrain-services-projects.vercel.app'

Write-Host "🔍 Debugging Vercel Authentication Issues..." -ForegroundColor Cyan
Write-Host "🌐 Testing URL: $VERCEL_URL" -ForegroundColor Gray

try {
    # 1. Test if the app is accessible
    Write-Host "`n1. Testing app accessibility..." -ForegroundColor Yellow
    $homeResponse = Invoke-WebRequest -Uri $VERCEL_URL -Method GET
    Write-Host "   Home page status: $($homeResponse.StatusCode)" -ForegroundColor Gray
    
    if ($homeResponse.StatusCode -ne 200) {
        Write-Host "❌ App is not accessible!" -ForegroundColor Red
        return
    }
    Write-Host "✅ App is accessible" -ForegroundColor Green
    
    # 2. Test signup API
    Write-Host "`n2. Testing signup API..." -ForegroundColor Yellow
    $signupData = @{
        email = "test@example.com"
        name = "Test User"
        password = "password123"
    } | ConvertTo-Json
    
    $signupResponse = Invoke-WebRequest -Uri "$VERCEL_URL/api/auth/register-supabase" -Method POST -Body $signupData -ContentType "application/json"
    Write-Host "   Signup status: $($signupResponse.StatusCode)" -ForegroundColor Gray
    Write-Host "   Signup response: $($signupResponse.Content)" -ForegroundColor Gray
    
    if ($signupResponse.StatusCode -eq 200) {
        Write-Host "✅ Signup API working!" -ForegroundColor Green
    } else {
        Write-Host "❌ Signup API failed" -ForegroundColor Red
    }
    
    # 3. Test login API
    Write-Host "`n3. Testing login API..." -ForegroundColor Yellow
    $loginData = @{
        email = "test@example.com"
        password = "password123"
    } | ConvertTo-Json
    
    try {
        $loginResponse = Invoke-WebRequest -Uri "$VERCEL_URL/api/auth/login-supabase" -Method POST -Body $loginData -ContentType "application/json"
        Write-Host "   Login status: $($loginResponse.StatusCode)" -ForegroundColor Gray
        Write-Host "   Login response: $($loginResponse.Content)" -ForegroundColor Gray
        
        if ($loginResponse.StatusCode -eq 200) {
            Write-Host "✅ Login API working!" -ForegroundColor Green
        } else {
            Write-Host "❌ Login API failed" -ForegroundColor Red
        }
    } catch {
        Write-Host "   Login status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Gray
        Write-Host "   Login response: $($_.Exception.Message)" -ForegroundColor Gray
        Write-Host "❌ Login API failed" -ForegroundColor Red
    }
    
    # 4. Test users API
    Write-Host "`n4. Testing users API..." -ForegroundColor Yellow
    try {
        $usersResponse = Invoke-WebRequest -Uri "$VERCEL_URL/api/users" -Method GET
        Write-Host "   Users status: $($usersResponse.StatusCode)" -ForegroundColor Gray
        Write-Host "   Users response: $($usersResponse.Content)" -ForegroundColor Gray
        
        if ($usersResponse.StatusCode -eq 200) {
            Write-Host "✅ Users API working!" -ForegroundColor Green
        } else {
            Write-Host "❌ Users API failed" -ForegroundColor Red
        }
    } catch {
        Write-Host "   Users status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Gray
        Write-Host "   Users response: $($_.Exception.Message)" -ForegroundColor Gray
        Write-Host "❌ Users API failed" -ForegroundColor Red
    }
    
    # 5. Test questions API
    Write-Host "`n5. Testing questions API..." -ForegroundColor Yellow
    try {
        $questionsResponse = Invoke-WebRequest -Uri "$VERCEL_URL/api/questions" -Method GET
        Write-Host "   Questions status: $($questionsResponse.StatusCode)" -ForegroundColor Gray
        $questionsContent = $questionsResponse.Content | ConvertFrom-Json
        Write-Host "   Questions count: $($questionsContent.questions.Count)" -ForegroundColor Gray
        
        if ($questionsResponse.StatusCode -eq 200) {
            Write-Host "✅ Questions API working!" -ForegroundColor Green
        } else {
            Write-Host "❌ Questions API failed" -ForegroundColor Red
        }
    } catch {
        Write-Host "   Questions status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Gray
        Write-Host "   Questions response: $($_.Exception.Message)" -ForegroundColor Gray
        Write-Host "❌ Questions API failed" -ForegroundColor Red
    }
    
    # 6. Summary and recommendations
    Write-Host "`n📋 Summary:" -ForegroundColor Cyan
    Write-Host "   App accessible: ✅" -ForegroundColor Green
    Write-Host "   Signup API: $(if ($signupResponse.StatusCode -eq 200) { '✅' } else { '❌' })" -ForegroundColor $(if ($signupResponse.StatusCode -eq 200) { 'Green' } else { 'Red' })
    Write-Host "   Login API: $(if ($loginResponse.StatusCode -eq 200) { '✅' } else { '❌' })" -ForegroundColor $(if ($loginResponse.StatusCode -eq 200) { 'Green' } else { 'Red' })
    Write-Host "   Users API: $(if ($usersResponse.StatusCode -eq 200) { '✅' } else { '❌' })" -ForegroundColor $(if ($usersResponse.StatusCode -eq 200) { 'Green' } else { 'Red' })
    Write-Host "   Questions API: $(if ($questionsResponse.StatusCode -eq 200) { '✅' } else { '❌' })" -ForegroundColor $(if ($questionsResponse.StatusCode -eq 200) { 'Green' } else { 'Red' })
    
    # 7. Common issues and solutions
    Write-Host "`n🔧 Common Issues & Solutions:" -ForegroundColor Yellow
    
    if ($signupResponse.StatusCode -ne 200) {
        Write-Host "❌ Signup Issues:" -ForegroundColor Red
        Write-Host "   - Check RLS policies in Supabase" -ForegroundColor Gray
        Write-Host "   - Verify SUPABASE_SERVICE_ROLE_KEY in Vercel" -ForegroundColor Gray
        Write-Host "   - Check database connection" -ForegroundColor Gray
    }
    
    if ($loginResponse.StatusCode -ne 200) {
        Write-Host "❌ Login Issues:" -ForegroundColor Red
        Write-Host "   - User might not exist (create account first)" -ForegroundColor Gray
        Write-Host "   - Check password hashing" -ForegroundColor Gray
        Write-Host "   - Verify JWT_SECRET in Vercel" -ForegroundColor Gray
    }
    
    if ($usersResponse.StatusCode -ne 200) {
        Write-Host "❌ Users API Issues:" -ForegroundColor Red
        Write-Host "   - Check Supabase connection" -ForegroundColor Gray
        Write-Host "   - Verify environment variables" -ForegroundColor Gray
    }
    
    Write-Host "`n💡 Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Check Vercel environment variables" -ForegroundColor White
    Write-Host "2. Verify Supabase RLS policies" -ForegroundColor White
    Write-Host "3. Test Google OAuth configuration" -ForegroundColor White
    Write-Host "4. Check browser console for errors" -ForegroundColor White
    
} catch {
    Write-Host "❌ Debug failed: $($_.Exception.Message)" -ForegroundColor Red
}
