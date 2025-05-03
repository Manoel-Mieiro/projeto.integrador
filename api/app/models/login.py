from bson import ObjectId


class Login:
    def __init__(self, email: str, token: str, createdAt: str, _id: ObjectId = None):
        self._id = _id
        self.email = email
        self.token = token
        self.createdAt = createdAt

    def to_dict(self):
        data = {
            "email": self.email,
            "token": self.token,
            "createdAt": self.createdAt
        }
        if self._id:
            data["_id"] = str(self._id)
        return data

    @staticmethod
    def from_dict(data):
        return Login(
            email=data["email"],
            token=data["token"],
            createdAt=data["createdAt"]
        )
