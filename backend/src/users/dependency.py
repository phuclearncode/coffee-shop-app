from fastapi.security import HTTPBearer
from fastapi import Depends
from src.users.utils import decode_access_token
from fastapi.exceptions import HTTPException
from starlette.status import HTTP_403_FORBIDDEN
from src.db.redis import check_jti_in_blacklist

class BearerHTTPBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super().__init__(auto_error=auto_error)

    def __call__(self, request):
        cred = super().__call__(request)
        token = cred.credentials
        check_valid_token = self.check_valid_token(token)
        if not check_valid_token:
            raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail="Not authenticated")
        decoded_credential = decode_access_token(token)
        
        if check_jti_in_blacklist(decoded_credential["jti"]):
            raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail="Token has been revoked")

        return decoded_credential
    
    def check_required_token(self, credentials):
        pass

    def check_valid_token(self, token):
        decoded_token = decode_access_token(token)
        if decoded_token is not None:
            return True
        return False 


class RefreshToken(BearerHTTPBearer):
    def check_required_token(self, credentials):
        if credentials and credentials["refresh_token"]:
            return True
        return False

class AccessToken(BearerHTTPBearer):
    def check_required_token(self, credentials):
        if credentials and not credentials["refresh_token"]:
            return True
        return False
    