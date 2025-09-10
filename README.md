# 🌿 Smart Plant Monitoring System

The **Smart Plant Monitoring System** is a MERN stack web application designed to help users monitor and manage their plants effectively with enhanced ai features 
It helps users monitor and manage plants in real time, receive alerts, and detect plant diseases from leaf images.

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

![Dashboard](Screenshot%20(138).png)  
*Plant Dashboard*

![Real-time Monitor](Screenshot%20(139).png)  
*Real-time Monitoring*

![Glassmorphic UI](Screenshot%20(144).png)  
*Login / Register with Glassmorphism*
![AI feature-Plant Disease Classification](Screenshot%20(161).png)
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

