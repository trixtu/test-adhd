import Image from "next/image";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import prisma from "@/db/prisma";

export const Hero = async () => {
  const orders = await prisma.order.findMany();
  const people = orders.length + 668 
  return (
    <div className="hero-section">
      <main className="text-5xl md:text-7xl font-bold text-balance">
        <section className="container grid lg:grid-cols-2 place-items-center py-5 md:py-10 gap-10 ">
          <div className="text-center lg:text-start space-y-6">
            <div className="flex items-center px-3 py-1 mb-4 space-x-2 border border-gray-300 rounded-full w-fit">
              <div className="flex items-center justify-center w-5 h-5 p-1 border-2 border-green-600 rounded-full animate-pulse shrink-0">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <div className="flex space-x-1 text-xs sm:text-sm">
                <p className="font-medium">{people}</p>
                <p>people currently taking the test</p>
              </div>
            </div>
						
            <h1 className="inline ">
              <span className="inline bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-transparent bg-clip-text">
                Do you have
              </span>
              <br />
              ADHD?
            </h1>
            <p className="text-base text-muted-foreground md:w-10/12 mx-auto lg:mx-0 text-balance">
              A quick and simple test to determine if you have typical ADHD
              symptoms.
            </p>

            <div className="space-y-4 md:space-y-0 md:space-x-2">
              <Link href={"/adhd/before-quizz"}>
                <Button className="w-full md:w-1/3">Take the test</Button>
              </Link>
            </div>

						<div className="flex items-start gap-2 text-sm">
            <div className="flex items-center gap-[6px]">
              <img src="/check-green.svg" alt="" />
              <p>Instant results</p>
            </div>
            <div className="flex items-center gap-[6px]">
              <img src="/check-green.svg" alt="" />
              <p>Official Method</p>
            </div>
          </div>
          </div>
          <div className="z-10">
            <Image
              src="/hero-adhd.webp"
              width={986}
              height={512}
              alt=""
              className="rounded-md select-none pointer-events-none"
            />
          </div>
        </section>
      </main>
    </div>
  );
};
