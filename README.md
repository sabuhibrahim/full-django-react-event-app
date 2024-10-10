# Django React Event application Sample

This is Full Django (backend) and React (frontend) JWT authentication example. It is custom made jwt authentication using python-jose jwt on backend-side. It uses PostgreSQL for database.

## What will you learn from this?
- Jwt Auth logic
- Using cookie for refresh token for more security. (If your frontend and backend is not over the same domain you should use body responses instead. Otherwise, it will cause CORS errors in browsers on production)
- How to implement jwt logic on the frontend (In this example on React app)

## Installation
- If you want to run docker you need to [install docker](https://docs.docker.com/engine/install/)
- Run docker
```bash
docker-compose up -d --build
```
or
```bash
docker compose up -d --build
