#!/bin/sh
cd /app
poetry run python manage.py migrate
poetry run gunicorn --workers=3 --bind 0.0.0.0:80 backend.wsgi:application