# **Emotiary - FE**

**Emotiary**는 사용자에게 일기의 내용을 분석해서 그 날의 감정을 분류하고, 그 감정을 이모지로 표현해주는 프로젝트입니다.

## **기술 스택 및 도구**

![React](https://img.shields.io/badge/-React-222222?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=ffffff)
![Axios](https://img.shields.io/badge/-Axios-007ACC?style=for-the-badge&logo=axios&logoColor=ffffff)
![Recoil](https://img.shields.io/badge/-Recoil-764ABC?style=for-the-badge&logo=recoil&logoColor=ffffff)
![React Query](https://img.shields.io/badge/-React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=ffffff)
![date-fns](https://img.shields.io/badge/-date--fns-EA4AAA?style=for-the-badge)
![react-datepicker](https://img.shields.io/badge/-react--datepicker-61DAFB?style=for-the-badge)
![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=ffffff)
![socket.io](https://img.shields.io/badge/-socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=ffffff)

- **React**: 웹 애플리케이션의 사용자 인터페이스 개발에 사용되었습니다.
- **TypeScript**: 정적 타입 언어로 프로젝트의 안정성과 개발 생산성을 향상시켰습니다.
- **Axios**: 네트워크 요청을 처리하기 위한 HTTP 클라이언트로 사용되었습니다. 인터셉터를 활용하여 기본 URL 및 헤더를 설정했습니다.
- **Recoil**: 전역 상태 관리를 위한 라이브러리로 사용되었습니다. Redux Toolkit 대신 Recoil을 사용하여 상태를 관리합니다.
- **React Query**: 데이터 가져오기 및 캐싱을 처리하기 위한 라이브러리로 사용되었습니다. 서버 데이터와의 상호작용을 효과적으로 처리합니다.
- **date-fns**: 날짜 및 시간 관련 작업을 수행하기 위한 라이브러리로 사용되었습니다.
- **react-datepicker**: 날짜 선택을 위한 컴포넌트로 사용되었습니다. 사용자가 쉽게 날짜를 선택할 수 있도록 도움을 주는데 활용되었습니다.
- **Storybook**: 컴포넌트 개발 및 테스트를 위한 환경으로 사용되었습니다. 각 컴포넌트를 독립적으로 테스트하고 문서화할 수 있도록 도와줍니다.
- **socket.io**: 실시간 채팅 기능을 위해 사용되었습니다. 실시간 데이터 통신 및 양방향 통신을 구현하는데 사용됩니다.

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
