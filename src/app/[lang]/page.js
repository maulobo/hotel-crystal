import Image from "next/image";
import { CarouselHome } from "./components/carousel.home";
import { MapPin, Phone, Mail } from "lucide-react";

const redes = [
  {
    text: "Av Olascoaga 269, Q8300 Neuquén Capital, Patagonia Argentina",
    icon: <MapPin />,
  },
  {
    text: "299 626-3856",
    icon: <Phone />,
  },
  {
    text: "crystalneuquen@yahoo.com.ar",
    icon: <Mail />,
  },
  {
    text: "Mail",
    icon: <Mail />,
  },
];

export default async function Home({ params: { lang } }) {
  const dictionary = await import(`../dictionaries/${lang}.json`).then(
    (m) => m.default
  );

  return (
    <>
      <CarouselHome dictionary={dictionary} />
      <div className=" absolute  top-1/3 md:top-1/3 flex flex-col items-center w-full">
        <h1 className="hidden">{dictionary.home.h1}</h1>
        <Image
          src={"/logo.png"}
          height={500}
          width={500}
          className="z-100 hidden md:block"
        />
        <Image
          src={"/logo.png"}
          height={180}
          width={180}
          className="z-100 md:hidden"
        />
      </div>
      <div
        id="contact"
        className="grid gap-10  md:grid-rows-3 md:py-8 md:px-20 p-8"
      >
        <div className="md:col-span-4 md:row-span-1 ">
          <h2>{dictionary.home.contact}</h2>
          <hr className="border-none bg-white md:h-2 w-[30%] md:w-[10%] h-0.5" />
        </div>

        <div className="grid col-span-1 md:col-span-4 md:row-span-2 grid-cols-1 md:grid-cols-3 md:grid-rows-3 row-span-3 gap-4">
          <div className="row-span-1 md:col-span-1 md:row-span-3 flex flex-col gap-4">
            {redes.map((red, index) => (
              <div key={index} className="flex items-center gap-2">
                <div>{red.icon}</div>
                <h3>{red.text}</h3>
              </div>
            ))}
          </div>
          <div className="row-span-3 md:row-span-3 md:col-span-2 flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d775.6279958353625!2d-68.0599369!3d-38.9579759!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a33d2b1dbd551%3A0x53427d289ace8401!2sHotel%20Iberia!5e0!3m2!1ses-419!2sar!4v1729290396105!5m2!1ses-419!2sar"
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
}
