"use client";

import Image from "next/image";
import {
  Coffee,
  Wifi,
  ConciergeBell,
  Package,
  Hotel,
  Luggage,
  ParkingCircle,
  Martini,
  ClockArrowDown,
  Check,
  ArrowUpRight,
} from "lucide-react";
import SectionHero from "@/components/site/SectionHero";
import ServiceItem from "@/components/site/ServiceItem";
import Prose from "@/components/site/Prose";
import Reveal from "@/components/site/Reveal";
import RevealStagger from "@/components/site/RevealStagger";

const ICONS = {
  Coffee,
  Wifi,
  ConciergeBell,
  Package,
  Hotel,
  Luggage,
  ParkingCircle,
  Martini,
  ClockArrowDown,
};

function BentoRoom({ image, title, beds, objectPosition = "center", span = "", tall = false }) {
  return (
    <div
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
    </div>
  );
}

function ServiceGroup({ category, services }) {
  return (
    <div>
      <h3 className="mb-8 text-2xl text-graphite md:text-3xl">{category}</h3>
      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ServiceItem
            key={s.name}
            icon={ICONS[s.icon]}
            name={s.name}
            description={s.description}
          />
        ))}
      </div>
    </div>
  );
}

function CompareCard({ image, alt, title, items }) {
  return (
    <div className="overflow-hidden rounded-card border border-paper-2 bg-white">
      <div className="relative aspect-[16/10]">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-graphite">{title}</h3>
        <ul className="mt-4 space-y-2.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Services({ dictionary, lang }) {
  const rooms = dictionary.rooms.roomsCards;
  const [included, additional] = dictionary.rooms.roomServices;
  const t = dictionary.ui.roomsPage;
  const { beds, alt } = dictionary.ui;
  const framing = ["center 30%", undefined, undefined, "center 30%"];

  return (
    <>
      <SectionHero
        image="/crys/DOBLE-B.jpg"
        alt={alt.superiorRoom}
        title={dictionary.rooms.titleRooms}
        priority
      />

      <section className="px-6 py-20 md:px-16 md:py-28">
        <Reveal>
          <Prose className="mx-auto text-center">
            <p className="text-lg font-light text-graphite">{dictionary.rooms.intro}</p>
          </Prose>
        </Reveal>

        <RevealStagger className="mt-14 grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 md:grid-cols-4">
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
            objectPosition={framing[0]}
          />
          <BentoRoom
            image={rooms[3].images[1]}
            title={rooms[3].title}
            beds={beds[3]}
            objectPosition={framing[3]}
          />
        </RevealStagger>
      </section>

      <section className="u-texture-dark border-t border-slate-300/10 bg-ink-900 px-6 py-20 md:px-16 md:py-28">
        <Reveal>
          <h2 className="mb-12 text-paper md:text-5xl">
            {t.compareTitle[0]}
            <em className="italic text-cyan-300">{t.compareTitle[1]}</em>
            {t.compareTitle[2]}
          </h2>
        </Reveal>

        <RevealStagger className="grid gap-6 lg:grid-cols-2">
          <CompareCard
            image="/crys/TRIPLE-A.jpg"
            alt={alt.standardRoom}
            title={t.standard.title}
            items={t.standard.items}
          />
          <CompareCard
            image="/crys/DOBLE-B.jpg"
            alt={alt.superiorRoom}
            title={t.superior.title}
            items={t.superior.items}
          />
        </RevealStagger>
      </section>

      <section className="px-6 py-20 md:px-16 md:py-28">
        <Reveal>
          <h2 className="mb-12 text-graphite md:text-5xl">
            {t.servicesTitle[0]}
            <em className="italic text-brand-700">{t.servicesTitle[1]}</em>
            {t.servicesTitle[2]}
          </h2>
        </Reveal>
        <div className="space-y-16">
          <ServiceGroup category={included.category} services={included.services} />
          <ServiceGroup category={additional.category} services={additional.services} />
        </div>
      </section>
    </>
  );
}
