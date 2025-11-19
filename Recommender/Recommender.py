# ============================================================
# Recommender: This file is used to produce recommendations.
# ============================================================

import pickle
import pandas as pd
import numpy as np
import os

class Recommender:
    def __init__(self, artifact_path, df_path):
        """
        Load trained model artifacts and dataset for lookup.
        artifact_path: path to recommender_artifacts.pkl
        df_path: path to Excel/CSV with user/item data
        """
        # Load model artifacts
        with open(artifact_path, "rb") as f:
            artifacts = pickle.load(f)

        self.item_sim_df = artifacts["item_similarity"]
        self.user_index = artifacts["user_index"]
        self.item_index = artifacts["item_index"]
        self.item_id_to_sport = artifacts["item_id_to_sport"]
        self.user_item_matrix = artifacts["user_item_matrix"]
        self.item_popularity = artifacts["item_popularity"]

        # Load raw data with headers
        raw_df = pd.read_excel(df_path, header=None)
        raw_df.columns = ["customer_name","customer_age","location","sport","brand","product_name","quantity","order_amount"]
        df = raw_df.copy()

        # Factorize IDs like notebook
        df["user_id"], _ = pd.factorize(df["customer_name"])
        df["item_id"], _ = pd.factorize(df["product_name"])
        self.df = df

    def get_user_sport_preferences(self, user_id):
        """Return frequency of sports purchased by the user."""
        user_rows = self.df[self.df["user_id"] == user_id]
        sport_counts = user_rows.groupby("sport")["quantity"].sum().sort_values(ascending=False)
        return sport_counts

    def recommend_for_user_id(self, user_id, top_n=5):
        """
        Recommend top_n items for a given user_id.
        Returns a list of dicts:
        [{ "item_id": ..., "product_name": ..., "brand": ..., "sport": ... }, ...]
        """
        user_item = self.user_item_matrix
        sim_df = self.item_sim_df
        df = self.df
        item_index = self.item_index
        item_id_to_sport = self.item_id_to_sport
        item_popularity = self.item_popularity

        if user_id not in user_item.index:
            print(f"user_id {user_id} not found; returning empty list.")
            return []

        # User vector
        user_vector = user_item.loc[user_id]
        purchased_items = user_vector[user_vector > 0].index.tolist()

        # Cold start
        if not purchased_items:
            candidate_item_ids = [
                item_id for item_id in item_popularity.index
                if item_id not in purchased_items
            ][:top_n]
        else:
            num_items = len(item_index)
            scores = np.zeros(num_items, dtype=float)

            # Base CF scoring
            for item_id in purchased_items:
                scores += sim_df.loc[item_id].values

            # Exclude purchased items
            scores[purchased_items] = -5.0

            # Sport boost
            SPORT_BOOST_WEIGHT = 0.15
            sport_pref = self.get_user_sport_preferences(user_id)
            if len(sport_pref) > 0:
                top_sports = sport_pref.index.tolist()
                for iid in range(len(scores)):
                    item_sport = item_id_to_sport.get(iid, None)
                    if item_sport in top_sports:
                        rank = top_sports.index(item_sport)
                        boost = SPORT_BOOST_WEIGHT / (rank + 1)
                        scores[iid] += boost

            # Category penalty
            CATEGORY_PENALTY = 1.5
            purchased_info = df[df["item_id"].isin(purchased_items)][["item_id","sport","product_name"]]
            purchased_categories = set(
                (row["sport"], row["product_name"].split()[-1])
                for _, row in purchased_info.iterrows()
            )
            for iid in range(num_items):
                row = df[df["item_id"] == iid].iloc[0]
                candidate_sport = row["sport"]
                candidate_category = row["product_name"].split()[-1]
                if (candidate_sport, candidate_category) in purchased_categories:
                    scores[iid] -= CATEGORY_PENALTY

            # Rank items
            candidate_item_ids = scores.argsort()[::-1][:top_n]

        # Build readable output
        recommendations = []
        for iid in candidate_item_ids:
            row = df[df["item_id"] == iid].iloc[0]
            recommendations.append({
                "item_id": int(iid),
                "product_name": item_index[iid],
                "brand": row["brand"],
                "sport": row["sport"]
            })

        return recommendations

    def recommend_for_customer_name(self, customer_name, top_n=5):
        """Recommend items by customer name."""
        user_ids = self.df.loc[self.df["customer_name"] == customer_name, "user_id"].unique()
        if len(user_ids) == 0:
            print(f"No user found with name '{customer_name}'")
            return []
        user_id = user_ids[0]
        return self.recommend_for_user_id(user_id, top_n=top_n)