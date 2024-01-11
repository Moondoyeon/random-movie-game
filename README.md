## 랜덤영화뽑기

![썸네일-시작버튼](https://github.com/Moondoyeon/random-movie-game/assets/102936206/d2222e93-604c-4b3e-8c9c-bf6841d28f39)
_슬롯버튼 3개(국가, 개봉년도, 영화종류)를 누르면 영화를 추천해주는 서비스입니다._
<br/>
**URL**: [random-game-sigma.vercel.app](https://random-game-sigma.vercel.app/)
<br/>
**Github**: https://github.com/Moondoyeon/random-movie-game
<br/>
**개발기간:** 2023년 8월15일-2023년 11월4일(12주)
<br/>
**개발기여도**: 100%
<br/>
**기술스택**
<br/>
React, TypeScript, Emotion, Jest, MSW, React-Testing-Library, Github Actions, react-error-boundary, React-Router-Dom, Vercel, Yarn, Axios, eslint, prettier

## **구현내용**

### 게임로직을 재사용할 수 있는 커스텀 훅 작성

게임옵션(상수데이터)만 넘겨주면 게임동작과 관련된 state와 함수를 반환하는 커스텀 훅을 작성했습니다. 기존에는 게임로직이 페이지 컴포넌트에 존재해 복잡도가 높았고, 로직의 재사용이 어려웠습니다. 이에 훅을 작성해 게임로직을 따로 관리함으로서 가독성과 게임로직 사용성을 높였습니다.

```tsx
// 페이지컴포넌트
function GamePage() {
  const { 게임동작함수 } = useSlot(MOVIE_SLOT_OPTION); // 게임옵션전달
}
```

### Headless 개념을 적용해 변경에 유연한 코드로 리팩토링

컴포넌트 내에 css 로직을 작성해놔서 변경에 대응하기 어려웠던 기존 컴포넌트에 데이터 로직만 남기고 디자인 로직은 외부에서 주입하여 변경에 유연한 컴포넌트로 리팩토링하였습니다. [→ 학습링크](https://www.notion.so/546b6edbe14544a9a6c4ab60ba307187?pvs=21)

**사례1) Slot 컴포넌트**: 슬롯값이 360도 돌아가는 로직만 담당하게 됨
<br/>
Before

```tsx
// Slot 컴포넌트 리턴문
return (
<div css={슬롯 css1}>
  <div css={슬롯 css2}>
    <S.Slot>{opt[rotate(num+1)]}</S.Slot>
    <S.Slot>{opt[num]}</S.Slot>
    <S.Slot>{opt[rotate(num+1)]}</S.Slot>
  </div>
  <Button css={슬롯버튼 css}
  ></Button>
</div>
);
```

After

```tsx
// Slot 컴포넌트 리턴문
return (
  <>
    <div {...props}>{opt[rotate(num - 1)]}</div>
    <div {...props}>{opt[num]}</div>
    <div {...props}>{opt[rotate(num + 1)]}</div>
  </>
);
```

- 슬롯멈춤버튼을 Slot 컴포넌트 바깥에 배치함으로서, 슬롯과 슬롯버튼의 배치를 자유롭게 할 수 있습니다.
- 슬롯 스타일을 외부에서 주입하므로 Slot컴포넌트를 사용하는 입장은 CSS 변경에 대한 자유가 생깁니다.
  <br/>

**사례2) 알람모달창 Context Provider**: 모든 종류의 모달창을 열고 닫는 로직만 담당하게 됨
<br/>
Before

```tsx
// AlertModalProvider 리턴문
return (
<AlertModalContext.Provider value={{ showAlert }}>
  {children}
  {isOpen && (
    <Backdrop whiteBoard>
      <div css={알람모달 css}>
        {message}
        <Button css={알람모달버튼css}>
        </Button>
      </div>
    </Backdrop>
  )}
</AlertModalContext.Provider>
);
```

- 알람모달 css가 존재해 모달창의 데이터로직을 재사용할 수 없었습니다.<br/>
- 다른 종류의 모달을 구현하려면 새 Context를 만들어야 했습니다.

After

```tsx
// ModalProvider 내부
const [openedModals, setOpenedModals] = useState<Modals[]>([]);

// 모달창 여는 함수
const open = ({ type, props }: TestModals) => {
  setOpenedModals(modals => {
    return [...modals, { type, props, id }];
  });
};
// 모달창 닫는 함수
const close = () => {
  setOpenedModals(modals => {
    return modals.slice(0, modals.length - 1);
  });
};

// 리턴문(css 로직 없음)
return (
  <ModalDispatchContext.Provider value={dispatch}>
    <ModalContext.Provider value={openedModals}>
      {children}
      <CreatePortal /> // 모달창 렌더링 담당
    </ModalContext.Provider>
  </ModalDispatchContext.Provider>
);
```

- 열려있는 모달창을 요소로 갖는 배열state을 전역상태로 관리합니다.
- 위 컴포넌트는 모달창의 디자인, 종류에 상관없이 오직 모달창을 열고 닫는 데이터 로직만을 담당합니다.

### Context API 사용시 발생하는 불필요한 리렌더링 방지

모달창 배열state를 전역상태로 관리할때, state와 setState의 context를 분리하고, setState 함수들을 객체에 담고 해당 객체의 참조값이 바뀌지않게 useMemo를 사용했습니다. 이를 통해 직접적으로 state를 참조하지 않는(setState만 사용하는) 컴포넌트들의 불필요한 리렌더링을 방지했습니다.
[→ 학습링크](https://www.notion.so/2b985197049e41d2af3897eca960d2f7?pvs=21)

### API 응답에 대해 자체 캐싱기능 구현

제가 이용한 공공 API의 응답에 캐시제어헤더가 없었습니다. 이에 Service Worker API가 제공하는 Cache와 Cache Storage를 이용해 동일한 파라미터(국가, 개봉년도, 타입)로 API 요청을 하는 경우, 저장해 둔 HTTP 응답을 반환하는 캐싱기능을 구현해봤습니다. 캐시 개념과 동작흐름에 대해 이해할 수 있었습니다.
[→ 학습링크](https://www.notion.so/cbaf8de0042e4cdb8d46d0855612145e?pvs=21)

### React.Suspense로 비동기 통신 컴포넌트의 로딩처리

Suspense는 컴포넌트의 lazy loading을 위해 쓸 수도 있지만, 비동기 통신 컴포넌트의 요청 결과를 기다릴 때로딩 UI로도 쓸 수 있습니다. React.Suspense에 fallback 컴포넌트를 전달하여 로딩 상태를 담당하게 하고 비동기 통신 컴포넌트는 성공 상태를 담당하게 하여 관심사를 분리했습니다.
<br/>
<img width=300 src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/970f0eb2-8c74-4194-82da-4a03b47cc9d2"/>

**[트러블슈팅]** 비동기 컴포넌트가 던지는 promise를 Suspense가 감지하지 못해 fallback UI가 적용되지 않았습니다. 이에 컴포넌트 내 비동기 요청함수가 반환하는 promise를 인자로 받아 prmoise의 상태를 반환하는 함수를 작성해, Suspense가 promise상태를 감지하게 만들어 fallback UI가 표시되게 하였습니다.

```tsx
// hooks/useMovieData.ts :API 요청하는 역할
useEffect(() => {
  // 1. 비동기 요청함수는 promise를 반환한다
  const promise = getMovieList();

  // 2. promise를 Wrapper에 담아준다. Suspense가 promise 상태를 감지하게 만든다.
  setMovieList(promiseWrapper(promise));
}, []);
```

### Error Boundary로 에러 핸들링

react-error-boundary 라이브러리를 이용해 비동기 통신 컴포넌트의 에러처리를 Error Boundary가 담당하게 했습니다. 기존 명령형 로직을 선언적으로 작성하게 되어 가독성을 높였습니다. [→ 학습링크](https://www.notion.so/ea22c9d67b2c45ebb49e77e70c917b1d?pvs=21)

```tsx
return (
  <Suspense fallback={<Loading height={150} />}>
    <ErrorBoundary FallbackComponent={MovieErrorFallback} onReset={initGame}>
      <MovieGameResult /> // 비동기통신컴포넌트
    </ErrorBoundary>
  </Suspense>
);
```

전역에러와 지역에러(API에러)로 구분해 에러바운더리를 적용하고 에러 메시지를 제공해 유저가 적절한 액션을 취하도록 안내했습니다.

| [지역에러] API에러                                                                                            | [전역에러] 네트워크에러                                                                                            | [전역에러] 404에러                                                                                                     |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| ![404](https://github.com/Moondoyeon/random-movie-game/assets/102936206/cbe1a2a8-8363-43c4-9e13-ff57c869cdc7) | ![apierror](https://github.com/Moondoyeon/random-movie-game/assets/102936206/59939f7a-9423-499c-8ccc-603a57b548db) | ![networkerror](https://github.com/Moondoyeon/random-movie-game/assets/102936206/1b7b8b4e-d288-4ae4-85fb-f85eef7f3f05) |

### MSW로 API 응답을 목업하여 에러 UI 작성

msw는 네트워크 수준에서 API 응답을 모의할 수 있는 도구입니다. 에러 상태코드를 반환하는 핸들러를 작성하고 msw를 브라우저에서 활성화시켜 에러 UI를 작업했습니다. 백엔드 API가 완성되기 전에 요청 결과의 성공, 에러, 로딩상태에 대한 UI를 작업할 수 있는 편리함이 큰 장점이지 않을까 싶습니다.

### Jest, React-Testing-Library, MSW를 이용해 테스트 코드 작성

유저액션에 대해 앱이 의도대로 반응하는지 테스트하고 테스트 환경을 구축하는 설정과정을 경험하고자 테스트를 도입했습니다. 앱 사용중 발생가능 시나리오를 나열하고, 유저동작이 없거나 지엽적인 경우는 제외해 테스트 케이스를 선정했습니다. Jest 기반으로 React-Testing-Library 함수를 주로 사용하되, API 응답이 필요한 케이스는 msw를 활용했습니다.

기존 기능을 수정하거나 새 기능을 추가할때, 테스트를 돌려보면서 앱 동작에 대한 안정감을 느꼈습니다. 서비스가 클수록 테스트 코드의 중요성이 크리라는 것을 실감했습니다.
[→ 학습링크](https://www.notion.so/cfff7b6981094d46b0efd982bad0167e?pvs=21)

### Github Actions과 Vercel을 연동해 CD 구축

main 브랜치에 pull request가 발생하면, build, test 명령어를 돌리고 통과하지 못하면 PR을 close, 통과하면 Vercel과 연동시키는 action에 의해 자동배포가 이뤄지도록 자동화 프로세스를 구축했습니다. Vercel은 레포지토리를 연결해 배포하면 자동으로 CI/CD를 제공하지만 학습목적으로 직접 구현해보았습니다.
[→ 학습링크](https://www.notion.so/582a9ca40811474ca6df4a41933e9790?pvs=21)

### 웹 성능 최적화

**성능**

- 사용하지 않는 종속성과 css로직을 제거하고 이미지와 웹폰트(subset폰트 생성) 용량을 줄였습니다.
- 개발자도구-성능 탭의 느린3G 옵션을 이용해 페이지 초기 로드과정을 분석한 결과, 불필요한 UI(게임결과에 대한 로딩UI)가 렌더링됨을 발견했습니다. 게임결과 컴포넌트 코드가 React.lazy를 통해 분할되어(splitted) 임포트되는 과정에서 로딩UI가 보여지는 것이라고 판단했습니다. lazy 함수를 제거했더니 더이상 페이지 초기 로드시 상관없는 UI가 보이지 않았습니다. 이 처리로 FCP, LCP를 최소 2초 단축하였습니다.

**검색엔진 최적화**

- title 태그, opengraph 태그, robots.txt, sitemap.xml, favicon, icon 을 생성하고 검색엔진(구글, 네이버)에 사이트를 등록하였습니다.

**웹 표준과 웹 접근성**

- 가급적 시맨틱 태그로 대체했습니다.
- 버튼(게임시작버튼, 슬롯멈춤버튼 등)에 aria-label 속성을 적용해 시각장애인 유저에게 UI요소에 대한 정보를 제공했습니다.
- 게임결과창에 `role=”dialog”`속성을 추가해 게임완료 후 나타나는 결과창에 포커스 되도록 했고, `tabIndex` 속성을 적용해 결과내용에 대한 음성이 순서대로 나오게 했습니다.

**보안**

- 공격자가 자바스크립트가 담긴 파일을 다른 확장자명(ex jpg, png)으로 서버에 업로드하더라도 오직 지정된 MIME 형식만 자바스크립트로 해석하도록 `X-Context-Type-Optons:nosniff` 헤더를 적용했습니다.
- 공격자가 프레임 태그를 html에 삽입해 공격하는 것을 방지하기 위해 `X-Frame-Options:DENY` 헤더를 적용했습니다.
- 사용자의 입력값에 의해 브라우저에 스크립트를 삽입하는 것을 방지하지 위해 XSS공격이 감지되면 브라우저 페이지 렌더링을 막는 `X-XSS-Protection:1; mode=block` 헤더를 적용했습니다.
- CSP 헤더를 작성해 브라우저가 특정 출처의 리소스만 다운로드, 실행, 렌더링하도록 설정했습니다.

**결과** 웹사이트 성능 점수가 높아졌습니다. FCP, LCP, Speed Index 항목을 각 3초 이상 단축했습니다.
[→ 학습링크](https://www.notion.so/7e4c0e54f6fa4879b082264ebad3f8cd?pvs=21)
**pageSpeed Insight 결과(mobile)**

| Before                                                                                                                                                                                                                                                                    | After                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2023년 10월<br/> <img width=400 src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/54485758-078f-4d08-988a-8a157e9ac58b"/><img width=400 src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/110dcf1c-7d73-4f57-8d7e-66b53edf88c0"/> | 2023년 11월<br/><img width=400 src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/b0a24cc6-b474-4bed-8cde-e736d58a82fc"/><img width=400 src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/ee9e6621-defa-4a62-b659-e4b868096abd"/> |

### 정적자산별 캐시정책 설정

Vercel은 무료로 CDN 서비스를 제어할 수 있게 해줍니다. 이에 정적자산 성격에 따라 캐시헤더를 설정해보았습니다. Index.html은 캐시하지 않고 매 요청마다 원본서버에 요청하도록 설정했습니다. 로고, 이미지, 파비콘, 폰트, 자바스크립트는 캐시와 `immutable`을 적용하되, 코드 업데이트 등으로 인해 재배포시 캐시무효화를 통해 변경사항이 즉각 반영되도록 했습니다.

해당 작업을 통해, 캐시를 통한 성능최적화와 최신정보를 보여주는 것 사이의 균형을 찾아 적절한 캐시수명을 정하는 것의 중요성을 알게 되었습니다.
[→ 학습링크](https://www.notion.so/40bb93038174424f90608251c3a72256?pvs=21)

## 구현화면

### 게임

모든 버튼을 눌러야 영화진흥위원회 API 서버로 요청을 보내고 응답받은 결과를 보여줍니다.
<br/>
본인이 뽑은 조건(국가, 연도, 타입)을 결과창 화면에서 볼 수 있습니다.
<br/>
다시뽑기 버튼을 눌러 새로 게임을 시작할 수 있습니다.
<br/>
<img width="330" alt="do game" src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/d4a81f95-adfe-4080-b710-be97b7d8ea58">

### 게임 실패 (API 에러)

\*에러 화면은 msw 환경에서 캡쳐했습니다<br/>
<img width="330" alt="api error" src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/8766b867-e675-426d-9531-5f70fdee6065">

### 전역에러 (네트워크 에러, 서버단 에러, 404, 런타임 에러)

| 네트워크 에러                                                                                                                                  | 서버단 에러                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| <img width="330" alt="api error" src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/9026b954-56b1-4413-a290-41ce82ac51fd"/> | <img width="330" alt="api error" src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/5478f1dd-9a4d-4aab-b3a2-b298ac74f3b2"/> |

| 404에러                                                                                                                                                                                                                                                         | 그외 런타임에러                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <img width="330" alt="api error" src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/5518938d-ab57-4629-80be-448902490922"/><br/>제공하지 않는 리소스를 요청했을 때, 해당 에러페이지를 보여줍니다.<br/>버튼을 누르면 메인페이지로 이동합니다. | <img width="250" alt="api error" src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/4c26a9e7-8929-4342-b982-7502699d50c9"/><br/>원인 불명의 런타임 에러발생시, 유저의 제보를 요청하는 에러페이지를 보여줍니다.<br/>버튼을 누르면 개발자 이메일이 복사됩니다 |

### 설계

---

### UI Prototype ([Figma](https://www.figma.com/file/sh7DrrBEIxXkvA36KWrDhA/random-game?type=design&node-id=402%3A2&mode=design&t=e6peyNMyucUhsScq-1))

<img width="480" alt="ui prototype" src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/23d1aef1-ad80-4533-9fd4-439acf119bbb"/>

### 파이프라인

<img width="480" alt="pipeline" src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/be1e79ad-2d90-447e-a38b-a8aaafd5be72"/>
