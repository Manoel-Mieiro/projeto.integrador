from db import collection


def findAllTraces():
    try:
        print("Traces", list(collection.find({})))
        return list(collection.find({}))
    except Exception as e:
        print("Erro ao buscar traces:", e)
        raise e
