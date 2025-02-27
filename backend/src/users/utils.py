from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
from src.config import Config
import uuid

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def generate_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# what if i dont define the type here or chang it, will it effect or will it nessary be these type
def create_access_token(user_data: dict, expires_delta: timedelta = None, refresh_token: bool = False):
    to_encoded = {
        "user" : user_data,
        "exp" : datetime.now() + (expires_delta or timedelta(minutes=60)),
        "jti": str(uuid.uuid4()),     
        "refresh_token" : refresh_token
    }
    encoded_jwt = jwt.encode(payload=to_encoded, 
                             key=Config.JWT_SECRET_KEY, 
                             algorithm=Config.JWT_ALGORITHM)
    return encoded_jwt

def decode_access_token(token):
    try:
        decoded_token = jwt.decode(token, algorithms=[Config.JWT_ALGORITHM])
        return decoded_token
    except jwt.PyJWTError as jwt_error:
        logging.exception(jwt_error)    
        return None
    except Exception as e:
        logging.exception(e)
        return None