Setup

Create and activate virtual environment:

python3 -m venv venv
source venv/bin/activate

Install dependencies:

pip install -r requirements.txt

<!-- to verify -->
pip list | grep -E "faiss|sentence|langchain|google"

Build FAISS indexes:

python3 ingest.py

Run the API server:

uvicorn app:app --reload
Current Status

🚧 Under Development


<!-- imported_file = root_dir / "server" / "data" / "importedCases.json" -->