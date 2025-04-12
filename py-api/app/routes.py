from flask import Blueprint
from flask import jsonify
import app.controllers.controller as traceController

traces_bp = Blueprint("traces", __name__)


@traces_bp.route("/traces", methods=["GET"])
def listTraces():
    try:
        return jsonify(traceController.listTraces()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
