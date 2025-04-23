from roles import Roles


class Users:
    def __init__(self, email: str, role: Roles):
        self.email = email
        self.role = role

    def __str__(self):
        return f"[{self.role}]: {self.email}"
