import app.repository.loginRepository as login
import string
import random
import datetime
from app.services.email import sendMail


def getToken(usr, userToken):
    try:
        fetched = login.getToken(usr=usr)
        print("Fetched token raw:", fetched)
        print("Type:", type(fetched))

        if not fetched or fetched.token != userToken:
            raise ValueError("Invalid token provided.")

        print(f"Validating if token already expired")
        if validateToken(fetched.createdAt):
            return False

        print("[SERVICE]Provided Token matches the one assigned to the user")
        return True
    except Exception as e:
        print("[SERVICE]Error fetching token:", e)
        raise e


def updateToken(usr):
    try:
        tkn = generateToken()
        generatedAt = datetime.datetime.now()
        print("[SERVICE]Token is: ", tkn)
        login.updateToken(usr["email"], newToken=tkn,
                          createdAt=generatedAt.isoformat())
        sendMail(usr["email"], tkn)

        return {"newToken": tkn}
    except Exception as e:
        print("[SERVICE]Error updating user token:", e)
        raise


def seedLogin(usr):
    try:
        print("[SERVICE]Generating token...")
        tkn = generateToken()
        return login.seedLogin(usr=usr["email"], token=tkn)
    except Exception as e:
        print("[SERVICE]Error assigning token to user:", e)
        raise e


def deleteToken(usr):
    try:
        return login.deleteLogin(usr["email"])
    except Exception as e:
        print("[SERVICE]Error deleting user token collection:", e)
        raise e


def generateToken():
    # contém todos os números de 0 a 9
    chars = string.digits

    return ''.join(random.choice(chars) for i in range(6))


def validateToken(created_at_str):
    lifespan_seconds = 180
    created_at = datetime.datetime.fromisoformat(created_at_str)
    return datetime.datetime.now() > created_at + datetime.timedelta(seconds=lifespan_seconds)
