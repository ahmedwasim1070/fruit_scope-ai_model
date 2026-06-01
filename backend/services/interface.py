import os
import io
import json
import numpy as np
import tensorflow as tf
from PIL import Image

# Absolute Paths 
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, 'model_artifacts', 'final_fruit_model.h5')
CLASS_NAMES_PATH = os.path.join(BASE_DIR, 'model_artifacts', 'class_names.json')

# Globals
model = None
class_names = {}

def load_model():
    global model, class_names
    if model is None:
        print("Loading TensorFlow model into memory...")
        model = tf.keras.models.load_model(MODEL_PATH)
        
        with open(CLASS_NAMES_PATH, 'r') as f:
            class_names = json.load(f)

def process_and_predict(image_bytes: bytes):
    """Processes image and returns the top 3 model predictions."""
    load_model() 

    # Convert to raw bytes keeping the colors - PIL Image
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((100, 100))
    
    # Convert bytes to numpy array - required format for CNN model
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0) # Shape becomes (1, 100, 100, 3)
    img_array = img_array / 255.0 # Rescale exactly according to model training
    
    # Execute inference
    predictions = model.predict(img_array, verbose=0)
    
    # Extract the indices of the top 3 highest probabilities
    top_3_indices = np.argsort(predictions[0])[-3:][::-1]
    
    # Build a structured list of top predictions
    results = []
    for idx in top_3_indices:
        fruit_name = class_names.get(str(idx), "Unknown")
        confidence = float(predictions[0][idx])
        results.append({
            "fruit_name": fruit_name,
            "confidence": confidence
        })
        
    return results