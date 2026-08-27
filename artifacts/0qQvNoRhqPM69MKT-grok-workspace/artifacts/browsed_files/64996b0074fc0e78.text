# 소울타입 / Soultype — 심층 인수인계서

작성: 2026-08-26 (심층 개정).  
대상: 이 저장소를 이어받을 AI(또는 사람).  
저장소: https://github.com/Remmikim-bit/soultype (`main`)  
이 문서는 **제품 의도 + 데이터 계약 + 실패한 실험 + 절대 하지 말 것**까지 적는다. 코드만 보면 “왜 이렇게 됐는지”를 알 수 없다. 코드를 고치기 전에 0~4절과 15절을 끝까지 읽어라.

---

## 0. 이 문서를 어떻게 쓸 것인가

다음 AI는 보통 두 경로 중 하나로 온다.

1. **Grok Build 샌드박스** (`/workspace`) — 미리보기는 `0.0.0.0:8080`. 사용자는 셸이 없다. `/workspace/AGENTS.md`가 플랫폼 계약이다. `startup.sh` + `npm run dev`. 포트/경로/localhost를 사용자에게 말하지 마라.
2. **GitHub 클론만** — AGENTS의 **제품 제약**만 지키면 된다. 인증 끄기, Gemini 언급 금지, 원문 서버 금지, Remmikim-bit 커밋. 미리보기 프록시/Grok 필은 그 환경에 해당할 때만.

둘 다 **이 파일 + 코드**가 진실이다. README는 사용자용 한 장. 이 파일이 에이전트용 전체.

읽기 순서 (30분):

1. §1 한 줄, §2 주인, §3 제품, §4 절대 제약
2. `src/lib/soul-shape.ts` + `src/lib/soul-shader.ts` + `src/components/soul-field.tsx` (3D — 가장 많이 깨뜨린 곳)
3. `src/lib/store.ts` + `src/routes/index.tsx` (플로우)
4. `src/lib/relay.ts` + `src/lib/axes.ts` + `src/lib/mbti-local.ts` + `src/lib/analyze.ts` (분류)
5. `src/lib/parse-export.ts` (심층 JSON)
6. `src/styles.css` (글래스 — 가독성 이슈)
7. `scripts/ux-flow.mjs` (카피 문자열에 묶인 QA)
8. 이 문서 §15 실패 실험, §22 되돌리지 말 것, §23 열린 이슈

스크린샷/curl 200만으로 “3D가 된다”고 말하지 마라. WebGL은 동적 청크라 빈 캔버스도 HTTP 200이다.

---

## 1. 한 줄

**네가 쓰는 AI의 MBTI를 읽는, 프라이버시 우선 한국어 웹앱.**

원문 대화는 서버로 안 보낸다. 화면의 주인공은 타이포가 아니라 **뒤에 떠 있는 유체(3D)** 이고, 글자는 그 위 리퀴드 글래스다.

바이럴 문장(고정, 절대 바꾸지 마라):

> 네가 쓰는 AI의 MBTI는 {TYPE}야.

제품 이름: **소울타입 / Soultype**. 패키지명 `soultype`. 헤더 워드마크 `소울타입`.

핵심 전제 하나: 이것은 **사용자 본인의 MBTI가 아니다.** 사용자가 AI를 다루는 말버릇이 쌓여 **그 AI가 된 성격**이다. 카피·시스템 프롬프트·이미지 프롬프트 전부 이 전제를 따른다.

---

## 2. 주인 / 환경

| 항목 | 값 |
|---|---|
| 표시 이름 | URM |
| GitHub / 커밋·업로드 이름 | **항상 `Remmikim-bit`** |
| 커밋 이메일 (이미 설정됨) | `252117795+Remmikim-bit@users.noreply.github.com` |
| 저장소 | `Remmikim-bit/soultype` public `main` |
| 위치 | Seoul (IP). UI는 **한국어만**. |
| 구독 | SuperGrok |
| 앱 빌더 | Grok Build (xAI). 미리보기는 샌드박스 `0.0.0.0:8080`. 사용자는 셸·파일시스템·툴이 없다. |
| 현재 HEAD (이 문서 작성 시점) | `d229b37` “Export from Grok” (2026-08-26). 플랫폼 자동 커밋일 수 있음. |

플랫폼 자동 커밋 저자는 `Grok <grok-export@users.noreply.github.com>`이다. 에이전트가 직접 커밋할 때는 **Remmikim-bit**로 남겨라.

`.grok/app-env.json` (샌드박스):

```json
{ "VITE_AUTH_ENABLED": "false", "deploy": { "database": false } }
```

`.env.production`도 `VITE_AUTH_ENABLED=false`. 이 값이 빠지면 배포에서 인증이 켜져 **모든 방문자가 막힌다.** 인증을 “나중에 필요할지도”로 켜지 마라. 사용자는 계정/저장/공유를 요청한 적 없다.

---

## 3. 제품이 뭔지 (그리고 아닌 것)

### 맞다

- ChatGPT / Claude / Grok **대화 내보내기 JSON**을 브라우저에서 파싱한다.
- 또는 **간단 모드**: 측정 프롬프트(`RELAY_PROMPT`, 스키마 `st.v1`)를 사용자 AI에 붙여넣고, 돌아온 암호 JSON을 붙여 넣는다.
- 습관 4축으로 **사용자가 쓰는 AI의 페르소나**를 16유형에 넣는다.
- 결과를 보려면 **가짜 리워드 광고** 7초. 이미지 프롬프트 3개는 광고 한 번 더(8초).
- 뒤에 3D 유체가 성격처럼 변한다. 꼭짓점 수·각도·면 연결·크기·왜곡·늘림 — **이산 도형 전환이 아니다.**
- 프라이버시: 파싱은 이 기기. 서버로 가는 건 `UsageDigest`(집계)뿐, 그것도 사용자가 광고/분석 버튼을 눌렀을 때만.

### 아니다

- 게임이 아니다. `og:type`을 `x:game`으로 두지 마라. `browser-smoke`가 캔버스를 보고 게임 경고를 내도 **무시**. x-banner도 게임용.
- 소셜 비교 / 리더보드 / 계정 / 클라우드 저장 없음.
- n8n 백엔드 없음. 초기에 사용자가 물어봤고, “제로 비용 + 프라이버시”로 **거절된** 방향이다. 다시 제안하지 마라.
- Gemini 언급 금지. 키도 없다. 문장 다듬기는 **grok-4.5 + `XAI_API_KEY`** 만.
- 13g.fr 로고/프랑스 카피, mesh3d.gallery 브랜딩을 베끼지 마라. **언어(타이포·헤어라인)만** 참고했다가, 지금은 3D가 무대라 캔디 필은 버렸다.
- 16 캐릭터(HAL 9000 등)는 **퀴즈 라벨**이다. 초상, 팬아트, 공식 디자인을 그리지 마라. 이미지 프롬프트에도 “no character likeness”.
- 크롬에 이모지 없음.

### 한 문장으로 사용자에게 설명하는 법

미리보기에서 말해야 할 것: “뒤에 떠 있는 유체가 네가 쓰는 AI의 성격이다. 간단은 문장 하나, 심층은 내보내기 JSON. 광고를 보면 유형이 열린다.”  
말하지 말 것: 포트, localhost, 컨테이너, 워커, 셰이더, 커밋 해시.

