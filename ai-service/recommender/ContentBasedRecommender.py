# ============================================================
# Content-Based Recommender (Sport-Only)
# This recommender works with ANY products that have sport categories
# ============================================================

import pickle
import numpy as np
from typing import List, Dict, Optional

class ContentBasedRecommender:
    def __init__(self, artifact_path):
        """
        Load content-based model artifacts.
        
        Args:
            artifact_path: path to content_based_artifacts.pkl
        """
        with open(artifact_path, "rb") as f:
            artifacts = pickle.load(f)
        
        self.sport_associations = artifacts["sport_associations"]
        self.sport_popularity = artifacts["sport_popularity"]
        self.products_by_sport = artifacts["products_by_sport"]
        self.product_metadata = artifacts["product_metadata"]
        self.all_sports = artifacts["all_sports"]
        
        print(f"✅ Loaded content-based model with {len(self.all_sports)} sports")
    
    def recommend_for_sport(self, sport: str, top_n: int = 10) -> List[Dict]:
        """
        Recommend products based on a single sport.
        
        Args:
            sport: The sport category
            top_n: Number of recommendations to return
            
        Returns:
            List of recommended products with sport, brand, product_name
        """
        if sport not in self.sport_associations:
            print(f"Warning: Sport '{sport}' not in training data. Using popular products.")
            return self._get_popular_products(top_n)
        
        # Strategy: 70% same sport, 30% associated sports
        same_sport_count = top_n
        assoc_sport_count = 0

        recommendations = []
        
        # Get products from same sport
        same_sport_products = self._get_products_from_sport(sport, same_sport_count)
        recommendations.extend(same_sport_products)
        
        # Get products from associated sports
        if assoc_sport_count > 0 and sport in self.sport_associations:
            # Get top associated sports
            associated_sports = sorted(
                self.sport_associations[sport].items(),
                key=lambda x: x[1],
                reverse=True
            )[:3]  # Top 3 associated sports
            
            # Distribute recommendations across associated sports
            for assoc_sport, score in associated_sports:
                count = max(1, int(assoc_sport_count * score))
                products = self._get_products_from_sport(assoc_sport, count)
                recommendations.extend(products)
                
                if len(recommendations) >= top_n:
                    break
        
        return recommendations[:top_n]
    
    def recommend_for_sports(self, sports: List[str], top_n: int = 10) -> List[Dict]:
        """
        Recommend products based on multiple sports (e.g., from user's purchase history).
        
        Args:
            sports: List of sport categories the user has purchased
            top_n: Number of recommendations to return
            
        Returns:
            List of recommended products
        """
        if not sports:
            return self._get_popular_products(top_n)
        
        # Aggregate recommendations from all sports
        sport_scores = {}
        
        for user_sport in sports:
            if user_sport not in self.sport_associations:
                continue
            
            # Add the user's sport itself (high weight)
            sport_scores[user_sport] = sport_scores.get(user_sport, 0) + 1.0
            
            # Add associated sports (weighted by association score)
            for assoc_sport, score in self.sport_associations[user_sport].items():
                sport_scores[assoc_sport] = sport_scores.get(assoc_sport, 0) + score
        
        # Remove sports already purchased (user already has products from these)
        for sport in sports:
            if sport in sport_scores:
                del sport_scores[sport]
        
        # Sort sports by aggregated score
        ranked_sports = sorted(sport_scores.items(), key=lambda x: x[1], reverse=True)
        
        # Get products from top-ranked sports
        recommendations = []
        products_per_sport = max(2, top_n // len(ranked_sports)) if ranked_sports else top_n
        
        for sport, score in ranked_sports:
            products = self._get_products_from_sport(sport, products_per_sport)
            recommendations.extend(products)
            
            if len(recommendations) >= top_n:
                break
        
        # If still not enough, add popular products
        if len(recommendations) < top_n:
            popular = self._get_popular_products(top_n - len(recommendations))
            recommendations.extend(popular)
        
        return recommendations[:top_n]
    
    def _get_products_from_sport(self, sport: str, count: int) -> List[Dict]:
        """
        Get random products from a specific sport.
        
        Args:
            sport: Sport category
            count: Number of products to get
            
        Returns:
            List of product dictionaries
        """
        if sport not in self.products_by_sport:
            return []
        
        available_products = self.products_by_sport[sport]
        
        # Randomly sample products (or take all if fewer than count)
        sample_size = min(count, len(available_products))
        sampled_products = np.random.choice(available_products, size=sample_size, replace=False)
        
        results = []
        for product_name in sampled_products:
            if product_name in self.product_metadata:
                metadata = self.product_metadata[product_name]
                results.append({
                    "product_name": product_name,
                    "sport": metadata["sport"],
                    "brand": metadata["brand"]
                })
        
        return results
    
    def _get_popular_products(self, count: int) -> List[Dict]:
        """
        Get products from the most popular sports (cold start fallback).
        
        Args:
            count: Number of products to return
            
        Returns:
            List of product dictionaries
        """
        # Get top popular sports
        top_sports = sorted(
            self.sport_popularity.items(),
            key=lambda x: x[1],
            reverse=True
        )[:5]  # Top 5 sports
        
        recommendations = []
        products_per_sport = max(1, count // len(top_sports))
        
        for sport, _ in top_sports:
            products = self._get_products_from_sport(sport, products_per_sport)
            recommendations.extend(products)
            
            if len(recommendations) >= count:
                break
        
        return recommendations[:count]
    
    def get_sport_associations(self, sport: str, top_n: int = 5) -> Dict[str, float]:
        """
        Get the top associated sports for a given sport.
        
        Args:
            sport: Sport category
            top_n: Number of associations to return
            
        Returns:
            Dictionary of {sport: association_score}
        """
        if sport not in self.sport_associations:
            return {}
        
        associated = sorted(
            self.sport_associations[sport].items(),
            key=lambda x: x[1],
            reverse=True
        )[:top_n]
        
        return dict(associated)
    
    def get_recommended_sport_for_user(self, purchased_sports: List[str]) -> str:
        """
        NEW METHOD FOR YOUR USE CASE:
        Given user's purchase history (sports they bought), return the sport to recommend.
        
        Logic: Since you want same-sport recommendations, just return the most frequently 
        purchased sport, or the most recent one.
        
        Args:
            purchased_sports: List of sports from user's order history
            
        Returns:
            Single sport category to show recommendations for
        """
        if not purchased_sports:
            # Cold start: return most popular sport overall
            if self.sport_popularity:
                return max(self.sport_popularity.items(), key=lambda x: x[1])[0]
            return self.all_sports[0] if self.all_sports else "Soccer"
        
        # Return the most common sport from their purchase history
        # Count frequency of each sport
        sport_counts = {}
        for sport in purchased_sports:
            sport_counts[sport] = sport_counts.get(sport, 0) + 1
        
        # Return the most frequently purchased sport
        recommended_sport = max(sport_counts.items(), key=lambda x: x[1])[0]
        
        return recommended_sport


# ============================================================
# Wrapper functions for backward compatibility
# ============================================================

def recommend_for_product_sport(recommender, product_sport: str, top_n: int = 10):
    """
    Given a product's sport, recommend similar products.
    This is the main function you'll call from FastAPI.
    """
    return recommender.recommend_for_sport(product_sport, top_n)


def recommend_for_user_sports(recommender, user_sports: List[str], top_n: int = 10):
    """
    Given a user's purchase history (list of sports), recommend products.
    """
    return recommender.recommend_for_sports(user_sports, top_n)
