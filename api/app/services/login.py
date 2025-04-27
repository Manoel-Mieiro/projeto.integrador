import app.repository.loginRepository as login
import string
import random


def getToken(token):
    try:
        return login.getToken(token)
    except Exception as e:
        print("[SERVICE]Error fetching token:", e)
        raise e


def updateToken(usr, newToken):
    try:
        return login.updateToken(usr, newToken=newToken)
    except Exception as e:
        print("[SERVICE]Error updating user token:", e)
        raise e


def deleteToken(usr):
    try:
        return login.deleteLogin(usr)
    except Exception as e:
        print("[SERVICE]Error deleting user token collection:", e)
        raise e

def generateToken():
    chars = string.digits
    return ''.join(random.choice(chars) for i in range(6))