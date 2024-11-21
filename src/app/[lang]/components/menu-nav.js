"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./menu-nav.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "/public/logo.png";
import LanguageSelector from "./select-languaje";

const MenuNav = ({ dictionary, clima }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1]; // Extrae el idioma de la URL actual

  const rutas = [
    { id: 1, nombre: `${dictionary.nav.home}`, deruta: "/" },
    { id: 2, nombre: `${dictionary.nav.about}`, deruta: "/about" },
    { id: 3, nombre: `${dictionary.nav.rooms}`, deruta: "/rooms" },
    { id: 4, nombre: `${dictionary.nav.lounge}`, deruta: "/lounge" },
    { id: 5, nombre: `${dictionary.nav.turism}`, deruta: "/turism" },
    { id: 6, nombre: `${dictionary.nav.contact}`, deruta: "/#contact" },
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
            <Image src={logo} height={60} width={60} alt="logo" />
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
                <Image src={cleanUrl} height={40} width={40} />
              </li>
            ) : (
              ""
            )}

            <LanguageSelector languaje={currentLang} />
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
