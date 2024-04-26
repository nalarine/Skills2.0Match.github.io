import pytest

from src.job_match import user_query

params = {
    "query": "public speaking, communication",
    "k": 5,
}


def test_user_query():
    results = user_query(**params)
    assert len(results) == params["k"], "Length does not match."
