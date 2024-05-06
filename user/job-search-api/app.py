from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from src.job_match import user_query

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def index(): 
    return "Home"


@app.route("/match", methods=["POST"])
@cross_origin()
def job_match():
    data = request.get_json()
    query_text = data["query"]
    k = data["k"]
    top_jobs = user_query(query_text, k)
    return jsonify(top_jobs), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
