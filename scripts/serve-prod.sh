#!/bin/bash

# Сборка проекта
npm run build

# Получение абсолютного пути к папке dist
DIST_PATH="$(pwd)/dist"

# Копируем nginx.conf и подставляем путь
cp nginx.conf nginx.temp.conf

# Если macOS:
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s|DIST_PATH|$DIST_PATH|" nginx.temp.conf
else
  # Linux
  sed -i "s|DIST_PATH|$DIST_PATH|" nginx.temp.conf
fi

# Запускаем nginx с временным конфигом через nohup
nohup sudo nginx -c "$PWD/nginx.temp.conf" > nginx.log 2>&1 &

echo "✅ Production server started at http://localhost:8081"

# Убиваем старые ngrok, если они есть
pkill -f "ngrok http" 2>/dev/null

# Запускаем ngrok в фоне через nohup, чтобы не падал
nohup ngrok http 8081 > ngrok.log 2>&1 &

# Ждём, чтобы ngrok успел стартовать и отдать URL
sleep 3

# Извлекаем URL из локального API ngrok
NGROK_URL=$(curl -s http://127.0.0.1:4040/api/tunnels | grep -o 'https://[0-9a-zA-Z.-]*ngrok-free.app' | head -n 1)

echo "🌍 Ngrok public URL: $NGROK_URL"
