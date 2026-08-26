"use client";

import { createFileRoute } from "@tanstack/react-router";
import { TestPage } from "@/components/test-page";

export const Route = createFileRoute("/abuse")({
  component: () => <TestPage slug="abuse" />,
});
