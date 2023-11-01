import requests
from flask import Blueprint, request, jsonify

from pybo.views.diary_emotion_predict import emotion_predicts
from pybo.views.emotion_predict import emotion_predict

bp = Blueprint('main', __name__, url_prefix='/')

# 모델 로드 함수
# model = load_model()

@bp.route('/')
def index():
    return 'Pybo index'


# Flask API 엔드포인트 정의
@bp.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        sentence = data.get('text')

        # 딥러닝 모델을 사용하여 감정 분류
        emotion = emotion_predict(sentence)
        print(emotion)
        # 결과를 JSON 형식으로 반환
        response = {'emotion': emotion}

        # 예측된 감정을 Node.js 서버로 전송
        send_emotion_to_nodejs(emotion)

        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)})

def send_emotion_to_nodejs(emotion):
    # Node.js 서버 URL
    nodejs_url = 'http://localhost:5001/test/predict'

    # JSON 데이터 생성
    data = {'emotion': emotion}

    # POST 요청을 사용하여 데이터 전송
    response = requests.post(nodejs_url, json=data)

    # HTTP 응답 확인
    if response.status_code == 200:
        print('Emotion sent to Node.js server successfully.')
    else:
        print('Failed to send emotion to Node.js server.')


@bp.route('/predict/diary', methods=['POST'])
def predict_diary():
    try:
        data = request.json
        sentence = data.get('text')

        # 딥러닝 모델을 사용하여 감정 분류
        emotion = emotion_predicts(sentence)

        # # 결과를 JSON 형식으로 반환
        response = {'emotion': emotion}

        # 예측된 감정을 Node.js 서버로 전송
        send_emotion_to_nodejs(emotion)

        # return jsonify(response)
        return emotion
    except Exception as e:
        return jsonify({'error': str(e)})

def send_emotion_to_nodejs(emotion):
    # Node.js 서버 URL
    nodejs_url = 'http://localhost:5001/test/predict/diary'

    # # JSON 데이터 생성
    data = {'emotion': emotion}

    # # POST 요청을 사용하여 데이터 전송
    response = requests.post(nodejs_url, json=data)

    # HTTP 응답 확인
    if response.status_code == 200:
        print('Emotion sent to Node.js server successfully.')
    else:
        print('Failed to send emotion to Node.js server.')



