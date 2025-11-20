# ============================================================
# Test Content-Based Recommender
# ============================================================

from ContentBasedRecommender import ContentBasedRecommender

# Initialize recommender
artifact_path = "model_artifacts/content_based_artifacts.pkl"
recommender = ContentBasedRecommender(artifact_path)

print("\n" + "="*60)
print("TEST 1: Recommend products for Soccer sport")
print("="*60)
recommendations = recommender.recommend_for_sport("Soccer", top_n=5)
for i, rec in enumerate(recommendations, 1):
    print(f"{i}. {rec['product_name']} | Brand: {rec['brand']} | Sport: {rec['sport']}")

print("\n" + "="*60)
print("TEST 2: Recommend based on user's purchase history")
print("="*60)
print("User purchased: Basketball, Football")
user_sports = ["Basketball", "Football"]
recommendations = recommender.recommend_for_sports(user_sports, top_n=5)
for i, rec in enumerate(recommendations, 1):
    print(f"{i}. {rec['product_name']} | Brand: {rec['brand']} | Sport: {rec['sport']}")

print("\n" + "="*60)
print("TEST 3: View sport associations")
print("="*60)
sport = "Soccer"
associations = recommender.get_sport_associations(sport, top_n=3)
print(f"\nSports associated with {sport}:")
for assoc_sport, score in associations.items():
    print(f"  → {assoc_sport}: {score:.1%}")

print("\n" + "="*60)
print("TEST 4: Cold start (no purchase history)")
print("="*60)
recommendations = recommender.recommend_for_sports([], top_n=5)
print("Popular products for new users:")
for i, rec in enumerate(recommendations, 1):
    print(f"{i}. {rec['product_name']} | Brand: {rec['brand']} | Sport: {rec['sport']}")

print("\n✅ All tests completed!")
