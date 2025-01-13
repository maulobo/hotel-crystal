"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { CarouselSize } from "../../rooms/components/carousel";
import { RealEstateCard } from "../../components/image-swip";
import { Carou } from "./carou";

const images = [
  ["/about/about1.jpg"],
  ["/about/about2.jpg"],
  ["/about/DESA.jpg"],
  ["/about/HALL.jpg"],
];

export default function OurHistory({ dictionary }) {
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    gsap.fromTo(
      ".trigger-1",
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".trigger-1",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".trigger-2",
      { x: 200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".trigger-2",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".trigger-3",
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1, // Recupera su tamaño original y visibilidad
        duration: 0.5,
        scrollTrigger: {
          trigger: ".trigger-3",
          start: "top 80%",
        },
      }
    );

    // Animación para la cuarta sección
    gsap.fromTo(
      ".trigger-4",
      { x: 200, opacity: 0 },
      {
        x: 0,
        opacity: 1, // Recupera su tamaño original y visibilidad
        duration: 0.5,
        scrollTrigger: {
          trigger: ".trigger-4",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div className="overflow-hidden flex gap-10 flex-col">
      <section className=" flex w-[100%] md:flex-row flex-col gap-10 flex-wrap">
        <div className="trigger-1 md:w-[40%] md:flex-auto flex flex-col gap-10 flex-1">
          <h3>{dictionary.about.ourHistoryh21}</h3>
          <p>{dictionary.about.ourHistoryp1}</p>
          <p>{dictionary.about.ourHistoryp2}</p>
        </div>
      </section>
      <section className=" trigger-2 flex w-[100%] md:flex-row flex-col gap-10 flex-wrap">
        <div className="md:w-[40%] flex-1 md:flex-auto flex flex-col gap-10 md:min-w-[500px]">
          <p>{dictionary.about.ourHistoryp3}</p>
          <p>{dictionary.about.ourHistoryp4}</p>
        </div>
      </section>
      <section className="trigger-3 flex-1 flex justify-center w-[100%] md:flex-row flex-col gap-10">
        <div className="md:w-[40%] flex-1 md:flex-auto flex flex-col gap-10">
          <p>{dictionary.about.ourHistoryp5}</p>
          <p>{dictionary.about.ourHistoryp6}</p>
        </div>
      </section>
      <section className="trigger-4 flex-1 flex justify-center w-[100%] md:flex-row flex-col gap-10">
        <div className="md:w-[40%] flex-1 md:flex-auto flex flex-col gap-10">
          <p>{dictionary.about.ourHistoryp7}</p>
          <p>{dictionary.about.ourHistoryp8}</p>
        </div>
      </section>
      <section className="trigger-4 flex-1 flex justify-center w-[100%] md:flex-row flex-col gap-10">
        <Carou images={images} />
      </section>
    </div>
  );
}
