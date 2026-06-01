import os
import io
import json
import numpy as np
import tensorflow as tf
from PIL import Image

# Absolute Paths 
# BASE - to navigate ourself to project repo from system
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Model Path - location where our model exists
MODEL_PATH = os.path.join(BASE_DIR, 'model_artifacts', 'final_fruit_model.h5')
# Model Path - location where our model exists
CLASS_NAMES_PATH = os.path.join(BASE_DIR, 'model_artifacts', 'class_names.json')

# Globals
# actual model loaded in memory
model = None
# a file for model output to human friendly output  - generated automatically after executing the model !
class_names = {}

# Loads required models
def load_model():
    global model, class_names
    # loads model if not loaded and also fill our class_names
    if model is None:
        print("Loading TensorFlow model into memory...")
        model = tf.keras.models.load_model(MODEL_PATH)
        
        with open(CLASS_NAMES_PATH, 'r') as f:
            class_names = json.load(f)

# Process image and give its prediction using our compiled model 
def process_and_predict(image_bytes: bytes):
    # our base func 
    load_model() 

    # Convert to raw bytes also keeping the colors - PIL Image
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((100, 100))
    
    # Convert that bytes to numpy array - required format for CNN model
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0) # Shape becomes (1, 100, 100, 3)
    img_array = img_array / 255.0 # Rescale exactly as we did in training
    
    # Execute our image to our model - after applying the required format required by model
    predictions = model.predict(img_array)
    predicted_class_idx = str(np.argmax(predictions[0]))
    confidence = float(np.max(predictions[0]))
    
    # 4. Map the index to the real fruit name
    fruit_name = class_names.get(predicted_class_idx, "Unknown")
    
    return fruit_name, confidence