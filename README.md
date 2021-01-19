# PWA 프로젝트를 생성해 본다.
참조: https://developers.google.com/web/ilt/pwa/

0. 준비: eslint 설치(VS code에는 'Prettier ESLint' 설치)
yarn add -D eslint
npx eslint --init

1. Offline app

2. Fetch API: https로 serviceWorker 호출함(로컬은 http로 가능함)
 - fetch 호출 후 html을 innerHTML 속성을 사용하여 추가하면 교차 사이트 스크립팅 공격에 노출 될 수 있음
 - 운영에서는 중요한 사용자 데이터를 항상 암호화 해야함
 - Cross-origin 요청은 images, stylesheets. scripts는 예외임
