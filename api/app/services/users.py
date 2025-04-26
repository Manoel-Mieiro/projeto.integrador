import app.repository.usersRepository as users


def findAllUsers():
    try:
        return users.findAllUsers()
    except Exception as e:
        print("[SERVICE]Error fetching users:", e)
        raise e


def createUser(data):
    try:
        return users.createUser(data)
    except Exception as e:
        print("[SERVICE]Error creating user:", e)
        raise e


def findOneUser(id):
    try:
        return users.findOneUser(id)
    except Exception as e:
        print("[SERVICE]Error fetching user:", e)
        raise e


def updateUser(id_user, data):
    try:
        return users.updateUser(id_user, data)
    except Exception as e:
        print("[SERVICE]Error updating user:", e)
        raise e


def deleteUser(id):
    try:
        return users.deleteUser(id)
    except Exception as e:
        print("[SERVICE]Error deleting user:", e)
        raise e
