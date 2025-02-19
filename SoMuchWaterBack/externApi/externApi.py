import httpx
from fastapi import APIRouter
# import intern
from ..dependencies import get_settings

router = APIRouter()

@router.get("/api/openverse/token", tags=["externApi"])
async def get_openverse_token():
    setting = get_settings()
    client_id = setting.client_id
    client_secret = setting.client_secret
    data = {
        "grant_type": "client_credentials",
        "client_id": client_id,
        "client_secret": client_secret,
    }
    resp = httpx.post("https://api.openverse.org/v1/auth_tokens/token/", data=data).json()
    print(resp)
    return resp
    

