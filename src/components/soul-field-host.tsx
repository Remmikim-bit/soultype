"use client";

import { lazy, Suspense, useSyncExternalStore } from "react";
import { useAppStore } from "@/lib/store";

const SoulField = lazy(() =>
  import("@/components/soul-field").then((mod) => ({ default: mod.SoulField })),
);

const empty = () => () => {};

export function SoulFieldHost() {
  const live = useSyncExternalStore(empty, () => true, () => false);
  const view = useAppStore((s) => s.fieldView);
  if (!live) {
    return <div className="soul-field" aria-hidden="true" />;
  }
  if (new URLSearchParams(window.location.search).has("qa")) {
    return <div className="soul-field" aria-hidden="true" data-qa="field-off" />;
  }
  return (
    <Suspense fallback={<div className="soul-field" aria-hidden="true" />}>
      <SoulField
        stage={view.stage}
        axes={view.axes}
        locked={view.locked}
        quadrant={view.quadrant}
        caption={view.caption}
      />
    </Suspense>
  );
}
