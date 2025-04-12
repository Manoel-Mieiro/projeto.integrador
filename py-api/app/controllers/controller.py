import app.services.traces as traceService

def listTraces():
    try:
        return traceService.findAllTraces()
    except Exception as e:
        console.log("Error fetching traces:", e)
        raise e
