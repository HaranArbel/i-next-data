from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import patient, lab_test
from .config import settings
from .routers.patient import router as patients_router
from .routers.lab_test import router as lab_tests_router

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
app.include_router(lab_test.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Hospital Data Integration System API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}