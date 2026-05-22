import os
import json
import requests
from medicine_matcher import match_medicine

GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

SYSTEM_PROMPT = """
You are an expert Indian prescription parser.

Extract medicine names from OCR text of handwritten prescriptions.

Rules:
- Keep strengths if part of medicine name
- Examples:
  - Dolo 650
  - Augmentin 625
  - Pan D 40

- Ignore:
  - dosage schedules
  - frequencies
  - durations
  - doctor names
  - patient names
  - dates
  - hospital names

- Return ONLY medicine names
- Return ONLY JSON array
- No markdown
- No explanation

Example:
["Augmentin 625", "Enzflam", "Pan D 40"]
"""


def medex(text):

    if not text or not text.strip():
        return []

    if not GROQ_API_KEY:
        print("[medex] ERROR: GROQ_API_KEY not set")
        return []

    try:

        response = requests.post(
            GROQ_URL,
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "llama-3.3-70b-versatile",
                "temperature": 0,
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": text.strip()},
                ],
            },
            timeout=20,
        )

        data = response.json()

        print("[Groq Response]", data)

        raw = data["choices"][0]["message"]["content"].strip()

        # Remove markdown formatting if present
        raw = raw.replace("```json", "").replace("```", "").strip()

        drugs = json.loads(raw)

        final_drugs = []

        for drug in drugs:

            if isinstance(drug, str) and drug.strip():

                corrected = match_medicine(drug)

                final_drugs.append(
                    (corrected, "DRUG")
                )

        return final_drugs

    except Exception as e:
        print(f"[medex] Groq call failed: {e}")
        return []