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
