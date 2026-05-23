from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv

load_dotenv()  # loads flask_server/.env into os.environ

import json
from scrape.apollo import apollo
from scrape.medibuddy import medibuddy
from scrape.onemg import onemg
from scrape.pharmeasy import pharmeasy
from scrape.netmeds import netmeds
from scrape.truemeds import truemeds

from flipkart.flipkart import build_array
from medextractor.main import super_parse

import os
# import base64
# import uuid
# from io import BytesIO
# from PIL import Image

def LCS(X, Y):
    m = len(X)
    n = len(Y)
    L = [[None] * (n + 1) for i in range(m + 1)]

    for i in range(m + 1):
        for j in range(n + 1):
            if i == 0 or j == 0:
                L[i][j] = 0
            elif X[i - 1] == Y[j - 1]:
                L[i][j] = L[i - 1][j - 1] + 1
            else:
                L[i][j] = max(L[i - 1][j], L[i][j - 1])
    return L[m][n]

def factor(X, Y):
    mx = 0
    for i in range(len(Y)):
        mx = max(mx, LCS(X, Y[i:min(i + 2 * len(X) - 1, len(Y) - 1)]))
    return (mx / len(X)) * 100

app = Flask(__name__)
cors = CORS(app)

FUNCTIONS = [medibuddy, 
            # onemg, pharmeasy, netmeds, truemeds, apollo, 
            ]

@app.route('/')
def hello_world():
    return 'Welcome to MedEZ API'

@cross_origin()
@app.route('/search', methods=["GET", "POST"])
def search():
    if request.method == 'GET':
        name = request.args.get('name')
    else:
        name = request.form.get('name')
    response = {
        "name": name,
        "sources": [],
        "alternatives": []
    }
    for function in FUNCTIONS:
        try:
            result = json.loads(function(name))
            if not result.get("name"):
                continue
            result["accuracy"] = factor(name.lower().replace(" ", ""), result["name"].lower().replace(" ", ""))
            if "desc" in result:
                response["desc"] = result.pop("desc")
            response["sources"].append(result)
        except Exception as e:
            print(f"[search] {function.__name__} error: {e}")
            continue
    return jsonify(response)

@cross_origin()
@app.route('/alternatives', methods=["GET", "POST"])
def alternative():
    if request.method == 'GET':
        name = request.args.get('name')
    else:
        name = request.form.get('name')
    built = json.loads(build_array(name))
    return jsonify(built)

@cross_origin()
@app.route('/prescription', methods=["GET", "POST"])
def prescription():
    # Direct file upload (hosted — Flask and Node on separate servers)
    if request.files.get('file'):
        f = request.files['file']
        upath = os.path.join(os.path.dirname(__file__), 'temp', f.filename)
        os.makedirs(os.path.dirname(upath), exist_ok=True)
        f.save(upath)

    # Filename only (local — Flask and Node share disk)
    else:
        filename = request.form.get('filename') or request.args.get('filename')
        if not filename:
            return jsonify({"error": "No file provided"}), 400
        upath = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'server', 'uploads', filename))

    if not os.path.exists(upath):
        return jsonify({"error": "File not found"}), 404

    try:
        response = json.loads(super_parse(upath))
        return jsonify(response)
    except Exception as e:
        print(f"[Prescription error] {e}")
        return jsonify({"error": "Failed to process", "details": str(e)}), 500
    finally:
        if os.path.exists(upath):
            os.remove(upath)
            
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)