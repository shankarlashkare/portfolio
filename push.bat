@echo off
echo Pushing portfolio to https://github.com/shankarlashkare/portfolio ...
"D:\RK_Hacker\Git\cmd\git.exe" push -u origin main
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==============================================
    echo SUCCESS! Portfolio uploaded to GitHub:
    echo https://github.com/shankarlashkare/portfolio
    echo ==============================================
) else (
    echo.
    echo Make sure you clicked 'Create repository' on https://github.com/new
)
pause
