from fastapi import APIRouter, HTTPException

router = APIRouter(prefix='/predict', tags=['predict'])

@router.post('/')
def predict(payload: dict):
    raise HTTPException(status_code=501, detail='Prediction endpoint not implemented')
