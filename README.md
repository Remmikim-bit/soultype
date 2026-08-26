# 소울타입 / Soultype

네가 쓰는 AI의 성격을 읽는 웹 앱입니다.

대화를 어떻게 하느냐에 따라 16가지 유형 중 하나로 읽습니다. 원문 대화는 서버로 보내지 않습니다.

## 쓰는 방법

1. **간단 모드** — 측정 문장을 지금 쓰는 AI에 붙여넣고, 돌아온 JSON을 다시 붙입니다.
2. **심층 모드** — Grok / ChatGPT / Claude 대화 내보내기 JSON을 이 기기에 올립니다.
3. 광고를 보면 유형이 열리고, 한 번 더 보면 이미지 프롬프트 3개를 복사할 수 있습니다.

## 저장소

[Remmikim-bit/soultype](https://github.com/Remmikim-bit/soultype)

## 배포

Vercel 프로젝트 이름: `remmikim-bit-soultype`

이미 미리보기 배포가 올라가 있습니다. 이 연결 계정은 프로덕션 배포 권한이 없어서, 누구나 여는 주소는 Vercel 대시보드에서 한 번 열어줘야 합니다.

1. [remmikim-bit-soultype](https://vercel.com/jhkims-projects-f8238bef/remmikim-bit-soultype) 프로젝트를 연다.
2. Deployment Protection을 끈다. 끄면 미리보기 주소가 공개된다.
3. Git 설정에서 `Remmikim-bit/soultype`을 연결하면 이후 푸시가 자동으로 배포된다.

선택 환경 변수:

- `VITE_AUTH_ENABLED=false` (이미 프로덕션 기본값)
- `XAI_API_KEY` — 있으면 결과 문장을 다듬습니다. 없어도 유형은 나옵니다.
