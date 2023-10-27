from transformers import BertForSequenceClassification, pipeline
from kobert_tokenizer import KoBERTTokenizer


# 모델의 전체 파일 경로 지정
model_path = "C:\projects\myproject2\pybo\checkpoint-4150"

# 지정한 경로에서 모델 불러오기
model = BertForSequenceClassification.from_pretrained(model_path)

tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
tokenizer.model_max_length = model.config.max_position_embeddings

# pipeline으로 빠르게 추론하기
classifier = pipeline('text-classification', model=model, tokenizer=tokenizer)

# 감정분석
def emotion_predict(sentence):
    predict_sentence = classifier(sentence)
    first_prediction = predict_sentence[0]
    emotion = first_prediction['label']
    print('결과(emotion) : ', emotion)
    # print('결과(emotion) : ', predict_sentence)
    return emotion

