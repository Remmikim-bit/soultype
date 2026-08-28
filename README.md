# 소울타입 / Soultype

대화 한 번 올리면 여러 번 분석할 수 있어요. 대화 내용은 이 기기 밖으로 나가지 않아요.

## 목록

1. **AI 자아 스캔** — 지금까지 시킨 말로, AI가 어떤 성격인지 알아봐요
2. **AI의 스트레스 지수** — 내 AI는 스트레스를 받고 있을지 알아봐요
3. **AI 궁합 테스트** — 나랑 AI는 얼마나 손발이 맞을까요?
4. **AI 조련 만렙** — 초보부터 파트너까지, 지금은 몇 렙인지 알아봐요
5. **AI 티키타카 배틀** — 90초 동안 누가 더 잘 시키는지 겨뤄 봐요
6. **AI 텐션 라이브** — 요즘 다들 무슨 말을 걸고 있는지 보여 드릴게요

간단한 답변을 넣거나, Grok / Gemini / GPT / Claude 대화 JSON을 이 기기에 올리면 돼요. 광고를 보면 결과가 열려요.

## 저장소

[Remmikim-bit/soultype](https://github.com/Remmikim-bit/soultype)

## 배포

Vercel 프로젝트 이름: `remmikim-bit-soultype`

1. [remmikim-bit-soultype](https://vercel.com/jhkims-projects-f8238bef/remmikim-bit-soultype) 프로젝트를 열어요.
2. Deployment Protection을 꺼 주세요.
3. Git 설정에서 `Remmikim-bit/soultype`을 연결하면, 이후 푸시가 자동으로 배포돼요.

선택 환경 변수:

- `VITE_AUTH_ENABLED=false`
- `XAI_API_KEY` — 있으면 성격 문장을 다듬어요. 없어도 유형은 나와요.
