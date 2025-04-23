import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv(".env")

MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("MONGO_DB")
COLLECTION = os.getenv("MONGO_COLLECTION")

client = MongoClient(MONGO_URI)
database = client[DATABASE_NAME]
collection = database[COLLECTION]
usersCollection = database["users"]


def showMongo():
    return {"MONGO": MONGO_URI, "COLLECTION": DATABASE_NAME, "USERS": usersCollection}
