"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

const Benefits = () => {
  return (
    <div className="container">
      
      <Carousel
        opts={{
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
       
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="border rounded-lg shadow dark:bg-gray-800 dark:text-gray-200">
                <CardContent className="flex aspect-square p-6">
                  <p className="italic text-lg">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    t.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="border rounded-lg shadow dark:bg-gray-800 dark:text-gray-200">
                <CardContent className="flex aspect-square p-6">
                  <p className="italic text-lg">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    t.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="border rounded-lg shadow dark:bg-gray-800 dark:text-gray-200">
                <CardContent className="flex aspect-square p-6">
                  <p className="italic text-lg">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    t.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="border rounded-lg shadow dark:bg-gray-800 dark:text-gray-200">
                <CardContent className="flex aspect-square p-6">
                  <p className="italic text-lg">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    t.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

        </CarouselContent>
        <CarouselPrevious className="text-white bg-primary rounded-lg w-10 h-10 hover:bg-primary/90 hover:text-white left-[-14px]"/>
        <CarouselNext className="right-[-14px] text-white bg-primary rounded-lg w-10 h-10 hover:bg-primary/90 hover:text-white" />
      </Carousel>
    </div>
  );
};

export default Benefits;
