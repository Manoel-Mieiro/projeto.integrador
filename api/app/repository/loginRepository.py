from bson import ObjectId
from db import loginCollection as login
from app.models.login import Login


def getToken(token):
    try:
        tkn = login.find_one({"token": token})
        if not tkn:
            raise ValueError(f"Token [{token}] informado é inválido.")
        return token
    except Exception as e:
        print("[REPOSITORY] Erro inesperado no getToken: ", e)
        raise e


def updateToken(usr: Login):
    try:
        association = login.find_one({"email": usr.email})
        if not association:
            raise ValueError(
                f"Não foi possível atualizar o token para {usr.email}: Usuário não encontrado.")

        result = login.update_one(
            {"email": usr.email},
            {"$set": {"token": usr.token}}
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
