"use client";

"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  MapPin,
  Mail,
  Phone,
  Coffee,
  Wifi,
  ConciergeBell,
  Luggage,
  ClockArrowDown,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import FactStrip from "@/components/site/FactStrip";
import Prose from "@/components/site/Prose";
import Reveal from "@/components/site/Reveal";
import RevealStagger from "@/components/site/RevealStagger";

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

// Solo lo no traducible: el copy de cada servicio vive en dictionary.ui.home.services
const SERVICE_STYLE = [
  { icon: ConciergeBell, span: "md:col-span-2 md:row-span-2" },
  { icon: Wifi },
  { icon: Coffee },
  { icon: Luggage },
  { icon: ClockArrowDown },
];

const ROOM_FRAMING = [
  { objectPosition: "center 30%" },
  {},
  {},
  { objectPosition: "center 30%" },
];

function Hero({ dictionary }) {
  const scope = useRef(null);
  const t = dictionary.ui.home;

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-hero]",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: "power3.out", delay: 0.2 }
      );
    },
    { scope }
  );

  return (
    <section className="relative h-[clamp(520px,100svh,880px)] overflow-hidden bg-ink-900">
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
            "linear-gradient(180deg, rgba(11,27,43,.70) 0%, rgba(11,27,43,.35) 40%, rgba(11,27,43,.97) 100%)",
        }}
      />
      <div className="u-texture-dark absolute inset-0" />

      <div
        ref={scope}
        className="relative flex h-full flex-col justify-end px-6 pb-16 md:px-16 md:pb-24"
      >
        <div data-hero className="mb-8 flex items-center gap-4">
          <Image
            src="/isologo-blanco.png"
            alt="Hotel Crystal"
            width={128}
            height={92}
            priority
          />
          <span className="h-8 w-px bg-brass-400/50" />
          <span className="u-label text-slate-300">{t.eyebrow}</span>
        </div>

        <h1 data-hero className="u-display max-w-[16ch] text-paper">
          {t.h1[0]}
          <em className="font-normal italic text-cyan-300">{t.h1[1]}</em>
          {t.h1[2]}
        </h1>

        <div data-hero className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[44ch] text-sm font-light text-slate-300 md:text-base">
            {t.lead}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="#habitaciones" className="u-btn-primary">
              {t.ctaRooms}
            </Link>
            <Link href="#contacto" className="u-btn-ghost">
              {t.ctaContact}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function BentoRoom({ image, title, beds, objectPosition = "center", span = "", tall = false }) {
  return (
    <Link
      href="#habitaciones"
      className={`group relative overflow-hidden rounded-card bg-ink-900 ${span} ${
        tall ? "min-h-[320px]" : "min-h-[220px]"
      }`}
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        style={{ objectPosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-xl text-paper md:text-2xl">{title}</h3>
            <p className="mt-1 text-sm text-slate-300">{beds}</p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors group-hover:bg-cyan-300 group-hover:text-ink-900">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function BentoService({ icon: Icon, name, description, span = "" }) {
  return (
    <div
      className={`group rounded-card border border-slate-300/10 bg-ink-800/40 p-7 transition-colors duration-300 hover:border-brass-400/40 ${span}`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brass-400/40 bg-ink-900">
        <Icon className="h-5 w-5 text-cyan-300" aria-hidden />
      </div>
      <h3 className="mt-5 font-display text-lg text-paper">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
    </div>
  );
}

export default function HomeMain({ dictionary, lang }) {
  const rooms = dictionary.rooms.roomsCards;
  const t = dictionary.ui.home;
  const { facts, beds } = dictionary.ui;
  const services = t.services.map((s, i) => ({ ...SERVICE_STYLE[i], ...s }));

  return (
    <>
      <Hero dictionary={dictionary} />

      <FactStrip
        tone="dark"
        items={[
          { k: facts.checkIn, v: "12:00" },
          { k: facts.checkOut, v: "10:00" },
          { k: facts.concierge, v: facts.concierge24 },
          { k: facts.roomsLabel, v: facts.roomsValue },
        ]}
      />

      <section id="habitaciones" className="px-6 py-20 md:px-16 md:py-28">
        <Reveal>
          <div className="mb-14 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <h2 className="max-w-[18ch] text-graphite md:text-5xl">
              {t.roomsTitle[0]}
              <em className="italic text-brand-700">{t.roomsTitle[1]}</em>
              {t.roomsTitle[2]}
            </h2>
            <Link
              href={`/${lang}/rooms`}
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-blue-600"
            >
              {t.roomsAll} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <RevealStagger className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 md:grid-cols-4">
          <BentoRoom
            image={rooms[1].images[1]}
            title={rooms[1].title}
            beds={beds[1]}
            span="md:col-span-2 md:row-span-2"
            tall
          />
          <BentoRoom
            image={rooms[2].images[1]}
            title={rooms[2].title}
            beds={beds[2]}
            span="md:col-span-2"
          />
          <BentoRoom
            image={rooms[0].images[0]}
            title={rooms[0].title}
            beds={beds[0]}
            objectPosition={ROOM_FRAMING[0].objectPosition}
          />
          <BentoRoom
            image={rooms[3].images[1]}
            title={rooms[3].title}
            beds={beds[3]}
            objectPosition={ROOM_FRAMING[3].objectPosition}
          />
        </RevealStagger>
      </section>

      <section className="u-texture-dark border-t border-slate-300/10 bg-ink-900 px-6 py-20 md:px-16 md:py-28">
        <Reveal>
          <div className="mb-14 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <h2 className="max-w-[20ch] text-paper md:text-5xl">
              {t.servicesTitle[0]}
              <em className="italic text-cyan-300">{t.servicesTitle[1]}</em>
              {t.servicesTitle[2]}
            </h2>
            <span className="u-index text-slate-400">{t.servicesIndex}</span>
          </div>
        </Reveal>

        <RevealStagger className="grid auto-rows-[minmax(140px,auto)] grid-cols-1 gap-4 md:grid-cols-4">
          {services.map((s) => (
            <BentoService key={s.name} {...s} />
          ))}
        </RevealStagger>
      </section>

      <section className="px-6 py-20 md:px-16 md:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <h2 className="max-w-[16ch] text-graphite md:text-5xl">
              {t.familyTitle[0]}
              <em className="italic text-brand-700">{t.familyTitle[1]}</em>
              {t.familyTitle[2]}
            </h2>
            <Prose className="mt-8">
              <p className="text-lg font-light text-graphite">
                {dictionary.about.historyIntro[0]}
              </p>
              <p className="mt-4">{dictionary.about.historyIntro[1]}</p>
            </Prose>
            <Link
              href={`/${lang}/about`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-blue-600"
            >
              {t.familyCta} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-card border border-paper-2 shadow-[0_20px_60px_-30px_rgba(11,27,43,0.4)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.5119845800255!2d-68.06132092406025!3d-38.957975871711255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a34a9cb8dea9b%3A0xcc9bddd5fd58bbe9!2sCRYSTAL%20SRL!5e0!3m2!1ses-419!2sar!4v1736342715046!5m2!1ses-419!2sar"
                className="h-80 w-full md:h-full md:min-h-[420px]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contacto" className="border-t border-paper-2 bg-paper px-6 py-20 md:px-16 md:py-28">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="max-w-[16ch] text-graphite md:text-5xl">
              {t.contactTitle[0]}
              <em className="italic text-brand-700">{t.contactTitle[1]}</em>
              {t.contactTitle[2]}
            </h2>
            <div className="mt-8 space-y-4">
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
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-col items-start justify-end gap-4">
              <p className="max-w-[40ch] text-slate-600">{t.contactLead}</p>
              <Link href={`/${lang}/contact`} className="u-btn-dark mt-2">
                <Phone className="h-4 w-4" />
                {dictionary.home.contact}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