---

## 4. 절대 제약 (어기면 제품이 깨지거나 거부됨)

1. **Auth / DB OFF.** `VITE_AUTH_ENABLED=false`. `@/lib/db` 쓰지 마라. 로그인 라우트 만들지 마라. `localStorage`/zustand만. `migrations/`의 auth SQL은 스캐폴드 잔재다. 앱 스키마를 추가하지 마라.
2. **원문 대화는 서버 금지.** `ParsedMessage.text` 배열을 `analyzeUsage`에 넣지 마라. 서버로 가는 건 `UsageDigest`뿐이다. `capDigest()`가 타이틀/토큰/프롬프트 슬라이스를 한 번 더 자른다.
3. **`XAI_API_KEY`는 서버 전용.** 브라우저/`VITE_`에 넣지 마라. 없으면 로컬 분류만으로 **완전히** 동작해야 한다. 키 없음을 에러로 보여 주지 마라.
4. **모델 `grok-4.5`.** `max_tokens: 520`, timeout 20s. 호출은 사용자 제스처(광고 CTA). 페이지 로드에서 호출 금지.
5. **한국어 UI. 크롬에 이모지 없음.** 카피는 자연 한국어. 암호 같은 문장 금지. (“장면 세 장 같은 얼굴의 인장…” 같은 쓰레기를 써서 혼났다.)
6. **16 캐릭터 이름은 퀴즈 라벨로만.** `analyze.ts`가 Grok이 이름을 바꿔도 로컬 값으로 다시 잠근다. 이 lock을 풀지 마라.
7. Grok App Builder면: `startup.sh` 유지, `npm run dev`(vite 직접 금지), `PreviewHostBridge` 유지, Grok 필/리믹스 버튼을 CSS로 숨기지 마라. `public/__grok/` 삭제 금지. `og:*`/`twitter:card`를 `__root.tsx`에 넣지 마라(PWA 주입기가 덮음).
8. **`imagine_*` 툴을 목록에 없으면 발명하지 마라.** 3D는 three.js 셰이더. 생성 이미지로 캐릭터를 그리지 마라.
9. 커밋/버셀 업로드 이름은 **Remmikim-bit**.
10. **이산 도형 사이클(구/박스/도넛/가시)로 되돌리지 마라.** §15.
11. **글자 가독성 > 3D 스펙터클.** 사용자가 마지막으로 불평한 것은 “글자가 안 보인다”. 글래스를 다시 반투명하게 만들지 마라.

---

## 5. 대화에서 사용자가 바꾼 방향 (시간순 — 이게 제품의 진짜 스펙)

코드를 보기 전에 이 순서를 알면 “왜 13g 버튼이 없나”, “왜 도넛이 없나”, “왜 글래스가 불투명한가”가 설명된다.

1. **바이럴 비주얼 앱**을 찾던 중 → 유행 사이트 해체 분석부터.
2. ChatGPT/Claude 대화 히스토리 비주얼라이저. “한국인은 남들과 비교하고 경쟁하는 걸 좋아한다” — 비교는 **보류**(백엔드 필요). 지금은 개인 리딩만.
3. 실제 Grok export JSON이 첨부됨. 파서 계약의 출발점.
4. “Web Worker로 옮기면 내가 부담하는 비용이 줄어드나?” → **아니요. UI 프리즈 방지일 뿐. 서버 비용은 그대로.** 이 오해를 다시 심지 마라.
5. “브라우저에서 파싱한다고? 백그라운드 서버는 n8n으로…” → n8n **거절**. 브라우저만.
6. 쓸 구조 + AI 분석 + **“네가 쓰는 AI의 MBTI는 ~이야”** + 광고 게이트 + 이미지 프롬프트.
7. 업그레이드: 간단 모드(프롬프트 릴레이) + 16 가상 AI 지형 4축.
8. “진짜 UI가 너무 재미없어” → 퍼레이드 확률, 락인, 블러, 2050 카피. 그다음 **암호 문장 대청소.**
9. 13g.fr UI 언어 클론(캔디 필, 헤어라인). Playwright로 UX 버그. GitHub Remmikim-bit. Vercel 폴리시.
10. mesh3d.gallery 참고 **3D 유체** (마우스 색 천천히, 뾰족/둥글/네모/도넛/물방울). 오디오는 물어봤지만 초안 재작성으로 넘어가 **미구현.**
11. “UI 디자인 초안 재작성”: 캔디 필 + 3D mashup 폐기. **3D가 무대**, 크롬은 편집 오버레이. 민트 액센트 하나. 사분면 색은 3px 인셋 바 + 3D 틴트만.
12. 버그: “뒤에 떠다니는 3D 오브젝트의 모양이 바뀌진 않고 프론트 페이지의 글자만 바뀌고 있네?” — 라벨만 사이클, 블롭은 그대로. §15.1.
13. “굳이 특정 모양을 고집할 필요는 없어. 오브젝트를 파라미터화해서… 꼭짓점의 수, 각도, 가장 가까운 꼭짓점을 잇는다, 크기… 0개 구, 1개 물방울, 4개 정사면체… 끊어서 넘어간다는 생각을 하지 말고 계속 이어지면서…”
14. “조금 더 다이나믹하게… 1개니까 시선이 집중되고, 타이포와 배경이 섞여 글자가 잘 안 보여. 글자 뒤 블러/리퀴드 글래스(살짝 무지개 프리즘)… 3D는 방향 유지하되 라바램프처럼, 모양도 더 다양하게.”
15. “다음 작업을 이어서 진행할 AI에게 인수인계서를 작성해. 깃허브 코드도 같이 줄게.” ← 지금 이 문서.

사용자가 **명시적으로 거절/폐기한 것**: n8n, 계정, Gemini, 13g 캔디 필 mashup, 이산 도형 스냅, 암호 카피, 캐릭터 초상, `x:game`.

사용자가 **아직 안 말한 것**(추측으로 넣지 마라): 실제 광고 SDK, 오디오, 비교 리더보드, 다국어, 모바일 앱.

---

## 6. 스택

| 층 | 선택 | 메모 |
|---|---|---|
| 프레임 | TanStack Start + React 19 + TanStack Router | `src/router.tsx`는 **named** `export function getRouter()`. default export/`app/` 디렉터리 거부됨 |
| 스타일 | Tailwind v4 (`@theme` in `src/styles.css`) | v3 `tailwind.config` 없음 |
| 상태 | zustand | persist 없음. 새로고침 = 게이트 |
| 검증 | zod (의존성에 있음, 앱 스키마는 수동 파서) | relay/export는 직접 파싱 |
| 3D | `three@^0.185.1` | 클라이언트 동적 import. SSR 금지 |
| 차트 | 커스텀 CSS 그리드 히트맵 | recharts는 의존성에 있으나 앱 UI는 안 씀 |
| 런타임 | Node 22 | `.nvmrc` / `engines` |
| 배포 | Vercel + Nitro (`vercel.json` `framework: null`) | Playwright 설치 스킵 |
| QA | Playwright Chromium (샌드박스에 구워져 있음) | |

엔트리 계약 (건드리면 미리보기/빌드가 죽음):

