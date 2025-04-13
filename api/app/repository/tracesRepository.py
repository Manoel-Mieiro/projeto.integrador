from db import collection


def findAllTraces():
    try:
        return list(collection.find({}))
    except Exception as e:
        print("[REPOSITORY]Erro ao buscar traces:", e)
        raise e


def createTrace(data):
    try:
        print("\n[REPOSITORY]Criando trace:", data,"\n")
        return collection.insert_one(data)
    except Exception as e:
        print("[REPOSITORY]Erro ao criar trace:", e)
        raise e
