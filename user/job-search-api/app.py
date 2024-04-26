from flask import Flask, jsonify, request

from src.job_match import user_query

app = Flask(__name__)


@app.route("/")
def index():
    return "Home"


@app.route("/match", methods=["POST"])
def job_match():
    data = request.get_json()
    query_text = data["query"]
    k = data["k"]
    top_jobs = user_query(query_text, k)
    return jsonify(top_jobs), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