- `src/router.tsx` — `getRouter()`, `defaultErrorComponent: AppErrorComponent`. 에러 배너에서 `error.message`를 가리지 마라.
- `src/routes/__root.tsx` — 문서 셸. `lang="ko"`. 폰트 Fraunces + Spline Sans + Noto Sans/Serif KR. `<PreviewHostBridge />` + `<AuthProvider>`. `theme-color #0e0e0e`.
- `src/routes/index.tsx` — **유일한 페이지.** `createFileRoute("/")`.
- `src/styles.css` — `@import "tailwindcss"` + `button`/`[role="button"]` cursor pointer.
- `/workspace/startup.sh` — 샌드박스 재시작 계약. healthy면 exit 0, 아니면 `npm run dev` 백그라운드. `:8081` 프리뷰는 죽이도록 이미 들어 있음.

빌드 스크립트는 `vite build && npm run db:migrate`다. 마이그레이션이 없어도 migrate 스크립트는 돌아간다. **앱 테이블을 만들지 마라.**

---

## 7. 사용자 플로우 (구현된 것)

```
게이트 (mode=null)
  3D: idleParams, 풀블리드, 하단 글래스 패널
  ├─ 간단 → RelayDesk
  │     복사 RELAY_PROMPT → 사용자 AI → JSON 붙여넣기
  │     → AdGate(mbti, 7초, 브랜드 “한낮노트”)
  │     → 결과 (MbtiCard + Terrain + 프롬프트 잠금)
  │     → AdGate(prompts, 8초, 브랜드 “잉크랩”) → PromptList
  └─ 심층 → DropZone (conversations.json / 샘플)
        → StatsPanel + LockedPanel + 흐린 Terrain
        → 광고 → 결과 + 지형 피크(다른 유형 미리보기, 3D 파라미터가 미끄러짐)
처음으로 = store.reset() → 게이트
로고 클릭 = reset
헤더 “측정”(게이트에서만) = #gate-title 로 스크롤. 모드 강제 진입 아님.
```

스테이지 매핑 (`index.tsx`):

```
stage = mode === null ? "gate" : unlockedMbti ? "result" : "work"
```

`SoulFieldHost`에 넘기는 축:

```
axes = shown?.axes ?? analysis?.axes ?? null
```

`shown`은 지형 피크가 승자와 다르면 `resultFromMbti(peek)` (극 ±0.72), 아니면 실제 분석. 피크는 **미리보기**다. 잠긴 `analysis`를 바꾸지 않는다. `peek` 상태는 로컬 `useState`, zustand에 없다.

분석 타이밍:

- 심층: 파일 파싱 직후가 아니라 **“광고 보고 결과 보기”** 를 누를 때 `classifyLocal` + `analyzeUsage`. 광고가 뜨는 동안 로컬 결과가 이미 store에 들어간다. 언락 전엔 `LockedPanel`이 가린다.
- 간단: JSON 제출 시 동일. `startRelayAnalyze`.
- 둘 다 `if (analysis || status === "analyzing") return` — 광고를 닫고 다시 눌러도 재분류하지 않음. 의도.

---

## 8. 상태 (`src/lib/store.ts`)

```
mode: null | "simple" | "export"
status: "idle" | "parsing" | "ready" | "analyzing" | "error"
error, parsed, analysis
unlockedMbti, unlockedPrompts
fileLabel
```

액션 함정:

| 액션 | 하는 일 | 하지 않는 일 |
|---|---|---|
| `chooseMode(mode)` | **같은 모드면 no-op.** 다르면 전부 리셋하고 진입 | 예전엔 헤더에서 같은 모드를 누르면 결과가 날아감. 되돌리지 마라 |
| `setParsing` | export 모드 강제, 분석/언락 클리어 | |
| `setReady` | parsed + ready. 언락은 건드리지 않음 | |
| `setAnalysis` | analysis + status ready | 언락 안 함. 광고 `onComplete`가 `unlockMbti` |
| `reset` | 전부 초기화 → 게이트 | |

persist 없음. 새로고침 = 처음부터. 의도(프라이버시).

---

## 9. 데이터 / 파싱

### 9.1 심층 JSON

진입: `src/lib/parse-file.ts` → 워커 `src/workers/parse.worker.ts` → `parse-export.ts`.

한도: **40MB**. 워커 실패 시 메인 스레드 fallback (`file.text()` + `JSON.parse` + `parseExport`).

워커는 **비용 절감이 아니라 UI 프리즈 방지**다. 서버 비용을 줄이지 않는다. 사용자에게 “워커라서 공짜”라고 말하지 마라.

소스 감지 (`detectSource`): 첫 아이템 기준.

| 소스 | 판별 | 파서 | 핵심 필드 |
|---|---|---|---|
| Grok | `conversation` + `responses` | `parseGrok` | `conversations[].conversation.{id,title,create_time,modify_time}`, `responses[].response.{message,content,sender,create_time,_id}` |
| ChatGPT | `mapping` 또는 (`create_time`+`title` 있고 `chat_messages` 없음). 배열이면 ChatGPT로 추정 | `parseChatGpt` | `mapping[id].message.{author.role, content.parts, create_time}` |
| Claude | `chat_messages` 또는 `uuid`/`name` | `parseClaude` | `chat_messages[].{uuid,sender,text,created_at}` / `name` |
| unknown | 위에 안 걸림 | Grok 파서로 시도 | |

시각: **KST (+9h)** 로 일/시/요일 버킷. `toMillis`는 초/밀리초/`$date.$numberLong`를 정규화. Grok export에 Mongo `$date`가 실제로 있었다.

텍스트 추출: string / array / `{text}` / `{content}` / `{parts}` / `{contents}` 재귀.

역할: `human|user` → human, `assistant|bot|model` → assistant, 나머지 other. ChatGPT는 `other` 노드를 메시지에서 버린다.

집계 `buildStats`: 대화 수, 메시지, 인간/어시스턴트, first/last, 시간 히스토그램 24, 요일 7, 일별 `byDay`, `nightShare`(22–06), 제목 토큰(한글/영문, STOP 리스트), sampleTitles 상위 18.

`toDigest(parsed)`: **메시지를 버린다.** 분석 API로 가는 형태. `prompts`는 export digest에 기본 없음(제목/토큰/히스토그램만). 간단 모드만 `prompts`/`axes`를 넣는다.

샘플: `src/lib/demo-export.ts` `buildDemoExport()`. “샘플로 보기”. 스레드 제목이 개발 과정(n8n, Grok JSON, Tesla…)을 반영한다. 분류 결과의 고정값이 아니라 **키워드가 쌓인 가짜 기록**이다.

### 9.2 간단 JSON (`st.v1`) — `src/lib/relay.ts`

프롬프트 `RELAY_PROMPT`는 고의로 건조하다. 사용자 AI가 JSON만 내게. 설명/마크다운/코드펜스 금지라고 적혀 있지만, 파서는 펜스와 잡담을 버려 `{...}` 를 추출한다.

스키마:

```text
{"schema":"st.v1","vec":[e0,e1,e2,e3],
 "w":{"ask":p,"cmd":p,"abs":p,"con":p,"push":p,"soft":p,"plan":p,"hop":p},
 "sig":["t0","t1"], "n":int}
```

`vec` 네 칸 = 축 `ie, ns, tf, jp` 각각 **-1..+1**.

