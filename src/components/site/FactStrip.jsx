export default function FactStrip({ items, tone = "dark" }) {
  const dark = tone === "dark";
  return (
    <div
      className={`grid grid-cols-2 gap-y-6 border-t px-6 py-6 md:grid-cols-4 md:px-16 ${
        dark ? "border-slate-300/20 bg-ink-900" : "border-paper-2 bg-paper"
      }`}
    >
      {items.map((it) => (
        <div key={it.k}>
          <span className={`u-label block ${dark ? "text-slate-400" : "text-brand-700"}`}>
            {it.k}
          </span>
          <span
            className={`mt-1 block font-display text-base ${
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
