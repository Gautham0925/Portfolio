import { FiShield } from "react-icons/fi";

export function PhotoRing() {
  return (
    <span aria-hidden="true" className="absolute left-4 top-4 inline-flex size-16 items-center justify-center rounded-full bg-black/40 text-accent backdrop-blur-sm">
      <svg viewBox="0 0 64 64" className="absolute inset-0 size-full">
        <circle
          cx="32"
          cy="32"
          r="29"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="14 22 40 28"
          style={{ animation: "dash-spin 14s linear infinite", transformOrigin: "center" }}
        />
      </svg>
      <FiShield className="size-5" />
    </span>
  );
}
