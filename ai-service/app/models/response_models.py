from pydantic import BaseModel

class RecommendedSportResponse(BaseModel):
    """
    Response model containing the recommended sport category.
    
    Spring Boot will use this sport to query its database 
    for actual products.
    """
    recommended_sport: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "recommended_sport": "Soccer"
            }
        }

    
