# **Emotiary - FE**

**Emotiary**는 사용자에게 일기의 내용을 분석해서 그 날의 감정을 분류하고, 그 감정을 이모지로 표현해주는 프로젝트입니다.

## **프로젝트 실행방법**
### **프론트엔드 실행방법**
프론트엔드 애플리케이션을 실행하려면 다음 단계를 따라 진행하세요:

1. `front/` 폴더로 이동합니다.
2. .env 파일을 설정합니다.
```
REACT_APP_BASE_URL="http://localhost:5001/api"
```
3. 프론트엔드 애플리케이션 의존성 모듈을 설치합니다:

```bash
yarn install
```
4. 프론트엔드 애플리케이션을 실행합니다:
```bash
yarn start
```

## 프론트엔드 디렉토리 구조

```
┣ node_modules
┣ public
┗ src
   ┣ api
   ┃  ┣ get
   ┃  ┃  ┣ useGetDiaryData.ts 
   ┃  ┃  ┗ useGetDiaryData.types.ts
   ┃  ┣ post
   ┃  ┃  ┣ usePostDiaryData.ts 
   ┃  ┃  ┗ usePostDiaryData.types.ts
   ┃  ┣ put
   ┃  ┃  ┣ usePutDiaryData.ts 
   ┃  ┃  ┗ usePutDiaryData.types.ts
   ┃  ┣ delete
   ┃  ┃  ┣ useDeleteDiaryData.ts 
   ┃  ┃  ┗ useDeleteDiaryData.types.ts
   ┃  ┣ instance.ts
   ┃  ┣ queryKeys.ts
   ┃  ┗ types.ts
   ┣ assets
   ┣ atoms
   ┣ commonponents
   ┣ hooks
   ┣ mock
   ┣ pages
   ┣ commonponents
   ┃  ┣ intro
   ┃  ┃  ┣ components
   ┃  ┃  ┃  ┗ Intro.FirstBox.tsx
   ┃  ┃  ┗ Intro.tsx
   ┃  ┣ main
   ┃  ┃  ┣ assets
   ┃  ┃  ┣ components
   ┃  ┃  ┣ styles
   ┃  ┃  ┗ Main.tsx
   ┃  ┣ my
   ┃  ┣ network
   ┃  ┣ signin
   ┃  ┣ signup
   ┃  ┣ userId
   ┃  ┗ users
   ┣ styles
   ┣ types
   ┗ utils

```
<br>

---
