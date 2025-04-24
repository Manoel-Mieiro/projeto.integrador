from db import usersCollection as users
from app.models.users import Users


def findAllUsers():
    try:
        docs = list(users.find({}))
        users_list = []

        for doc in docs:
            user = Users.from_dict(doc)
            users_list.append(user.to_dict())

        return users_list  

    except Exception as e:
        print("[REPOSITORY]Erro ao buscar users:", e)
        raise e


def createUser(data: Users):
    try:
        print("\n[REPOSITORY]Criando user:", data, "\n")
        result = users.insert_one(data.to_dict())
        data._id = result.inserted_id
        return data.to_dict()
    except Exception as e:
        print("[REPOSITORY]Erro ao criar user:", e)
        raise e
