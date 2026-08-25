export default function ServiceItem({ icon: Icon, name, description, dark = false }) {
  return (
    <div className="flex gap-4">
      {Icon && (
        <div
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
            dark
              ? "border-brass-400/40 bg-ink-800"
              : "border-brass-400/40 bg-paper-2/60"
          }`}
        >
          <Icon className={`h-5 w-5 ${dark ? "text-cyan-300" : "text-brand-700"}`} aria-hidden />
        </div>
      )}
      <div>
        <h3 className={`font-display ${dark ? "text-paper" : "text-graphite"}`}>{name}</h3>
        <p className={`mt-1 text-sm leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>
          {description}
        </p>
      </div>
    </div>
  );
}
