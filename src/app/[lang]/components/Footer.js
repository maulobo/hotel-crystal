import Image from "next/image";
import React from "react";
import logo from "/public/logo.png";
import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex flex-wrap   w-full bg-[(var(--color-fuente-3)}">
      <section className="flex-1 shrink-0 min-w-80  flex items-center justify-center align-middle">
        <Image src={logo} alt="Iberia Logo" width={200} height={200} />
      </section>
      <section className="flex-1 shrink-0 min-w-80 py-4 flex flex-col justify-around items-center">
        {/* Aquí puedes añadir más contenido en el segundo section */}
        <div className="flex gap-3">
          <Phone />
          <p className="text-center">Some footer content here</p>
        </div>
        <div className="flex gap-3">
          <Phone />
          <p className="text-center">Some footer content here</p>
        </div>
        <div className="flex gap-3">
          <Phone />
          <p className="text-center">Some footer content here</p>
        </div>
        <div className="flex gap-3">
          <Phone />
          <p className="text-center">Some footer content here</p>
        </div>
      </section>
      {/* Puedes agregar más secciones si lo deseas */}
    </div>
  );
}
