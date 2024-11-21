import Image from "next/image";

export default function OurHistory({ dictionary }) {
  return (
    <>
      <section className=" flex w-[100%] md:flex-row flex-col gap-10 flex-wrap ">
        <div className=" md:w-[40%] md:flex-auto flex flex-col gap-10 flex-1">
          <h3>{dictionary.about.ourHistoryh21}</h3>
          <p>{dictionary.about.ourHistoryp1}</p>
          <p>{dictionary.about.ourHistoryp2}</p>
        </div>
        <div className="md:w-[60%] aspect-square md:aspect-auto flex align-middle md:justify-around relative md:h-auto flex-1">
          <img
            src="/about/about1.jpeg"
            alt="about1"
            className="aspect-square md:max-w-[400px] md:min-w-[300px] "
          />
        </div>
      </section>
      <section className="flex w-[100%] md:flex-row flex-col gap-10 flex-wrap ">
        <div className="md:w-[60%] aspect-square md:aspect-auto flex align-middle md:justify-around relative md:h-auto flex-1">
          <img
            src="/about/about2.jpeg"
            alt="about1"
            className="aspect-square md:max-w-[400px] md:min-w-[300px] "
          />
        </div>

        <div className=" md:w-[40%] flex-1 md:flex-auto flex flex-col gap-10 md:min-w-[500px]">
          <p>{dictionary.about.ourHistoryp3}</p>
          <p>{dictionary.about.ourHistoryp4}</p>
        </div>
      </section>
      <section className="flex-1 flex justify-center w-[100%] md:flex-row flex-col gap-10">
        <div className=" md:w-[40%] flex-1 md:flex-auto flex flex-col gap-10">
          <p>{dictionary.about.ourHistoryp5}</p>
          <p>{dictionary.about.ourHistoryp6}</p>
        </div>
        <div className="md:w-[60%] aspect-square md:aspect-auto flex align-middle md:justify-around relative md:h-auto flex-1">
          <img
            src="/about/HALL.jpg"
            alt="about1"
            className="aspect-square md:max-w-[400px] md:min-w-[300px] "
          />
        </div>
      </section>
      <section className="flex-1 flex justify-center w-[100%] md:flex-row flex-col gap-10">
        <div className="md:w-[60%] aspect-square md:aspect-auto flex align-middle md:justify-around relative md:h-auto flex-1">
          <img
            src="/about/DESA.jpg"
            alt="about1"
            className="aspect-square md:max-w-[400px] md:min-w-[300px] "
          />
        </div>
        <div className=" md:w-[40%] flex-1 md:flex-auto flex flex-col gap-10">
          <p>{dictionary.about.ourHistoryp7}</p>
          <p>{dictionary.about.ourHistoryp8}</p>
        </div>
      </section>
    </>
  );
}
