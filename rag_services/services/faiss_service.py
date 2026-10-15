from langchain_community.vectorstores import FAISS
from config.settings import FAISS_DIR

_VECTOR_STORE_CACHE = {}


def save_index(chunks, embeddings, index_name):
    vector_store = FAISS.from_documents(
        documents=chunks,
        embedding=embeddings
    )

    index_path = FAISS_DIR / index_name
    index_path.mkdir(parents=True, exist_ok=True)

    vector_store.save_local(str(index_path))

    _VECTOR_STORE_CACHE[index_name] = vector_store

    return vector_store


def load_index(embeddings, index_name):
    if index_name in _VECTOR_STORE_CACHE:
        return _VECTOR_STORE_CACHE[index_name]

    index_path = FAISS_DIR / index_name

    vector_store = FAISS.load_local(
        str(index_path),
        embeddings,
        allow_dangerous_deserialization=True
    )

    _VECTOR_STORE_CACHE[index_name] = vector_store

    return vector_store