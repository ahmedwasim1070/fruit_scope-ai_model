# Fruit Detector

A full-stack machine learning application that detects and classifies fruits from user-uploaded images using a Convolutional Neural Network (CNN).

## Architecture Monorepo

This repository is split into three distinct environments to maintain dependency isolation:

- **`/frontend`**: The user interface. Built with React (Vite) and styled for rapid, seamless image uploads.
- **`/backend`**: The inference API. Built with FastAPI. This lightweight server receives images, runs them through the pre-trained model, and returns predictions.
- **`/ml_pipeline`**: The research and training environment. Contains Jupyter notebooks, dataset processing scripts, and model architecture definitions. **Note:** Datasets and large model artifacts are ignored via Git.

## Deployment Strategy

- **Frontend**: Netlify
- **Backend (Inference)**: Hugging Face Spaces (Docker)
- **Model Training**: Google Colab (T4 GPU)
