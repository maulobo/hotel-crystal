import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const imagen = ["", "crys/DET-B.jpg", "crys/DET-C.jpg", "crys/DET-D.jpg"];
export function CarouselHome() {
  return (
    <Carousel
      autoPlay={6000}
      opts={{
        align: "start",
      }}
      className="z-[-10] "
    >
      <CarouselContent>
        {imagen.map((src, index) => (
          <CarouselItem key={index} className="">
            <div className="h-screen w-screen">
              {src ? (
                <img
                  src={src}
                  alt="alto"
                  className="h-full w-full object-cover z-[-10]"
                />
              ) : (
                ""
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