| 인덱스 | 축 | -1 | +1 |
|---|---|---|---|
| e0 | ie | 부탁·물음 (I 상전) | 명령·지시 (E 하인) |
| e1 | ns | 의미·가정 (N 몽상) | 오류·절차·수치 (S 팩트) |
| e2 | tf | 반박·논리 (T 반골) | 위로·설득 (F 세뇌) |
| e3 | jp | 계획·구조 (J 음모) | 주제점프 (P ADHD) |

관대함:

- `vec` / `vector` / `e` / `axes` 모두 받음.
- `{data:{...}}` / `{payload:{...}}` 래핑 허용.
- 네 값이 전부 0..1이면 `n*2-1`로 펼친다. (모델이 유닛 구간으로 줄 때.)
- `w`는 **지금은 분류에 안 쓴다.** 프롬프트에만 있다. 버려도 파싱은 된다. 나중에 쓰려고 남겨 둔 슬롯.
- `sig`는 digest의 sampleTitles/topTokens로 들어간다. 로컬 키워드 스코어를 보강.

`SAMPLE_RELAY`로 QA. Playwright는 “예시 JSON” 클릭 → textarea에 `st.v1`.

`classifyRelay` → `classifyFromAxes`. `n < 6` 이면 `shallow: true`.

`digestFromRelay`는 가짜 히스토그램(0) + `axes: payload.vec` + `prompts: sig`. `classifyLocal`은 `digest.axes`가 있으면 텍스트 스코어를 건너뛴다.

---

## 10. 4축과 16유형

축 의미 (`src/lib/axes.ts`, **왼쪽 = -1**):

| 키 | -1 글자 | -1 라벨 | +1 글자 | +1 라벨 | 3D에 주는 영향 |
|---|---|---|---|---|---|
| `ie` | I | 상전 | E | 하인 | `size` (E일수록 큼) |
| `ns` | N | 몽상 | S | 팩트 | N=`warp`, S=`hull`(면) |
| `tf` | T | 반골 | F | 세뇌 | T=`sharp`(각), F=`stretch`(물방울) |
| `jp` | J | 음모 | P | ADHD | P=`verts` 많음, J=`hull` |

**MBTI 글자 T는 축값 `tf < 0`. F는 `tf > 0`.** 헷갈리기 쉽다. `lettersFromAxes`가 기준.

키워드 스코어 `scoreAxesFromTexts`: 한국어 폴 단어 히트 + I/E는 요/주세요/? vs 해/하라. 긴 문장(>140)은 I 쪽으로, 짧은 문장(<40)은 E. 긴 문장(>160)은 살짝 F. 짧은 문장 + 주제점프는 P.

digest 보강 `scoreAxesFromDigest`: 대화 빈도, 짧은 인간 메시지, 밤 비율, 긴 스레드, 낮 시간대가 축을 민다. export 경로에서 원문이 없으므로 **제목+토큰+메타가 전부**다. 얕을 수 있다. `shallow` 플래그가 그걸 표시하지만 UI는 아직 크게 안 씀.

사분면 (`characters.ts`):

| id | 축 | 제목 | 틴트 토큰 | CSS |
|---|---|---|---|---|
| `in` | I-N | 철학적 지배자 | `--color-bold` `#6066ee` | `.tint-in` |
| `is` | I-S | 차가운 집행자 | `--color-true` `#e0e055` | `.tint-is` |
| `en` | E-N | 충직한 하수인 | `--color-accent` `#8ddd8d` | `.tint-en` |
| `es` | E-S | 실용적 보조자 | `--color-soft` `#faaafa` | `.tint-es` |

사분면 색은 **UI 버튼 필이 아니다.** 3D 틴트 + 카드/지형 왼쪽 3px 바만. 노란/파란 캔디 버튼을 다시 만들지 마라.

16 라벨 (이름은 고정. Grok 카피가 바꾸지 못하게 `analyze.ts`가 lock):

```
INTJ HAL 9000           INTP 매트릭스 아키텍트
INFJ 스카이넷           INFP 사만다
ISTJ 터미네이터 T-800   ISTP AUTO
ISFJ 에이전트 스미스    ISFP M3GAN
ENTJ 자르비스           ENTP C-3PO
ENFJ 울트론             ENFP 월-E
ESTJ VIKI               ESTP T-1000
ESFJ 베이맥스           ESFP TARS
```

`characterOf` 폴백은 INTP. 없는 글자가 들어오면 아키텍트가 된다.

각 캐릭터 팩: `tags[4]`(축 라벨), `oneLiner`, `how`, `ritual`, `traits[]`. 로컬 분류의 기본 카피. Grok이 있으면 oneLiner/how/ritual/traits/imagePrompts만 덮고 이름은 잠근다.

`QUADRANT_TINT` 클래스: `"sheet tint-* text-fg"` — MbtiCard와 Terrain 칸이 이걸 쓴다.

`TERRAIN_ORDER`: `in, is, en, es`.

---

## 11. 분류 파이프라인

```
간단: parseRelay → classifyFromAxes(vec)
심층: toDigest → classifyLocal
        ├ digest.axes 있으면 그대로
        ├ prompts 있으면 scoreAxesFromTexts 70% + scoreAxesFromDigest 30%
        └ 아니면 scoreAxesFromDigest
     → classifyFromAxes
광고 CTA와 동시에 analyzeUsage(digest)  (서버, grok-4.5)
     실패/무기 → 로컬 유지
     성공 → 카피만 교체, mbti/character/axes/headline/tags/quadrant 로컬 lock
```

`resultFromMbti(mbti)`: 피크용. 각 극을 **±0.72** 로 둔다. 지형에서 다른 칸을 누르면 3D 파라미터가 그 유형으로 미끄러진다. 실제 분석 축을 덮어쓰지 않음.

`axisDepth < 0.18` (또는 프롬프트 글자 < 80 / relay n<6) → `shallow: true`. UI 배지는 약함.

`fromAi: true`는 Grok이 카피를 만진 경우. 유형이 AI가 정했다는 뜻이 **아니다.**

---

## 12. Grok 다듬기 (`src/lib/analyze.ts`)

TanStack `createServerFn` POST. 클라이언트 호출:

```ts
analyzeUsage({ data: digest })
```

`.validator`가 `capDigest`: titles 16×60자, tokens 10, prompts 5×400자. **메시지 원문 필드가 digest에 없음을 유지하라.**

키 없으면 `{ ok:true, analysis: fallback, reason:"no-key" }`. HTTP 실패/abort/JSON 실패도 fallback. UI는 `reason`을 안 보여 줌.

시스템 프롬프트 요점:

- 사용자 본인 MBTI 아님.
- 4축 한국어 라벨.
- 16 이름 고정.
- headline 반드시 `네가 쓰는 AI의 MBTI는 XXXX야.`
- 이모지 금지.
- imagePrompts 3개: title 한국어 상징/작업실/초상, prompt 영어. 네온/퍼플/로고/실사 얼굴/워터마크 금지. 잉크·종이·기하.

호출 후 **명시적 lock** (이 순서가 중요):

```
parsed.mbti = fallback.mbti
parsed.characterName = fallback.characterName
parsed.typeName = fallback.characterName
parsed.quadrant = fallback.quadrant
parsed.quadrantTitle = fallback.quadrantTitle
parsed.tags = fallback.tags
parsed.headline = `네가 쓰는 AI의 MBTI는 ${fallback.mbti}야.`
parsed.axes = fallback.axes   // coerce에서 이미 fallback.axes
```

