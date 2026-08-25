export default function ServiceItem({ icon: Icon, name, description }) {
  return (
    <div className="flex gap-4">
      {Icon && <Icon className="mt-1 h-5 w-5 shrink-0 text-brand-700" aria-hidden />}
      <div>
        <h3 className="font-display text-graphite">{name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
    </div>
  );
}
