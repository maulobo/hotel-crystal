"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Coffee, Wifi, ConciergeBell, Package, ClockArrowDown, ArrowRight } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import FactStrip from "@/components/site/FactStrip";
import RoomCard from "@/components/site/RoomCard";
import ServiceItem from "@/components/site/ServiceItem";
import Prose from "@/components/site/Prose";

const redes = [
  {
    text: "Av. Olascoaga 268, Q8300 Neuquén Capital",
    icon: MapPin,
    href: "https://maps.google.com/?q=Av.+Olascoaga+268,+Neuquén",
  },
  {
    text: "299-6263856",
    icon: IconBrandWhatsapp,
    href: "https://api.whatsapp.com/send/?phone=2996263856&text&type=phone_number&app_absent=0",
  },
  {
    text: "crystalneuquen@yahoo.com.ar",
    icon: Mail,
    href: "mailto:crystalneuquen@yahoo.com.ar",
  },
];

const featuredServices = [
  { icon: Wifi, name: "Wifi", description: "Conectividad en todo el hotel." },
  { icon: ConciergeBell, name: "Conserjería", description: "Atención personalizada las 24 horas." },
  { icon: Coffee, name: "Desayuno", description: "Express, en Confitería Azúcar junto al hotel." },
  { icon: Package, name: "Recepción de paquetería", description: "Recibimos tu correo con seguridad." },
  { icon: ClockArrowDown, name: "Late Check-Out", description: "Hasta las 18:00, sujeto a disponibilidad." },
];

function Hero({ dictionary }) {
  return (
    <section className="relative h-[clamp(460px,92vh,820px)] overflow-hidden bg-ink-900">
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        poster="/vid-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
      >
        <source src="/vid.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 hidden motion-reduce:block">
        <Image src="/vid-poster.jpg" alt="" fill priority className="object-cover" />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,27,43,.74) 0%, rgba(11,27,43,.42) 40%, rgba(11,27,43,.96) 100%)",
        }}
      />
      <div className="u-texture-dark absolute inset-0" />

      <div className="relative flex h-full flex-col justify-center px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/logo-blanco.png"
            alt="Hotel Crystal"
            width={120}
            height={120}
            priority
            className="mb-8"
          />
          <span className="u-eyebrow mb-5 text-brass-300">Neuquén Capital · desde 1966</span>
          <h1 className="max-w-[18ch] text-paper">
            Una casa <em className="font-normal italic text-cyan-300">en el centro</em> de la ciudad
          </h1>
          <p className="mt-6 max-w-[42ch] text-sm font-light text-slate-300 md:text-base">
            Tres generaciones de hotelería familiar, a cinco cuadras de todo lo que vinieras a
            hacer a Neuquén.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="#habitaciones" className="u-btn-primary">
              Ver habitaciones
            </Link>
            <Link href="#contacto" className="u-btn-ghost">
              Consultar
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="mb-12 flex items-end justify-between gap-6">
      <div>
        <span className="u-eyebrow text-brand-700">{eyebrow}</span>
        <h2 className="mt-4 text-graphite">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export default function HomeMain({ dictionary, lang }) {
  const rooms = dictionary.rooms.roomsCards;

  const roomMeta = [
    { beds: "1 cama individual", tag: "Standard / Superior", objectPosition: "center 30%" },
    { beds: "2 camas o 1 matrimonial", tag: "Standard / Superior" },
    { beds: "3 camas o matrimonial + individual", tag: "Standard / Superior" },
    { beds: "Hasta 4 camas", tag: "Standard", objectPosition: "center 30%" },
  ];

  return (
    <>
      <Hero dictionary={dictionary} />

      <FactStrip
        tone="dark"
        items={[
          { k: "Check-in", v: "12:00" },
          { k: "Check-out", v: "10:00" },
          { k: "Conserjería", v: "24 horas" },
          { k: "Habitaciones", v: "45 · 99 plazas" },
        ]}
      />

      <section id="habitaciones" className="px-6 py-20 md:px-16 md:py-28">
        <SectionHeading
          eyebrow="Habitaciones"
          title="Un lugar para descansar"
          action={
            <Link
              href={`/${lang}/rooms`}
              className="hidden items-center gap-2 text-sm font-medium text-brand-700 hover:text-blue-600 md:inline-flex"
            >
              Ver todas <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((room, i) => (
            <RoomCard
              key={room.title}
              image={room.images[i === 1 || i === 2 ? 1 : 0]}
              title={room.title}
              beds={roomMeta[i].beds}
              tag={roomMeta[i].tag}
              objectPosition={roomMeta[i].objectPosition}
            />
          ))}
        </div>
        <Link
          href={`/${lang}/rooms`}
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-blue-600 md:hidden"
        >
          Ver todas las habitaciones <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="u-texture-dark border-t border-slate-300/10 bg-ink-900 px-6 py-20 md:px-16 md:py-28">
        <div className="mb-12">
          <span className="u-eyebrow text-brass-300">Servicios</span>
          <h2 className="mt-4 text-paper">Pensado para el que viaja por trabajo</h2>
        </div>
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s) => (
            <div key={s.name} className="rounded-card border border-slate-300/10 bg-ink-800/40 p-6">
              <ServiceItem icon={s.icon} name={s.name} description={s.description} dark />
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 md:px-16 md:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="u-eyebrow text-brand-700">El hotel</span>
            <h2 className="mt-4 text-graphite">Una familia, una ciudad</h2>
            <Prose className="mt-6">
              <p className="text-lg font-light text-graphite">
                {dictionary.about.historyIntro[0]}
              </p>
              <p className="mt-4">{dictionary.about.historyIntro[1]}</p>
            </Prose>
            <Link
              href={`/${lang}/about`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-blue-600"
            >
              Conocer la historia <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-card border border-paper-2 shadow-[0_20px_60px_-30px_rgba(11,27,43,0.4)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.5119845800255!2d-68.06132092406025!3d-38.957975871711255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a34a9cb8dea9b%3A0xcc9bddd5fd58bbe9!2sCRYSTAL%20SRL!5e0!3m2!1ses-419!2sar!4v1736342715046!5m2!1ses-419!2sar"
              className="h-80 w-full md:h-full md:min-h-[420px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section id="contacto" className="border-t border-paper-2 bg-paper px-6 py-20 md:px-16 md:py-28">
        <div className="mb-12">
          <span className="u-eyebrow text-brand-700">Contacto</span>
          <h2 className="mt-4 text-graphite">Estamos en el centro</h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            {redes.map((red) => {
              const external = red.href.startsWith("http");
              return (
                <a
                  key={red.text}
                  href={red.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 text-graphite transition-colors hover:text-brand-700"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brass-400/40 bg-paper-2/60">
                    <red.icon className="h-5 w-5 text-brand-700" />
                  </span>
                  <span>{red.text}</span>
                </a>
              );
            })}
          </div>
          <div className="flex flex-col items-start gap-4">
            <p className="max-w-[40ch] text-slate-600">
              Escribinos por WhatsApp o llamanos. Si estás cerca, pasá a saludar.
            </p>
            <Link href={`/${lang}/contact`} className="u-btn-dark mt-2">
              <Phone className="h-4 w-4" />
              {dictionary.home.contact}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
