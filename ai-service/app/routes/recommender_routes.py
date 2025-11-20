from fastapi import APIRouter
from app.models.request_models import UserPurchaseHistoryRequest
from app.models.response_models import RecommendedSportResponse
from app.services.recommender_service import get_recommended_sport_for_user

router = APIRouter(
    prefix="/recommend",
    tags=["Recommender"]
)


@router.post("/for-user", response_model=RecommendedSportResponse)
def recommend_for_user(request: UserPurchaseHistoryRequest):
    
    recommended_sport = get_recommended_sport_for_user(
        purchased_sports=request.purchased_sports
    )
    
    return RecommendedSportResponse(
        recommended_sport=recommended_sport
    )
