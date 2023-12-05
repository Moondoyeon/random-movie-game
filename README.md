# 랜덤영화뽑기

## 프로젝트 개요

- 777 게임으로 영화를 뽑는 서비스입니다.
- 프로덕트 개발의 모든 단계를 경험하고, 깊게 학습하기 위한 프로젝트 입니다.
- 사실 게임 기능을 구현하는 기간은 일주일 정도 소요됐습니다만, 이외에 캐싱, 테스트, 에러핸들링, CI/CD, 성능최적화와 같이 생명력 있는 프로덕트를 만들기 위한 처리들을 어떻게 해야 잘 적용할 수 있을지 방법들을 찾아보고 고민하고 선택하고 학습하고 적용하는 기간이 많이 걸렸습니다 :)
- 학습과정을 기록으로 남겼으니 여유가 되신다면 읽어주시면 감사하겠습니다

  - <a href="https://moondoyeon.notion.site/Headless-546b6edbe14544a9a6c4ab60ba307187?pvs=4" target="_blank">변경에 유연한 컴포넌트 만들기 (Headless Component)</a>
  - <a href="https://moondoyeon.notion.site/context-API-createPortal-2b985197049e41d2af3897eca960d2f7?pvs=4" target="_blank">전역에서 모달관리하기(context API, React.Portal)</a>
  - <a href="https://moondoyeon.notion.site/API-Service-worker-API-cacheStorage-cbaf8de0042e4cdb8d46d0855612145e?pvs=4" target="_blank">API 응답에 대해 브라우저 캐싱 구현(Cache API from Service worker API)</a>
  - <a href="https://moondoyeon.notion.site/constants-d590d044578b4b929a0974401e8b45bf?pvs=4" target="_blank">상수데이터를 효율적인 자료구조로 개선하기</a>
  - <a href="https://moondoyeon.notion.site/react-error-boundary-ea22c9d67b2c45ebb49e77e70c917b1d?pvs=4" target="_blank" >선언적으로 에러처리하기(react-error-boundary)</a>
  - <a href="https://moondoyeon.notion.site/Jest-RTL-msw-1-cfff7b6981094d46b0efd982bad0167e?pvs=4" target="_blank">테스트 코드 작성하기 (Jest, RTL, msw)</a>
  - <a href="https://moondoyeon.notion.site/CI-CD-Github-Actions-Vercel-582a9ca40811474ca6df4a41933e9790?pvs=4" target="_blank">CI/CD 구축하기(Github Actions, Vercel)</a>
  - <a href="https://moondoyeon.notion.site/7e4c0e54f6fa4879b082264ebad3f8cd?pvs=4" target="_blank">웹 성능 최적화하기(성능, SEO, 웹접근성, 보안헤더)</a>
  - <a href="https://moondoyeon.notion.site/Vercel-versel-json-40bb93038174424f90608251c3a72256?pvs=4" target="_blank">정적자산 캐시정책 세우기(versel.json)</a>
  - <a href="https://moondoyeon.notion.site/07fa3afd7ae1486a99572532df823a7d?pvs=4" target="_blank">트러블슈팅</a>
    <br/>

## 설계사항

### UI 프로토타입 (<a href="https://www.figma.com/file/sh7DrrBEIxXkvA36KWrDhA/random-game?type=design&node-id=402-2&mode=design&t=1XtMEZqx7wKQA1ma-0" target="_blank">Figma</a>)

<img width="550" alt="UI prototype" src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/e6205444-8fc5-4fd1-b919-42fe7c87c050"/>

### 컴포넌트 구조 설계

기능을 구현하기 전에 state 흐름이 올바를지 예상하기 위해 설계하였습니다.
<img width="550" alt="컴포넌트구조" src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/efedf0a0-c270-469f-97e1-a374a9d1ecd9">

### 폴더구조

```
src/
├── api // API 호출 함수
├── components // 컴포넌트의 역할에 따라 하위 폴더 생성 및 구분
│   ├── @common // 버튼, 로딩스피너 등 공통 UI 컴포넌트
│   ├── @helper // 도메인 로직에 특화되지 않는 컴포넌트
│   └── @layout // 헤더, 바텀 등 레이아웃 컴포넌트
├── constants // 정적 데이터
├── context // 전역에 쓰는 react context
├── hooks // 공통으로 사용하는 hooks
├── mock  // msw 설정
├── pages // 라우트 최상위 컴포넌트
├── style // 전역 CSS 스타일 설정
├── test  // 테스트
├── types // 타입 정의
└── utils // 공통으로 사용하는 함수
```

