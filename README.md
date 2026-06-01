# 🍎 Fruit Identifier

A full-stack machine learning application that classifies **131 different fruit types** from user-uploaded images using a Convolutional Neural Network (CNN) trained on the [Fruits 360](https://www.kaggle.com/datasets/moltean/fruits) dataset.

Upload a fruit photo → get the top 3 predictions with confidence scores, instantly.

---

## 🔗 Live Deployment

| Service                | URL                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| **Frontend**           | [fruit-identifier.netlify.app](https://fruit-identifier.netlify.app) ← _replace with yours_          |
| **Backend API**        | [ahmedwasim1070-fruit-identifier-api.hf.space](https://ahmedwasim1070-fruit-identifier-api.hf.space) |
| **API Docs (Swagger)** | [/docs](https://ahmedwasim1070-fruit-identifier-api.hf.space/docs)                                   |

---

## 🏗️ Architecture

This is a monorepo with three strictly isolated environments — separating web concerns from heavy ML computation.

```
fruit-identifier/
├── frontend/          # React + Vite (TypeScript)
├── backend/           # FastAPI inference server
│   └── model_artifacts/
│       ├── final_fruit_model.h5
│       └── class_names.json
└── ml_pipeline/       # Training notebooks & scripts
    └── scripts/
        └── test_inference.py
```

### Frontend `/frontend`

- **Stack:** React, Vite, TypeScript, Tailwind CSS
- **Package Manager:** `pnpm`
- **Hosting:** Netlify
- Drag-and-drop image upload, sends `multipart/form-data` to the backend, and displays the top 3 predictions with confidence bars.

### Backend `/backend`

- **Stack:** FastAPI, Uvicorn, TensorFlow (CPU-only), Pillow
- **Hosting:** Hugging Face Spaces (Docker)
- Stateless inference API. Receives an image, preprocesses it with Pillow, runs it through the CNN, and returns the top 3 predictions as JSON.
- Model artifacts live permanently in `backend/model_artifacts/` — the server points directly here.

### ML Pipeline `/ml_pipeline`

- **Stack:** TensorFlow (GPU), Jupyter, Pandas, Kaggle API
- **Compute:** Google Colab (T4 GPU)
- Notebooks for downloading the Fruits 360 dataset via the Kaggle API, preprocessing, training the CNN, and exporting the `.h5` model file.

---

## 📡 API Reference

**`POST /predict`**

Accepts a fruit image and returns the top 3 predictions.

**Request**

```
Content-Type: multipart/form-data
Field: file  (image/png, image/jpeg, image/webp)
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

**`GET /health`**

```json
{ "status": "ok" }
```

Interactive docs available at [`/docs`](https://ahmedwasim1070-fruit-identifier-api.hf.space/docs) (Swagger UI).

---

## ⚠️ Model

| Property     | Detail                             |
| ------------ | ---------------------------------- |
| Architecture | Convolutional Neural Network (CNN) |
| Dataset      | Fruits 360 (Kaggle)                |
| Classes      | 131 fruit types                    |
| File         | `final_fruit_model.h5`             |
| Size         | ~77 MB                             |
| Location     | `backend/model_artifacts/`         |

> The model is pre-trained and committed to this repo for reproducible inference — no retraining required to run locally.

---

## 🚀 Running Locally

### Prerequisites

- Python 3.10+
- Node.js 18+ & `pnpm`

### 1. Backend

```bash
cd backend

# Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 8000
```

API will be live at `http://localhost:8000`.

### 2. Frontend

```bash
cd frontend

# Install dependencies
pnpm install

# Create environment file
echo "VITE_API_URL=http://localhost:8000" > .env

# Start dev server
pnpm dev
```

Frontend will be live at `http://localhost:5173`.

---

## 🧪 Standalone Inference Test

Test the model directly from the CLI before running the full web stack.

```bash
# From the project root — activate the ML venv
python -m venv .venv
source ml_pipeline/.venv/bin/activate

# Run the GUI file picker script
python ml_pipeline/scripts/test_inference.py
```

A native file explorer will open. Select any fruit image and the top prediction will print to your terminal.

> **Requires** `final_fruit_model.h5` and `class_names.json` in `backend/model_artifacts/`, and a system GUI toolkit for the file picker dialog.

---

## 🔑 Environment Variables

### Frontend (`frontend/.env`)

| Variable       | Default                 | Description      |
| -------------- | ----------------------- | ---------------- |
| `VITE_API_URL` | `http://localhost:8000` | Backend base URL |

---

## 🛠️ Tech Stack

| Layer      | Technology                                               |
| ---------- | -------------------------------------------------------- |
| Frontend   | React, Vite, TypeScript, Tailwind CSS                    |
| Backend    | FastAPI, Uvicorn, Python                                 |
| ML         | TensorFlow, Keras, Pillow, NumPy                         |
| Training   | Google Colab (T4 GPU), Kaggle API                        |
| Deployment | Netlify (frontend), Hugging Face Spaces Docker (backend) |

---

## 👤 Author

**Ahmed Wasim** — [@ahmedwasim1070](https://github.com/ahmedwasim1070)

Bachelor's in Artificial Intelligence @ Riphah International University, Faisalabad
