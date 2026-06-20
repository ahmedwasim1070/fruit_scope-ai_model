from fastapi import FastAPI
from core.config import settings
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router as api_router

# Initialize the application
app = FastAPI(
    title=settings.APP_NAME,
    description="Fruit Scope Backed - API Endpoint",
    version="1.0.0"
)

# Validation for server env
if getattr(settings, "ENVIRONMENT", "development") == "production":
    origins = [settings.ORIGIN]
else:
    origins = ["*"]

# Configure CORS so the React Frontend can communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register our routes under the /api prefix
app.include_router(api_router, prefix="/api")

# On server run
@app.get("/")
def health_check():
    return {
        "status": "healthy", 
        "message": "Fruit Detector API is running!"
    }