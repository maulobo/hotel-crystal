import Image from "next/image";
import React from "react";
import logo from "/public/logoo.png";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { IconBrandFacebook, IconBrandWhatsapp } from "@tabler/icons-react";

export default function Footer() {
  return (
    <div className="flex flex-wrap p-8 w-full bg-[var(--color-fuente)] text-black">
      <section className="flex-1 shrink-0 min-w-80  flex items-center justify-center align-middle">
        <Image
          src={logo}
          alt="Iberia Logo"
          className="text-white"
          width={150}
          height={150}
        />
      </section>
      <section className="flex-1 shrink-0  min-w-80 py-4 flex flex-col justify-around items-center">
        {/* Aquí puedes añadir más contenido en el segundo section */}
        <div className="flex gap-3">
          <MapPin />
          <p className="text-center">
            Av Olascoaga 268, Neuquén Capital, Argentina
          </p>
        </div>
        <a
          href="https://api.whatsapp.com/send/?phone=2996263856&text&type=phone_number&app_absent=0 
"
        >
          <div className="flex gap-3">
            <IconBrandWhatsapp />
            <p className="text-center">2996263856</p>
          </div>
        </a>
        <div className="flex gap-3">
          <Mail />
          <p className="text-center">crystalneuquen@yahoo.com.ar</p>
        </div>
        <a href="https://www.instagram.com/hotel.crystal.nqn">
          <div className="flex gap-3">
            <InstagramLogoIcon />
            <p className="text-center">Hotel Crystal</p>
          </div>
        </a>
        <a href="https://www.facebook.com/hotelcrystalnqn/">
          <div className="flex gap-3">
            <IconBrandFacebook />
            <p className="text-center">Hotel Crystal</p>
          </div>
        </a>
      </section>
      {/* Puedes agregar más secciones si lo deseas */}
    </div>
  );
}
