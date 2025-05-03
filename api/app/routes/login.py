from flask import jsonify, Blueprint, request
import app.controllers.login as loginController

login_bp = Blueprint("login", __name__)


@login_bp.route("/login", methods=["PATCH"])
def updateToken():
    try:
        usr = request.get_json()
        return jsonify(loginController.updateToken(usr))
    except Exception as e:
        return jsonify({"[ROUTES]error": str(e)}), 500


@login_bp.route("/login", methods=["GET"])
def getToken():
    try:
        usr = request.args.get("usr")
        userToken = request.args.get("token")
        return jsonify(loginController.getToken(usr, userToken))
    except Exception as e:
        return jsonify({"[ROUTES]error": str(e)}), 500
