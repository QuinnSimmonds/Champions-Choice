from pydantic import BaseModel
from typing import List

class UserPurchaseHistoryRequest(BaseModel):
    """
    Request model for getting recommendations based on user's purchase history.
    
    The purchased_sports list contains the sports from products 
    the user has already bought.
    """
    purchased_sports: List[str]
    
    class Config:
        json_schema_extra = {
            "example": {
                "purchased_sports": ["Soccer", "Basketball", "Soccer"]
            }
        }