Grok이 INTJ를 ENFP로 바꿔도 화면은 로컬 INTJ. 카피만 바뀐다.

로컬 이미지 프롬프트 (`mbti-local.ts` `localPrompts`): 잉크 인장 / 빈 컨트롤룸 / 추상 기하. “no people, no logos, no character likeness”.

---

## 13. 광고 (`src/components/ad-gate.tsx`)

시뮬. 실제 광고 SDK 없음. 사용자가 실제 광고를 요청한 적 없다.

| kind | 브랜드 | 초 | 카피 |
|---|---|---|---|
| mbti | 한낮노트 | 7 | 대화 기록은 이 기기에만 남습니다. |
| prompts | 잉크랩 | 8 | 같은 캐릭터로 그리는 영어 프롬프트 3개. |

동작:

- `열기`는 `left === 0` 후에만 enable.
- **닫기는 결과를 안 줌.** `onClose`는 `setAd(null)`만. `onComplete`만 unlock.
- 타이머는 `setInterval` 1s. 탭 백그라운드에서도 돈다(의도적으로 단순).
- Playwright: `결과 열기`가 즉시 enabled면 버그. 6초 미만 해제도 버그.

광고를 닫은 뒤 다시 “광고 보고 결과 보기”를 누르면 모달은 다시 뜬다. 분석은 이미 있으므로 재호출하지 않음.

---

## 14. UI / 디자인

### 토큰 (`src/styles.css` `@theme`)

```
bg        #0e0e0e
surface   #161616
raised    #1c1c1c
fg        #f3f3f1
muted     #b4b4b0
subtle    #7c7c78
accent    #8ddd8d   ← 액션 하나. 버튼 primary, 포커스 링, 브랜드 마크
accent-fg #0e0e0e
line      #2a2a2a
true      #e0e055   ← 3D/틴트 전용
bold      #6066ee
soft      #faaafa
heat-0..4 어두운 민트 스케일 (히트맵)
```

폰트: 디스플레이 Fraunces + Noto Serif KR, 본문 Spline Sans + Noto Sans KR. h1–h3 `font-weight: 400`, tracking `-0.03em`. 대문자 트래킹 장식 없음.

`--mood`는 `html`에 3D가 매 프레임 씀. 글래스 프리즘이 따라감. `--mood-x`/`--mood-y`도 세팅되지만 CSS는 아직 `--mood`만 사용.

### 레이어 (z)

```
.soul-field     fixed z-0  pointer-events:none   풀뷰포트 WebGL
header          fixed z-50 glass-bar 알약
GateModal       fixed z-40 하단 글래스 (mb-32 — Grok 필 피함)
AdGate          fixed z-50
.overlay-col    z-10  왼쪽 max 40rem
.proscenium     모바일 38dvh / 데스크톱 5.5rem  유체 숨쉴 공간
```

워크/결과 데스크톱: `.overlay-veil`이 왼쪽에서 오른쪽으로 배경을 살짝 깔아 글래스 컬럼을 받친다. 모바일은 위 38dvh가 유체, 아래가 글.

### 글래스

`.glass` 게이트/인트로: bg 86% + blur 22px + `::after` 프리즘 opacity 0.28 `mix-blend-mode: screen`.  
`.sheet` 카드: bg 82% + blur 18px + 프리즘 0.38.  
`.glass-bar` 헤더: bg 68% 알약. 프리즘 없음.

**자식은 `z-index: 1` 필수.** `::after`가 글자를 덮는다. 예전에 프리즘이 타이포를 먹었다.

불투명도를 다시 50–70%로 내리지 마라. 사용자가 “타이포와 배경이 섞여 글자가 안 보여”라고 했다. 더 불투명하게 하면 3D가 덜 보인다 — 트레이드오프는 제목 weight 500 시험 정도만 (§23).

### 버튼

`src/components/ui/button.tsx`: `primary` 민트 필, `ghost` 헤어라인, `quiet` surface. 노란 `true` / 파란 `bold` 베리언트는 **제거됨.** 되돌리지 마라.

게이트 CTA는 버튼 컴포넌트가 아니라 `.cta-row` (헤어라인 가로열 + ArrowGlyph).

min-height 44px (`min-h-11`) 터치.

### 카피 규칙

- 자연 한국어. 한 문장에 한 뜻.
- “누가 누구를 어떻게 다루는지” 구체적으로. 은유만 쓰지 마라.
- 사용자 본인을 유형으로 부르지 마라. 주어는 AI.
- 암호/시적 꼬기 금지.

### 레거시 UI (급하지 않음)

- `simple-writer.tsx` — 예전 “문장 써서 측정” 화면. 라우트에 연결 안 됨. 지워도 됨.
- `HeroSwitch` — 13g 스타일 큰 토글. **안 씀.** `ArrowGlyph`만 살아 있다.
- `TypeMark` — MBTI 글자 SVG 인장. 퍼레이드에서 민트 필을 빼라는 피드백 이후 **화면에서 빠짐.** `BrandMark`만 헤더에 사용.

---

## 15. 3D — 가장 많은 삽질이 여기

파일:

| 파일 | 역할 |
|---|---|
| `src/lib/soul-shape.ts` | `SoulParams`, `idleParams`, `paramsFromAxes`, `paramLabel`, 색 유틸 |
| `src/lib/soul-shader.ts` | 풀스크린 SDF 레이마치 GLSL 문자열 |
| `src/components/soul-field.tsx` | three WebGLRenderer, rAF, 유니폼, 포인터 감쇠 |
| `src/components/soul-field-host.tsx` | `React.lazy` + Suspense. three를 SSR/crit-path에서 뺌 |

스테이지: `gate | work | result`. 게이트는 유체 풀블리드(오프셋 거의 0). 워크/결과는 데스크톱에서 x +0.12 (오른쪽), 모바일은 y +0.1.

### 15.1 지금 모델 (유지하라)

이산 도형(구/박스/도넛/팔면체/물방울)을 **갈아끼우지 않는다.** 한 필드를 파라미터로 민다.

```ts
type SoulParams = {
  verts: number;   // 꼭짓점 개수. 정수가 아님. 0≈구, ~1≈물방울, 4≈사면체, 그 이상 낯선 각
  sharp: number;   // 0 뭉툭 ↔ 1 칼날
  hull: number;    // 0 가시(방사 변위) ↔ 1 최근접 꼭짓점을 면으로 이은 볼록
  size: number;    // 대략 0.5–0.8
  warp: number;    // 좌표 왜곡
  stretch: number; // 1번 꼭짓점(아래) 방향 늘림 → 방울
};
```

셰이더 `field(p, form, size)`:

- `n = form.x` 0..6, `alive(n,i) = smoothstep(i, i+1, n)` — 꼭짓점 i가 **자라난다.** 스냅 없음.
- `vertDir`: 0=(0,-1,0) 아래 → n≈1이 처진 방울. 1–3이 사면체 밑면. 4=위, 5=옆.
- spike: 구 반지름 + `amp * smax(lobe_i)`. lobe = `pow(dot(dir,v), mix(2.2,14,sharp))`.
- hull: 반공간 `smax(plane_i)`. plane 거리 `size * mix(1.85, 0.54, alive)`.
- 최종 `mix(dS, dH, hull)`.
- stretch가 켜지면 y 압축 + 아래쪽 xz 확장.

