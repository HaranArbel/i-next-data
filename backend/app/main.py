from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import monitoring, patient

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with actual frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(monitoring.router)
app.include_router(patient.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Hospital Data Integration System API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}