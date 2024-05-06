import pytest
import requests
import json

from src.job_match import user_query

params = {
    "query": "public speaking, communication",
    "k": 5,
}

def test_match_api_list():
    url = "http://127.0.0.1:5000/match"
    payload = json.dumps({"query": ["public speaking", "communication"], "k": 5})
    headers = {'Content-Type': 'application/json'}

    response = requests.post(url, data=payload, headers=headers)

    assert response.status_code == 200
    # print(response)

def test_match_api_string():
    url = "http://127.0.0.1:5000/match"
    payload = json.dumps({"query": "public speaking, communication", "k": 5})
    headers = {'Content-Type': 'application/json'}

    response = requests.post(url, data=payload, headers=headers)

    assert response.status_code == 200
    # print(response)