from recommender.ContentBasedRecommender import ContentBasedRecommender
from typing import List

# Initialize the content-based recommender at startup
ARTIFACT_PATH = "recommender/model_artifacts/content_based_artifacts.pkl"

recommender_instance = ContentBasedRecommender(
    artifact_path=ARTIFACT_PATH
)

print("✅ Content-based recommender loaded successfully!")


def get_recommended_sport_for_user(purchased_sports: List[str]) -> str:
   
    return recommender_instance.get_recommended_sport_for_user(purchased_sports)


