import prisma from "@/db/prisma";
import { notFound, redirect } from "next/navigation";
import React from "react";
import Stripe from "stripe";
import { CheckoutForm } from "./_components/CheckoutForm";
import { questions } from "@/data/questions";
import { cookies } from "next/headers";
import { Card } from "../_components/Card";
import { CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardContent } from "../_components/CardContent";
import Link from "next/link";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const PayPage = async () => {
  // Check if the product already exists
  let product = await prisma.testADHD.findFirst({
    where: {
      priceInCents: 100,
      isAvailableForPurchase: true,
    },
  });

  // If the product doesn't exist, create a new one
  if (!product) {
    product = await prisma.testADHD.create({
      data: {
        priceInCents: 100,
        isAvailableForPurchase: true,
      },
    });
  }

  const cookieStore = cookies();
  const savedScore = cookieStore.get("score");
  const score = savedScore ? JSON.parse(savedScore.value) : null;

  if (product == null) return notFound();
  if (score == null) {
    return (
      <div className="flex justify-center p-8">
        <Card className="">
          <CardTitle className="border-b pb-4">
            <h2>Session timed out</h2>
          </CardTitle>
          <CardContent content="Click on back and go to the homepage" />
          <CardFooter className="float-right mt-4">
            <Link href={"/adhd"}>
              <Button>Back</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  await prisma.testADHD.update({
    where: { id: product.id },
    data: {
      totalScore: score.totalScore,
      totalMaxScore: score.totalMaxScore,
      inattentionScore: score.inattentionScore,
      inattentionMaxScore: score.inattentionMaxScore,
      hyperactivityScore: score.hyperactivityScore,
      hyperactivityMaxScore: score.hyperactivityMaxScore,
    },
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "EUR", // Change to EUR for euros
    metadata: { productId: product.id },
  });

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to create payment intent");
  }

  return (
    <CheckoutForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  );
};

export default PayPage;
