from sentence_transformers import SentenceTransformer
from langchain_core.embeddings import Embeddings
from config.settings import EMBEDDING_MODEL

import json
from config.settings import DATA_DIR

class SentenceTransformerEmbeddings(Embeddings):
    def __init__(self):
        self.model = SentenceTransformer(EMBEDDING_MODEL)

    def embed_documents(self, texts):
        embeddings = self.model.encode(
            texts,
            convert_to_numpy=True,
            normalize_embeddings=True
        )
        return embeddings.tolist()

    def embed_query(self, text):
        embedding = self.model.encode(
            text,
            convert_to_numpy=True,
            normalize_embeddings=True
        )
        return embedding.tolist()
    
def load_imported_cases():
    file_path = DATA_DIR / "importedCases.json"

    if not file_path.exists():
        return []

    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)


def load_property_cases():
    file_path = DATA_DIR / "propertyCases.json"

    if not file_path.exists():
        return []

    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)