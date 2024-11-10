from fastapi import APIRouter, HTTPException
from ..services.divination_service import DivinationService

router = APIRouter()

@router.post("/divine")
async def divine(user_input: str):
    try:
        result = await DivinationService.get_divination(user_input)
        return {"svg": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 