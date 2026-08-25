export default function FactStrip({ items, tone = "dark" }) {
  const dark = tone === "dark";
  return (
    <div
      className={`grid grid-cols-2 gap-x-6 gap-y-8 border-t px-6 py-8 md:grid-cols-4 md:px-16 ${
        dark ? "border-slate-300/20 bg-ink-900" : "border-paper-2 bg-paper"
      }`}
    >
      {items.map((it) => (
        <div key={it.k} className={dark ? "border-l border-brass-400/30 pl-4" : "border-l border-paper-2 pl-4"}>
          <span className={`u-label block ${dark ? "text-slate-400" : "text-brand-700"}`}>
            {it.k}
          </span>
          <span
            className={`mt-1.5 block font-display text-base md:text-lg ${
              dark ? "text-paper" : "text-graphite"
            }`}
          >
            {it.v}
          </span>
        </div>
      ))}
    </div>
  );
}
