"use client";

import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import RevealStagger from "@/components/site/RevealStagger";

const images = [
  { src: "/about/about1.jpg", alt: "Fachada del Hotel Crystal" },
  { src: "/about/about2.jpg", alt: "Interior del hotel" },
  { src: "/about/DESA.jpg", alt: "Desayuno en el hotel" },
];

export default function OurHistory({ dictionary }) {
  return (
    <section className="px-6 py-20 md:px-16 md:py-28">
      <Reveal>
        <h2 className="text-graphite md:text-5xl">
          El hotel <em className="italic text-brand-700">en imágenes</em>
        </h2>
      </Reveal>

      <RevealStagger className="mt-12 grid gap-6 md:grid-cols-3">
        {images.map((img) => (
          <div
            key={img.src}
            className="group relative aspect-[4/3] overflow-hidden rounded-card"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}
