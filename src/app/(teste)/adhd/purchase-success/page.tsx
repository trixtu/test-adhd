import { Button } from "@/components/ui/button";
import prisma from "@/db/prisma";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import Stripe from "stripe";
import { Card } from "../_components/Card";
import { CardFooter } from "../_components/CardFooter";
import { CardContent, CardTitle } from "@/components/ui/card";
import { CardResultSuccess } from "./_components/CardResultSuccess";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const PurchaseSuccessPage = async ({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );

  if (paymentIntent.metadata.productId == null) return notFound();

  const product = await prisma.testADHD.findUnique({
    where: { id: paymentIntent.metadata.productId },
  });

  if (product == null) return notFound();

  const isSuccess = paymentIntent.status === "succeeded";
  console.log(product)
  return (
    <div className="container p-0">
      <div className="flex flex-col items-center justify-center p-6">
        {isSuccess ? (
          <h1 className="text-3xl font-[800] mb-6">Your ADHD profile</h1>
        ) : (
          "Error!"
        )}
        <CardResultSuccess product={product}/>
      
      </div>

      {/* <h1 className="text-4xl font-bold">
      {isSuccess ? "Success!" : "Error!"}
    </h1>
    <div className="flex gap-4 items-center">
      <div className="aspect-video flex-shrink-0 w-1/3 relative">
       
      </div>
      <div>
      
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="line-clamp-3 text-muted-foreground">
          
        </div>
        <Button className="mt-4" size="lg" asChild>
          {isSuccess ? (
            <a
              href={`/products/download/${await createDownloadVerification(
                product.id
              )}`}
            >
              Download
            </a>
          ) : (
            <Link href={`/products/${product.id}/purchase`}>Try Again</Link>
          )}
        </Button>
      </div>
    </div> */}
    </div>
  );
};

export default PurchaseSuccessPage;

async function createDownloadVerification(productId: string) {
  return (
    await prisma.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    })
  ).id;
}
