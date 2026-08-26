import Image from "next/image";

export default function RoomCard({ image, title, beds, tag, objectPosition = "center" }) {
  return (
    <article className="group overflow-hidden rounded-card border border-paper-2 bg-white transition-shadow duration-300 hover:shadow-[0_12px_40px_-18px_rgba(11,27,43,0.35)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          style={{ objectPosition }}
        />
        {tag && (
          <span className="u-label absolute left-3 top-3 rounded-ctl bg-ink-900/80 px-2.5 py-1 text-cyan-300 backdrop-blur-sm">
            {tag}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-graphite">{title}</h3>
        <p className="mt-1.5 text-sm text-slate-600">{beds}</p>
      </div>
    </article>
  );
}
