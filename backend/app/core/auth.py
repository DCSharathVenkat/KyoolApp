from fastapi import Request, HTTPException, status
from firebase_admin import auth, credentials, initialize_app
import firebase_admin
import os
from fastapi import Request

# Initialize Firebase Admin SDK (should be called once)
if not firebase_admin._apps:
    key_path = os.getenv('FIREBASE_KEY_PATH', None)
    if key_path:
        try:
            cred = credentials.Certificate(key_path)
            initialize_app(cred)
        except Exception as e:
            print('Failed to initialize Firebase Admin SDK with provided key:', e)
    else:
        print('FIREBASE_KEY_PATH not set; Firebase Admin SDK not initialized.')

def verify_firebase_token(request: Request = None, token: str = None):
    # token can be provided directly (helpful for mobile POST /auth/verify-token),
    # or via Authorization header as 'Bearer <token>'
    if token is None and request is not None:
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing auth header")
        token = auth_header.split('Bearer ')[-1]
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing token")
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        print('Token verification failed:', e)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
