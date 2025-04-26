from bson import ObjectId
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


def findOneUser(user_id: ObjectId):
    try:
        user_data = users.find_one(
            {"_id": ObjectId(user_id)}

        )
        if not user_data:
            raise ValueError(f"Nenhum usuário encontrado com o id {user_id}")

        return Users.from_dict(user_data).to_dict()
    except Exception as e:
        print("[REPOSITORY]Erro ao buscar user:", e)
        raise e


def updateUser(user_id: ObjectId, updatedUser: dict):
    try:
        result = users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": updatedUser}
        )

        if result.matched_count == 0:
            raise ValueError("Usuário não encontrado.")

        return findOneUser(user_id)
    except Exception as e:
        print("[REPOSITORY]Erro ao atualizar user:", e)
        raise e


def deleteUser(user_id: ObjectId):
    try:
        result = users.delete_one(
            {"_id": ObjectId(user_id)}
        )

        if result.deleted_count == 0:
            raise ValueError(f"Nenhum usuário encontrado com o id {user_id}")

        return {"message": "[REPOSITORY]Usuário removido com sucesso"}
    except Exception as e:
        print("[REPOSITORY]Erro ao remover user:", e)
        raise e
