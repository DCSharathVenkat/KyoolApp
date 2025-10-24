# KyoolApp Backend Startup Script
# Run this script to start your FastAPI backend for real-time data

Write-Host "🚀 Starting KyoolApp Backend..." -ForegroundColor Green

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python not found. Please install Python 3.8+" -ForegroundColor Red
    exit 1
}

# Navigate to backend directory
$backendPath = Join-Path $PSScriptRoot "..\backend"
if (Test-Path $backendPath) {
    Set-Location $backendPath
    Write-Host "📁 Changed to backend directory" -ForegroundColor Green
} else {
    Write-Host "❌ Backend directory not found at: $backendPath" -ForegroundColor Red
    exit 1
}

# Check if requirements.txt exists
if (Test-Path "requirements.txt") {
    Write-Host "📦 Installing Python dependencies..." -ForegroundColor Yellow
    pip install -r requirements.txt
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "⚠️ No requirements.txt found, skipping dependency installation" -ForegroundColor Yellow
}

# Start the FastAPI server
Write-Host "🌐 Starting FastAPI server on http://localhost:8000..." -ForegroundColor Green
Write-Host "📱 Your frontend will now fetch real-time data!" -ForegroundColor Cyan
Write-Host "🔄 To stop the server, press Ctrl+C" -ForegroundColor Yellow
Write-Host ""

try {
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
} catch {
    Write-Host "❌ Failed to start FastAPI server" -ForegroundColor Red
    Write-Host "💡 Make sure uvicorn is installed: pip install uvicorn" -ForegroundColor Yellow
    exit 1
}