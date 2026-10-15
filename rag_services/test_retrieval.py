from services.rag_service import retrieve_documents

query = "My neighbour occupied my land"

results = retrieve_documents(
    query,
    "property"
)

for i, (doc, score) in enumerate(results, 1):
    print(f"\nResult {i}")
    print(f"Score: {score}")
    print("-" * 50)
    print(doc.page_content[:500])