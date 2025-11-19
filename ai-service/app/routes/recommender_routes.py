from fastapi import APIRouter
from app.models.request_models import RecommendationRequest
from app.models.response_models import RecommendationResponse, SyntheticItem
from app.services.recommender_service import get_recommendations_by_id

router = APIRouter(
    prefix = "/recommend",
    tags = ["Recommender"]

)

@router.post("/by-id", response_model=RecommendationResponse)
def recommend_by_id(request: RecommendationRequest):

    recommendations = get_recommendations_by_id(
        user_id = request.user_id,
        top_n = request.top_n

    )

    items = [SyntheticItem(**rec) for rec in recommendations]
    
    return RecommendationResponse(
        user_id = request.user_id,
        recommendations = items
    )

