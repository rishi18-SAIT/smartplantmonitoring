import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import joblib

# Load dataset
df = pd.read_csv("data/Crop_recommendation.csv")

X = df[["N","P","K","temperature","humidity","ph","rainfall"]]
y = df["label"]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Pipeline
pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("model", RandomForestClassifier(
        n_estimators=200, random_state=42
    ))
])

# Train
pipe.fit(X_train, y_train)

# Save model
joblib.dump(pipe, "models/crop_rf_model.joblib")
print("✅ Model saved: models/crop_rf_model.joblib")
