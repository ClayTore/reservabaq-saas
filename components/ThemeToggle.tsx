"use client";

import { cambiarTema } from "@/lib/tema";
import { useTema } from "@/lib/useTema";

const propsIcono = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export default function ThemeToggle() {
  const tema = useTema();
  const siguiente = tema === "oscuro" ? "claro" : "oscuro";

  return (
    <button
      type="button"
      onClick={() => cambiarTema(siguiente)}
      aria-label={`Cambiar a tema ${siguiente}`}
      title={`Cambiar a tema ${siguiente}`}
      className="rounded-full border border-border p-2 text-muted transition hover:border-primary hover:text-primary"
    >
      {tema === "oscuro" ? (
        <svg {...propsIcono}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
          <path d="M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41" />
          <path d="M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg {...propsIcono}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}