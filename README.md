# 소울타입 / Soultype

대화 한 번 올리면 여러 번 뜯는 사이트입니다. 원문은 서버로 보내지 않습니다.

## 목록

1. **AI 자아 스캔** — 네가 시킨 말이 만든 얼굴
2. **학대 지수** — 반말부터 세본다
3. **AI 궁합 테스트** — 나랑 AI, 연애로 보면 몇 점일까
4. **AI 조련 만렙** — 초보부터 파트너까지, 너는 몇 렙이야
5. **AI 티키타카 배틀** — 90초. 누가 더 잘 시키냐
6. **AI 텐션 라이브** — 지금 다들 무슨 말 걸고 있나

문장 하나를 넣거나, Grok / ChatGPT / Claude 대화 JSON을 이 기기에 올립니다. 광고를 보면 결과가 열립니다.

## 저장소

[Remmikim-bit/soultype](https://github.com/Remmikim-bit/soultype)

## 배포

Vercel 프로젝트 이름: `remmikim-bit-soultype`

1. [remmikim-bit-soultype](https://vercel.com/jhkims-projects-f8238bef/remmikim-bit-soultype) 프로젝트를 연다.
2. Deployment Protection을 끈다.
3. Git 설정에서 `Remmikim-bit/soultype`을 연결하면 이후 푸시가 자동으로 배포된다.

선택 환경 변수:

- `VITE_AUTH_ENABLED=false`
- `XAI_API_KEY` — 있으면 성격 문장을 다듬습니다. 없어도 유형은 나옵니다.
