"use client";

import React from "react";
import Image from "next/image";
import logo from "/public/logoo.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
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
import { CarouselSize } from "./carousel";
import { cards } from "../constants-rooms";
import { useGSAP } from "@gsap/react";

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

function Services({ services, dictionary }) {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    tl.fromTo(
      ".triger1",
      { opacity: 0 },
      {
        opacity: 1,

        duration: 1,
        ease: "power2.out",
      }
    );
    tl.fromTo(
      ".trigger2",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      ".service-item",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2, // Desfase entre los elementos
        scrollTrigger: {
          trigger: ".service-item",
          start: "top 70%", // Inicia la animación cuando el top del item llega al 80% de la pantalla
          end: "top 30%", // Termina cuando el top alcanza el 30%
          scrub: 0.2,
        },
      }
    );
  }, []);

  return (
    <>
      <div className="md:py-8 md:px-20 p-8 h-[400px] bg-rooms flex justify-center items-center triger1 relative">
        <h2>{dictionary.rooms.titleRooms}</h2>
      </div>
      <section className="flex flex-col justify-center align-middle items-center md:py-20 md:px-20  trigger2 p-8">
        <div className="flex flex-col gap-10 justify-center align-middle items-center">
          <Image src={logo} className="" height={400} width={300} alt="logo" />

          <p className="md:w-[50%] text-center ">
            {dictionary.rooms.introText}
          </p>
        </div>
        {/* intro */}

        <section className=" text-center md:justify-center md:w-[700px] md:py-8 md:px-20">
          {dictionary.rooms.intro}
        </section>
        <div className="flex p-8 md:flex-col gap-10 md:w-[80%] py-10">
          <div className="flex flex-col md:flex-row items-center justify-center align-middle gap-10">
            <div className="flex-1 items-center justify-center align-middle  flex flex-col gap-10">
              <h3 className="self-start">{dictionary.rooms.sub1}</h3>
              <p>{dictionary.rooms.text1}</p>
            </div>
            <div className="flex-2 items-center justify-center align-middle">
              <Image
                src={"/crys/DET-A.jpg"}
                height={200}
                width={200}
                className="w-full rounded-t-full"
              />
            </div>
          </div>
        </div>
        <div className="flex p-8 md:flex-col gap-10 md:w-[80%] py-10">
          <div className="flex flex-col md:flex-row items-center justify-center align-middle gap-10">
            <div className="flex-2 items-center justify-center align-middle">
              <Image
                src={"/crys/DET-A.jpg"}
                height={200}
                width={200}
                className="w-full rounded-t-full"
              />
            </div>
            <div className="flex-1 items-center justify-center align-middle  flex flex-col gap-10">
              <h3 className="self-start">{dictionary.rooms.sub2}</h3>
              <p>{dictionary.rooms.text2}</p>
            </div>
          </div>
        </div>

        {/* aca va lo otro */}

        <section className="w-full p-8 md:flex md:items-center md:align-middle md:justify-center md:w-screen md:py-8 md:px-20">
          <CarouselSize dictionary={dictionary} cards={cards} />
        </section>
      </section>
      <div>
        <div className="flex flex-wrap flex-col gap-8 md:py-8 md:px-20 p-8">
          {services.map((serviceCategory, index) => (
            <div
              key={index}
              className="flex flex-col w-full items-center gap-8"
            >
              <h3>{serviceCategory.category}</h3>
              <div className="flex flex-wrap justify-around gap-8">
                {serviceCategory.services.map((service, idx) => {
                  const IconComponent = iconMap[service.icon];
                  return (
                    <div
                      key={idx}
                      className="service-item md:w-96 w-80 flex flex-col align-middle items-center gap-8"
                    >
                      {IconComponent && (
                        <IconComponent strokeWidth={1} size={56} />
                      )}
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

export default Services;
