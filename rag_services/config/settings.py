from pathlib import Path

from dotenv import load_dotenv
import os

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_DIR = BASE_DIR.parent / "server" / "data"
FAISS_DIR = BASE_DIR / "faiss_index"

CHUNK_SIZE = 700
CHUNK_OVERLAP = 100

EMBEDDING_MODEL = "all-MiniLM-L6-v2"
TOP_K = 5