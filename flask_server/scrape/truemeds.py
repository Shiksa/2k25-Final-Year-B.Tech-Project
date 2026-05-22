import requests
import json

import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), 'util'))
from unicode_patch import unicode_patch

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-IN,en;q=0.9",
    "Referer": "https://www.truemeds.in/",
}

default = {"name": "", "price": "", "url": "", "source": ""}


def truemeds(name):
    try:
        url = f"https://api.truemeds.in/api/v1/product/search?query={requests.utils.quote(name)}&page=1&limit=1"
        r = requests.get(url, headers=HEADERS, timeout=10)
        data = r.json()

        products = data.get("data", {}).get("products", [])
        if not products:
            products = data.get("products", [])
        if not products:
            return json.dumps(default)

        p = products[0]
        med_name  = p.get("name", "") or p.get("product_name", "")
        med_price = p.get("offer_price", 0) or p.get("mrp", 0) or p.get("price", 0)
        slug      = p.get("slug", "") or p.get("url_key", "")
        med_url   = f"https://www.truemeds.in/medicine/{slug}" if slug else "https://www.truemeds.in"

        print(f"[Truemeds] Found: {med_name} @ ₹{med_price}")

        return json.dumps({
            "name":   unicode_patch(str(med_name)).strip(),
            "price":  float(med_price) if med_price else 0.0,
            "url":    unicode_patch(med_url).strip(),
            "source": "Truemeds",
        })

    except Exception as e:
        print(f"[Truemeds] Failed: {e}")
        return json.dumps(default)