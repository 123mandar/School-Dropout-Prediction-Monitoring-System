# Deployment Guide

## Render
1. Create three web services: `frontend`, `backend`, `ml-service`.
2. Connect this repo and set root directories.
3. Add environment variables from `.env.example` files.
4. Provision MongoDB Atlas and set `MONGODB_URI`.
5. Point backend `ML_SERVICE_URL` to deployed ML service URL.
6. Point frontend `VITE_API_BASE_URL` to backend `/api` URL.

## Railway
1. Create separate services for frontend, backend, ML service.
2. Add managed MongoDB plugin or external Atlas connection.
3. Configure start commands:
   - backend: `npm start`
   - frontend: `npm run dev -- --host 0.0.0.0`
   - ml-service: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Set inter-service URLs via env vars.

## AWS
- ECS Fargate with three task definitions and one MongoDB Atlas cluster.
- Use Application Load Balancer and Route53.
- Store secrets in AWS Secrets Manager.
