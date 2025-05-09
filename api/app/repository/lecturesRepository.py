from bson import ObjectId
from db import lecturesCollection as lectures
from app.models.lecture import Lecture
from db import loginCollection as login


def findAllLectures():
    try:
        docs = list(lectures.find({}))
        lectures_list = []

        for doc in docs:
            lecture = Lecture.from_dict(doc)
            lectures_list.append(lecture.to_dict())

        return lectures_list

    except Exception as e:
        print("[REPOSITORY]Erro ao buscar aulas:", e)
        raise e


def createLecture(data: Lecture):
    try:
        print("\n[REPOSITORY]Criando aula:", data, "\n")
        result = lectures.insert_one(data.to_dict())
        data._id = result.inserted_id

        if not data._id:
            raise Exception("Erro ao inserir usuário no banco.")

        login.insert_one(
            {
                "subject": data._subject,
                "date_lecture": data._dateLecture,
                "periodStart": data._periodStart,
                "periodEnd": data._periodEnd,
                "teacher": data._teacher

            }
        )
        return data.to_dict()
    except Exception as e:
        print("[REPOSITORY]Erro ao criar lecture:", e)
        raise e


def findOneLecture(_id):
    try:
        lecture_data = lectures.find_one(
            {"_id": _id}
        )
        if not lecture_data:
            return None

        return Lecture.from_dict(lecture_data).to_dict()
    except Exception as e:
        print("[REPOSITORY]Erro ao buscar lecture:", e)
        raise e


def updateLecture(_id: ObjectId, updatedLecture: dict):
    try:
        result = lectures.update_one(
            {"_id": ObjectId(_id)},
            {"$set": updatedLecture}
        )

        if result.matched_count == 0:
            raise ValueError("Usuário não encontrado.")

        return findOneLecture(_id)
    except Exception as e:
        print("[REPOSITORY]Erro ao atualizar lecture:", e)
        raise e


def deleteLecture(_id: ObjectId):
    try:
        lecture = findOneLecture(_id=_id)

        login_result = login.delete_one({"id": lecture["_id"]})

        if login_result.deleted_count == 0:
            print(
                f"[REPOSITORY]Aviso: Nenhum login encontrado para {lecture['_id']}")
            raise e

        result = lectures.delete_one(
            {"_id": ObjectId(_id)}
        )

        if result.deleted_count == 0:
            raise ValueError(
                f"Nenhum usuário encontrado com o id {_id}")

        return {"message": "[REPOSITORY]Usuário removido com sucesso"}
    except Exception as e:
        print("[REPOSITORY]Erro ao remover lecture:", e)
        raise e
