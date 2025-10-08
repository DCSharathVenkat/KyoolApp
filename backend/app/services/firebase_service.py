import firebase_admin
from firebase_admin import credentials, firestore
import os
import json
import re

#key_path = 'keys/lifestyle-health-kyool-firebase-adminsdk-fbsvc-08bd67c569.json'  # Default path if env var not set
# Use environment variable for service account key path, default to Cloud Run secret mount path
secret_keys = os.environ.get("FIREBASE_KEY_PATH")
print(f"Using FIREBASE_KEY_PATH env value: {bool(secret_keys)}")

# FIREBASE_KEY_PATH can be either:
# - a filesystem path to the service account json file, or
# - a JSON string (for secret mounts) containing the service account object.
cred = None
if secret_keys:
    try:
        # If it looks like JSON, parse it
        if secret_keys.strip().startswith('{'):
            key_obj = json.loads(secret_keys)
            cred = credentials.Certificate(key_obj)
            print('Initialized Firebase Admin from JSON string')
        else:
            # Treat as a file path
            cred = credentials.Certificate(secret_keys)
            print(f'Initialized Firebase Admin from file path: {secret_keys}')
    except Exception as e:
        print('Failed to parse FIREBASE_KEY_PATH:', e)

if cred and not firebase_admin._apps:
    firebase_admin.initialize_app(cred)
elif not cred:
    print('Firebase Admin SDK not initialized: no valid credentials provided')
db = firestore.client()

class FirestoreUserService:
    #Adding Weight log functionality
    def add_weight_log(self, user_id: str, weight: float, date: str, bmi: float = None, bmr: float = None, tdee: float = None):
        doc_ref = db.collection('users').document(user_id)
        doc = doc_ref.get()
        if doc.exists:
            logs = doc.to_dict().get('weight_logs', [])
            logs.append({'weight': weight, 'date': date, 'bmi': bmi, 'bmr': bmr, 'tdee': tdee})
            doc_ref.update({'weight_logs': logs})
            return True
        return False
    
    #Retrieving Weight log functionality
    def get_weight_logs(self, user_id: str):
        doc = db.collection('users').document(user_id).get()
        if doc.exists:
            return doc.to_dict().get('weight_logs', [])
        return []
    
    #Getting user by ID
    def get_user(self, user_id: str):
        doc = db.collection('users').document(user_id).get()
        return doc.to_dict() if doc.exists else None
    
    #Creating user with initial weight log
    def create_user(self, user_id: str, user_data: dict):
        from datetime import datetime

        username = user_data.get('username')
        if self.is_username_taken(username):
            raise ValueError("Username already taken")

        if not self.is_valid_username(username):
            raise ValueError("Invalid username format")
        # Store initial weight log using values from frontend
        weight = user_data.get('weight')
        bmi = user_data.get('bmi')
        bmr = user_data.get('bmr')
        tdee = user_data.get('tdee')
        initial_log = {
            'weight': weight,
            'date': datetime.utcnow().isoformat(),
            'bmi': bmi,
            'bmr': bmr,
            'tdee': tdee
        } if weight else None
        user_data['weight_logs'] = [initial_log] if initial_log else []
        db.collection('users').document(user_id).set(user_data)
        return user_id

    def update_user(self, user_id: str, user_data: dict):
        username = user_data.get('username')
        if username:
            # Check if username is taken by another user
            users = db.collection('users').where('username', '==', username).stream()
            for user in users:
                if user.id != user_id:
                    raise ValueError("Username already taken")
        db.collection('users').document(user_id).update(user_data)
        return True

    def delete_user(self, user_id: str):
        db.collection('users').document(user_id).delete()
        return True
    
    def get_user_by_email(self, email: str):
        users = db.collection('users').where('email', '==', email).stream()
        for user in users:
            return user.to_dict()
        return None
    

    def is_valid_username(self, username:str):
        return re.match(r'^[a-zA-Z0-9_.]{6,20}$', username) is not None


    def is_username_taken(self, username: str) -> bool:
        if not username:
            return False
        users = db.collection('users').where('username', '==', username).stream()
        return any(users)