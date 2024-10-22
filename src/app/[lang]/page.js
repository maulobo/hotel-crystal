import Image from "next/image";
import Container from "./components/container";
import background from "/public/foto1.jpeg";

const redes = ["WhatsApp", "Instagram", "Telefono", "Mail"];

export default async function Home({ params: { lang } }) {
  const dictionary = await import(`../dictionaries/${lang}.json`).then(
    (m) => m.default
  );

  return (
    <>
      <Container>
        <Image
          src={background}
          fill
          className="object-cover h-fit
         w-fit
        "
          alt="background"
        />
        <div className="relative">
          <div className="absolute h-screen w-full flex items-center justify-center flex-col align-middle">
            <h1>{dictionary.home.h1}</h1>

            <h3>TU HOTEL EN EL CENTRO DE LA CIUDAD</h3>
          </div>
        </div>
      </Container>
      <div className={"grid  gap-10  md:grid-rows-3 md:py-8 md:px-20 p-8"}>
        <div className="md:col-span-4 md:row-span-1 ">
          <h2>Contactanos</h2>
          <hr className="border-none bg-white md:h-2 w-[30%] md:w-[10%] h-0.5" />
        </div>
        <div className="grid col-span-4 md:col-span-4 md:row-span-2 gap-10 grid-cols-1 md:grid-cols-3  md:grid-rows-3 row-span-3 ">
          <div className=" row-span-1 md:col-span-1 md:row-span-3 ">
            {redes.map((red) => (
              <h2 key={`${red}_`}>{red}</h2>
            ))}
          </div>
          <div className=" row-span-3  md:row-span-3 md:col-span-2 flex justify-center ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d775.6279958353625!2d-68.0599369!3d-38.9579759!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a33d2b1dbd551%3A0x53427d289ace8401!2sHotel%20Iberia!5e0!3m2!1ses-419!2sar!4v1729290396105!5m2!1ses-419!2sar"
              width="600"
              height="450"
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
