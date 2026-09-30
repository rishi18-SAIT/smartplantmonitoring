# 🚀 Complete Deployment Guide: Smart Plant Monitoring

This guide provides step-by-step instructions to deploy the full-stack **Smart Plant Monitoring** system:
* **Frontend (React)** ➔ **Vercel**
* **Backend (Node.js/Express)** ➔ **Render**
* **ML Service (FastAPI / Optional)** ➔ **Render**
* **AI Disease Classifier (Streamlit / Optional)** ➔ **Render**
* **Database (MongoDB Atlas)** ➔ Cloud

---

## 📑 Table of Contents
1. [Architecture & Deployment Overview](#1-architecture--deployment-overview)
2. [Step 1: Deploy Backend to Render](#step-1-deploy-backend-to-render)
3. [Step 2: Deploy ML Service to Render (Optional)](#step-2-deploy-ml-service-to-render-optional)
4. [Step 3: Deploy AI Disease Classifier to Render (Optional)](#step-3-deploy-ai-disease-classifier-to-render-optional)
5. [Step 4: Deploy Frontend to Vercel](#step-4-deploy-frontend-to-vercel)
6. [Step 5: Environment Variables Reference](#step-5-environment-variables-reference)
7. [Step 6: Verifying & Testing Deployment](#step-6-verifying--testing-deployment)
8. [Troubleshooting & Common Pitfalls](#troubleshooting--common-pitfalls)

---

## 1. Architecture & Deployment Overview

```
                                  +----------------------------+
                                  |   Frontend (React SPA)     |
                                  |      Hosted on Vercel      |
                                  +--------------+-------------+
                                                 |
                                     HTTPS REST API Requests
                                                 v
                                  +--------------+-------------+
                                  |   Backend (Node.js/Express)|
                                  |      Hosted on Render      |
                                  +-------+--------------+-----+
                                          |              |
                    MongoDB Database Calls|              | ML API Requests
                                          v              v
               +--------------------------+--+   +-------+--------------------+
               |    MongoDB Atlas Cloud      |   |   FastAPI ML Service       |
               |         Database            |   |     Hosted on Render       |
               +-----------------------------+   +----------------------------+
```

---

## Step 1: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/) and sign in with your GitHub account.
2. Click **"New +"** in the top right and select **"Web Service"**.
3. Choose **"Build and deploy from a Git repository"** and connect your repo: `rishi18-SAIT/smartplantmonitoring`.
4. Configure the Web Service settings:
   * **Name**: `smart-plant-backend` (or your preferred name)
   * **Region**: Choose the closest region (e.g., *Singapore*, *Frankfurt*, *Oregon*)
   * **Branch**: `main`
   * **Root Directory**: `backend` *(⚠️ Critical)*
   * **Runtime**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `node server.js`
   * **Instance Type**: `Free`
5. Scroll down to **"Environment Variables"** and add the following keys:

| Key | Value / Description | Example |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | `production` |
| `PORT` | `5000` | `5000` |
| `MONGO_URI` | Your MongoDB Atlas connection URI | `mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority` |
| `JWT_SECRET` | Strong random secret key | `your_super_secret_jwt_key` |
| `EMAIL_USER` | Your Gmail address for alert emails | `yourname@gmail.com` |
| `EMAIL_PASS` | Gmail App Password (16 characters) | `abcd efgh ijkl mnop` |
| `OPENAI_API_KEY` | OpenAI API Key (for Chatbot & AI) | `sk-...` |
| `HF_API_KEY` | Hugging Face API token | `hf_...` |
| `CLARIFAI_API_KEY` | Clarifai API Key (for pest/disease) | `ef09...` |
| `OPENWEATHER_API_KEY` | OpenWeather API Key | `d64e...` |
| `ML_API_URL` | *(Optional if ML service deployed)* URL of ML service | `https://smart-plant-ml.onrender.com` |

6. Click **"Create Web Service"**.
7. Wait ~2-3 minutes for the build to finish. Once live, copy your Render backend URL (e.g. `https://smart-plant-backend.onrender.com`).

---

## Step 2: Deploy ML Service to Render (Optional)

If you are using the dedicated Python FastAPI Crop Recommendation service (`ml/`):

1. On Render, click **"New +"** ➔ **"Web Service"**.
2. Select your repository `smartplantmonitoring`.
3. Configure settings:
   * **Name**: `smart-plant-ml`
   * **Root Directory**: `ml` *(⚠️ Critical)*
   * **Runtime**: `Python 3`
   * **Build Command**: `pip install -r requirements.txt`
   * **Start Command**: `uvicorn ml_api:app --host 0.0.0.0 --port $PORT`
   * **Instance Type**: `Free`
4. Click **"Create Web Service"**.
5. Once deployed, copy its URL and paste it into your backend environment variable as `ML_API_URL`.

---

## Step 3: Deploy AI Disease Classifier to Render (Optional)

If you want to host the Streamlit UI for Plant Disease Classification (`ai/`):

1. Go to [Render Dashboard](https://dashboard.render.com/) and click **"New +"** ➔ **"Web Service"**.
2. Select your repository `smartplantmonitoring`.
3. Configure settings:
   * **Name**: `smart-plant-ai` (or similar)
   * **Root Directory**: `ai` *(⚠️ Critical)*
   * **Runtime**: `Python 3`
   * **Build Command**: `pip install -r requirements.txt`
   * **Start Command**: `streamlit run app.py --server.port $PORT`
   * **Instance Type**: `Free`
4. Click **"Create Web Service"**.
5. Once deployed, you will get a URL (e.g., `https://smart-plant-ai.onrender.com`). You can use this URL to directly access the AI classifier!

---

## Step 4: Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and log in with GitHub.
2. Click **"Add New..."** ➔ **"Project"**.
3. Locate `rishi18-SAIT/smartplantmonitoring` from your repository list and click **"Import"**.
4. Configure Project settings:
   * **Framework Preset**: `Create React App`
   * **Root Directory**: Click **Edit** and choose `frontend` *(⚠️ Critical)*
   * **Build Command**: `npm run build` (Default)
   * **Output Directory**: `build` (Default)
   * **Install Command**: `npm install` (Default)
5. Expand the **"Environment Variables"** accordion and add:

| Key | Value | Note |
| :--- | :--- | :--- |
| `REACT_APP_API_BASE_URL` | `https://your-backend-name.onrender.com/api` | Replace with your actual Render backend URL from Step 1, ending in `/api` |
| `REACT_APP_AI_URL` | `https://smart-plant-ai.onrender.com` | *(Optional)* URL of deployed AI Streamlit disease classifier |

6. Click **"Deploy"**.
7. Vercel will build and deploy your React app in ~1-2 minutes and give you a public URL (e.g., `https://smartplantmonitoring.vercel.app`).

---

## Step 5: Environment Variables Reference

### Backend (`backend/.env` on Render)
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority&appName=smart-plant
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_16_digit_app_password
OPENAI_API_KEY=sk-proj-...
HF_API_KEY=hf_...
CLARIFAI_API_KEY=...
OPENWEATHER_API_KEY=...
ML_API_URL=https://smart-plant-ml.onrender.com
```

### Frontend (on Vercel)
```env
REACT_APP_API_BASE_URL=https://smart-plant-backend.onrender.com/api
REACT_APP_AI_URL=https://smart-plant-ai.onrender.com
```

---

## Step 6: Verifying & Testing Deployment

1. **Backend Health Check**:
   * Visit `https://your-backend-name.onrender.com/` in your browser.
   * You should see: `"🌿 Smart Plant Monitoring API is running!"`.
2. **Frontend Test**:
   * Open your Vercel URL.
   * Register a new account or log in.
   * Test:
     * 🪴 Adding a plant
     * 🤖 AI Chatbot (`/chatbot`)
     * 🐛 Pest Detection (`/pest-detection`)
     * 🌾 Crop Recommendation (`/crop-recommendation`)
     * 🌤️ Weather updates (`/dashboard`)
3. **Routing Check**:
   * Refresh any inner page (e.g. `/dashboard` or `/ai-features`).
   * Because of `frontend/vercel.json`, it will reload smoothly without a 404 error.

---

## Troubleshooting & Common Pitfalls

1. **CORS Error (`Access-Control-Allow-Origin`)**:
   * The backend `server.js` is already configured with `cors()`. If you experience CORS errors, verify that `REACT_APP_API_BASE_URL` in Vercel matches your Render URL exactly (including `https://` and `/api`).
2. **Render Free Tier Cold Starts**:
   * On Render's free tier, services spin down after 15 minutes of inactivity. The first request after sleep may take ~30-50 seconds to respond.
3. **Gmail Authentication Error (Nodemailer)**:
   * Do not use your regular Gmail password. Generate a 16-character **Google App Password** (Google Account ➔ Security ➔ 2-Step Verification ➔ App Passwords).
4. **MongoDB IP Access List**:
   * In MongoDB Atlas, go to **Network Access** ➔ Add IP Address ➔ Select **"Allow Access from Anywhere" (`0.0.0.0/0`)** so Render's cloud servers can connect.

---
⭐ *Happy Deploying!*
