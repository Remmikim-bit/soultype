# 소울타입 / Soultype

대화 한 번 올리면 여러 번 뜯는 사이트입니다. 원문은 서버로 보내지 않습니다.

## 목록

1. **AI 자아 스캔** — 내 프롬프트가 만들어낸 AI의 유니크한 자아 찾기
2. **학대 지수** — 반말부터 세본다
3. **AI 궁합 테스트** — 나랑 AI, 연애 상대로는 몇 점일까?
4. **AI 조련 만렙 측정기** — 초보 챗봇부터 능숙한 파트너까지, 내 활용 등급은?
5. **AI 티키타카 배틀** — 나와 AI의 핑퐁 대화, 과연 승자는?
6. **실시간 AI 텐션 라이브** — 지금 이 순간, 내 AI는 무슨 생각 중일까?

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
