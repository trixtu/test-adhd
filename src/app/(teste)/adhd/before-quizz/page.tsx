"use client";

import { redirect, useRouter } from "next/navigation";
import React from "react";
import { Card } from "../_components/Card";
import { CardTitle } from "../_components/CardTitle";
import { CardContent } from "../_components/CardContent";
import { CardFooter } from "../_components/CardFooter";
import { Button } from "@/components/ui/button";
import { Navbar } from "./_components/Navbar";


const BeforeQuizzPage = () => {
  const { push } = useRouter();

  return (
    <>
      <Navbar />
      <div className="flex justify-center px-4 pt-6">
        <Card>
          <CardTitle title="Before you start" />
          <CardContent
            content=" This test consists of 18 questions, and it‘s essential that you
            answer all of them. There are no right or wrong answers. For the
            test to be successful, all that matters is that you answer each
            question as honestly as possible."
          ></CardContent>
          <CardFooter>
            <Button onClick={() => push("/adhd/quizz")}>Take the test</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default BeforeQuizzPage;
