import os
import sys
import json
import numpy as np

# Hide heavy TensorFlow debugging logs before importing it
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import tensorflow as tf
from tensorflow.keras.preprocessing import image

# Built-in Python GUI tools for the file explorer window
import tkinter as tk
from tkinter import filedialog

# Relative paths to your production artifacts inside the backend folder
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODEL_PATH = os.path.join(BASE_DIR, 'backend', 'model_artifacts', 'final_fruit_model.h5')
CLASS_NAMES_PATH = os.path.join(BASE_DIR, 'backend', 'model_artifacts', 'class_names.json')

def select_image_via_explorer():
    """Opens a native file explorer dialog to select an image file."""
    root = tk.Tk()
    root.withdraw() # Hide the main blank tkinter window
    root.attributes('-topmost', True) # Bring the file dialog to the front
    
    print("Opening file explorer... Please select an image.")
    file_path = filedialog.askopenfilename(
        title="Select a Fruit Image for Inference",
        filetypes=[("Image Files", "*.jpg *.jpeg *.png *.webp")]
    )
    return file_path

def run_local_test():
    # 1. Verify artifacts exist first
    if not os.path.exists(MODEL_PATH) or not os.path.exists(CLASS_NAMES_PATH):
        print(f"❌ Error: Missing model artifacts inside 'backend/model_artifacts/'.")
        print("Please ensure your trained .h5 and .json files are placed there first.")
        sys.exit(1)

    # 2. Open explorer and get file path
    img_path = select_image_via_explorer()
    if not img_path:
        print("📁 Selection cancelled by user.")
        sys.exit(0)

    # 3. Load model and labels
    print("\n🔄 Loading TensorFlow model into memory...")
    model = tf.keras.models.load_model(MODEL_PATH)
    
    with open(CLASS_NAMES_PATH, 'r') as f:
        class_names = json.load(f)

    # 4. Preprocess the selected image (Target size 100x100 for our CNN)
    print(f"📸 Processing: {os.path.basename(img_path)}")
    img = image.load_img(img_path, target_size=(100, 100))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Normalize exactly like training scale

    # 5. Predict
    print("🧠 Running inference...")
    predictions = model.predict(img_array, verbose=0)
    predicted_class_idx = str(np.argmax(predictions[0]))
    confidence = np.max(predictions[0]) * 100

    # 6. Output clear results to CLI
    fruit_name = class_names.get(predicted_class_idx, "Unknown")
    print("\n" + "="*40)
    print(f"🍎 PREDICTION : {fruit_name}")
    print(f"📊 CONFIDENCE : {confidence:.2f}%")
    print("="*40 + "\n")

if __name__ == "__main__":
    try:
        run_local_test()
    except KeyboardInterrupt:
        print("\nProcess interrupted by user.")