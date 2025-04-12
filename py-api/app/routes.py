from flask import Blueprint
from app.controller.controller import traceContoller

traces_bp = Blueprint("traces", __name__)


@traces_bp.route("/traces", methods=["GET"])
def getTraces():
    traceContoller()
