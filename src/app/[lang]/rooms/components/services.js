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
} from "lucide-react";
import SectionHero from "@/components/site/SectionHero";
import RoomCard from "@/components/site/RoomCard";
import ServiceItem from "@/components/site/ServiceItem";
import Prose from "@/components/site/Prose";

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

function ServiceGroup({ category, services }) {
  return (
    <div>
      <span className="u-eyebrow text-brand-700">{category}</span>
      <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
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

  const roomMeta = [
    { beds: "1 cama individual", tag: "Standard / Superior", objectPosition: "center 30%" },
    { beds: "2 camas o 1 matrimonial", tag: "Standard / Superior" },
    { beds: "3 camas o matrimonial + individual", tag: "Standard / Superior" },
    { beds: "Hasta 4 camas", tag: "Standard", objectPosition: "center 30%" },
  ];

  return (
    <>
      <SectionHero
        image="/crys/DOBLE-B.jpg"
        alt="Habitación Superior del Hotel Crystal"
        eyebrow="45 habitaciones · 99 plazas"
        title={dictionary.rooms.titleRooms}
        priority
      />

      <section className="px-6 py-20 md:px-16 md:py-28">
        <Prose className="mx-auto text-center">
          <p className="text-lg font-light text-graphite">{dictionary.rooms.intro}</p>
        </Prose>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <RoomCard
              image={rooms[0].images[0]}
              title={rooms[0].title}
              beds={roomMeta[0].beds}
              tag={roomMeta[0].tag}
              objectPosition={roomMeta[0].objectPosition}
            />
          </div>
          <div className="md:col-span-1 lg:col-span-2">
            <RoomCard
              image={rooms[1].images[1]}
              title={rooms[1].title}
              beds={roomMeta[1].beds}
              tag={roomMeta[1].tag}
            />
          </div>
          <div className="md:col-span-1 lg:col-span-2">
            <RoomCard
              image={rooms[2].images[1]}
              title={rooms[2].title}
              beds={roomMeta[2].beds}
              tag={roomMeta[2].tag}
            />
          </div>
          <div className="lg:col-span-1">
            <RoomCard
              image={rooms[3].images[1]}
              title={rooms[3].title}
              beds={roomMeta[3].beds}
              tag={roomMeta[3].tag}
              objectPosition={roomMeta[3].objectPosition}
            />
          </div>
        </div>
      </section>

      <section className="u-texture-dark border-t border-slate-300/10 bg-ink-900 px-6 py-20 md:px-16 md:py-28">
        <div className="mb-12">
          <span className="u-eyebrow text-brass-300">Estándar vs Superior</span>
          <h2 className="mt-4 text-paper">Dos categorías, una diferencia visible</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <CompareCard
            image="/crys/TRIPLE-A.jpg"
            alt="Habitación Estándar"
            title="Estándar"
            items={[
              "Cama, guardarropa y baño privado",
              "Piso de cerámica",
              "Ropa de cama con estampados",
            ]}
          />
          <CompareCard
            image="/crys/DOBLE-B.jpg"
            alt="Habitación Superior"
            title="Superior"
            items={[
              "Todo lo de la Estándar",
              "Desayuno de cortesía incluido",
              "Heladera, pava eléctrica y escritorio más amplio",
              "Piso de madera y ropa de cama neutra",
            ]}
          />
        </div>
      </section>

      <section className="px-6 py-20 md:px-16 md:py-28">
        <div className="mb-12">
          <span className="u-eyebrow text-brand-700">Servicios</span>
          <h2 className="mt-4 text-graphite">Todo lo que necesitás para tu viaje</h2>
        </div>
        <div className="space-y-16">
          <ServiceGroup category={included.category} services={included.services} />
          <ServiceGroup category={additional.category} services={additional.services} />
        </div>
      </section>
    </>
  );
}
