import requests
import json
import urllib.parse

import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), 'util'))
from unicode_patch import unicode_patch
default={
    "name":"",
    "price":"",
    "url":"",
    "source":""
}
def medibuddy(name):
    URL="https://meds-service.medibuddy.in/app/medicine/search"
    r=requests.post(URL, json={"key":name})
    response=json.loads(r.text)
    message=response["message"]
    try:
        if message!=[]: 
            name=message[0]["name"]
            code=message[0]["drugCode"]
            price=str(message[0]["discountPrice"])
            # 🆕 Clean up name for URL (replace spaces with hyphens and lower case)
            clean_name = name.split('-')[0].strip().lower()
            url_friendly_name = clean_name.strip().lower().replace(" ", "-")
            link = f'https://www.medibuddy.in/order-medicines/search/{url_friendly_name}'

            name=unicode_patch(name)
            price=unicode_patch(price).strip()
        else:
            return json.dumps(default)
    except:
        return json.dumps(default)
    
    details={
        "name":name.strip(),
        "price":float(price),
        "url":link.strip(),
        "source":"MediBuddy"
    }
    
    return json.dumps(details)

