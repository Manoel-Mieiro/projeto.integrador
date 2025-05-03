import app.services.login as loginService
from app.dto.users import UserDTO


def getToken(usr, userToken):
    try:
        return loginService.getToken(usr=usr, userToken=userToken)
    except Exception as e:
        print("[CONTROLLER]Error fetching users:", e)
        raise e


def updateToken(usr):
    try:
        return loginService.updateToken(usr=usr)
    except Exception as e:
        print("[CONTROLLER]Error updating user:", e)
        raise e


def deleteUser(id_user):
    try:
        return loginService.deleteToken(id_user)
    except Exception as e:
        print("[CONTROLLER]Error deleting user:", e)
        raise e
