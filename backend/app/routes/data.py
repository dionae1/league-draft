from fastapi import APIRouter, Depends
from services.data import DataService

router = APIRouter()


@router.get("/")
def get_data(ds: DataService = Depends()):
    return ds.formatted_data


@router.post("/draft")
def analyze_draft(draft: dict):
    print(draft)
    return {"status": "Analysis complete"}
