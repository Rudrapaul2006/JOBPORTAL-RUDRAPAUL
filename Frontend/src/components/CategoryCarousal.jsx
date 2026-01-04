import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

let categories = [
  "Frontend Developer",
  "Backend Developer",
  "Graphic Designer",
  "Fullstack Developer",
];

let CategoryCarousel = () => {
  return (

    <div className="mx-auto mt-5 w-full sm:w-[25%] md:w-[35%] lg:w-[45%]">

      <Carousel>
        <CarouselContent className="gap-3 px-2 sm:px-1">
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 w-[110px] sm:w-fit md:w-[160px] lg:w-[180px]"
            >
              <div className="h-12 sm:h-14 border border-gray-200 rounded-3xl shadow-sm px-3 sm:px-4 flex flex-col items-center justify-center bg-white">
                <h2 className="text-xs sm:text-sm font-medium text-gray-800 text-center">
                  <button>{category}</button>
                </h2>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden sm:flex z-10 bg-gray-200 rounded-full p-2 hover:bg-gray-300 cursor-pointer" />
        <CarouselNext className="hidden sm:flex z-10 bg-gray-200 rounded-full p-2 hover:bg-gray-300 cursor-pointer" />

      </Carousel>

    </div>


  );
};

export default CategoryCarousel;
