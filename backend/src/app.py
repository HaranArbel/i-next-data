from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import patient
from .config import settings
from .routers.patient import router as patients_router

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,  # Using config value
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

app.include_router(patient.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Hospital Data Integration System API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}