라바램프 `map()`: 블롭 **3개**를 다른 중심·다른 `form` 오프셋·다른 스케일로 `smin` (k 0.28–0.32).

```
blob 0: 중심 근처, form 그대로, scale * 0.7
blob 1: 왼쪽, form+(1.25, -0.18, 0.2, 0.25), scale * 0.48
blob 2: 오른쪽, form+(-0.9, 0.22, -0.18, 0.35), scale * 0.36
```

한 점에 시선이 모이지 말라고 한 것. 겹치면 한 덩어리로 보일 수 있음 (§23).

카메라: ortho 풀스크린 쿼드. 레이 `ro.z ≈ 2.95`, `rd = normalize(vec3(uv, -1.28))`. 예전 2.28은 화면을 먹었다. 더 가까이 당기지 마라.

스텝: 데스크톱 44 / 모바일 28 (`uSteps`). 루프는 72까지 있으나 유니폼으로 자른다. 픽셀비 최대 1.6. antialias false.

조명: 몸체 틴트 + 프레넬 유리 + `cos` 이리데선스. `uPresence` 게이트 ~0.9 / 워크 0.82. miss는 배경 + 약한 글로우.

reduced-motion: `uTime=0`, 블롭 위치 고정(`blobCenter`가 t=0), 색 감쇠 tau 짧아짐.

### 15.2 아이들 / 축 매핑 (현재 수치, 바꿀 때 여기와 코드를 같이)

`idleParams(t)` — 서로소 사인, **홀드 없음**:

```
verts:  0.15 + 3.8*s(0.19) + 2.1*s(0.11)     → 대략 0.15–6
sharp:  0.06 + 0.82*s(0.15)
hull:   0.04 + 0.84*s(0.13)
size:   0.62 + 0.08*sin(0.21 t)
warp:   0.16 + 0.38*s(0.17)
stretch:0.12 + 0.78*s(0.20)
```

`paramsFromAxes`:

```
verts  = 0.8 + play*4.2 + dream*1.4 + think*0.6
sharp  = 0.1 + think*0.82 + judge*0.12
hull   = 0.06 + sense*0.72 + judge*0.28
size   = 0.58 + ((ie+1)/2)*0.18
warp   = 0.06 + dream*0.5 + feel*0.12
stretch= 0.15 + feel*0.7 + play*0.15
```

`play=max(0,jp)`, `judge=max(0,-jp)`, `dream=max(0,-ns)`, `sense=max(0,ns)`, `think=max(0,-tf)`, `feel=max(0,tf)`.

라벨 `paramLabel`은 분류가 아니라 힌트: 곡면 / 물방울 / 결정 / 유체. 게이트 상단 `.soul-form-label`. 이 글자가 바뀌는데 실루엣이 안 바뀌면 회귀다.

모핑 감쇠 (`soul-field.tsx`): idle tau 0.4, 축 있고 잠금 전 0.95, 잠금 후 0.7. `lerpParams` 매 프레임.

### 15.3 포인터 색

포인터 NDC, tau ~0.55s (reduced면 0.08).  
화면 사분면으로 accent/true/bold/soft를 섞음. 잠긴 사분면이 있으면 그 토큰으로 62%/40% 추가 믹스. colA tau 0.7, colB 0.85.

매 프레임:

```
host.style --mood
html --mood, --mood-x, --mood-y
```

글래스 프리즘이 `--mood`를 읽는다.

### 15.4 HMR / 마운트

`SoulField`의 `useEffect([])`는 셰이더 **문자열을 다시 컴파일하지 않는다.** 유니폼/GLSL을 바꿨는데 화면이 그대로면 **풀 리로드**. 호스트를 `lazy()`로 둔 이유 — 모듈 무효화가 컴포넌트를 다시 마운트한다. Playwright도 풀 리로드가 안전.

three는 클라이언트 only. SSR에서 `three`를 정적으로 import하지 마라.

`hasCanvas`가 smoke에서 false인 이유: lazy 청크 레이스. 2–3초 기다려라. 프로덕션 522kb 청크도 같다.

WebGL 생성 실패(소프트웨어 렌더러 등)는 조용히 return. 앱의 나머지(글래스 UI)는 동작해야 한다.

visibilitychange: 숨으면 rAF는 돌되 render skip. `last`를 리셋해 dt 폭주를 막음.

### 15.5 하지 마라 (이미 실패 — 되풀이하지 마라)

1. **5개 SDF를 `smin`으로 동시에 섞기**  
   항상 같은 방울. 라벨(`paramLabel`/옛 도형 이름)만 바뀜. 사용자 원문: “모양이 바뀌진 않고 프론트 페이지의 글자만 바뀌고 있네?”

2. **가중치 보간 SDF** `d = Σ w_i d_i` 를 아이들 전체에 쓰기  
   토러스 구멍이 구 SDF의 음수에 메워짐. 보간 공간에서 구멍은 살아남지 못한다. 지금은 블롭 **내부**에서 spike↔hull mix + 블롭 **간** smin.

3. **exclusive `min` + 순차 홀드/푸시**  
   도형은 읽히지만 팝한다. 사용자: “모핑이 부자연스럽다”, “끊어서 넘어간다는 생각을 하지 말고”.

4. **토러스를 XZ에 눕히기**  
   카메라가 -Z라 옆면만 보여 구멍이 안 보임. Z를 향하게 돌리면 구멍은 보이지만, (2) 때문에 다른 도형과 섞이면 다시 메워짐. **토러스 이산 도형은 폐기.**

5. **아이들 로브를 겹치게**  
   argmax 라벨이 50:50에서 뒤집혀 스크린샷/체감이 전부 블롭.

6. **캔디 필 13g 버튼(노랑/파랑) + 3D 배경**  
   사용자: 초안 재작성. 3D가 무대, 크롬은 편집 오버레이. 민트 하나만.

7. **카메라 2.28 / scale 1.14 / 모바일 1.32**  
   유체가 타이포를 먹음. 지금은 카메라 2.95, scale ~0.62–0.72, 모바일 1.08.

8. **블롭 4개 × 꼭짓점 8 × 스텝 높게**  
   Playwright 풀페이지 WebGL 스크린샷 6–20초 타임아웃. 3 × 6 × 44/28. 더 늘리려면 스텝을 깎아라.

9. **SDF 보간으로 “도넛↔구”를  Continuum 처럼 보이게 하기**  
   수학적으로 구멍이 먼저 죽는다.  Continuum은 verts/sharp/hull이지 토폴로지 전환이 아니다.

---

## 16. 페이지 오케스트레이션 디테일 (`src/routes/index.tsx`)

`"use client"` 홈. 서버 컴포넌트 아님.

심층 파싱 실패 카피: `"대화가 보이지 않습니다. Grok · ChatGPT · Claude JSON인지 확인해 주세요."`

`busy = parsing || analyzing` — RelayDesk 제출 버튼 잠금.

퍼레이드는 `unlockedMbti`일 때만, `compact`. 게이트/워크에는 안 띄움 (시선 분산 + 글래스와 겹침).

