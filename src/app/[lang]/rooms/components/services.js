"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
      <h3 className="mb-6 font-display text-graphite">{category}</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

export default function Services({ dictionary, lang }) {
  const rooms = dictionary.rooms.roomsCards;
  const [included, additional] = dictionary.rooms.roomServices;

  return (
    <>
      <SectionHero
        image="/crys/DOBLE-B.jpg"
        alt="Habitación Superior del Hotel Crystal"
        eyebrow="45 habitaciones · 99 plazas"
        title={dictionary.rooms.titleRooms}
        priority
      />

      <section className="px-6 py-16 md:px-16 md:py-24">
        <Prose className="mx-auto text-center">
          <p>{dictionary.rooms.intro}</p>
        </Prose>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <RoomCard
              image={rooms[0].images[0]}
              title={rooms[0].title}
              beds="1 cama individual"
              tag="Standard / Superior"
              objectPosition="center 30%"
            />
          </div>
          <div className="md:col-span-1 lg:col-span-2">
            <RoomCard
              image={rooms[1].images[1]}
              title={rooms[1].title}
              beds="2 camas o 1 matrimonial"
              tag="Standard / Superior"
            />
          </div>
          <div className="md:col-span-1 lg:col-span-2">
            <RoomCard
              image={rooms[2].images[1]}
              title={rooms[2].title}
              beds="3 camas o matrimonial + individual"
              tag="Standard / Superior"
            />
          </div>
          <div className="lg:col-span-1">
            <RoomCard
              image={rooms[3].images[1]}
              title={rooms[3].title}
              beds="Hasta 4 camas"
              tag="Standard"
              objectPosition="center 30%"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-paper-2 bg-white px-6 py-16 md:px-16 md:py-24">
        <span className="u-label text-brand-700">Estándar vs Superior</span>
        <h2 className="mt-2 text-graphite">Dos categorías, una diferencia visible</h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-card border border-paper-2">
            <div className="relative aspect-[4/3]">
              <Image
                src="/crys/TRIPLE-A.jpg"
                alt="Habitación Estándar"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="font-display text-graphite">Estándar</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>Cama, guardarropa y baño privado</li>
                <li>Piso de cerámica</li>
                <li>Ropa de cama con estampados</li>
              </ul>
            </div>
          </div>

          <div className="overflow-hidden rounded-card border border-paper-2">
            <div className="relative aspect-[4/3]">
              <Image
                src="/crys/DOBLE-B.jpg"
                alt="Habitación Superior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="font-display text-graphite">Superior</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>Todo lo de la Estándar</li>
                <li>Desayuno de cortesía incluido</li>
                <li>Heladera, pava eléctrica y escritorio más amplio</li>
                <li>Piso de madera y ropa de cama neutra</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-16 md:py-24">
        <div className="mb-10">
          <span className="u-label text-brand-700">Servicios</span>
          <h2 className="mt-2 text-graphite">Todo lo que necesitás para tu viaje</h2>
        </div>
        <div className="space-y-14">
          <ServiceGroup category={included.category} services={included.services} />
          <ServiceGroup category={additional.category} services={additional.services} />
        </div>
      </section>
    </>
  );
}
