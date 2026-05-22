import requests
import json

import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), 'util'))
from unicode_patch import unicode_patch

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "application/json",
    "Accept-Language": "en-IN,en;q=0.9",
    "Referer": "https://www.1mg.com/",
}

default = {"name": "", "price": "", "url": "", "source": ""}


def onemg(name):
    try:
        url = f"https://www.1mg.com/pharmacy_api_gateway/v4/drug_skus/search_by_name?name={requests.utils.quote(name)}&page=1&per_page=1"
        r = requests.get(url, headers=HEADERS, timeout=10)
        data = r.json()

        skus = data.get("data", {}).get("skus", [])
        if not skus:
            return json.dumps(default)

        s = skus[0]
        med_name  = s.get("name", "")
        med_price = s.get("prices", {}).get("offer_price", 0) or s.get("prices", {}).get("mrp", 0)
        slug      = s.get("slug", "")
        med_url   = f"https://www.1mg.com/drugs/{slug}" if slug else "https://www.1mg.com"

        print(f"[1mg] Found: {med_name} @ ₹{med_price}")

        return json.dumps({
            "name":   unicode_patch(str(med_name)).strip(),
            "price":  float(med_price) if med_price else 0.0,
            "url":    unicode_patch(med_url).strip(),
            "source": "1mg",
        })

    except Exception as e:
        print(f"[1mg] Failed: {e}")
        return json.dumps(default)