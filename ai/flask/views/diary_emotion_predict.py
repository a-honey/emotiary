from transformers import TextClassificationPipeline, BertForSequenceClassification
from kobert_tokenizer import KoBERTTokenizer
from kiwipiepy import Kiwi
import itertools


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

    # 배열이 3중으로 겹쳐있음
    sentence_predict = []
    sentence_predict_list = []

    # sentence_predict_list에다가 각 문장의 감정분석 결과를 저장
    for i in range(len(kiwi_sentenc_list)):
        sentence_predict = text_classifier(kiwi_sentenc_list[i])
        sentence_predict_list.append(sentence_predict)

    # 3중 리스트 -> 2중 리스트
    result = list(itertools.chain(*sentence_predict_list))

    # 각 문장을 'score'값 기준으로 내림차순 정렬
    # 각 문장의 최댓값을 뽑아 dictionary 저장
    largest_score_dicts = []
    for sublist in result:
        sorted_sublist = sorted(sublist, key=lambda item: item['score'], reverse=True)
        largest_dict = sorted_sublist[0]
        largest_score_dicts.append(largest_dict)

    label_counts = []
    for item in largest_score_dicts:
        label = item['label']
        label_exists = False

        for count_dict in label_counts:
            if count_dict['label'] == label:
                count_dict['num'] += 1
                label_exists = True
                break

        if not label_exists:
            label_counts.append({'label': label, 'num': 1})

    sorted_label_counts = sorted(label_counts, key=lambda x: x['num'], reverse=True)
    labels_only = [item['label'] for item in sorted_label_counts]

    min_emotions = 1
    max_emotions = 4

    filtered_labels = [label for label in labels_only if min_emotions <= len(set(labels_only)) <= max_emotions]

    return filtered_labels