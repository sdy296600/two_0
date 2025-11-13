# two_0

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
========오류날때 터미널에서 해결 방법==============

# 1. npm 캐시 정리
npm cache clean --force

# 2. 레지스트리 변경 (한국에서 더 안정적)
npm config set registry https://registry.npmmirror.com

# 3. 재설치 시도
npm install

# scss 설치
npm install -D scss 

# Tailwind CSS 설치
npm install -D tailwindcss postcss autoprefixer

# Tailwind 설정 파일 생성<< 안됌..생략하기
(npx tailwindcss init -p) 

참고: npx tailwindcss init -p 명령어를 실행하면:
tailwind.config.js 파일이 생성됩니다
postcss.config.js 파일도 함께 생성됩니다 (-p 옵션)
이 파일들을 생성한 후에는 tailwind.config.js에서 content 경로 설정과 CSS 파일에 Tailwind 지시어를 추가하는 작업이 필요합니다!

# 차트 설치
npm install vue-chartjs chart.js 

# 설치가 완료되면 개발 서버 실행
npm run dev
