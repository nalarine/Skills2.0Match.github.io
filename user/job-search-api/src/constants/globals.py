from pathlib import Path

import numpy as np
import pandas as pd

# DISTILBERT-BASE FOR SEMANTIC SEARCH
MODEL = "multi-qa-distilbert-cos-v1"

# PROJECT AND DATA PATHS
PROJECT_DIR = Path(*Path(__file__).parts[:-3]).__str__()
DATA_PATH = Path(PROJECT_DIR, "data").__str__()

# DATA LOADER
EMBEDDINGS = np.load(Path(DATA_PATH, "embedded.npy"))
JOB_LISTINGS = pd.read_csv(
    Path(DATA_PATH, "job_listings.csv"),
    index_col=0,
)
