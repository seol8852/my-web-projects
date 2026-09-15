#!/usr/bin/env bash

echo "======================================================================"
echo "          🔥 MAD MAX : FURY ROAD - WITNESS ME! SERVER 🔥"
echo "======================================================================"
echo ""

if command -v node &> /dev/null; then
    echo "[OK] Node.js 환경이 감지되었습니다. HTTPS 서버를 구동합니다..."
    node server.js
elif command -v python3 &> /dev/null; then
    echo "[OK] Python3 환경이 감지되었습니다. HTTPS 서버를 구동합니다..."
    python3 server.py
elif command -v python &> /dev/null; then
    echo "[OK] Python 환경이 감지되었습니다. HTTPS 서버를 구동합니다..."
    python server.py
else
    echo "[오류] Node.js 또는 Python이 설치되어 있지 않습니다!"
    exit 1
fi
