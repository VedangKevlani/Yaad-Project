from fastapi import FastAPI, File, UploadFile
from PIL import Image
import torch
from transformers import ViTImageProcessor, AutoModelForImageClassification
import io

# Load the deepfake detection model from Hugging Face
MODEL_NAME = "Wvolf/ViT_Deepfake_Detection"
processor = ViTImageProcessor.from_pretrained(MODEL_NAME)
model = AutoModelForImageClassification.from_pretrained(MODEL_NAME)
model.eval()  # Set model to evaluation mode

app = FastAPI()

@app.post("/detect/")
async def detect_image(file: UploadFile = File(...)):
    # Read image and convert to PIL format
    image = Image.open(io.BytesIO(await file.read())).convert("RGB")
    
    # Preprocess image for the model
    inputs = processor(images=image, return_tensors="pt")

    # Perform inference
    with torch.no_grad():
        outputs = model(**inputs)
    
    # Get the prediction
    prediction = torch.argmax(outputs.logits, dim=1).item()
    
    # Assuming class 1 is AI-generated
    is_ai_generated = prediction == 1  

    return {"is_ai": is_ai_generated}
