export function HeroFallback() {
  return (
    <svg viewBox="0 0 480 360" className="size-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g stroke="var(--border-strong)" strokeWidth="1" fill="none">
        <path d="M40 60 L120 120 L90 220 L190 290" />
        <path d="M120 120 L220 70 L330 90 L420 40" />
        <path d="M330 90 L400 170 L440 260 L360 310" />
        <path d="M90 220 L40 300" />
        <path d="M400 170 L330 230 L360 310" />
      </g>
      <g fill="var(--accent)">
        {[
          [40, 60],
          [120, 120],
          [90, 220],
          [190, 290],
          [220, 70],
          [330, 90],
          [420, 40],
          [400, 170],
          [440, 260],
          [360, 310],
          [40, 300],
          [330, 230],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" />
        ))}
      </g>
      <g fill="none" strokeLinejoin="round">
        <path d="M240 78 C268 94 296 98 304 100 L304 180 C304 230 276 262 240 280 C204 262 176 230 176 180 L176 100 C184 98 212 94 240 78 Z" stroke="var(--accent)" strokeWidth="2" fill="var(--accent-soft)" />
        <path d="M240 112 C258 122 276 126 282 127 L282 180 C282 214 264 236 240 248 C216 236 198 214 198 180 L198 127 C204 126 222 122 240 112 Z" stroke="var(--info)" strokeWidth="1.5" />
      </g>
      <circle cx="240" cy="172" r="12" fill="var(--info)" />
      <rect x="235" y="176" width="10" height="26" rx="2" fill="var(--info)" />
    </svg>
  );
}
