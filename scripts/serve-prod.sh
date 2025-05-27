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
