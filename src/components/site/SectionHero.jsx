import Image from "next/image";

export default function SectionHero({ image, alt, title, eyebrow, priority = false }) {
  return (
    <section className="relative h-[clamp(260px,42vh,420px)] overflow-hidden bg-ink-900">
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,27,43,.62) 0%, rgba(11,27,43,.42) 45%, rgba(11,27,43,.88) 100%)",
        }}
      />
      <div className="relative flex h-full flex-col justify-end px-6 pb-10 md:px-16 md:pb-14">
        {eyebrow && <span className="u-label mb-3 text-cyan-300">{eyebrow}</span>}
        <h1 className="text-paper">{title}</h1>
      </div>
    </section>
  );
}
