# 🍎 Fruit Scope

**Domain:** `fruitscope.netlify.app`

A full-stack machine learning project built as a university-level CNN application. It classifies **131 fruit categories** from images using a Convolutional Neural Network trained on the **Fruits 360 dataset**, delivering real-time predictions with confidence scores.

Users can upload an image and receive the top 3 predicted fruit classes instantly through a web interface powered by a FastAPI inference service hosted on Hugging Face.

---

## 🌐 Live Deployment

| Service        | Status    | Access                                    |
| -------------- | --------- | ----------------------------------------- |
| **Production** | 🟢 Online | [Web App](https://fruitscope.netlify.app) |

---

## 🛠 Tech Stack

### Core Architecture

- **Frontend Framework:** React + Vite (TypeScript)
- **Styling:** Tailwind CSS
- **Backend Framework:** FastAPI (Python)
- **ML Framework:** TensorFlow / Keras
- **Image Processing:** Pillow
- **Deployment:** Netlify (Frontend), Hugging Face Spaces (Backend Docker)
- **Package Manager:** pnpm

---

## 🧠 Learning Project Overview (CNN System Design)

This project was developed as part of a university-level deep learning implementation focused on real-world CNN deployment workflows.

It demonstrates:

- End-to-end ML pipeline design (training → export → inference)
- Separation of concerns between frontend, backend, and ML pipeline
- Production-style model serving using FastAPI
- Real-time image classification using a pretrained CNN

---

## 🏗️ System Architecture

A fully modular monorepo separating UI, inference, and training workflows:

```
fruit-identifier/
├── frontend/          # React + Vite UI layer
├── backend/           # FastAPI inference service (Hugging Face Space)
│   └── model_artifacts/
│       ├── final_fruit_model.h5
│       └── class_names.json
└── ml_pipeline/       # Training & experimentation layer
    └── scripts/
        └── test_inference.py
```

---

### Frontend `/frontend`

- React + Vite + TypeScript
- Tailwind CSS UI
- Drag-and-drop image upload
- Sends `multipart/form-data` to backend
- Displays top 3 predictions with confidence visualization

---

### Backend (Hugging Face Space)

- FastAPI inference server hosted on Hugging Face Spaces
- TensorFlow CPU-based model loading
- Pillow-based preprocessing pipeline
- Stateless REST API design
- Returns structured JSON predictions

---

### ML Pipeline `/ml_pipeline`

- TensorFlow + Keras training environment
- Dataset: Fruits 360 (Moltean)
  https://www.kaggle.com/datasets/moltean/fruits
  A structured dataset of fruit images used for CNN-based multi-class classification.
- Google Colab (T4 GPU) used for training
- Model export to `.h5` format
- Includes inference testing script for validation

---

## 📡 API Reference

### `POST /predict`

Upload an image and receive top predictions.

**Request**

```
Content-Type: multipart/form-data
file: image
```

**Response**

```json
{
  "success": true,
  "filename": "apple.jpg",
  "prediction": [
    { "fruit_name": "Apple Red 1", "confidence": 0.987 },
    { "fruit_name": "Apple Red 2", "confidence": 0.009 },
    { "fruit_name": "Apple Braeburn", "confidence": 0.003 }
  ]
}
```

---

### `GET /health`

```json
{ "status": "ok" }
```

---

## 🧪 Model Details

| Property    | Value                        |
| ----------- | ---------------------------- |
| Model Type  | Convolutional Neural Network |
| Dataset     | Fruits 360 (Kaggle)          |
| Classes     | 131 fruit categories         |
| File Format | `.h5` (Keras model)          |
| Size        | ~77 MB                       |
| Location    | `backend/model_artifacts/`   |

The trained model is directly loaded for inference without retraining, enabling reproducible execution across environments.

---

## 🚀 Local Setup Guide

### Prerequisites

- Python 3.10+
- Node.js 18+
- pnpm

---

### Run Standalone Inference (Local ML Testing)

Run model inference without the web stack:

```bash
python ml_pipeline/scripts/test_inference.py
```

A file picker opens for image selection and prints predictions directly in the terminal.

---

## 🛠 Tech Stack Summary

| Layer      | Stack                                 |
| ---------- | ------------------------------------- |
| Frontend   | React, Vite, TypeScript, Tailwind CSS |
| Backend    | FastAPI, Python, Uvicorn (HF Hosted)  |
| ML         | TensorFlow, Keras, NumPy, Pillow      |
| Training   | Google Colab (T4 GPU), Kaggle API     |
| Deployment | Netlify, Hugging Face Spaces (Docker) |

---

## 🔗 Backend Repository

Hugging Face Space (FastAPI Backend):
👉 [Huging Face Repo](https://huggingface.co/spaces/ahmedwasim1070/fruit_scope-api/tree/main)

---

© 2026 Academic Project — CNN-Based Image Classification System
