from services.embedding_service import SentenceTransformerEmbeddings
from services.faiss_service import load_index
from services.gemini_service import generate_response
from prompts.legal_prompt import LEGAL_PROMPT
from config.settings import TOP_K


embeddings = SentenceTransformerEmbeddings()

PROPERTY_KEYWORDS = [
    "land",
    "property",
    "plot",
    "house",
    "flat",
    "tenant",
    "rent",
    "boundary",
    "possession",
    "encroachment"
]


def retrieve_documents(query, index_name):
    vector_store = load_index(
        embeddings,
        index_name
    )

    return vector_store.similarity_search_with_score(
        query,
        k=TOP_K
    )


def auto_detect_retrieve(query):
    q = query.lower()

    for word in PROPERTY_KEYWORDS:
        if word in q:
            return (
                "property",
                retrieve_documents(
                    query,
                    "property"
                )
            )

    return (
        "general",
        retrieve_documents(
            query,
            "general"
        )
    )


def build_context(results):
    if not results:
        return "No relevant cases found."

    contexts = []

    for rank, (doc, score) in enumerate(
        results,
        start=1
    ):
        metadata = doc.metadata

        block = f"""
Rank: {rank}

Case Title: {metadata.get('caseTitle', '')}
Year: {metadata.get('year', '')}
Case Number: {metadata.get('caseNumber', '')}
Decision: {metadata.get('decision', '')}
Relevant Sections:
{', '.join(metadata.get('relevantSections', []))}

Judgment Excerpt:
{doc.page_content}
"""

        contexts.append(block)

    return "\n\n---\n\n".join(
        contexts
    )


def answer_question(query):
    case_type, results = auto_detect_retrieve(
        query
    )

    context = build_context(
        results
    )

    prompt = LEGAL_PROMPT.format(
        retrieved_context=context,
        user_case=query
    )

    answer = generate_response(
        prompt
    )

    return {
        "case_type": case_type,
        "answer": answer
    }