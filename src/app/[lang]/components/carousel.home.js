import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const images = ["", "/iberia-logo.png"];

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
        {images.map((src, index) => (
          <CarouselItem key={index} className="">
            <div className="h-screen w-screen ">
              {src ? (
                <img
                  src={src}
                  alt="alto"
                  className="h-screen w-screen z-[-10]"
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
