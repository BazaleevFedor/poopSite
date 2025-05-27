#!/bin/bash

# Убиваем старые процессы ngrok, если есть
pkill -f "ngrok http" 2>/dev/null

# Запускаем ngrok в фоне
nohup ngrok http 8081 > ngrok.log 2>&1 &

echo "⏳ Запускаем ngrok и ждём URL..."

# Ждём появления туннеля в ngrok (таймаут 10 секунд)
for i in {1..10}; do
  NGROK_URL=$(curl -s http://127.0.0.1:4040/api/tunnels \
    | grep -o 'https://[0-9a-zA-Z.-]*ngrok-free.app' | head -n 1)

  if [[ -n "$NGROK_URL" ]]; then
    echo "🌍 Ngrok public URL: $NGROK_URL"
    exit 0
  fi

  sleep 1
done

echo "❌ Не удалось получить URL от ngrok. Проверь, запустился ли ngrok правильно."
