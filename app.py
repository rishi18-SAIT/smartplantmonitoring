import os
import json
from PIL import Image
import numpy as np
import tensorflow as tf
import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt

# Project paths
working_dir = os.path.dirname(os.path.abspath(__file__))
model_path = f"{working_dir}/trained_model/plant_disease_prediction_model.h5"
class_indices_path = f"{working_dir}/trained_model/class_indices.json"

@st.cache_resource
def load_trained_model():
    """Load model with auto-download support and caching"""
    if not os.path.exists(model_path):
        download_url = os.environ.get("MODEL_DOWNLOAD_URL") or os.environ.get("PLANT_MODEL_URL")
        if download_url:
            try:
                os.makedirs(os.path.dirname(model_path), exist_ok=True)
                with st.spinner("⏳ Downloading trained model weights (~150MB)... This runs only once."):
                    import urllib.request
                    urllib.request.urlretrieve(download_url, model_path)
            except Exception as e:
                st.error(f"Failed to download model: {e}")
                return None

    if os.path.exists(model_path):
        try:
            return tf.keras.models.load_model(model_path, compile=False)
        except Exception as e:
            st.error(f"Failed to load model file: {e}")
            return None
    return None

# Load model safely
model = load_trained_model()

# Load class indices
class_indices = {}
if os.path.exists(class_indices_path):
    with open(class_indices_path, "r") as f:
        class_indices = json.load(f)
elif os.path.exists(f"{working_dir}/class_indices.json"):
    with open(f"{working_dir}/class_indices.json", "r") as f:
        class_indices = json.load(f)

# Image preprocessing
def load_and_preprocess_image(image, target_size=(224, 224)):
    img = Image.open(image).convert("RGB")  # Ensure RGB mode
    img = img.resize(target_size)
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array.astype("float32") / 255.0
    return img_array

# Prediction function with Top-k classes
def predict_image_class(model, image, class_indices, top_k=3):
    preprocessed_img = load_and_preprocess_image(image)
    predictions = model.predict(preprocessed_img)[0]  # shape: (num_classes,)
    
    # Get top K predictions
    top_indices = predictions.argsort()[-top_k:][::-1]
    top_classes = [class_indices[str(i)] for i in top_indices]
    top_confidences = [float(predictions[i]) * 100 for i in top_indices]

    # Build full distribution for debugging
    full_results = {
        class_indices[str(i)]: float(predictions[i]) * 100
        for i in range(len(predictions))
    }

    return top_classes, top_confidences, full_results

# Streamlit UI
st.title("🌱 Plant Disease Classifier")

if model is None:
    st.warning("⚠️ Model weights file `plant_disease_prediction_model.h5` was not found in the deployment.")
    st.info("""
    ### Why did this happen?
    TensorFlow `.h5` model files are large binary weights that were not committed to GitHub (often due to GitHub's 100MB limit).

    ### How to enable it on Render:
    1. Upload `plant_disease_prediction_model.h5` to **Google Drive**, **Hugging Face**, **Dropbox**, or **GitHub Releases**.
    2. In your Render Dashboard ➔ select your AI service ➔ **Environment** tab.
    3. Add an Environment Variable:
       * **Key**: `MODEL_DOWNLOAD_URL`
       * **Value**: `<Direct Download URL>`
    4. Save changes. The app will automatically download the model on startup!
    """)
    st.stop()

uploaded_image = st.file_uploader("Upload a plant leaf image...", type=["jpg", "jpeg", "png"])

if uploaded_image is not None:
    image = Image.open(uploaded_image)
    col1, col2 = st.columns(2)

    with col1:
        resized_img = image.resize((150, 150))
        st.image(resized_img)

    with col2:
        if st.button("Classify"):
            top_classes, top_confidences, full_results = predict_image_class(
                model, uploaded_image, class_indices
            )

            # Show top-1 as main result
            st.success(f"Prediction: **{top_classes[0]}** ({top_confidences[0]:.2f}%)")

            # Show top-3 in a bar chart
            st.subheader("Top Predictions")
            df_top = pd.DataFrame({
                "Class": top_classes,
                "Confidence (%)": top_confidences
            })

            fig, ax = plt.subplots()
            ax.barh(df_top["Class"], df_top["Confidence (%)"], color="green")
            ax.invert_yaxis()  # Highest on top
            ax.set_xlabel("Confidence (%)")
            ax.set_title("Top-3 Predictions")
            st.pyplot(fig)

            # Show full probability distribution in expandable section
            with st.expander("🔎 View Full Prediction Probabilities"):
                df_full = pd.DataFrame(
                    list(full_results.items()), columns=["Class", "Confidence (%)"]
                ).sort_values(by="Confidence (%)", ascending=False)

                st.dataframe(df_full.reset_index(drop=True), use_container_width=True)
