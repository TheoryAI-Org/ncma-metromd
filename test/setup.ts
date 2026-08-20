import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

// next/image renders through an internal loader that needs the real Next.js
// runtime; every test gets a plain <img> instead so components using it are
// still exercised without pulling that runtime into jsdom.
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const rest = { ...props };
    // Next-only props that don't belong on a plain <img>.
    delete rest.fill;
    delete rest.priority;
    return React.createElement("img", rest);
  },
}));
