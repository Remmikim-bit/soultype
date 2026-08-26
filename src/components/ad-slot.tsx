const PLACES = {
  hub: { brand: "한낮노트", line: "기록은 이 기기에만." },
  theater: { brand: "늦은우체국", line: "기다리는 동안." },
  inline: { brand: "잉크랩", line: "종이 위에 잉크만." },
} as const;

export function AdSlot({ place }: { place: keyof typeof PLACES }) {
  const ad = PLACES[place];
  return (
    <aside className="ad-slot" aria-label="광고">
      <p className="kicker">광고</p>
      <p className="font-serif text-2xl">{ad.brand}</p>
      <p className="mt-1 text-sm text-muted">{ad.line}</p>
    </aside>
  );
}
