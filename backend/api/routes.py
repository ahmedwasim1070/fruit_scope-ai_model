from fastapi import APIRouter, UploadFile, File, HTTPException
from services.interface import process_and_predict

# Global
router = APIRouter()

@router.post("/predict")
async def predict_fruit(file: UploadFile = File(...)):
    # Validates Input
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")

    try:
        # Read file into memory
        contents = await file.read()
        
        # Pass our image to the serviecs layer - services/interface.py
        fruit_name, confidence = process_and_predict(contents)
        
        # return success payload if successfull
        return {
            "success": True,
            "prediction": fruit_name,
            "confidence": round(confidence * 100, 2),
            "filename": file.filename
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference failed: {str(e)}")