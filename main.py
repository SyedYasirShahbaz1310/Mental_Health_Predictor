from typing import Literal
from fastapi import FastAPI, HTTPException
import joblib
import pandas as pd
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Mental Health Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
try:
    model = joblib.load("Mental_Health_Model.pkl")
except Exception as e:
    model = None
    print(f"Error loading model: {e}")

class PredictionRequest(BaseModel):
    Study_Hours: float = Field(..., ge=0, le=100, description="Daily study hours")
    Age: int = Field(..., ge=10, le=100, description="Age between 10 and 100")
    Avg_Daily_Usage_Hours: float = Field(..., ge=0, le=24, description="Daily usage hours")
    Daily_Unlocks: int = Field(..., ge=0, le=1000, description="Number of unlocks per day")
    Physical_Activity_Hours: float = Field(..., ge=0, le=24, description="Physical activity hours")
    Sleep_Hours_Per_Night: float = Field(..., ge=0, le=24, description="Sleep hours per night")
    Stress_Level: Literal['Low', 'Medium', 'High', 'Very High']
    Gender: Literal['Male', 'Female']
    Academic_Level: Literal['Undergraduate', 'Graduate', 'High School']
    Most_Used_Platform: Literal['Facebook', 'LinkedIn', 'Instagram', 'Snapchat', 'Twitter', 'YouTube', 'TikTok', 'LINE', 'KakaoTalk', 'VKontakte', 'WhatsApp', 'WeChat']
    Purpose_Of_Use: Literal['Networking', 'Education', 'Entertainment', 'News']
    Grouped_country: Literal['India', 'USA', 'Canada', 'Australia', 'UK', 'Germany', 'Mexico', 'Turkey', 'France', 'Other']

@app.post("/predict")
def predict_mental_health(request: PredictionRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model is not loaded.")
    
    # Convert request data to DataFrame
    # model_dump is available in Pydantic V2, otherwise dict()
    try:
        data_dict = request.model_dump()
    except AttributeError:
        data_dict = request.dict()
        
    data = pd.DataFrame([data_dict])
    
    try:
        prediction = model.predict(data)
        return {"Mental_Health_Score": float(prediction[0])}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/")
def root():
    return {"message": "Welcome to Mental Health Prediction API! Send a POST request to /predict."}

