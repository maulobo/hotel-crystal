import { ImageSwiper } from "@/components/image-swiper";

export const RealEstateCard = ({ images, title, description }) => (
  <section className=" border-gray-900  ">
    <div className="max-w-[400px] ">
      <ImageSwiper images={images} />
    </div>
    <div className="mt-3 flex justify-center">
      <h3>{title}</h3>
      <p className="font-light color-black ">{description}</p>
    </div>
  </section>
);
