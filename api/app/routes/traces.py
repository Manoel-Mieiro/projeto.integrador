from flask import jsonify, Blueprint, request
import app.controllers.traces as traceController

traces_bp = Blueprint("traces", __name__)


@traces_bp.route("/traces", methods=["GET"])
def listTraces():
    try:
        return jsonify(traceController.listTraces()), 200
    except Exception as e:
        return jsonify({"[ROUTES]error": str(e)}), 500


@traces_bp.route("/traces", methods=["POST"])
def createTrace():
    try:
        data = request.get_json()
        traceController.createTrace(data)
        return jsonify({"message": "Trace criado com sucesso"}), 201
    except Exception as e:
        return jsonify({"[ROUTES]error": str(e)}), 500
