from fastapi import FastAPI
from app.routes.recommender_routes import router as recommender_router 

app = FastAPI(
    title = "AI Recommendation Service",
    version = "1.0.0"

)

app.include_router(recommender_router)

@app.get("/")
def root():
    return {"message": "Recommender API is running..."}
