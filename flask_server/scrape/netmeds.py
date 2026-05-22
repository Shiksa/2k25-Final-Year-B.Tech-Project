import requests
import json

import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), 'util'))
from unicode_patch import unicode_patch

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-IN,en;q=0.9",
    "Referer": "https://www.netmeds.com/",
    "X-Requested-With": "XMLHttpRequest",
}

default = {"name": "", "price": "", "url": "", "source": ""}


def netmeds(name):
    try:
        url = f"https://www.netmeds.com/catalogsearch/getSuggestions?q={requests.utils.quote(name)}"
        r = requests.get(url, headers=HEADERS, timeout=10)
        data = r.json()

        products = data.get("data", {}).get("product_suggest", [])
        if not products:
            products = data.get("suggestions", [])
        if not products:
            return json.dumps(default)

        p = products[0]
        med_name  = p.get("name", "") or p.get("title", "")
        med_price = p.get("special_price", 0) or p.get("price", 0)
        med_url   = p.get("url", "") or f"https://www.netmeds.com/search/{requests.utils.quote(name)}"

        if not med_url.startswith("http"):
            med_url = f"https://www.netmeds.com{med_url}"

        print(f"[Netmeds] Found: {med_name} @ ₹{med_price}")

        return json.dumps({
            "name":   unicode_patch(str(med_name)).strip(),
            "price":  float(med_price) if med_price else 0.0,
            "url":    unicode_patch(med_url).strip(),
            "source": "Netmeds",
        })

    except Exception as e:
        print(f"[Netmeds] Failed: {e}")
        return json.dumps(default)