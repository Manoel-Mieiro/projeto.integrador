from flask import Flask
from app.routes import traces_bp

def create_app():
    app = Flask(__name__)
    app.register_blueprint(traces_bp)
    return app
