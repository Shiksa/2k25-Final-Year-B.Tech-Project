import requests
import json
import re

import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), 'util'))
from unicode_patch import unicode_patch

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-IN,en;q=0.9",
    "Referer": "https://www.apollopharmacy.in/",
}

default = {"name": "", "price": "", "url": "", "source": "", "desc": ""}


def get_build_id():
    """Fetch Apollo's current Next.js build ID from their main page."""
    try:
        r = requests.get("https://www.apollopharmacy.in/", headers=HEADERS, timeout=10)
        # Build ID is embedded in the page as /_next/static/<BUILD_ID>/
        match = re.search(r'/_next/static/([^/]+)/_buildManifest', r.text)
        if match:
            return match.group(1)
    except Exception as e:
        print(f"[Apollo] Could not get build ID: {e}")
    return None


def apollo(name):
    # Try Apollo's internal Next.js data API first (fastest, most reliable)
    build_id = get_build_id()

    if build_id:
        try:
            api_url = f"https://www.apollopharmacy.in/_next/data/{build_id}/search-medicines/{requests.utils.quote(name)}.json"
            r = requests.get(api_url, headers=HEADERS, timeout=10)
            data = r.json()

            # Navigate the Next.js page props structure
            products = (
                data.get("pageProps", {})
                    .get("initialData", {})
                    .get("data", {})
                    .get("productResult", {})
                    .get("products", [])
            )

            if not products:
                # Try alternate path
                products = (
                    data.get("pageProps", {})
                        .get("searchData", {})
                        .get("products", [])
                )

            if products:
                p = products[0]
                med_name  = p.get("name", "") or p.get("productName", "")
                med_price = p.get("price", 0) or p.get("discountedPrice", 0) or p.get("mrp", 0)
                slug      = p.get("slug", "") or p.get("urlKey", "")
                med_url   = f"https://www.apollopharmacy.in/otc/{slug}" if slug else "https://www.apollopharmacy.in"
                desc      = p.get("description", "") or p.get("shortDescription", "")

                print(f"[Apollo API] Found: {med_name} @ ₹{med_price}")

                return json.dumps({
                    "name":   unicode_patch(str(med_name)).strip(),
                    "price":  float(med_price) if med_price else 0.0,
                    "url":    unicode_patch(med_url).strip(),
                    "desc":   unicode_patch(str(desc)).strip(),
                    "source": "Apollo",
                })
        except Exception as e:
            print(f"[Apollo] Next.js API failed: {e}, falling back to search API")

    # Fallback — Apollo's search suggestion API (used by their autocomplete)
    try:
        suggest_url = f"https://www.apollopharmacy.in/api/product/search/v2?searchQuery={requests.utils.quote(name)}&pageNo=1&pageSize=1"
        r = requests.get(suggest_url, headers=HEADERS, timeout=10)
        data = r.json()

        products = data.get("data", {}).get("products", [])
        if not products:
            products = data.get("products", [])

        if products:
            p = products[0]
            med_name  = p.get("name", "") or p.get("productName", "")
            med_price = p.get("price", 0) or p.get("discountedPrice", 0) or p.get("mrp", 0)
            slug      = p.get("slug", "") or p.get("urlKey", "")
            med_url   = f"https://www.apollopharmacy.in/otc/{slug}" if slug else "https://www.apollopharmacy.in"
            desc      = p.get("description", "") or ""

            print(f"[Apollo Search API] Found: {med_name} @ ₹{med_price}")

            return json.dumps({
                "name":   unicode_patch(str(med_name)).strip(),
                "price":  float(med_price) if med_price else 0.0,
                "url":    unicode_patch(med_url).strip(),
                "desc":   unicode_patch(str(desc)).strip(),
                "source": "Apollo",
            })

    except Exception as e:
        print(f"[Apollo] Search API also failed: {e}")

    print(f"[Apollo] All methods failed for: {name}")
    return json.dumps(default)