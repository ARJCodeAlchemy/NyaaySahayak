import google.generativeai as genai
from config.settings import GEMINI_API_KEY

import json

genai.configure(api_key=GEMINI_API_KEY)

# Force the model to strictly output valid JSON
model = genai.GenerativeModel(
    "gemini-2.5-flash",
    generation_config={"response_mime_type": "application/json"}
)

def generate_response(prompt):
    response = model.generate_content(prompt)
    
    try:
        # Parse the JSON string into a Python dictionary
        return json.loads(response.text)
    except json.JSONDecodeError:
        # Fallback in case of an unexpected output
        print("Warning: Gemini did not return valid JSON.")
        return {"error": "Invalid JSON format from AI", "rawText": response.text}