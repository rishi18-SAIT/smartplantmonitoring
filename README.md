# 🌿 AgriLeaf Guard - Smart Plant Monitoring & Disease Detection System

[![Frontend Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://smartplantmonitoring-zeta.vercel.app/)
[![Backend Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://smart-plant-backend-237h.onrender.com/)
[![ML Service Render](https://img.shields.io/badge/ML_Service-Render-009688?style=for-the-badge&logo=fastapi)](https://smart-plant-ml.onrender.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**AgriLeaf Guard** is a full-stack, AI-powered agricultural monitoring platform designed to help growers, farmers, and plant enthusiasts monitor plant vitals in real time, predict growth, get crop recommendations, and diagnose leaf diseases using deep learning.

---

## 🌐 Live Deployments

* **Frontend Web Application (Vercel)**: [https://smartplantmonitoring-zeta.vercel.app](https://smartplantmonitoring-zeta.vercel.app/)
* **Backend REST API (Render)**: [https://smart-plant-backend-237h.onrender.com](https://smart-plant-backend-237h.onrender.com/)
* **Crop Recommendation ML API (Render)**: [https://smart-plant-ml.onrender.com](https://smart-plant-ml.onrender.com)
* **Full Deployment Instructions**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## ✨ Features

### 🪴 Plant Management & IoT Telemetry
* **Live Dashboard**: View plant vital statistics including temperature, humidity, and soil moisture with status indicators (*Healthy* / *Needs Water*).
* **Plant Profiles**: Add, edit, monitor, and remove individual plant records with personalized thresholds.
* **Automated Email Alerts**: Automatic email notifications triggered when soil moisture drops below critical levels.

### 🤖 AI & Machine Learning Intelligence
* **🌱 Plant Disease Classifier (`ai/`)**: Upload leaf photos to detect and classify 38+ plant diseases using a Convolutional Neural Network (CNN) with top-3 predictions and full probability distribution.
* **🌾 Crop Recommendation (`ml/`)**: Machine learning model (Random Forest) predicting ideal crops based on soil nutrients (N, P, K), pH, rainfall, temperature, and humidity.
* **🐛 Pest Detection**: Identify crop insects and agricultural pests from images via Clarifai vision AI.
* **🧪 Fertilizer Advisor**: Intelligent recommendations for fertilizers tailored to specific plant conditions and diseases.
* **💬 Flora AI Chatbot**: Interactive agronomy assistant supporting both text questions and voice input.

### 🔐 Security & Architecture
* **JWT Authentication**: Secure user registration, password hashing with `bcryptjs`, and stateless token authorization.
* **Decoupled Architecture**: Independent React SPA frontend, Node.js/Express API proxy, MongoDB database, FastAPI ML microservice, and Streamlit deep learning UI.

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18, HTML5, CSS3 | Glassmorphic, responsive single page application |
| **Backend** | Node.js, Express.js | REST API routing, auth, business logic & service proxy |
| **Database** | MongoDB Atlas, Mongoose | Cloud NoSQL document database |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js | Secure user authentication & password hashing |
| **ML Service** | Python 3, FastAPI, Scikit-Learn | Crop recommendation engine (Random Forest) |
| **Deep Learning** | TensorFlow / Keras, Streamlit | Leaf disease classification using CNN |
| **External APIs** | Clarifai, OpenAI, OpenWeather, Nodemailer | Pest recognition, weather updates, and alert emails |
| **Hosting & CI/CD** | Vercel & Render | Automated zero-downtime git-triggered deployments |

---

## 📸 Screenshots

| Home & Dashboard | Real-Time Monitoring |
| :---: | :---: |
| ![Dashboard](Screenshot%20(164).png) | ![Real-time Monitor](Screenshot%20(165).png) |

| Glassmorphic Auth | Disease Classifier UI |
| :---: | :---: |
| ![Glassmorphic UI](Screenshot%20(166).png) | ![AI Plant Disease Classification](Screenshot%20(163).png) |

---

## 🚀 Local Setup & Installation

### Prerequisites
* **Node.js** (v16 or higher)
* **Python** (v3.9 or higher)
* **Git**
* **MongoDB** connection URI (MongoDB Atlas or local instance)

### 1. Clone the Repository
```bash
git clone https://github.com/rishi18-SAIT/smartplantmonitoring.git
cd smart-plant-monitoring
```

### 2. Configure Backend (`backend/.env`)
Create a `.env` file in the `backend/` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
OPENAI_API_KEY=your_openai_key
HF_API_KEY=your_huggingface_key
CLARIFAI_API_KEY=your_clarifai_key
OPENWEATHER_API_KEY=your_openweather_key
ML_API_URL=http://localhost:8000
```

Install dependencies and start the backend:
```bash
cd backend
npm install
npm start
```
*Backend runs on `http://localhost:5000`*

### 3. Configure Frontend (`frontend/.env`)
Create a `.env` file in the `frontend/` folder:
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_AI_URL=http://localhost:8501
```

Install dependencies and start the frontend:
```bash
cd ../frontend
npm install
npm start
```
*Frontend opens at `http://localhost:3000`*

### 4. Run Crop Recommendation ML API (`ml/`)
```bash
cd ../ml
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn ml_api:app --host 0.0.0.0 --port 8000 --reload
```
*FastAPI runs on `http://localhost:8000`*

### 5. Run Plant Disease Detection App (`ai/`)
```bash
cd ../ai
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
streamlit run app.py
```
*Streamlit runs on `http://localhost:8501`*

---

## 📖 Deployment Guide

For complete, step-by-step instructions on deploying the full stack to **Render** and **Vercel**, refer to:
👉 **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
