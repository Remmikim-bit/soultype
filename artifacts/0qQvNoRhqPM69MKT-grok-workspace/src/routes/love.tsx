"use client";

import { createFileRoute } from "@tanstack/react-router";
import { TestPage } from "@/components/test-page";

export const Route = createFileRoute("/love")({
  component: () => <TestPage slug="love" />,
});
