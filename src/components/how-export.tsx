const STEPS = [
  {
    who: "Grok",
    body: "설정에서 데이터 내보내기를 요청한 뒤, 받은 JSON을 여기에 놓습니다.",
  },
  {
    who: "ChatGPT",
    body: "설정 · 데이터 관리 · Export에서 conversations JSON을 받습니다.",
  },
  {
    who: "Claude",
    body: "설정 · Privacy에서 Export data를 받으면 conversations 배열이 들어 있습니다.",
  },
];

export function HowExport() {
  return (
    <section className="grid gap-4">
      <h2 className="font-serif text-2xl tracking-tight">JSON은 여기서 받습니다</h2>
      <ol className="grid gap-3">
        {STEPS.map((s) => (
          <li key={s.who} className="sheet p-5">
            <p className="kicker">{s.who}</p>
            <p className="mt-2 text-sm text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
