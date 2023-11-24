# 랜덤영화뽑기

777 게임으로 박스오피스 영화를 추천하는 서비스입니다.

**개발기간** | 2023.08.15 - 2023.11.04
<br/>
**개발인원** | 1명
<br/>
**담당역할** | 프론트엔드 개발
<br/>

- <a href="https://moondoyeon.notion.site/Headless-546b6edbe14544a9a6c4ab60ba307187?pvs=4" target="_blank">변경에 유연한 컴포넌트 만들기 (Headless Component)</a>
- <a href="https://moondoyeon.notion.site/7e4c0e54f6fa4879b082264ebad3f8cd?pvs=4" target="_blank">웹 성능 최적화하기(성능, SEO, 웹접근성, 보안헤더)</a>
- <a href="https://moondoyeon.notion.site/react-error-boundary-ea22c9d67b2c45ebb49e77e70c917b1d?pvs=4" target="_blank" >선언적으로 에러처리하기(react-error-boundary)</a>
- <a href="https://moondoyeon.notion.site/constants-d590d044578b4b929a0974401e8b45bf?pvs=4" target="_blank">상수데이터를 효율적인 자료구조로 개선하기</a>
- <a href="https://moondoyeon.notion.site/CI-CD-Github-Actions-Vercel-582a9ca40811474ca6df4a41933e9790?pvs=4" target="_blank">CI/CD 구축하기(Github Actions, Vercel)</a>
- <a href="https://moondoyeon.notion.site/context-API-createPortal-2b985197049e41d2af3897eca960d2f7?pvs=4" target="_blank">전역으로 모달관리하기(context API, React.Portal)</a>
- <a href="https://moondoyeon.notion.site/Jest-RTL-msw-1-cfff7b6981094d46b0efd982bad0167e?pvs=4" target="_blank">테스트 코드 작성하기 (Jest, RTL, msw)</a>
- <a href="https://moondoyeon.notion.site/Vercel-versel-json-40bb93038174424f90608251c3a72256?pvs=4" target="_blank">정적자산 캐시정책 세우기(versel.json)</a>
- <a href="https://moondoyeon.notion.site/API-Service-worker-API-cacheStorage-cbaf8de0042e4cdb8d46d0855612145e?pvs=4" target="_blank">API 응답에 대해 브라우저 캐싱 구현(Cache API from Service worker API)</a>
- <a href="https://moondoyeon.notion.site/07fa3afd7ae1486a99572532df823a7d?pvs=4" target="_blank">트러블슈팅</a>
  <br/>

**기술스택**
|역할|패키지명|
|------|---|
|**코어**|React, TypeScript|
|**스타일**|Emotion|
|**상태관리**|Context API|
|**CI/CD**|Github Actions, Vercel|
|**비동기통신**| Axios|
|**테스트**|Jest, MSW, RTL|
|**패키지매니저**|Yarn|
|**린트/포맷**|eslint, prettier|
|**API**| 영화진흥위원회 주간박스오피스 API|
|**etc**|react-error-boundary, React-Router-Dom,<br/> customize-cra, react-app-rewired|
|**문서**|Git, <a href="https://www.figma.com/file/sh7DrrBEIxXkvA36KWrDhA/random-game?type=design&node-id=402%3A2&mode=design&t=uKIy0SmEUwC5qNWZ-1">Figma</a>, Notion|

<br/>

**아키텍쳐**

![Group 88 (3)](https://github.com/Moondoyeon/random-movie-game/assets/102936206/4603b760-be42-4998-961f-a52df90021c7)

**프로젝트 설치, 테스트**

```sh
// 설치, 시작
yarn install
yarn start

// 테스트
yarn test
```
