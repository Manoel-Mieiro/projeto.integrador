from app.models.roles import Roles
from bson import ObjectId


class Users:
    def __init__(self, email: str, role: Roles, _id: ObjectId = None):
        self._id = _id
        self.email = email
        self.role = role

    def __str__(self):
        return f"[{self.role.value}]: {self.email}"

    def to_dict(self):
        data = {
            "email": self.email,
            "role": self.role.value
        }
        if self._id:
            data["_id"] = self._id
        return data

    @staticmethod
    def from_dict(data):
        if "email" not in data or "role" not in data:
            raise ValueError(f"Documento inválido, campos ausentes: {data}")

        return Users(
            email=data["email"],
            role=Roles(data["role"]),
            _id=data.get("_id")
        )
