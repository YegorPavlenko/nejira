#!/usr/bin/env bash

PROJECT_NAME=nejira
WORKING_DIR=$(dirname $0)
DATA_DIR="$HOME/workspace/nestjs_cli/nejira/data/api"
CONTAINER_NAME=postgres-nejira-api

while getopts "sc" OPT; do
  case $OPT in
#   c)
#     docker ps | grep $CONTAINER_NAME && docker stop $CONTAINER_NAME
#     sudo rm -rf "$DATA_DIR"
#     ;;
  s)
    docker stop $CONTAINER_NAME
    exit
    ;;
  *)
    exit
    ;;
  esac
done

cd "$WORKING_DIR" || exit

if [ ! -f ../.env ]; then
  echo 'config file ../.env not found'
  exit
fi

source ../.env

docker run --name $CONTAINER_NAME --rm -d \
  -e POSTGRES_USER="$TYPEORM_USERNAME" \
  -e POSTGRES_PASSWORD="$TYPEORM_PASSWORD" \
  -e POSTGRES_DB="$TYPEORM_DATABASE" \
  -p 127.0.0.1:"$TYPEORM_PORT":5432 \
  -v "$DATA_DIR":/var/lib/postgresql/data \
  postgres:15.1

echo "db script finished"
