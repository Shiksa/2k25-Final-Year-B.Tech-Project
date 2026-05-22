import requests
from bs4 import BeautifulSoup
import json

import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'scrape', 'util'))
from unicode_patch import unicode_patch

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept-Language": "en-IN,en;q=0.9",
}


def build_array(name):
    """Return JSON array of alternative medicines from SastaSundar."""
    try:
        url = f"https://www.sastasundar.com/search?q={requests.utils.quote(name)}"
        r = requests.get(url, headers=HEADERS, timeout=10)
        soup = BeautifulSoup(r.text, "lxml")

        results = []
        cards = soup.select("[class*='product-card'], [class*='ProductCard']")
        if not cards:
            cards = soup.find_all("a", href=lambda h: h and "/product/" in h)

        for card in cards[:6]:
            try:
                if card.name == "a":
                    pname = card.get_text(strip=True)
                    href = card.get("href", "")
                else:
                    name_el = card.select_one("[class*='name'], [class*='title']")
                    pname = name_el.get_text(strip=True) if name_el else ""
                    a_el = card.find("a", href=True)
                    href = a_el["href"] if a_el else ""

                if not pname or not href:
                    continue

                price_el = card.select_one("[class*='price']")
                price_raw = price_el.get_text(strip=True) if price_el else "0"
                price_num = "".join(c for c in price_raw if c in "0123456789.")
                price = float(price_num) if price_num else 0.0

                full_url = href if href.startswith("http") else f"https://www.sastasundar.com{href}"

                results.append({
                    "name":   unicode_patch(pname),
                    "price":  price,
                    "url":    unicode_patch(full_url),
                    "source": "SastaSundar",
                })
            except Exception:
                continue

        alternatives = results[1:] if len(results) > 1 else results
        return json.dumps(alternatives)

    except Exception as e:
        print(f"[SastaSundar] Failed: {e}")
        return json.dumps([])