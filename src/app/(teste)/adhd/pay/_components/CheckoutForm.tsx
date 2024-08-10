"use client";

import { userOrderExists } from "@/app/actions/orders";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/lib/formatters";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BadgeEuro, Check, Clock9 } from "lucide-react";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { Card } from "../../_components/Card";
import CountdownTimer from "@/components/ceas";
import { isDateInPast } from "@/lib/utils";

const currentDate = new Date();
const countdownDate = new Date(currentDate.getTime() + 10 * 60000);

type CheckoutFormProps = {
  product: {
    id: string;
    totalScore: number | null;
    totalMaxScore: number | null;
    inattentionScore: number | null;
    inattentionMaxScore: number | null;
    hyperactivityScore: number | null;
    hyperactivityMaxScore: number | null;
    priceInCents: number;
    isAvailableForPurchase: boolean;
  };
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export const CheckoutForm = ({ product, clientSecret }: CheckoutFormProps) => {
  return (
    <div className="lg:container w-full mx-auto space-y-8">
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 mx-auto py-6 md:py-8 px-5 xl:px-0 relative">
        {/* Left */}

        {/* mobile */}
        <Card className="w-full lg:hidden md:w-full">dsded</Card>
        <div className="w-full lg:hidden">
          <Card className="flex flex-col w-full gap-6 p-0  md:w-full">
            <CardTitle className="mb-6">
              <div className="flex items-center justify-center gap-4 px-10 py-4 border-b border-gray-300">
                <BadgeEuro />
                <h6 className="text-base font-medium text-gray-600 dark:text-gray-200 md:font-bold md:text-2xl">
                  Special Offer
                </h6>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-violet-400 font-dmsans">
                  {formatCurrency(product.priceInCents / 100)}
                </h3>
              </div>
            </CardTitle>

            <div className="flex flex-col items-center justify-center gap-6 px-6">
              <div className="flex flex-col items-start justify-start w-full rounded-lg gap-4 px-4 py-3 border border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-900 ">
                <div className="flex items-start justify-start gap-2 md:items-center">
                  <Check color="green" />
                  <p className="text-sm text-gray-900 dark:text-gray-300">
                    Immediately unlock your personalized evaluation for ADHD
                  </p>
                </div>
                <div className="flex items-start justify-start gap-2 md:items-center">
                  <Check color="green" />
                  <p className="text-sm text-gray-900 dark:text-gray-300">
                    Access to dozens of other tests
                  </p>
                </div>
                <div className="flex items-start justify-start gap-2 md:items-center">
                  <Check color="green" />
                  <p className="text-sm text-gray-900 dark:text-gray-300">
                    Secure payment
                  </p>
                </div>
              </div>
              <div className="w-full">
                <Elements options={{ clientSecret }} stripe={stripePromise}>
                  <Form
                    priceInCents={product.priceInCents}
                    productId={product.id}
                  />
                </Elements>
              </div>
            </div>
          </Card>
        </div>
        {/* mobile */}
        <div className="space-y-4">
          <Card className="hidden lg:block md:w-full">
            <div className="flex items-center justify-start gap-3 md:gap-4 lg:items-start mb-4">
              <div className="bg-green-600 rounded-full p-2">
                <Check size={44} />
              </div>
              <div className="flex flex-col items-start justify-start gap-3">
                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-200 md:text-4xl lg:font-bold font-dmsans">
                  Your results are ready
                </h4>
                <p className="hidden text-sm text-gray-700 dark:text-gray-400 lg:block">
                  Unlock your results now and find out if you are likely to have
                  ADHD!
                </p>
              </div>
            </div>
            <div className="border rounded-lg p-2 dark:bg-gray-800 dark:border-gray-900 ">
              <div className="flex flex-row flex-wrap items-center justify-center w-full gap-1 md:justify-between md:flex-nowrap">

                <div className="flex items-center gap-2 md:items-start">
                <Clock9 size={24} />
                  <p className="max-w-xs text-xs text-gray-700 md:text-sm dark:text-gray-200">
                    <span className="hidden md:inline-block">
                      For privacy reasons, we hold your results for a limited
                      time.
                    </span>
                    <span className="inline-block md:hidden">
                      This offer is valid for
                    </span>
                  </p>
                </div>
                <div className="flex flex-row flex-wrap items-center justify-center  gap-1 md:justify-between md:flex-nowrap">
                  {!isDateInPast(countdownDate) && (
                    <CountdownTimer deadline={countdownDate} title="" />
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="flex flex-col items-center gap-6 md:w-full">
            <div className="px-3 pt-3 rounded-t-2xl bg-gradient-to-r from-[#667EEA] to-[#764BA2] w-full lg:h-[400px]">
              <div className="relative flex flex-col items-center h-full gap-4 px-5 pt-5 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-900 rounded-t-2xl">
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 font-playfair">
                  Your personal ADHD assessment
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-200  font-playfair">
                  Your answers have been successfully recorded. Based on our
                  analysis using official ADHD tests, you
                  <span className="blur-md">
                    Your answers have been successfully recorded. According to
                    our analysis, which is based on official tests for ADHD,
                    your answers have been successfully recorded. According to
                    our analysis, which is based on official tests for ADHD
                  </span>
                </p>
                <p className="text-xl font-bold text-gray-700 dark:text-gray-200 blur-md">
                  [Rezultatul analizei]
                </p>
                <p className="blur-md text-sm text-gray-600 dark:text-gray-200  font-playfair">
                  Am utilizat metodele de evaluare recunoscute pentru a analiza
                  răspunsurile tale. În urma acestei evaluări, am identificat
                  următoarele aspecte relevante pentru diagnosticul ADHD.
                </p>
                <img
                  src="https://d2bmj4el5t1r3x.cloudfront.net/755832da-4beb-4f69-8b32-f51b47ca0bb0/img/ui/adhd/stamp-certificate.png"
                  alt="stampă certificat"
                  className="absolute bottom-0 right-0 w-24"
                />
              </div>
            </div>
          </Card>
        </div>
        {/* right */}
        <div className="flex flex-col items-center gap-6">
          <div className="hidden w-full lg:block">
            <Card className="flex flex-col w-full gap-6  md:w-full">
              <CardTitle className="mb-6">
                <div className="flex items-center justify-center gap-4 px-10 py-4 border-b border-gray-300">
                  <BadgeEuro />
                  <h6 className="text-base font-medium text-gray-600 dark:text-gray-200 md:font-bold md:text-2xl">
                    Special Offer
                  </h6>
                  <h3 className="text-4xl font-bold text-gray-900 dark:text-violet-400 font-dmsans">
                    {formatCurrency(product.priceInCents / 100)}
                  </h3>
                </div>
              </CardTitle>

              <div className="flex flex-col items-center justify-center gap-6 px-6">
                <div className="flex flex-col items-start justify-start w-full rounded-lg gap-4 px-4 py-3 border border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-900 ">
                  <div className="flex items-start justify-start gap-2 md:items-center">
                    <Check color="green" />
                    <p className="text-sm text-gray-900 dark:text-gray-300">
                      Immediately unlock your personalized evaluation for ADHD
                    </p>
                  </div>
                  <div className="flex items-start justify-start gap-2 md:items-center">
                    <Check color="green" />
                    <p className="text-sm text-gray-900 dark:text-gray-300">
                      Access to dozens of other tests
                    </p>
                  </div>
                  <div className="flex items-start justify-start gap-2 md:items-center">
                    <Check color="green" />
                    <p className="text-sm text-gray-900 dark:text-gray-300">
                      Secure payment
                    </p>
                  </div>
                </div>
                <div className="w-full">
                  <Elements options={{ clientSecret }} stripe={stripePromise}>
                    <Form
                      priceInCents={product.priceInCents}
                      productId={product.id}
                    />
                  </Elements>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

function Form({
  priceInCents,
  productId,
}: {
  priceInCents: number;
  productId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [condition, setConditions] = useState(false);
  const [errorConditions, setErrorConditions] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (stripe == null || elements == null || email == null) return;

    setIsLoading(true);

    const orderExists = await userOrderExists(email, productId);

    if (orderExists) {
      setErrorMessage(
        "You have already purchased this product. Try downloading it from the My Orders page"
      );
      setIsLoading(false);
      return;
    }

    if (!condition) {
      setErrorConditions("The CGV field is required.");
      setErrorMessage("The CGV field is required.");
      setIsLoading(false);
      return;
    }

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/adhd/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unknown error occurred");
        }
      });
    // .finally(() => setIsLoading(false));

    setIsLoading(false);
    localStorage.removeItem("quizAnswers");
    localStorage.removeItem("isAnsweredByUser");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-0">
        <CardHeader>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <div className="space-y-4 mb-4 dark:text-gray-300">
          <PaymentElement className="dark:text-gray-300" />
          <div className="mt-4">
            <LinkAuthenticationElement
              className="dark:text-gray-300"
              onChange={(e) => setEmail(e.value.email)}
            />
          </div>
          <div className="flex items-center space-x-2 py-2">
            <input
              type="checkbox"
              id="terms2"
              checked={condition}
              onChange={(e) => setConditions(e.target.checked)}
              className="checkbox checkbox-xs [--chkbg:theme(colors.indigo.600)]"
            />
            <label
              htmlFor="terms2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have read and accept{" "}
              <Link href={"#"} className="underline">
                the general conditions
              </Link>
            </label>
          </div>

          {errorConditions && !condition && (
            <div
              role="alert"
              className="alert alert-error py-2 my-2 px-6 rounded-lg text-red-600 bg-red-200 border border-red-600"
            >
              <span>{errorConditions}</span>
            </div>
          )}
        </div>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading
              ? "Purchasing..."
              : `Purchase - ${formatCurrency(priceInCents / 100)}`}
          </Button>
        </CardFooter>
      </div>
    </form>
  );
}
