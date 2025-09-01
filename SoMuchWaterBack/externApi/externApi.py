from typing import Annotated
# import lib
import httpx
from fastapi import APIRouter , Depends
# import intern
from ..dependencies import get_settings
from ..auth import Admin, get_current_admin

router = APIRouter()

@router.get("/api/openverse/token", tags=["externApi"])
async def get_openverse_token(
    current_admin: Annotated[Admin, Depends(get_current_admin)],
):
    if current_admin:
        setting = get_settings()
        client_id = setting.client_id
        client_secret = setting.client_secret
        data = {
            "grant_type": "client_credentials",
            "client_id": client_id,
            "client_secret": client_secret,
        }
        resp = httpx.post(
            "https://api.openverse.org/v1/auth_tokens/token/", data=data
        ).json()
        print(resp)
        return resp
    else:
        return {"error": "acces denied"}