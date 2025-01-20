"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { MapPin, Phone, Mail } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

const redes = [
  {
    text: "Av Olascoaga 268, Q8300 Neuquén Capital, Patagonia Argentina",
    icon: <MapPin />,
    href: "",
  },
  {
    text: "299-6263856",
    icon: <IconBrandWhatsapp />,
    href: "https://api.whatsapp.com/send/?phone=2996263856&text&type=phone_number&app_absent=0",
  },
  {
    text: "crystalneuquen@yahoo.com.ar",
    icon: <Mail />,
    href: "mailto:",
  },
];

export function VideoBackground() {
  return (
    <video
      className="fixed top-0 left-0 w-screen h-screen object-cover z-[-10]"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="/vid.mp4" type="video/mp4" />
    </video>
  );
}

const HomeMain = ({ dictionary }) => {
  useGSAP(() => {
    gsap.to(".logo-animation", {
      opacity: 1,
      x: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return (
    <>
      <VideoBackground />
      <div className="relative md:h-screen md:w-screen aspect-square "></div>
      <div className="absolute left-3 top-40 md:top-1/2 flex flex-col items-center w-full">
        <h1 className="hidden">{dictionary.home.h1}</h1>
        <Image
          src={"/logo-blanco.png"}
          className="logo-animation opacity-0 translate-x-[-100px] md:hidden"
          width={150}
          height={150}
        />

        <Image
          src={"/logo-blanco.png"}
          className="logo-animation opacity-0 translate-x-[-100px] translate-y-[-100px] hidden md:block"
          width={300}
          height={300}
        />
      </div>
      <div
        id="contact"
        className="grid gap-10 md:grid-rows-3 md:py-8 md:px-20 p-8"
      >
        <div className="md:col-span-4 md:row-span-1 ">
          <h2>{dictionary.home.contact}</h2>
          <hr className="border-none bg-white md:h-2 w-[30%] md:w-[10%] h-0.5" />
        </div>

        <div className="grid col-span-1 md:col-span-4 md:row-span-2 grid-cols-1 md:grid-cols-3 md:grid-rows-3 row-span-3 gap-4">
          <div className="row-span-1 md:col-span-1 md:row-span-3 flex flex-col gap-4 ">
            {redes.map((red, index) => (
              <a
                key={index}
                href={red.href}
                className="flex items-center gap-2"
              >
                {red.icon}
                <span>{red.text}</span>
              </a>
            ))}
          </div>
          <div className="row-span-3 md:row-span-3 md:col-span-2 flex justify-center rounded-2xl border-gray-950 line-clamp-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.5119845800255!2d-68.06132092406025!3d-38.957975871711255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a34a9cb8dea9b%3A0xcc9bddd5fd58bbe9!2sCRYSTAL%20SRL!5e0!3m2!1ses-419!2sar!4v1736342715046!5m2!1ses-419!2sar"
              className="w-full max-w-full h-64 md:h-96"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeMain;
