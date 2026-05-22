import os
import json
from google.oauth2 import service_account
from google.cloud import vision


# ==============================
# GOOGLE VISION CLIENT
# ==============================

creds_json = os.environ.get("GOOGLE_CREDENTIALS_JSON")

if creds_json:
    # Render / Production
    creds_dict = json.loads(creds_json)

    credentials = service_account.Credentials.from_service_account_info(
        creds_dict,
        scopes=["https://www.googleapis.com/auth/cloud-platform"]
    )

    client = vision.ImageAnnotatorClient(credentials=credentials)

else:
    # Local Development
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.path.join(
        os.path.dirname(__file__),
        'token.json'
    )

    client = vision.ImageAnnotatorClient()


# ==============================
# OCR FUNCTION
# ==============================

def ocr(path_to_file):

    with open(path_to_file, "rb") as f:
        content = f.read()

    image = vision.Image(content=content)

    response = client.text_detection(image=image)

    texts = response.text_annotations

    if texts:
        return texts[0].description

    return ""