export default function Timeline({ items, dark = false }) {
  return (
    <ol className={`relative border-l pl-6 ${dark ? "border-slate-300/20" : "border-paper-2"}`}>
      {items.map((it) => (
        <li key={it.year} className="relative pb-8 last:pb-0">
          <span
            className={`absolute -left-[1.8125rem] top-1.5 h-2 w-2 rounded-full border-2 ${
              dark ? "border-ink-800 bg-cyan-300" : "border-paper bg-brand-700"
            }`}
          />
          <span className={`u-label block ${dark ? "text-brass-300" : "text-brand-700"}`}>
            {it.year}
          </span>
          <p className={`mt-1.5 max-w-[52ch] ${dark ? "text-slate-300" : "text-slate-600"}`}>
            {it.text}
          </p>
        </li>
      ))}
    </ol>
  );
}
