import React from "react";
import Image from "next/image";
import logo from "/public/logo.png";
import { CarouselSize } from "./components/carousel";

import {
  ClockArrowDown,
  Coffee,
  ConciergeBell,
  Hotel,
  Martini,
  Package,
  ParkingCircle,
  Wifi,
  Luggage,
} from "lucide-react";

const iconMap = {
  Wifi,
  Coffee,
  ConciergeBell,
  Package,
  Hotel,
  ParkingCircle,
  Martini,
  ClockArrowDown,
  Luggage,
};

export default async function page({ params: { lang } }) {
  const dictionary = await import(`../../dictionaries/${lang}.json`).then(
    (m) => m.default
  );
  const services = dictionary.rooms.roomServices;

  return (
    <>
      <div className="md:py-8 md:px-20 p-8 h-[400px] bg-rooms flex justify-center items-center">
        <h2>{dictionary.rooms.titleRooms}</h2>
      </div>
      <section className="flex flex-col justify-center align-middle items-center md:py-16 md:px-20 p-8 gap-20">
        <div className="flex flex-col gap-10 justify-center align-middle items-center">
          <Image src={logo} className="" height={300} width={300} alt="logo" />

          <p className="md:w-[50%] text-center">{dictionary.rooms.intro}</p>
        </div>
        <section className="w-full p-8 md:flex md:items-center md:align-middle md:justify-center md:w-screen md:py-8 md:px-20">
          <CarouselSize dictionary={dictionary} />
        </section>
      </section>
      <div>
        <div className="flex flex-wrap flex-col gap-8 md:py-8 md:px-20 p-8">
          {services.map((serviceCategory, index) => (
            <div
              key={index}
              className=" flex flex-col w-full items-center gap-8"
            >
              <h3>{serviceCategory.category}</h3>
              <div className="flex flex-wrap justify-around gap-8 ">
                {serviceCategory.services.map((service, idx) => {
                  const IconComponent = iconMap[service.icon]; // Obtener el componente del ícono
                  return (
                    <div
                      key={idx}
                      className="md:w-96 w-80 flex flex-col align-middle items-center gap-8"
                    >
                      {IconComponent && (
                        <IconComponent strokeWidth={1} size={56} />
                      )}
                      {/* Renderizar el ícono */}
                      <p className="text-center">{service.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
