@echo off
cd /d "%~dp0"
title MAD MAX WITNESS ME SERVER
cls
echo ===================================================
echo   MAD MAX : FURY ROAD - WITNESS ME! HTTPS SERVER
echo ===================================================
echo.
echo Starting HTTPS Server...
echo URL: https://localhost:8443
echo.

node server.js 2>nul
if %errorlevel% equ 0 goto :end

python server.py 2>nul
if %errorlevel% equ 0 goto :end

py server.py 2>nul
if %errorlevel% equ 0 goto :end

echo [ERROR] Neither Node.js nor Python is available.
echo Please install Node.js or Python to run this server.
pause

:end