### 파이프라인

<img width="550" src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/4603b760-be42-4998-961f-a52df90021c7"/>

## 기술스택

| 역할             | 패키지명                                                |
| ---------------- | ------------------------------------------------------- |
| **코어**         | React, TypeScript                                       |
| **스타일**       | Emotion                                                 |
| **상태관리**     | Context API                                             |
| **CI/CD**        | Github Actions, Vercel                                  |
| **비동기통신**   | Axios                                                   |
| **테스트**       | Jest, React-Testing-Library, MSW                        |
| **에러핸들링**   | react-error-boundary                                    |
| **패키지매니저** | Yarn                                                    |
| **린트/포맷**    | eslint, prettier                                        |
| **etc**          | React-Router-Dom,<br/> customize-cra, react-app-rewired |
| **문서**         | Git, Figma, Notion                                      |

## 고민한 점

### Headless Component 구현

- 컴포넌트 내부에 UI로직이 고정돼 있어 디자인 변경이 어려운 컴포넌트를 변경에 유연하도록 만들기 위해 고민했습니다.
- Headless 개념을 적용해 Slot 컴포넌트 내부에는 데이터로직만 남기고, UI 로직은 외부에서 주입하므로 변경에 유연하게 대응할 수 있습니다. 해당 컴포넌트의 재사용성을 높였습니다.

```tsx
function MovieGamePage() {
  // 생략
  return (
    <section>
      <div css={slot.container}>
        {Object.entries(MOVIE_SLOTOPTION).map(([name, option]) => {
          return (
            <div key={name} css={slot.flexColumn}>
              <div css={slot.spinningSquare}>
                <Slot
                  name={name}
                  option={option}
                  isFirstEntry={isFirstEntry}
                  isSpinning={isSpinning}
                  getSelectedOption={getSelectedOption}
                  css={slot.spinningText}
                />
              </div>
              <Button
                aria-label={name}
                disabled={!isSpinning[name]}
                onClick={stopSpinning(name)}
                css={slot.button}
              ></Button>
            </div>
          );
        })}
      </div>
      // 생략
    </section>
  );
}
```

### 에러핸들링

- 비동기 통신 컴포넌트는 성공상태에만 집중하고 로딩상태, 에러상태는 상위컴포넌트인 Suspense, ErrorBoundary가 처리함으로서 관심사를 분리하고 가독성을 높였습니다.

```tsx
function MovieGamePage() {
  // 생략

  return (
    <section>
      <Suspense fallback={<Loading whiteBoard height={150} />}>
        <ErrorBoundary
          FallbackComponent={MovieErrorFallback}
          onReset={initEntrtyNSelection}
        >
          <MovieGameResult
            selected={selected}
            initEntrtyNSelection={initEntrtyNSelection}
          />
        </ErrorBoundary>
      </Suspense>
      // 생략
    </section>
  );
}
```

### 캐시헤더가 없는 API 응답에 브라우저 캐싱 구현

- Service Worker API의 Cache API, Cache Storage API를 이용해 동일한 URL 요청이 있을 경우 캐싱 데이터를 사용하므로 불필요한 네트워크 요청을 줄이고 게임결과창을 빠르게 보여줄 수 있습니다.

```tsx
export class CacheApi {
  // 컴포넌트에서 사용하는 함수
  static async getMovieData(params: MovieApiParams) {
    const cache = await caches.open(this.movieCacheStorage);
    const cachedResponse = await cache.match(url);

    // 스토리지용량 초과시 캐시삭제
    this.removeCacheForStorageAvailable(cache);

    // 캐시만료시 or 매치된 url이 없을시 네트워크 요청
    if ((await this.isCacheExpired(cachedResponse)) || !cachedResponse) {
      await cache.delete(url);
      return this.FetchDataAddCacheHeader(cache, params, url);
    }
    // 캐시반환
    return JSON.parse(await cachedResponse.text()).data;
  }
  // 생략
}
```

### 전역에서 모달관리하기

