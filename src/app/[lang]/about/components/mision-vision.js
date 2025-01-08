"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function MisionVision({ dictionary }) {
  const mision = dictionary.about.mision;
  const containerRef = useRef(null); // Referencia al contenedor principal

  useEffect(() => {
    const elements = containerRef.current.children; // Obtiene los hijos del contenedor

    gsap.fromTo(
      elements,
      {
        y: 50, // Desplazamiento vertical inicial
        opacity: 0.1, // Comienza invisible
      },
      {
        y: 0, // Desplazamiento vertical final
        opacity: 1, // Termina visible
        duration: 1, // Duración de cada animación
        stagger: 0.2, // Retardo entre animaciones de cada elemento
        ease: "power2.out", // Tipo de easing
      }
    );
  }, []);

  return (
    <section
      ref={containerRef} // Asigna la referencia al contenedor
      className="flex flex-wrap gap-8"
    >
      {mision.map((mis) => {
        return (
          <div
            key={mis.h3}
            className="flex-1 flex flex-col items-center min-w-52 gap-4"
          >
            <h3>{mis.h3}</h3>
            <p>{mis.p}</p>
          </div>
        );
      })}
    </section>
  );
}
