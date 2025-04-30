from flask import jsonify, Blueprint, request
import app.controllers.login as loginController

login_bp = Blueprint("login", __name__)


@login_bp.route("/login/<user>", methods=["PATCH"])
def updateUser(user):
    try:
        data = request.get_json()
        return jsonify(loginController.updateToken(user, data))
    except Exception as e:
        return jsonify({"[ROUTES]error": str(e)}), 500
