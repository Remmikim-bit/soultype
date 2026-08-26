const STEPS = [
  {
    who: "Grok",
    body: "설정에서 데이터 내보내기. 받은 JSON을 여기 놓으면 된다.",
  },
  {
    who: "ChatGPT",
    body: "설정 · 데이터 관리 · Export. conversations JSON.",
  },
  {
    who: "Claude",
    body: "설정 · Privacy · Export data. conversations 배열.",
  },
];

export function HowExport() {
  return (
    <section className="grid gap-4">
      <h2 className="font-serif text-2xl tracking-tight">파일은 여기서 받는다</h2>
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
