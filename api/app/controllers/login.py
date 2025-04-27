import app.services.login as loginService
from app.dto.users import UserDTO


def getToken(token: str):
    try:
        return loginService.getToken(token=token)
    except Exception as e:
        print("[CONTROLLER]Error fetching users:", e)
        raise e


# def createUser(data):
#     try:
#         user = UserDTO(
#             email=data["email"],
#             role=data["role"]
#         )
#         return loginService.createUser(user.to_standard())
#     except Exception as e:
#         print("[CONTROLLER]Error creating user:", e)
#         raise e

def updateToken(id_user, updatedUser):
    try:
        return loginService.updateUser(id_user, updatedUser)
    except Exception as e:
        print("[CONTROLLER]Error updationg user:", e)
        raise e


def deleteUser(id_user):
    try:
        return loginService.deleteUser(id_user)
    except Exception as e:
        print("[CONTROLLER]Error deleting user:", e)
        raise e
