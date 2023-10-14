# my-boilarplate

## Stacks

react, react-dom, react-router-dom
axios
recoil, react-query
sass
date-fns

## 디렉토리 구조

```
┠─ node_modules
┠─ public
┠─ src
│    ├ assets  // 기타 이미지 등을 보관합니다
│    ├ api  // axios, interceptor 등 api 요청관련 함수를 보관합니다
│    ├ components  // 공통 컴포넌트를 보관합니다
│    ├ hooks  // 기타 hook을 보관합니다
│    ├ pages  // 페이지 및 컴포넌트를 보관합니다
│    |   └ intro
│    │        ├ Intro.tsx
│    │        └ components  // 페이지별 컴포넌트를 보관합니다
│    │              └Intro.FirstBox.tsx
│    ├ states  // 전역 상태를 보관합니다
│    ├ styles  // global.css, 변수 등을 보관합니다
│    └ utils  // 기타 함수를 보관합니다
│
├ .eslintrc.json
├ .gitignore
├ next-env.d.ts
├ next.config.js
├ package.json
├ postcss.config.js
├ README.md
├ tailwind.config.js
├ tsconfig.json
└ yarn.lock
```

<br>

---

All rights reserved.
