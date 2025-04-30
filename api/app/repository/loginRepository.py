from bson import ObjectId
from db import loginCollection as login
from app.models.login import Login



def seedLogin(usr, token):
    try:
        print("\n[REPOSITORY]Atribuindo token ao usuário:", data, "\n")
        login.insert_one(Login(usr, token=token))
        return True
    except Exception as e:
        print("[REPOSITORY] Erro inesperado no getToken: ", e)
        raise e

def getToken(usr):
    try:
        data = login.find_one({"email": usr})
        if not data:
            return False
    
        return True
    except Exception as e:
        print("[REPOSITORY] Erro inesperado no getToken: ", e)
        raise e

def updateToken(usr: Login, newToken: str):
    try:
        association = login.find_one({"email": usr.email})
        if not association:
            raise ValueError(
                f"Não foi possível atualizar o token para {usr.email}: Usuário não encontrado.")

        result = login.update_one(
            {"email": usr.email},
            {"$set": {"token": newToken}}
        )

        if result.modified_count == 0:
            raise ValueError(
                f"Token não foi atualizado para {usr.email}. Talvez o token enviado seja o mesmo.")

        return True

    except Exception as e:
        print("[REPOSITORY] Erro inesperado no updateToken: ", e)
        raise e


def deleteLogin(usr: Login):
    try:
        result = login.delete_one(
            {"email": usr.email}
        )
        if result.deleted_count == 0:
            raise ValueError(f"Usuário não encontrado")
    except Exception as e:
        print("[REPOSITORY] Erro inesperado: ", e)
        raise e
