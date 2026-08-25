import Image from "next/image";

export default function RoomCard({ image, title, beds, tag, objectPosition = "center" }) {
  return (
    <article className="overflow-hidden rounded-card border border-paper-2 bg-white">
      <div className="relative aspect-[4/3]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-graphite">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{beds}</p>
        {tag && (
          <span className="u-label mt-3 inline-block rounded-ctl bg-paper-2 px-2 py-1 text-brand-700">
            {tag}
          </span>
        )}
      </div>
    </article>
  );
}
