# Fruit Identifier 🍎🔍

A full-stack machine learning application that detects and classifies 131 different fruits from user-uploaded images using a Convolutional Neural Network (CNN).

To ensure strict dependency isolation between web development and heavy machine learning computation, this project is structured as a monorepo containing three distinct environments.

## 🏗️ Architecture & Environments

### 1. Frontend (`/frontend`)

The user interface, designed for fast and seamless image uploads.

- **Tech Stack:** React, Vite (JS/TS)
- **Package Manager:** `pnpm`
- **Role:** Captures the user's image, sends a `multipart/form-data` request to the backend API, and elegantly displays the returned fruit prediction and confidence score.

### 2. Backend (`/backend`)

The production inference API. It is strictly separated from the training environment to remain lightweight and fast.

- **Tech Stack:** FastAPI, Python, Uvicorn, TensorFlow (CPU-only)
- **Role:** Receives the image from the frontend, loads it into memory using Pillow, runs it through the pre-trained CNN, and returns a JSON response.
- **Crucial Location:** The compiled, production-ready model files (`final_fruit_model.h5` and `class_names.json`) are permanently located in **`backend/model_artifacts/`**. The FastAPI server directly points here for inference.

## ⚠️ Model Size Note

This repository includes a pre-trained CNN model (`final_fruit_model.h5`) located in `backend/model_artifacts/`.

- The model is compiled and ready for inference
- Approximate size: ~77 MB
- Required for running the backend prediction API
- This file is binary-heavy and not intended for runtime modification

> ⚠️ Note: Because of its size, cloning and storage usage may be slightly heavier. It is included to ensure fully reproducible inference without retraining.

### 3. ML Pipeline (`/ml_pipeline`)

The research, data preprocessing, and model training zone.

- **Tech Stack:** TensorFlow (GPU), Jupyter, Pandas, Kaggle API
- **Role:** Contains the `.ipynb` notebooks executed in Google Colab (T4 GPU) to download the Fruits 360 dataset from Kaggle, train the CNN, and export the `.h5` file.

---

## 🚀 Deployment Strategy

This monorepo utilizes folder-specific deployments to different cloud providers:

- **Frontend Hosting:** Netlify
  - _Live URL:_ `[Insert your Vercel URL here]`
- **Backend Hosting:** Hugging Face Spaces (via Docker)
  - _Live API:_ `[Insert your Hugging Face Space URL here]`
- **Model Training:** Google Colab

---

## 🧪 Local Testing: The Inference Script

Before running the full web stack, you can test the trained model locally using the standalone inference script located at **`ml_pipeline/scripts/test_inference.py`**.

This script opens a native GUI file explorer, allowing you to select an image from your computer, passes it through the `.h5` model, and prints the exact prediction to your CLI.

### How to execute the test script:

1. Ensure your trained model (`final_fruit_model.h5`) and labels (`class_names.json`) are placed inside `backend/model_artifacts/`.
2. Ensure you have the system GUI toolkit installed.
3. Open your terminal at the root of the project and run:

```bash
# Activate the machine learning virtual environment
python -m venv .venv
source ml_pipeline/.venv/bin/activate
pip install -r requirements.txt

# Execute the test script
python ml_pipeline/scripts/test_inference.py
```
