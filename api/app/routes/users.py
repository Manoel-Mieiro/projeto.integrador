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


@users_bp.route("/users/<user_id>", methods=["GET"])
def findOneUser(user_id):
    try:
        return jsonify(userController.findOneUser(user_id))
    except Exception as e:
        return jsonify({"[ROUTES]error": str(e)}), 500


@users_bp.route("/users/<user_id>", methods=["PUT"])
def updateUser(user_id):
    try:
        data = request.get_json()
        return jsonify(userController.updateUser(user_id, data))
    except Exception as e:
        return jsonify({"[ROUTES]error": str(e)}), 500


@users_bp.route("/users/<user_id>", methods=["DELETE"])
def deleleteUser(user_id):
    try:
        return jsonify(userController.deleteUser(user_id))
    except Exception as e:
        return jsonify({"[ROUTES]error": str(e)}), 500
