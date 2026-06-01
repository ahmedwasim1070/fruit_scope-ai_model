---
title: Fruit Identifier API
emoji: 🍎
colorFrom: green
colorTo: blue
sdk: docker
app_port: 7860
pinned: false
license: mit
---

# Fruit Identifier Backend API

A high-performance FastAPI backend container built to serve image classification inferences using a customized Convolutional Neural Network (CNN) built in TensorFlow/Keras. This service handles production-grade requests and maps output tensors into human-readable top-3 fruit classification targets.

## 🚀 Features

- **FastAPI Architecture:** Fully asynchronous routing with automatic OpenAPI/Swagger documentation.
- **Top-3 Inference Strategy:** Extracts top output indices using optimized `numpy` vector sorting to deliver multi-class confidence arrays.
- **Keras 3 Target Alignment:** Formatted specifically with `tensorflow-cpu==2.16.1` to cleanly process modern serialization files (`.h5`) without Keras translation exceptions.
- **Dockerized Execution:** Self-contained Linux execution container optimized for cloud computing layer deployment.

---

## 🛠️ Local Contained Replication

If you need to test this container layout locally on your machine, ensure your local Docker daemon is active and run the following execution loop:

```bash
# 1. Compile the image layer matrix
sudo docker build -t fruit-api .

# 2. Spawn the isolated container runtime env
sudo docker run -p 7860:7860 --env-file .env fruit-api
```
