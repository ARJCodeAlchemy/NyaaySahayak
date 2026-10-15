from langchain_core.documents import Document


def build_documents(cases):
    documents = []

    for item in cases:
        metadata = {
            "caseTitle": item.get("caseTitle", ""),
            "year": item.get("year", ""),
            "caseNumber": item.get("caseNumber", ""),
            "decision": item.get("decision", ""),
            "relevantSections": item.get("relevantSections", []),
        }

        content = (
            f"Case Title: {item.get('caseTitle', '')}\n"
            f"Year: {item.get('year', '')}\n"
            f"Case Number: {item.get('caseNumber', '')}\n"
            f"Facts: {item.get('facts', '')}\n"
            f"Legal Reasoning: {item.get('legalReasoning', '')}\n"
            f"Decision: {item.get('decision', '')}\n"
            f"Relevant Sections: {', '.join(item.get('relevantSections', []))}"
        )

        documents.append(
            Document(
                page_content=content,
                metadata=metadata
            )
        )

    return documents