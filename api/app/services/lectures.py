import app.repository.lecturesRepository as lectures


def findAllLecutres():
    try:
        return lectures.findAllLecutres()
    except Exception as e:
        print("[SERVICE]Error fetching lectures:", e)
        raise e


def createLecture(data):
    try:
        return lectures.createLecture(data)
    except Exception as e:
        print("[SERVICE]Error creating user:", e)
        raise e


def findOneLecture(email):
    try:
        return lectures.findOneLecture(email)
    except Exception as e:
        print("[SERVICE]Error fetching lecture:", e)
        raise e


def updateLecture(_id, data):
    try:
        return lectures.updateLecture(_id, data)
    except Exception as e:
        print("[SERVICE]Error updating lecture:", e)
        raise e


def deleteLecture(_id):
    try:
        return lectures.deleteLecture(_id)
    except Exception as e:
        print("[SERVICE]Error deleting lecture:", e)
        raise e
