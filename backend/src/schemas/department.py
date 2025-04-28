from pydantic import BaseModel

class Department(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True 