from transformers import TextClassificationPipeline, BertForSequenceClassification
from kobert_tokenizer import KoBERTTokenizer
from kiwipiepy import Kiwi
import itertools
import json


# 모델의 전체 파일 경로 지정
model_path = "C:\projects\myproject2\pybo\checkpoint-4150"

# 지정한 경로에서 모델 불러오기
model = BertForSequenceClassification.from_pretrained(model_path)

tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
tokenizer.model_max_length = model.config.max_position_embeddings

text_classifier = TextClassificationPipeline(model=model, tokenizer=tokenizer,  framework='pt', return_all_scores=True)

# 일기의 내용을 가져와서 감정 3개 반환
def emotion_predicts(sentence):
    # 문장 분리 과정
    kiwi = Kiwi()
    kiwi_sentenc = kiwi.split_into_sents(sentence)

    # 분리된 결과의 문장만 새 리스트에 담기
    kiwi_sentenc_list=[]

    for i in range(len(kiwi_sentenc)):
        kiwi_sentenc_list.append([kiwi_sentenc[i][0]])
        # kiwi_sentenc_list = [item for item in kiwi_sentenc[i][0]]
        print(f'kiwi_sentenc[{i}][0]', kiwi_sentenc[i][0], '\n\n')
        print(f'kiwi_sentenc_list[{i}]', kiwi_sentenc_list[i], '\n\n')

    print(kiwi_sentenc, '\n\n', kiwi_sentenc_list, '\n\n')

    # 배열이 3중으로 겹쳐있음
    sentence_predict = []
    sentence_predict_list = []

    # sentence_predict_list에다가 각 문장의 감정분석 결과를 저장
    for i in range(len(kiwi_sentenc_list)):
        sentence_predict = text_classifier(kiwi_sentenc_list[i])
        sentence_predict_list.append(sentence_predict)

    sentence_cnt = len(sentence_predict_list)
    print('문장의 개수: ', sentence_cnt)

    # 아무 것도 안 건드린 sentence_predict_list
    print(sentence_predict_list, '\n\n')

    # 3중 리스트 -> 2중 리스트
    result = list(itertools.chain(*sentence_predict_list))
    print(result, '\n\n')

    # 2중 리스트 -> 1차원 리스트
    result_re = list(itertools.chain(*result))
    print(result_re)

    # 문장의 각 감정 확률의 총합 구하기
    label_scores = {}

    for dictionaries in result_re:
        label = dictionaries['label']
        score = dictionaries['score']

        # Update the label score in the dictionary
        if label in label_scores:
            label_scores[label] += score
        else:
            label_scores[label] = score

    # 확률의 총합 / 문장 개수 = 감정 확률의 평균
    # sentence_cnt : 문장 개수
    scores_avarage = {}

    for label in label_scores:
        scores_avarage[label] = label_scores[label] / sentence_cnt

    sorted_labels = sorted(scores_avarage, key=lambda x: scores_avarage[x], reverse=True)

    # top_labels : 반환할 상위 3개의 감정
    top_labels = [{"label": label, "average_score": scores_avarage[label]} for label in sorted_labels[:3]]

    print('top_labels : ', top_labels)


    # Convert top_labels to a JSON string
    # json_result = json.dumps(top_labels)
    # print('json_result : ', json_result)

    return top_labels