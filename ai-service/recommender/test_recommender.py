# ============================================================
# test_recommender: This file is only a testing file.
# ============================================================

from Recommender import Recommender

# Paths to pickle and data
artifact_path = "model_artifacts/recommender_artifacts.pkl"
data_path = "CC_Synthetic_Training_Data.xlsx"

# Instantiate recommender
rec = Recommender(artifact_path, data_path)

# Example 1: Recommend by customer name
customer_name = "Aaron Bechtelar"
recommendations = rec.recommend_for_customer_name(customer_name, top_n=5)

print(f"Top recommendations for {customer_name}:")
for i, r in enumerate(recommendations, start=1):
    print(f"{i}. {r['product_name']} | Brand: {r['brand']} | Sport: {r['sport']}")

# Example 2: Recommend by user_id
user_id = 0
recommendations2 = rec.recommend_for_user_id(user_id, top_n=5)

print(f"\nTop recommendations for user_id {user_id}:")
for i, r in enumerate(recommendations2, start=1):
    print(f"{i}. {r['product_name']} | Brand: {r['brand']} | Sport: {r['sport']}")