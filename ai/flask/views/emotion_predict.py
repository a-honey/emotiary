import requests
import torch

# import os
from transformers import pipeline, BertForSequenceClassification
from transformers import TextClassificationPipeline
from kobert_tokenizer import KoBERTTokenizer
from kiwipiepy import Kiwi


# 모델의 전체 파일 경로 지정
model_path = "C:\projects\myproject2\pybo\checkpoint-4150"

# 지정한 경로에서 모델 불러오기
model = BertForSequenceClassification.from_pretrained(model_path)

tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
tokenizer.model_max_length = model.config.max_position_embeddings

# pipeline으로 빠르게 추론하기
# classifier = pipeline('text-classification', model=model, tokenizer=tokenizer)

text_classifier = TextClassificationPipeline(model=model, tokenizer=tokenizer,  framework='pt', return_all_scores=True)

# function_to_apply의 기본 값으로 다중라벨이면 softmax가 적용되어서 안 써도 됨 -> 옵션 자체가 없다는건 이유가 뭐지..? 찾아보기
# text_classifier = TextClassificationPipeline(model=model, tokenizer=tokenizer,  framework='pt', function_to_apply="softmax")
# , return_all_scores=True
# ,function_to_apply="softmax"

######################################################################################################

# result = classifier('나 오늘 기분이 정말 안좋았어')
# result = classifier('집에가다 귀여운 고양이를 봤어. 기분이 안 좋았는데 고양이를 보니까 괜찮아진거 같아')
# print('결과(result) : ', result)

# 감정 값만 반환
# first_prediction = result[0]
# label = first_prediction['label']
# print('결과(label) : ', label)


######################################################################################################
'''
sentence='집에가다 귀여운 고양이를 봤어. 기분이 안 좋았는데 고양이를 보니까 괜찮아진거 같아'

predict_sentence = classifier(sentence)
first_prediction = predict_sentence[0]
emotion = first_prediction['label']
print('결과(emotion) : ', emotion)
print(torch.softmax(predict_sentence), dim=0)
'''


######################################################################################################


sentence = '집에가다 귀여운 고양이를 봤어. 기분이 안 좋았는데 고양이를 보니까 괜찮아진거 같아'

# 문장 분리 과정

kiwi = Kiwi()
kiwi_sentenc = kiwi.split_into_sents(sentence)
# kiwi_sentenc_list=[item for item in kiwi_sentenc[i][0]]

# 분리된 결과의 문장만 새 리스트에 담기
kiwi_sentenc_list=[]

for i in range(len(kiwi_sentenc)):
    kiwi_sentenc_list.append([kiwi_sentenc[i][0]])
    # kiwi_sentenc_list = [item for item in kiwi_sentenc[i][0]]
    print(f'kiwi_sentenc[{i}][0]', kiwi_sentenc[i][0], '\n\n')
    print(f'kiwi_sentenc_list[{i}]', kiwi_sentenc_list[i], '\n\n')

# kiwi_sentenc_list -> 분리 된 문장이 들어있는 리스트
print(kiwi_sentenc, '\n\n', kiwi_sentenc_list, '\n\n')

######################################################################################################

'''
# predict_sentence = classifier(sentence)
predict_sentence = text_classifier(sentence)

first_prediction = predict_sentence[0]
# emotion = first_prediction['label']
# emotion = predict_sentence[0]['label']
# print('결과(emotion) : ', emotion)
print('결과(predict_sentence) : ',predict_sentence)
'''


#########
# predicted_label_list = []
# predicted_score_list = []



# 2차원 배열 -> 1차원 배열
sentence_predict=[]
sentence_predict_list=[]
emotion_list=[]
'''
for i in range(len(kiwi_sentenc_list)):
    sentence_predict = text_classifier(kiwi_sentenc_list[i])
    sentence_predict_list.append(sentence_predict)
    print(f'\n\nsentence_predict[{i}]', sentence_predict[i]
          , f'\n\n sentence_predict_list[{i}]', sentence_predict_list[i])
'''

'''
for i in range(len(kiwi_sentenc_list)):
    sentence_predict = text_classifier(kiwi_sentenc_list[i])
    sentence_predict_list.append(sentence_predict)
    print(f'\n\nsentence_predict[{i}]', sentence_predict)  # Access the dictionary directly
    print(f'\n\nsentence_predict_list[{i}]', sentence_predict_list)

    for j in range(len(sentence_predict[0])):  # Iterate through the list of dictionaries
        label = sentence_predict[0][j]['label']
        score = sentence_predict[0][j]['score']
        print(f'label: {label}, score: {score}')
'''
for i in range(len(kiwi_sentenc_list)):
    sentence_predict = text_classifier(kiwi_sentenc_list[i])
    sentence_predict_list.append(sentence_predict)

    # Print the contents of sentence_predict in the same format as flat_sentence_predict_list
    print(f'\n\nsentence_predict_list[{i}]', sentence_predict[0])

    for j in range(len(sentence_predict[0])):
        label = sentence_predict[0][j]['label']
        score = sentence_predict[0][j]['score']
        print(f'label: {label}, score: {score}')

'''
# 1차원 배열 안의
sorted_emotion_list = sorted(emotion_list, key=lambda x: x['score'], reverse=True)
# predicted_label_list.append(sorted_emotion_list[0]) # label
# predicted_score_list.append(sorted_emotion_list[1]) # score

print('\n\n emotion_list : ', emotion_list)
print('\n\n sorted_emotion_list : ', sorted_emotion_list)
print('\n\n 확률이 높은 감정 (상위 3개) : ', sorted_emotion_list[:3])

# print('\n emotion_list :', emotion_list, '\n\n sorted_emotion_list : ', sorted_emotion_list,  '\n\n predicted_label_list : ', predicted_label_list, '\n predicted_score_list : ', predicted_score_list)
'''

########



def emotion_predict(sentence):
    predict_sentence = classifier(sentence)
    first_prediction = predict_sentence[0]
    emotion = first_prediction['label']
    print('결과(emotion) : ', emotion)
    # print('결과(emotion) : ', predict_sentence)
    return predict_sentence
