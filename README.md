# School Dropout Prediction Monitoring System

A full-stack platform for government schools to identify, monitor, and support at-risk students using attendance, academic, socioeconomic, and behavioral indicators.

## Monorepo Structure

- `frontend/` – React + Vite dashboard UI
- `backend/` – Node.js + Express + MongoDB API
- `ml-service/` – FastAPI + scikit-learn prediction service

## Core Features

- JWT authentication with role-based access control (Super Admin, Admin, Teacher, Counselor)
- Student profile management with socioeconomic indicators
- Attendance and marks tracking with analytics
- ML-powered dropout risk scoring (0–100 with low/medium/high categories)
- Intervention tracking with outcomes and follow-up status
- Alerts and notification placeholders (email + SMS hooks)
- Reports export endpoints (CSV/PDF placeholder)
- Dockerized multi-service setup for local/cloud deployment

---

## 1) Local Setup

### Prerequisites

- Node.js 18+
- Python 3.10+
- MongoDB (local or Atlas)
- npm / pip

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

Backend runs on `http://localhost:5000`.

### ML Service

```bash
cd ml-service
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
python app/train_model.py
uvicorn app.main:app --reload --port 8000
```

ML service runs on `http://localhost:8000`.

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

---

## 2) Environment Variables

Use `.env.example` files in each service:

- `backend/.env.example`
- `frontend/.env.example`
- `ml-service/.env.example`

---

## 3) API Overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Students
- `GET /api/students`
- `POST /api/students`
- `PUT /api/students/:id`
- `DELETE /api/students/:id`
- `POST /api/students/bulk-upload`

### Attendance
- `POST /api/attendance/mark`
- `GET /api/attendance/summary/:studentId`

### Marks
- `POST /api/marks`
- `GET /api/marks/:studentId`

### Predictions
- `POST /api/predictions/:studentId`

### Interventions
- `POST /api/interventions`
- `GET /api/interventions/:studentId`

### Reports
- `GET /api/reports/attendance`
- `GET /api/reports/risk-distribution`
- `GET /api/reports/intervention-effectiveness`

---

## 4) Machine Learning

- Sample dataset: `ml-service/data/sample_training_data.csv`
- Training script: `ml-service/app/train_model.py`
- Saved model artifact: `ml-service/model/dropout_model.joblib`

The model predicts dropout probability and returns:

- `riskScore`: 0–100
- `riskCategory`: `Low Risk`, `Medium Risk`, `High Risk`

---

## 5) Seed Data

Run:

```bash
cd backend
npm run seed
```

Creates demo users, students, attendance, marks, and interventions.

---

## 6) Docker Deployment

```bash
docker compose up --build
```

Services:
- Frontend: `5173`
- Backend: `5000`
- ML Service: `8000`
- MongoDB: `27017`

---

## 7) Cloud Deployment Notes

### Render / Railway

- Deploy each service separately.
- Set service URLs in environment variables (`ML_SERVICE_URL`, frontend `VITE_API_BASE_URL`).
- Use managed MongoDB (Atlas).

### AWS

- Frontend: S3 + CloudFront or ECS
- Backend + ML: ECS Fargate or EC2
- DB: MongoDB Atlas or DocumentDB-compatible strategy

---

## 8) Presentation Checklist (Hackathon Ready)

- Role-based login demo (Admin / Teacher / Counselor)
- Student risk dashboard and chart walkthrough
- High-risk alert and intervention logging flow
- Report export sample
- Docker single-command startup

