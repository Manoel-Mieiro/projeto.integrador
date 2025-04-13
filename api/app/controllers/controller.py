import app.services.traces as traceService

def listTraces():
    try:
        return traceService.findAllTraces()
    except Exception as e:
        print("[CONTROLLER]Error fetching traces:", e)
        raise e
    
def createTrace(data):
    try:
        return traceService.createTrace(data)
    except Exception as e:
        print("[CONTROLLER]Error creating trace:", e)
        raise e
