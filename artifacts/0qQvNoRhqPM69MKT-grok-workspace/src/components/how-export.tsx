const STEPS = [
  {
    who: "Grok",
    body: "설정에서 데이터를 내보낸 뒤, 받은 JSON을 여기에 놓아 주세요.",
  },
  {
    who: "ChatGPT",
    body: "설정 → 데이터 관리 → Export에서 conversations JSON을 받을 수 있어요.",
  },
  {
    who: "Claude",
    body: "설정 → Privacy → Export data에서 conversations 배열을 받을 수 있어요.",
  },
];

export function HowExport() {
  return (
    <section className="grid gap-4">
      <h2 className="text-[20px] font-semibold tracking-tight">대화록은 이렇게 받아요</h2>
      <ol className="grid gap-3">
        {STEPS.map((s) => (
          <li key={s.who} className="sheet p-5">
            <p className="kicker">{s.who}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
