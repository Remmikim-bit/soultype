const PLACES = {
  hub: { brand: "한낮노트", line: "기록은 이 기기에만 남아요.", hint: "홈 추천" },
  theater: { brand: "늦은우체국", line: "기다리는 동안 잠깐 보여 드려요.", hint: "분석 중" },
  inline: { brand: "잉크랩", line: "종이 위에 잉크만 남겨요.", hint: "이어서" },
} as const;

export function AdSlot({ place }: { place: keyof typeof PLACES }) {
  const ad = PLACES[place];
  return (
    <aside className="ad-slot" aria-label="광고">
      <div className="flex items-center justify-between gap-3">
        <p className="ad-badge">AD</p>
        <p className="text-xs text-subtle">{ad.hint}</p>
      </div>
      <p className="mt-2 text-[20px] font-semibold leading-tight">{ad.brand}</p>
      <p className="mt-1 text-[15px] text-muted">{ad.line}</p>
    </aside>
  );
}
