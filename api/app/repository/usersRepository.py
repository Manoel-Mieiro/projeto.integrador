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


def findOneUser(id: ObjectId):
    try:
        return Users(users.find_one({"_id": id})).to_dict()
    except Exception as e:
        print("[REPOSITORY]Erro ao buscar user:", e)
        raise e


def updateUser(updatedUser: Users):
    try:
        findOneUser(updatedUser._id)
        users.update_one({"_id": updatedUser._id}, {
                         "$set": updatedUser.to_dict()})

        return updatedUser.to_dict()
    except Exception as e:
        print("[REPOSITORY]Erro ao atualizar user:", e)
        raise e


def deleteUser(id: ObjectId):
    try:
        result = users.delete_one({"_id": id})
        if result.deleted_count == 0:
            raise ValueError(f"Nenhum usuário encontrado com o id {id}")
        return {"message": "[REPOSITORY]Usuário removido com sucesso"}
    except Exception as e:
        print("[REPOSITORY]Erro ao remover user:", e)
        raise e
