from flask import jsonify, Blueprint, request
import app.controllers.users as userController

users_bp = Blueprint("users", __name__)


@users_bp.route("/users", methods=["GET"])
def findAllUsers():
    try:
        return jsonify(userController.findAllUsers()), 200
    except Exception as e:
        return jsonify({"[ROUTES]error": str(e)}), 500


@users_bp.route("/users", methods=["POST"])
def createUser():
    try:
        data = request.get_json()
        userController.createUser(data)
        return jsonify({"message": "Usuário cadastrado com sucesso"}), 201
    except Exception as e:
        return jsonify({"[ROUTES]error": str(e)}), 500