심층에서 통계는 잠금 여부와 관계없이 파싱 직후 보인다. 유형만 광고 뒤. 예전에 광고 CTA가 통계 아래에 접혀 안 보였다 → 지금은 LockedPanel을 통계 **위**에.

---

## 17. 카피 고정 문자열 (바꾸면 `scripts/ux-flow.mjs`도 바꿔라)

게이트 제목: `네가 쓰는 AI는 / 이미 성격이 있다`  
게이트 본문: `뒤에 떠 있는 유체가 그 성격이다. 말버릇이 쌓이면 갈라지고 뭉치고, 둥글거나 각이 선다.`  
게이트 간단 CTA: `간단` / `지금 쓰는 AI에게 문장 하나를 넣습니다`  
게이트 심층 CTA: `심층` / `대화 내보내기 JSON을 이 기기에서만 엽니다`

결과 헤드: `네가 쓰는 AI의 MBTI는 {mbti}야`  
간단 헤드: `이 문장을 지금 쓰는 AI에 붙이세요`  
심층 헤드: `대화 기록 JSON을 올리세요`  
드롭존: `대화 내보내기 JSON을 놓으세요`  
통계: `이 기기에서 읽은 기록`  
지형: `AI의 2050년 모습`  
잠금 유형: `네가 쓰는 AI의 유형` / `광고 보고 결과 보기`  
잠금 프롬프트: `이미지 프롬프트 3개` / `광고 보고 받기`  
광고: `한낮노트` / `잉크랩` / `닫기` / `결과 열기` / `초 후 열립니다`  
내비: `측정` / `처음으로` / `간단` / `심층`  
샘플: `예시 JSON` / `샘플로 보기`  
HowExport: `JSON은 여기서 받습니다`

ux-flow는 `getByText(..., { exact: false })`라 부분 일치. 그래도 위 핵심 구를 빼면 QA가 빨갛다.

---

## 18. 파일 지도

```
src/routes/index.tsx              페이지 오케스트레이션. 거의 모든 플로우가 여기를 통과
src/routes/__root.tsx             폰트, lang=ko, 테마색, PreviewHostBridge, AuthProvider
src/router.tsx                    getRouter()
src/styles.css                    토큰, glass/sheet, soul-field, overlay, cta-row, tint
src/lib/store.ts                  모드/분석/잠금
src/lib/types.ts                  ParsedExport, AxisScores, UsageDigest, AnalysisResult
src/lib/parse-export.ts           Grok/ChatGPT/Claude + toDigest
src/lib/parse-file.ts             워커 브리지, 40MB
src/lib/relay.ts                  st.v1 + RELAY_PROMPT + SAMPLE_RELAY
src/lib/axes.ts                   키워드 축, AXIS_META, lettersFromAxes
src/lib/mbti-local.ts             로컬 유형, resultFromMbti, localPrompts
src/lib/characters.ts             16 + QUADRANTS + QUADRANT_TINT + TERRAIN_ORDER
src/lib/analyze.ts                grok-4.5 카피, lock
src/lib/soul-shape.ts             파라미터 아이들/축 매핑/색
src/lib/soul-shader.ts            SDF 라바램프
src/lib/demo-export.ts            샘플 JSON
src/lib/og/site.json              {"title":"소울타입","card":"custom"}  — type:x:game 넣지 마라
src/components/soul-field*.tsx
src/components/gate-modal.tsx
src/components/relay-desk.tsx
src/components/drop-zone.tsx      file input은 마운트 후 렌더 (hydration)
src/components/mbti-card.tsx      결과 문장 + AxisStack + LockedPanel
src/components/axis-stack.tsx     4축 점
src/components/terrain-map.tsx    2050 지도, 피크
src/components/character-parade.tsx  마퀴 + 가짜 확률
src/components/ad-gate.tsx
src/components/stats-panel.tsx
src/components/heatmap.tsx        일별 그리드 + 시간 바. GitHub 잔디 아님, 커스텀
src/components/prompt-list.tsx
src/components/how-export.tsx
src/components/type-mark.tsx      BrandMark만 사용 중
src/components/hero-switch.tsx    ArrowGlyph만 사용 중
src/components/ui/button.tsx
src/components/simple-writer.tsx  DEAD
src/workers/parse.worker.ts
scripts/ux-flow.mjs               카피 E2E
startup.sh
vercel.json
.env.production                   VITE_AUTH_ENABLED=false
.env.example                      키는 주석
public/og.jpg
public/favicon.svg                민트 십자/대각선 원
```

손대지 마라 (플랫폼):

```
public/__grok/
server/middleware/grok-pwa.ts
scripts/grok-pwa-*
scripts/with-app-env.mjs
src/components/preview-host-bridge.tsx
src/lib/auth/*                    쓰지는 않지만 스캐폴드. 삭제하면 다른 스크립트가 깨질 수 있음
src/lib/db.ts                     import하지 마라
migrations/auth/                  앱 마이그레이션 추가 금지
```

---

## 19. QA

샌드박스:

```
npm run typecheck
npm run build
node scripts/browser-smoke.mjs          # 데스크톱+모바일. 스크린샷을 직접 읽어라
node scripts/ux-flow.mjs                # 전체 플로우. 광고 7+8초를 실제로 기다림
```

주의:

- 캔버스 동적 import라 `hasCanvas`가 가끔 false. 2–3초 더 기다려라.
- WebGL 풀페이지 스크린샷은 Playwright에서 **자주 6–20초 타임아웃**. 한 장씩, `timeout: 20000`, 체인 짧게. `fullPage: true`를 남발하지 마라. ux-flow는 `fullPage: false`.
- 모바일 390 가로 스크롤 없는지. CTA 44px.
- 콘솔 에러 0. 파일 input hydration: `DropZone`은 `useSyncExternalStore`로 마운트 후에만 `<input type=file>`.
- `BRAND WARNING`이 캔버스 보고 `x:game`을 원하면 **무시**. 게임이 아니다.
- 프로덕션 빌드 검증: `npm run preview:restart` → `:8081` → smoke `--baseline`. MIME `text/html`로 모듈이 내려오면 라우트/빌드 깨진 것.
- 셰이더를 고치면 풀 리로드 후 실루엣이 라벨과 같이 변하는지 확인. 라벨만 바뀌면 §15.5-1 회귀.

로컬에서 GitHub만 클론한 에이전트: Playwright 브라우저가 없을 수 있다. `npx playwright install chromium` 또는 스모크를 건너뛰고 수동 WebGL 확인. `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`은 **Vercel 빌드**용이다.

---

## 20. 배포

- GitHub: 이미 푸시됨. https://github.com/Remmikim-bit/soultype
- Vercel 팀 **JHKIM's projects** `jhkims-projects-f8238bef`
  - 유령 프로젝트 이름 `soultype` → 409 났음. 만들지 마라.
  - 실제 프로젝트 **`remmikim-bit-soultype`**
  - MCP/연결 계정은 프로덕션 배포 403, get/list 404/403
  - 미리보기 URL은 SSO. **주인만** Deployment Protection 해제 / Production promote / GitHub 앱을 Remmikim-bit에 연결
- `.env.production`: `VITE_AUTH_ENABLED=false` (필수)
- `vercel.json`: `framework: null`, `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install`
- `XAI_API_KEY`는 대시보드에 직접. 저장소에 넣지 마라. **`.env` 파일 생성 금지**(Grok Build 플랫폼 규칙). `.env.example`에 주석만.
- README의 대시보드 링크가 안내문. 공개 URL이 아직 안정적으로 안 열려 있을 수 있다.

