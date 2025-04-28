from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import patient, lab_test

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], #TODO: check 
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