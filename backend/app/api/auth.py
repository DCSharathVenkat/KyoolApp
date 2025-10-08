from fastapi import APIRouter, HTTPException, Request, status
from fastapi.responses import JSONResponse
from app.core.auth import verify_firebase_token

router = APIRouter(prefix="/auth", tags=["auth"])

# Simple health check for auth
@router.get("/me")
def me(request: Request):
    # This endpoint just verifies the Bearer token with Firebase Admin SDK
    decoded = verify_firebase_token(request)
    return JSONResponse(content={"uid": decoded.get("uid"), "email": decoded.get("email")})

# Optional: a simple endpoint to verify a token passed in body (useful for mobile testing)
@router.post("/verify-token")
def verify_token(body: dict):
    token = body.get("token")
    if not token:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="token required")
    try:
        from firebase_admin import auth as fb_auth
        decoded = fb_auth.verify_id_token(token)
        return {"uid": decoded.get("uid"), "email": decoded.get("email")}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
