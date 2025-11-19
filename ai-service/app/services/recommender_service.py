from recommender.Recommender import Recommender

ARTIFACT_PATH = "recommender/model_artifacts/recommender_artifacts.pkl"
DATASET_PATH = "recommender/CC_Synthetic_Training_Data.xlsx"

recommender_instance = Recommender(
    artifact_path = ARTIFACT_PATH,
    df_path = DATASET_PATH
)

def get_recommendations_by_id(user_id: int, top_n: int=5):
    results = recommender_instance.recommend_for_user_id(
        user_id = user_id,
        top_n = top_n
    )

    recommendations = []
    for item in results:
        recommendations.append({
            "item_id": int(item["item_id"]),
            "product_name": str(item["product_name"]),
            "brand": str(item["brand"]),
            "sport": str(item["sport"])
        })

    return recommendations




