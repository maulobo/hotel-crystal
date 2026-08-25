"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Coffee, Wifi, ConciergeBell, Package, ClockArrowDown } from "lucide-react";
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
  { icon: ConciergeBell, name: "Conserjería", description: "Atención las 24 horas." },
  { icon: Coffee, name: "Desayuno", description: "Incluido en Confitería Azúcar, junto al hotel." },
  { icon: Package, name: "Recepción de paquetería", description: "Recibimos tu correo con seguridad." },
  { icon: ClockArrowDown, name: "Late Check-Out", description: "Hasta las 18:00, sujeto a disponibilidad." },
];

function Hero({ dictionary }) {
  return (
    <section className="relative h-[clamp(420px,88vh,760px)] overflow-hidden bg-ink-900">
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
            "linear-gradient(180deg, rgba(11,27,43,.72) 0%, rgba(11,27,43,.40) 38%, rgba(11,27,43,.93) 100%)",
        }}
      />

      <div className="relative flex h-full flex-col justify-center px-6 md:px-16">
        <Image
          src="/logo-blanco.png"
          alt="Hotel Crystal"
          width={132}
          height={132}
          priority
          className="mb-6"
        />
        <span className="u-label mb-4 self-start rounded-full border border-cyan-300/40 px-3 py-1.5 text-cyan-300">
          Neuquén Capital · desde 1966
        </span>
        <h1 className="text-paper">{dictionary.home.h2}</h1>
      </div>
    </section>
  );
}

export default function HomeMain({ dictionary, lang }) {
  const rooms = dictionary.rooms.roomsCards;

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

      <section className="px-6 py-16 md:px-16 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="u-label text-brand-700">Habitaciones</span>
            <h2 className="mt-2 text-graphite">Cuatro tipos de alojamiento</h2>
          </div>
          <Link
            href={`/${lang}/rooms`}
            className="hidden text-sm font-medium text-brand-700 underline underline-offset-4 md:block"
          >
            Ver todas
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <RoomCard
            image={rooms[0].images[0]}
            title={rooms[0].title}
            beds="1 cama individual"
            tag="Standard / Superior"
            objectPosition="center 30%"
          />
          <RoomCard
            image={rooms[1].images[1]}
            title={rooms[1].title}
            beds="2 camas o 1 matrimonial"
            tag="Standard / Superior"
          />
          <RoomCard
            image={rooms[2].images[1]}
            title={rooms[2].title}
            beds="3 camas o matrimonial + individual"
            tag="Standard / Superior"
          />
          <RoomCard
            image={rooms[3].images[1]}
            title={rooms[3].title}
            beds="Hasta 4 camas"
            tag="Standard"
            objectPosition="center 30%"
          />
        </div>

        <Link
          href={`/${lang}/rooms`}
          className="mt-8 inline-block text-sm font-medium text-brand-700 underline underline-offset-4 md:hidden"
        >
          Ver todas las habitaciones
        </Link>
      </section>

      <section className="border-t border-paper-2 bg-white px-6 py-16 md:px-16 md:py-24">
        <div className="mb-10">
          <span className="u-label text-brand-700">Servicios</span>
          <h2 className="mt-2 text-graphite">Lo que incluye tu estadía</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s) => (
            <ServiceItem key={s.name} icon={s.icon} name={s.name} description={s.description} />
          ))}
        </div>
      </section>

      <section className="px-6 py-16 md:px-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="u-label text-brand-700">El hotel</span>
            <h2 className="mt-2 text-graphite">Una familia, una ciudad</h2>
            <Prose className="mt-6">
              <p>{dictionary.about.historyIntro[0]}</p>
              <p className="mt-4">{dictionary.about.historyIntro[1]}</p>
            </Prose>
            <Link
              href={`/${lang}/about`}
              className="mt-6 inline-block text-sm font-medium text-brand-700 underline underline-offset-4"
            >
              Conocer la historia
            </Link>
          </div>

          <div className="overflow-hidden rounded-card border border-paper-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.5119845800255!2d-68.06132092406025!3d-38.957975871711255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a34a9cb8dea9b%3A0xcc9bddd5fd58bbe9!2sCRYSTAL%20SRL!5e0!3m2!1ses-419!2sar!4v1736342715046!5m2!1ses-419!2sar"
              className="h-72 w-full md:h-96"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-paper-2 bg-paper px-6 py-16 md:px-16 md:py-24">
        <div className="mb-10">
          <span className="u-label text-brand-700">Contacto</span>
          <h2 className="mt-2 text-graphite">Estamos en el centro</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            {redes.map((red) => (
              <a
                key={red.text}
                href={red.href}
                target={red.href.startsWith("http") ? "_blank" : undefined}
                rel={red.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 text-graphite hover:text-brand-700"
              >
                <red.icon className="h-5 w-5 text-brand-700" />
                <span>{red.text}</span>
              </a>
            ))}
          </div>
          <div>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 rounded-ctl bg-brand-700 px-5 py-3 text-sm font-medium text-paper hover:bg-blue-600"
            >
              <Phone className="h-4 w-4" />
              {dictionary.home.contact}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
