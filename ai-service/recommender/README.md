# Recommender Module

This folder contains the **Python recommender system** for the Champions-Choice project.  
It implements an **item-based collaborative filtering model** with **sport category boosting** and **category penalties**.

---

## Files

| File | Description |
|------|-------------|
| `Recommender.py` | Main Python module containing the `Recommender` class with `recommend_for_user_id` and `recommend_for_customer_name`. |
| `test_recommender.py` | Example script to test recommendations locally. |
| `AIRecommender.ipynb` | Jupyter notebook where the model and data preprocessing were developed. |
| `CC_Synthetic_Training_Data.xlsx` | Synthetic dataset used for training and testing. |
| `model_artifacts/` | Folder containing precomputed pickle artifacts (`recommender_artifacts.pkl`). |
| `requirements.txt` | Python package dependencies for this module. |

---

## Setup

1. Install dependencies:

```bash
pip install -r requirements.txt
