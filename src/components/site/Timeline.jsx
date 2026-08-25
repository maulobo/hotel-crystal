export default function Timeline({ items }) {
  return (
    <ol className="relative border-l border-paper-2 pl-6">
      {items.map((it) => (
        <li key={it.year} className="relative pb-8 last:pb-0">
          <span className="absolute -left-[1.8125rem] top-1.5 h-2 w-2 rounded-full bg-brand-700" />
          <span className="u-label block text-brand-700">{it.year}</span>
          <p className="mt-1 max-w-[52ch] text-slate-600">{it.text}</p>
        </li>
      ))}
    </ol>
  );
}
