import app.repository.tracesRepository as repository


def findAllTraces():
    try:
        return repository.findAllTraces()
    except Exception as e:
        print("[SERVICE]Erro ao buscar traces:", e)
        raise e


def createTrace(data):
    try:
        print("[SERVICE]Criando trace:", data)
        return repository.createTrace(data)
    except Exception as e:
        print("[SERVICE]Erro ao criar trace:", e)
        raise e

# def convertObjectIdToString(json):
#     try:
#         if isinstance(json, list):
#             for item in json:
#                 if '_id' in item:
#                     item['_id'] = str(item['_id'])
#         elif isinstance(json, dict):
#             if '_id' in json:
#                 json['_id'] = str(json['_id'])
#         return json
#     except Exception as e:
#         print("[SERVICE]Erro ao converter ObjectId para string:", e)
#         raise e
