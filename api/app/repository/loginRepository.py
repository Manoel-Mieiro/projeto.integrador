from bson import ObjectId
from db import loginCollection as login
from app.models.login import Login


def getToken(token: int):
    try:
        tkn = login.find_one(
            {"token": token}
        )
        if not tkn:
            raise ValueError(f"Token [{tkn}] informado é inválido.")
        return token
    except Exception as e:
        print("[REPOSITORY] Erro inesperado: ", e)
        raise e


def updateToken(usr: Login):
    try:
        association = login.findOne(
            {"email": usr["email"]}
        )
        if association not in usr["email"]:
            raise ValueError(f"Não foi possível atualizar o token para {usr['email']}: Usuário não encontrado.")
    except Exception as e:
        print("[REPOSITORY] Erro inesperado: ", e)
        raise e
