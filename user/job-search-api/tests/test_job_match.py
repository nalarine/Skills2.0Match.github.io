import pytest
import requests
import json

from src.job_match import user_query

params = {
    "query": "public speaking, communication",
    "k": 5,
}


# def test_user_query():
#     results = user_query(**params)
#     assert len(results) == params["k"], "Length does not match."


def test_match_api():
    url = "http://127.0.0.1:5000/match"
    payload = json.dumps({"query": "public speaking, communication", "k": 5})
    headers = {'Content-Type': 'application/json'}

    response = requests.post(url, data=payload, headers=headers)

    assert response.status_code == 200