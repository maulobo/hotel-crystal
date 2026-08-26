"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./menu-nav.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import isotipo from "/public/isotipo.png";
import isologo from "/public/isologo-blanco.png";
import LanguageSelector from "./select-languaje";

const MenuNav = ({ dictionary, clima }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1]; // Extrae el idioma de la URL actual

  const rutas = [
    { id: 1, nombre: `${dictionary.nav.home}`, deruta: "/" },
    { id: 2, nombre: `${dictionary.nav.about}`, deruta: "/about" },
    { id: 3, nombre: `${dictionary.nav.rooms}`, deruta: "/rooms" },
    { id: 4, nombre: `${dictionary.nav.turism}`, deruta: "/turism" },
    { id: 5, nombre: `${dictionary.nav.contact}`, deruta: "/contact" },
  ];
  const urlCondition = clima.current.condition.icon;
  const cleanUrl = urlCondition.replace("//", "https://");

  const handleClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <div className="cont-nav">
        <nav className="menu-nav">
          <Link href={`/${currentLang}`} className="ml-10">
            <Image src={isotipo} height={38} width={50} alt="Hotel Crystal" priority />
          </Link>

          <ul className="nav-list">
            {rutas.map((ruta) => (
              <li
                key={ruta.id}
                className={`nav-item ${pathname === `/${currentLang}${ruta.deruta}` ? "active" : ""}`}
              >
                <Link
                  href={`/${currentLang}${ruta.deruta}`}
                  className="nav-link"
                >
                  {ruta.nombre}
                </Link>
              </li>
            ))}
            {clima.current ? (
              <li className="list-none flex items-center">
                {clima.current.temp_c}
                <Image src={cleanUrl} height={40} width={40} alt="" />
              </li>
            ) : (
              ""
            )}

            <LanguageSelector lang={currentLang} />
          </ul>
        </nav>
      </div>

      {/* menu burger */}
      <section
        className={`nav-bar-position ${isNavOpen ? "nav-bar-active nav-bar-position2" : ""}`}
      >
        <div
          className={`burger ${isNavOpen ? "burger-open" : ""}`}
          onClick={handleClick}
        >
          <div className="fas fas-x"></div>
          <div className="fas fas-x"></div>
          <div className="fas fas-x"></div>
        </div>

        <nav className={`navbar ${isNavOpen ? "nav-open" : ""}`}>
          <Link
            href={`/${currentLang}`}
            onClick={handleClick}
            className={`nav-logo ${isNavOpen ? "nav-logo-open" : ""}`}
          >
            <Image src={isologo} height={78} width={108} alt="Hotel Crystal" />
          </Link>

          <ul className="nav-links">
            {rutas.map((ruta) => (
              <li
                key={ruta.id}
                className={`nav-link ${isNavOpen ? "nav-link-open" : ""} ${pathname === `/${currentLang}${ruta.deruta}` ? "active" : ""}`} // Clase activa en nav-item
              >
                <Link
                  href={`/${currentLang}${ruta.deruta}`}
                  onClick={handleClick}
                >
                  {ruta.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </>
  );
};

export default MenuNav;
