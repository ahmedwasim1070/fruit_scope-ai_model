# 1. Use a lightweight Python base image
FROM python:3.11-slim

# 2. Set the working directory inside the container
WORKDIR /code

# 3. Copy just the requirements first (Docker caches this layer to save build time)
COPY ./requirements.txt /code/requirements.txt

# 4. Install the Python dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 5. Copy the rest of your backend code (including model_artifacts) into the container
COPY ./ /code/

# 6. Hugging Face Spaces specifically requires apps to run on port 7860
EXPOSE 7860

# 7. Start the FastAPI server using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]