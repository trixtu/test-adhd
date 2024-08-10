"use client";

import React, { useEffect } from "react";
import { Card } from "../../_components/Card";
import { CardContent, CardTitle } from "@/components/ui/card";
import { CardFooter } from "../../_components/CardFooter";

import { useClient } from "@/hooks/client";
import { TestADHD } from "@prisma/client";
import { getAdhdDescription } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AllertWarning } from "@/components/AllertWarning";
import { Separator } from "@/components/ui/separator";
import { AllertSuccess } from "@/components/AlertSuccess";
import { AllertError } from "@/components/AllertError";

interface CardResultSuccessProps {
  product: TestADHD;
}

export const CardResultSuccess = ({ product }: CardResultSuccessProps) => {
  let totalScore = product.totalScore;
  let totalMaxScore = product.totalMaxScore;
  let inattentionScore = product.inattentionScore;
  let hyperactivityScore = product.hyperactivityScore;

  const { push } = useRouter();

  if (totalScore) {
    totalScore = parseInt((totalScore * 9).toFixed(2));
  }

  const result = getAdhdDescription(
    inattentionScore as number,
    hyperactivityScore as number
  );

  console.log(result.generalLevel.scorGeneral);
  return (
    <Card>
      <CardTitle
        className="w-full flex-col lg:flex text-center text-lg"
        title={`ADHD symptoms level`}
      >
        <p className="flex flex-col lg:flex-row lg:justify-between items-center gap-2">
          ADHD symptoms level
          <span className="border rounded-lg px-2 py-1 lg:float-end uppercase text-xs text-gray-600 w-40 text-center">
            Normal - 9.5
          </span>
        </p>
      </CardTitle>
      <CardContent className="mb-6 p-0">
        <div
          className="relative z-[1] mt-14 h-[10px] overflow-visible rounded-[4px]"
          style={{
            background:
              "linear-gradient(90deg, rgb(153, 219, 249) 0%, rgb(225, 241, 147) 55.84%, rgb(253, 130, 111) 100%",
          }}
        >
          <div
            className="absolute bottom-[-5px] flex w-[66px] flex-col items-center justify-between"
            style={{ left: `${result.generalLevel.nivel}%` }}
          >
            <div className="relative text-xs font-bold">
              <div className="absolute left-1/2 top-[11px] w-full -translate-x-1/2 text-center txt-[12_16_500] dark:text-gray-800">
                {"You"}
                {"-"}
                <span className="relative">
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 dark:text-gray-800">
                    {`${result.generalLevel.scorGeneral}`}
                  </span>
                  <span className="opacity-0">00.00</span>
                </span>
              </div>

              <div className="flex flex-col items-center justify-center box-content aspect-[69/31] w-[102px]">
                <img src="/message.svg" alt="" />
              </div>
            </div>
            <div
              className="rounded-[50%] border-[4px] border-solid border-white shadow-[0px_4px_14px_rgba(24,42,58,0.2)] w-[21px] h-[21px]"
              style={{ backgroundColor: "rgb(253, 130, 111)" }}
            ></div>
          </div>
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-600 font-semibold">
          <span className="text-secondary-dark-gray transition-all txt-[10_18_500]">
            LOW
          </span>
          <span className="text-secondary-dark-gray transition-all txt-[10_18_500]">
            AVERAGE
          </span>
          <span className="text-secondary-dark-gray transition-all txt-[10_18_500]">
            MEDIUM
          </span>
          <span className="text-secondary-dark-gray transition-all txt-[10_18_500]">
            HIGH
          </span>
        </div>

        <div className="my-4">
          {result.generalLevel.scorGeneral === 1.1 && (
            <AllertSuccess
              title={result.generalLevel.title}
              description={result.generalLevel.text}
            />
          )}

          {result.generalLevel.scorGeneral === 4.66 && (
            <AllertSuccess
              title={result.generalLevel.title}
              description={result.generalLevel.text}
            />
          )}

          {result.generalLevel.scorGeneral === 11.23 && (
            <AllertWarning
              title={result.generalLevel.title}
              description={result.generalLevel.text}
            />
          )}

          {result.generalLevel.scorGeneral === 19.55 && (
            <AllertError
              title={result.generalLevel.title}
              description={result.generalLevel.text}
            />
          )}
        </div>

        <div className="flex items-end gap-4">
          <div className="w-20 h-20">
            <img className="" src="/hyperactivity.png" alt="" />
          </div>
          <p className="text-base dark:text-gray-200">
            {result.hyperactivityLevel}
          </p>
        </div>
        <Separator className="my-4" />
        <div className="flex items-end gap-4">
          <div className="w-20 h-20">
            <img className="" src="/inatention.png" alt="" />
          </div>
          <p className="text-base dark:text-gray-200">
            {result.inattentionLevel}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => push("/adhd")}>Back</Button>
      </CardFooter>
    </Card>
  );
};
