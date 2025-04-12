import app.repository.tracesRepository as repository


def findAllTraces():
    try:
        return repository.findAllTraces()
    except Exception as e:
        print("Erro ao buscar traces:", e)
        raise e
