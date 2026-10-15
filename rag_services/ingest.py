from loaders.case_loader import (
    load_imported_cases,
    load_property_cases,
)

from services.document_service import build_documents
from services.chunking_service import chunk_documents
from services.embedding_service import SentenceTransformerEmbeddings
from services.faiss_service import save_index


def build_indexes():
    embeddings = SentenceTransformerEmbeddings()

    # ---------------- General Cases ----------------
    imported_cases = load_imported_cases()
    print(f"Loaded {len(imported_cases)} general cases")

    general_docs = build_documents(imported_cases)
    print(f"Created {len(general_docs)} general documents")

    general_chunks = chunk_documents(general_docs)
    print(f"Created {len(general_chunks)} general chunks")

    save_index(
        general_chunks,
        embeddings,
        "general"
    )

    print("General index created successfully!\n")

    # ---------------- Property Cases ----------------
    property_cases = load_property_cases()
    print(f"Loaded {len(property_cases)} property cases")

    property_docs = build_documents(property_cases)
    print(f"Created {len(property_docs)} property documents")

    property_chunks = chunk_documents(property_docs)
    print(f"Created {len(property_chunks)} property chunks")

    save_index(
        property_chunks,
        embeddings,
        "property"
    )

    print("Property index created successfully!")


if __name__ == "__main__":
    build_indexes()