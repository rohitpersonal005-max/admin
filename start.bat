@echo off
title Adminutes - Consumable Management System
echo Launching Adminutes Consumable Management System API server...
where agy-node.cmd >nul 2>nul
if not errorlevel 1 (
	start "Adminutes Server" agy-node.cmd "%~dp0server.js"
	exit /b 0
)
where node >nul 2>nul
if not errorlevel 1 (
	start "Adminutes Server" node "%~dp0server.js"
	exit /b 0
)
echo ERROR: Node.js was not found. The PowerShell static server cannot provide login/API access.
echo Install Node.js or open the deployed Vercel URL instead.
pause
exit
