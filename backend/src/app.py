from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import patient, lab_test, department
import os
from dotenv import load_dotenv

app = FastAPI()

load_dotenv()

allowed_origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
allowed_origins = [origin.strip() for origin in allowed_origins if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

app.include_router(patient.router)
app.include_router(lab_test.router)
app.include_router(department.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Hospital Data Integration System API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}