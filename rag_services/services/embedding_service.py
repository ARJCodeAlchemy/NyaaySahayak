from sentence_transformers import SentenceTransformer
from langchain_core.embeddings import Embeddings
from config.settings import EMBEDDING_MODEL


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