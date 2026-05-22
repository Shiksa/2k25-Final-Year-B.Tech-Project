import pandas as pd
from rapidfuzz import process, fuzz
import re

# Load dataset
df = pd.read_csv("A_Z_medicines_dataset_of_India.csv")

df["name"] = df["name"].astype(str).str.strip()

medicine_names = df["name"].tolist()


def extract_strength(text):

    match = re.search(r'\b\d+\b', text)

    if match:
        return match.group()

    return None


def match_medicine(name):

    if not name:
        return name

    query_lower = name.lower()

    query_strength = extract_strength(name)

    # top matches
    results = process.extract(
        query=name,
        choices=medicine_names,
        scorer=fuzz.token_set_ratio,
        limit=20
    )

    if not results:
        return name

    filtered = []

    for match, score, _ in results:

        match_lower = match.lower()

        # Prefer same medicine word
        first_word = query_lower.split()[0]

        if first_word not in match_lower:
            continue

        # Prefer same strength
        if query_strength:

            if query_strength not in match_lower:
                continue

        # Reject unwanted formulations
        bad_forms = [
            "injection",
            "syrup",
            "suspension",
            "drops"
        ]

        if any(bad in match_lower for bad in bad_forms):
            continue

        filtered.append((match, score))

    if filtered:

        filtered.sort(key=lambda x: x[1], reverse=True)

        best_match = filtered[0][0]

        print(f"[Matcher] {name} --> {best_match}")

        return best_match

    # fallback
    best_match = results[0][0]

    print(f"[Matcher] {name} --> {best_match}")

    return best_match