- useContext를 이용해 열려있는 모달리스트 state를 전역상태로 관리합니다. 모달을 사용할 컴포넌트는 모달 종류와 알맞은 prop을 전달해주면 됩니다.
- state와 setState의 context를 분리하고 useMemo를 사용해 직접적으로 state를 참조하지 않는 컴포넌트의 불필요한 리렌더링을 방지했습니다.

```tsx
function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { openModal } = useModal();
  // 생략

  if (error.code === 'ERR_NETWORK') {
    openModal({
      type: 'alert', // 모달종류
      props: { title: '앗...😰', message: ERROR_MESSAGE[998], btnText: '닫기' },
    });
    resetErrorBoundary();
    return;
  }
  // 생략
}
```

```tsx
export const ModalContext = createContext<TestModals[]>([]);
export const ModalDispatchContext = createContext({
  open: ({ type, props }: TestModals) => {},
  close: () => {},
});
export const useModalContext = () => useContext(ModalContext);
export const useModalDispatchContext = () => useContext(ModalDispatchContext);

function ModalProvider({ children }: { children: ReactNode }) {
  const [openedModals, setOpenedModals] = useState<TestModals[]>([]);

  const open = ({ type, props }: TestModals) => {
    const KEY = Math.random().toString(36).substring(2);
    setOpenedModals(modals => {
      return [...modals, { type, props, id: `${type}${KEY}` }];
    });
  };
  const close = () => {
    setOpenedModals(modals => {
      return modals.slice(0, modals.length - 1);
    });
  };

  const dispatch = useMemo(() => ({ open, close }), []);

  return (
    <ModalDispatchContext.Provider value={dispatch}>
      <ModalContext.Provider value={openedModals}>
        {children}
        <CreatePortal />
      </ModalContext.Provider>
    </ModalDispatchContext.Provider>
  );
}
```

## 구현화면

### 게임 결과 - 성공

- 모든 버튼을 눌러야 영화진흥위원회 API 서버로 요청을 보내고 응답받은 결과를 보여줍니다.
- 본인이 뽑은 조건(국가, 연도, 타입)을 결과창 화면에서 볼 수 있습니다.
- 다시뽑기 버튼을 눌러 새로 게임을 시작할 수 있습니다.

![성공](https://github.com/Moondoyeon/random-movie-game/assets/102936206/2b50e4e6-c1a3-4863-9b2c-118565559891)

### 게임 결과 - 실패(API 에러)

- API에러가 발생했을 때, 전역에러가 아닌 경우 게임 실패 결과창을 보여줍니다.
- 에러 UI 화면은 msw를 활용한 개발환경을 이용해 캡쳐했습니다

![APIError](https://github.com/Moondoyeon/random-movie-game/assets/102936206/86f0d873-f656-4738-b3b2-d2b3b470e2ff)

### 게임 결과 - 실패(네트워크 에러)
- 네트워크 에러가 발생했을 때, 해당 에러 모달 UI를 보여줍니다.

![networkError](https://github.com/Moondoyeon/random-movie-game/assets/102936206/f47b348f-6ebd-4da1-be2f-791f9db9b329)

### 게임 결과 - 실패(서버 에러)
- 서버 에러가 발생했을 때, 해당 에러 모달 UI를 보여줍니다.
  
![serverError](https://github.com/Moondoyeon/random-movie-game/assets/102936206/3d23b9c6-926d-4727-9cd2-b678aa377275)

### 에러페이지 - 404에러
- 제공하지 않는 리소스를 요청했을 때, 해당 에러페이지를 보여줍니다.
- 버튼을 누르면 메인페이지로 이동합니다.

<img width="440" alt="404에러페이지" src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/6dff3685-58b0-4c5f-ab72-2fe21ed72bf9"/>

### 에러페이지 - 원인불명의 런타임에러
- 원인 불명의 런타임 에러발생시, 유저의 제보를 요청하는 에러페이지를 보여줍니다.

<img width="440" alt="원인불명의 런타임에러페이지" src="https://github.com/Moondoyeon/random-movie-game/assets/102936206/701ca32e-1f61-4fa5-ad03-5906e9bf1414"/>

## 프로젝트 설치, 테스트

```sh
// 설치, 시작
yarn install
yarn start

// 테스트
yarn test
```
