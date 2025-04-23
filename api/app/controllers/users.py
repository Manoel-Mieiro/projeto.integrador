import app.services.users as userService
from app.dto.users import UserDTO


def findAllUsers():
    try:
        return userService.findAllUsers()
    except Exception as e:
        print("[SERVICE]Error fetching users:", e)
        raise e


def createUser(data):
    try:
        user = UserDTO(
            email=data["email"],
            role=data["role"]
        )
        return userService.createUser(user.to_standard())
    except Exception as e:
        print("[SERVICE]Error creating user:", e)
        raise e
