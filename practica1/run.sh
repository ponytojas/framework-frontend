#!/bin/bash
if command -v python3 &>/dev/null; then
    echo "Iniciando servidor con Python 3..."
    python3 -m http.server
elif command -v python &>/dev/null; then
    version=$(python -c 'import sys; print(sys.version_info[0])')
    if [ "$version" -eq 2 ]; then
        echo "Iniciando servidor con Python 2..."
        python -m SimpleHTTPServer
    else
        echo "Iniciando servidor con Python 3 (fallback)..."
        python -m http.server
    fi
else
    echo "Python no está instalado. Por favor, instala Python 3."
fi

