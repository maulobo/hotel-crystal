"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  { src: "/about/about1.jpg", alt: "Fachada del Hotel Crystal" },
  { src: "/about/about2.jpg", alt: "Interior del hotel" },
  { src: "/about/DESA.jpg", alt: "Desayuno en el hotel" },
];

export default function OurHistory({ dictionary }) {
  return (
    <section className="px-6 py-16 md:px-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <span className="u-label text-brand-700">{dictionary.about.ourHistoryh21}</span>
        <h2 className="mt-2 text-graphite">El hotel en imágenes</h2>
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {images.map((img, i) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
            className="relative aspect-[4/3] overflow-hidden rounded-card"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