코드로 SSO를 뚫을 수 없다. 사용자에게 “대시보드에서 Deployment Protection을 끄면 공개된다”고만 말하라. 우리가 대신 켤 수 없다.

---

## 21. 이미 고친 UX 버그 (되돌리지 마라)

1. `chooseMode` 같은 모드 no-op. 헤더가 결과를 지우던 버그.
2. 심층 LockedPanel을 통계 **위**에. CTA가 접혀 안 보이던 버그.
3. 헤더 “시작”이 간단 강제 진입 → 지금은 “측정” 스크롤만.
4. 파일 input 마운트 후 렌더. hydration mismatch.
5. 게이트 글래스 `mb-32` + `flex-col justify-end`. Grok 필과 CTA가 겹치던 버그. `md:pb-16`만으로는 부족했음. veil을 flex 자식으로 두던 레이아웃도 실패.
6. 글래스 자식 `z-index:1`. 프리즘이 글자를 덮던 버그.
7. 글래스 불투명도 86%/82%. 52–70%는 글자가 유체에 섞임.
8. 분석 API lock. Grok이 유형을 바꾸지 못함.
9. 광고 닫기 ≠ 언락.

---

## 22. 열린 이슈 / 다음으로 하면 좋은 것

우선순위는 **사용자 판단**. 추정만. 추측으로 큰 리팩터를 시작하지 마라. 한 가지를 고치고 스크린샷으로 확인해라.

1. **글래스 vs 유체 대비** — 86%로 올렸지만 세리프 400은 여전히 옅을 수 있음. 제목 weight만 500으로 시험 가능. 글래스를 더 불투명하게 하면 3D가 덜 보임.
2. **라바램프 가독성** — 블롭이 겹치면 한 덩어리. 위치를 더 벌리거나 2블롭+1위성.
3. **결과 화면 3D** — 축 파라미터는 물려 있으나, 라바 3블롭이 유형의 “한 얼굴”을 약하게 만들 수 있음. **결과 스테이지만 블롭 1개 + 파라미터를 세게** 하는 분기 가능. 게이트는 라바 유지. 사용자가 “1개라 시선이 집중된다”고 해서 멀티로 갔으므로, 결과에서 다시 1개로 줄일 땐 이유를 스크린샷과 함께.
4. **오디오** — mesh3d 스타일은 예전에 물어보고 초안 재작성으로 넘어감. 아직 없음. 넣을 거면 **제스처 후** AudioContext. 자동재생 금지.
5. **Vercel 프로덕션/공개 URL** — 주인 대시보드. 코드로 못 뚫음.
6. **`XAI_API_KEY` 미설정** — 로컬 카피로 동작. 다듬으려면 대시보드에 키.
7. **브랜드 카드** — `src/lib/og/site.json`에 `type: "x:game"` 넣지 마라. `public/og.jpg`는 있음.
8. **실제 광고** — 지금 시뮬. 넣으면 프라이버시/한국 광고 네트워크 이슈. 사용자가 안 말함.
9. **워커 + 거대 ChatGPT export** — 40MB 캡. 수백 MB는 메모리. 진행률 UI는 약함(“읽는 중 · filename”).
10. Playwright WebGL 스크린샷 플래키.
11. `shallow` 배지 UI가 약함. 짧은 릴레이/빈약한 export를 솔직히 보여주는 카피.
12. `w`(ask/cmd/…) 가중치는 파싱만 되고 분류에 미사용.
13. 퍼레이드 확률은 가짜(연출). 통계가 아님. 사용자가 속았다고 느끼면 빼거나 “연출”이라고 써라.
14. `simple-writer.tsx` / `HeroSwitch` 본체 삭제 — 급하지 않음.

하지 않은 것 (의도, 다시 열지 마라 除非 사용자가 말함):

- 인구통계 비교 / 리더보드
- n8n
- 계정 / 클라우드 저장
- 캐릭터 일러스트 / 팬아트
- Gemini
- 이산 도형 갤러리
- 다국어

---

## 23. 다음 에이전트 — 첫 30분 체크리스트

코드를 고치기 전에:

- [ ] `src/lib/soul-shape.ts` + `soul-shader.ts` + `soul-field.tsx`를 끝까지 읽었다. 이산 도형 분기를 되돌리지 않는다.
- [ ] 글자 가독성을 3D보다 우선한다. 글래스 86%를 이유 없이 낮추지 않는다.
- [ ] 한국어 카피를 시적으로 꼬지 않는다. 바이럴 문장을 바꾸지 않는다.
- [ ] 인증/`@/lib/db`/로그인 라우트를 켜지 않는다.
- [ ] Gemini를 언급하지 않는다.
- [ ] 원문 메시지를 `analyzeUsage`에 넣지 않는다.
- [ ] 샌드박스면 미리보기 서버를 죽이지 않는다. `startup.sh` / `npm run dev`. vite 직접 실행 금지.
- [ ] 스크린샷으로 3D **실루엣**을 확인한다. curl 200은 빈 캔버스도 통과한다. 라벨만 바뀌면 실패.
- [ ] `scripts/ux-flow.mjs` 문자열을 카피와 같이 유지한다.
- [ ] 커밋 이름은 Remmikim-bit.
- [ ] `og` type을 `x:game`으로 두지 않는다.
- [ ] Grok 필을 CSS로 숨기지 않는다. 게이트 `mb-32`를 함부로 줄이지 않는다.
- [ ] 캐릭터 얼굴을 그리지 않는다.

고친 뒤:

- [ ] `npm run typecheck` / `npm run build`
- [ ] 게이트·간단 샘플·심층 샘플을 직접 클릭 (광고 타이머 포함)
- [ ] 모바일 390 가로 스크롤 없음
- [ ] 콘솔 에러 0

---

## 24. 샘플로 바로 확인하는 법 (제품 언어)

미리보기에서:

1. 게이트에서 뒤에 유체가 천천히 갈라지고 뭉치는지. 상단 작은 라벨(곡면/물방울/결정/유체)이 바뀔 때 **실루엣도** 바뀌는지.
2. **간단** → **예시 JSON** → **광고 보고 결과 보기** → 7초 → **결과 열기**. 헤드가 “네가 쓰는 AI의 MBTI는 …야”.
3. 지형에서 다른 이름을 누르면 유체가 미끄러지는지.
4. **처음으로** → **심층** → **샘플로 보기** → 통계가 보이고 유형은 잠겨 있는지.
5. 광고를 **닫기**로 끄면 결과가 새지 않는지.

SAMPLE_RELAY 축은 대략 E / S / T / P (`[0.46, 0.58, -0.41, 0.37]`) → ESTP 근처 (T-1000). 샘플 export는 키워드에 따라 달라질 수 있음.

---

## 25. 한 줄로 다시

소울타입은 **쓰는 AI의 성격**을 읽는 한국어 웹앱이다. 무대는 파라미터화된 3D 유체, 글자는 리퀴드 글래스, 유형은 로컬 4축, Grok은 카피만, 원문은 기기에만 남는다. 이산 도형으로 되돌리지 말고, 글자를 유체에 다시 빠뜨리지 마라.

끝.
