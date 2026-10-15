from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from services.rag_service import answer_question

app = FastAPI(title="Nyaay Sahayak RAG API")

class AnalyzeRequest(BaseModel):
    text: str

@app.post("/analyze")
def analyze_case(payload: AnalyzeRequest):
    if not payload.text or len(payload.text.strip()) == 0:
        raise HTTPException(status_code=400, detail="Text cannot be empty.")
    
    try:
        # Call the RAG pipeline
        result = answer_question(payload.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "RAG API is running"}
