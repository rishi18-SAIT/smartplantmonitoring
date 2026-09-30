# 🌿 AgriLeaf Guard - Smart Plant Monitoring and Disease Detection System

[![Live Demo](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://smartplantmonitoring-zeta.vercel.app/)
[![Backend API](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://smart-plant-backend-237h.onrender.com/)
[![AI Service](https://img.shields.io/badge/AI_Classifier-Render-FF4B4B?style=for-the-badge&logo=streamlit)](https://dashboard.render.com/)

* **🌐 Live Web App**: [https://smartplantmonitoring-zeta.vercel.app](https://smartplantmonitoring-zeta.vercel.app/)
* **🚀 Live API**: [https://smart-plant-backend-237h.onrender.com](https://smart-plant-backend-237h.onrender.com/)
* **🤖 AI Service**: *Deploy on Render (See DEPLOYMENT_GUIDE.md)*

---

## 🔐 Features

- 🌱 **User Authentication**
  - Register and Login using secure JWT-based authentication
- 🌿 **Plant Dashboard**
  - View real-time plant data (e.g., temperature, humidity, soil moisture)
- 🚨 **Alerts & Notifications**
  - Receive alerts when plant conditions go out of range
- 📈 **Growth Analytics (Coming Soon)**
  - Visualize growth and health trends
- 🪴 **Manage Plants**
  - Add, view, update, and delete plant profiles
  - 
-🤖 AI Features

🌱 Plant Disease Detection – Upload a plant leaf image to classify diseases using a pre-trained CNN model (plant_disease_prediction_model.h5).

📊 Top-3 Predictions – Displays the top 3 most likely diseases with confidence scores.

🔎 Full Probability Distribution – Provides class-wise probabilities for detailed debugging and analysis.

🖼️ Interactive UI – Streamlit-powered interface for easy image upload, classification, and visualization.

---
| Technology              | Role                                              |
| ----------------------- | ------------------------------------------------- |
| **MongoDB**             | Database                                          |
| **Express.js**          | Backend Framework                                 |
| **React.js**            | Frontend Library                                  |
| **Node.js**             | Server Environment                                |
| **Mongoose**            | MongoDB ODM                                       |
| **JWT & Bcrypt.js**     | Authentication & Security                         |
| **CSS (Glassmorphism)** | Frontend Styling                                  |
| **Python**              | AI/ML Integration                                 |
| **Streamlit**           | Plant Disease Detection UI                        |
| **TensorFlow / Keras**  | Deep Learning Model (Leaf Disease Classification) |
| **Pandas**              | Data Processing                                   |
| **Matplotlib**          | Visualization of Predictions                      |



---
## 📸 Screenshots

![Dashboard](Screenshot%20(164).png)  
* HomePage*

![Real-time Monitor](Screenshot%20(165).png)  
*Real-time Monitoring*

![Glassmorphic UI](Screenshot%20(166).png)  
*Login / Register with Glassmorphism*
![AI feature-Plant Disease Classification](Screenshot%20(163).png)
*Disease Classify

## 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/smart-plant-monitoring.git

# Navigate into the project
cd smart-plant-monitoring

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

#Install streamlit
.\venv\Scripts\activate
python -m streamlit run app.py

