from flask import Flask
from app.routes.traces import traces_bp
from app.routes.users import users_bp

def create_app():
    app = Flask(__name__)
    app.register_blueprint(traces_bp)
    app.register_blueprint(users_bp)
    return app
