from flask import Flask
import config
from pybo.views import main_views

# create_app() 함수 : 애플리케이션 팩토리
def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    # 블루프린트
    app.register_blueprint(main_views.bp)

    return app

