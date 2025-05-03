import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv(".env")

MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("MONGO_DB")
COLLECTION = os.getenv("MONGO_COLLECTION")

collections = [COLLECTION, "users", "login"]

client = MongoClient(MONGO_URI)
database = client[DATABASE_NAME]
collection = database[collections[0]]
usersCollection = database[collections[1]]
loginCollection = database[collections[2]]


def showMongo():
    return {
        "MONGO": MONGO_URI,
        "DATABASE": DATABASE_NAME,
        "COLLECTIONS": collections
    }


def seedMongo():
    existing_collections = database.list_collection_names()

    for c in collections:
        if c in existing_collections:
            print(f"Collection '{c}' já existe.")
        else:
            try:
                database.create_collection(c)
                print(f"Collection '{c}' criada com sucesso.")
            except Exception as e:
                print(f"Erro ao criar a collection '{c}': {e}")
