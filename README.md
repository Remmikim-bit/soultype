# 소울타입 / Soultype

네가 쓰는 AI의 성격을 읽는 웹 앱입니다.

대화를 어떻게 하느냐에 따라 16가지 유형 중 하나로 읽습니다. 원문 대화는 서버로 보내지 않습니다.

## 쓰는 방법

1. **간단 모드** — 측정 문장을 지금 쓰는 AI에 붙여넣고, 돌아온 JSON을 다시 붙입니다.
2. **심층 모드** — Grok / ChatGPT / Claude 대화 내보내기 JSON을 이 기기에 올립니다.
3. 광고를 보면 유형이 열리고, 한 번 더 보면 이미지 프롬프트 3개를 복사할 수 있습니다.

## 배포

GitHub 저장소는 [Remmikim-bit/soultype](https://github.com/Remmikim-bit/soultype)입니다. Vercel에 연결하면 `npm run build`로 올라갑니다.

- 인증과 데이터베이스는 꺼져 있습니다.
- `VITE_AUTH_ENABLED=false`는 프로덕션 기본값입니다.
- `XAI_API_KEY`가 있으면 결과 문장을 다듬습니다. 없어도 유형은 나옵니다.
