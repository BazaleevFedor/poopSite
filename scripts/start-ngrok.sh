#!/bin/bash

NGROK_NAME="ngrok"
PORT=8081

echo "🛜 Запускаем ngrok через pm2 на порту $PORT"
pm2 start ngrok --name "$NGROK_NAME" -- http $PORT
