from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

API_URL = "http://localhost:8000/clustering"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/run_clustering', methods=['POST'])
def run_clustering():
    data = request.json
    response = requests.post(API_URL, json=data)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
