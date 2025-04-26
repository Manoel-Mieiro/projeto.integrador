from app.models.users import Users
from app.models.roles import Roles


class UserDTO:
    def __init__(self, email: str, role: str):
        self.email = email
        self.role = role

    def to_standard(self):
        return Users(
            email=self.email,
            role=Roles(self.role)
        )
