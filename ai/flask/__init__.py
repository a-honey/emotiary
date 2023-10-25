from flask import Flask
# from flask_migrate import Migrate
# from flask_sqlalchemy import SQLAlchemy

import config

from pybo.views import main_views

# db = SQLAlchemy()
# migrate = Migrate()

# create_app() 함수 : 애플리케이션 팩토리
def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    # ORM
    # db.init_app(app)
    # migrate.init_app(app, db)

    # 블루프린트
    app.register_blueprint(main_views.bp)

    return app

