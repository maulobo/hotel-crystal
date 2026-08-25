import Image from "next/image";

export default function SectionHero({ image, alt, title, eyebrow, priority = false }) {
  return (
    <section className="relative h-[clamp(300px,48vh,460px)] overflow-hidden bg-ink-900">
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
            "linear-gradient(180deg, rgba(11,27,43,.60) 0%, rgba(11,27,43,.32) 42%, rgba(11,27,43,.94) 100%)",
        }}
      />
      <div className="u-texture-dark absolute inset-0" />
      <div className="relative flex h-full flex-col justify-end px-6 pb-12 md:px-16 md:pb-16">
        {eyebrow && (
          <span className="u-eyebrow mb-4 text-brass-300">{eyebrow}</span>
        )}
        <h1 className="max-w-[20ch] text-paper">{title}</h1>
        <div className="u-hairline mt-6 w-24" />
      </div>
    </section>
  );
}
