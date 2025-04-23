from db import usersCollection as users


def findAllUsers():
    try:
        return list(users.find({}))
    except Exception as e:
        print("[REPOSITORY]Erro ao buscar users:", e)
        raise e

def createUser(data):
    try:
        print("\n[REPOSITORY]Criando user:", data,"\n")
        return users.insert_one(data)
    except Exception as e:
        print("[REPOSITORY]Erro ao criar user:", e)
        raise e