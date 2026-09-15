#!/bin/bash
cd "$(dirname "$0")"

echo "==================================================="
echo "  MAD MAX : FURY ROAD - WITNESS ME! (macOS)"
echo "==================================================="
echo ""

# 8443 포트가 이미 사용 중이면 자동 정리
PORT_PID=$(lsof -ti :8443 2>/dev/null)
if [ -n "$PORT_PID" ]; then
    kill -9 $PORT_PID 2>/dev/null
fi

# Node.js 또는 Python3 감지 및 실행
if command -v node >/dev/null 2>&1; then
    echo "[OK] Node.js environment detected."
    echo "[OK] Opening https://localhost:8443 in your browser..."
    echo ""
    node server.js
elif command -v python3 >/dev/null 2>&1; then
    echo "[OK] Python3 environment detected."
    echo "[OK] Opening https://localhost:8443 in your browser..."
    echo ""
    python3 server.py
elif command -v python >/dev/null 2>&1; then
    echo "[OK] Python environment detected."
    echo "[OK] Opening https://localhost:8443 in your browser..."
    echo ""
    python server.py
else
    echo "[ERROR] Neither Node.js nor Python was found!"
    echo "Please install Node.js or Python to run this server."
    echo ""
    read -p "Press Enter to exit..."
fi
