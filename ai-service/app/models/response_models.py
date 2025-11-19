from pydantic import BaseModel
from typing import List

class SyntheticItem(BaseModel):
    item_id: int
    product_name: str
    brand: str
    sport: str


class RecommendationResponse(BaseModel):
    user_id: int
    recommendations: List[SyntheticItem]


    
