from services.rag_service import auto_detect_retrieve

query = "My landlord is not returning my security deposit."

index_name, results = auto_detect_retrieve(query)

print("Selected Index:", index_name)
print("Number of results:", len(results))

for i, (doc, score) in enumerate(results, start=1):
    print(f"\nResult {i}")
    print("Score:", score)
    print("Content:", doc.page_content[:300])